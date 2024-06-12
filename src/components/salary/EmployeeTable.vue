<template>
  <div class="flex" id="employee-head">
    <div class="flex items-center justify-center w-1/4 h-10 m-px bg-gray-200 cursor-pointer" @click="sortBy('emp_id')">
      <span class="text-lg font-bold">
        사원번호
        <span v-if="sortKey === 'emp_id'">{{ sortOrders.emp_id > 0 ? '▲' : '▼' }}</span>
      </span>
    </div>
    <div class="flex items-center justify-center w-1/4 h-10 m-px bg-gray-200 cursor-pointer" @click="sortBy('emp_name')">
      <span class="text-lg font-bold">
        사원명
        <span v-if="sortKey === 'emp_name'">{{ sortOrders.emp_name > 0 ? '▲' : '▼' }}</span>
      </span>
    </div>
    <div class="flex items-center justify-center w-1/4 h-10 m-px bg-gray-200 cursor-pointer" @click="sortBy('dept_code')">
      <span class="text-lg font-bold">
        부서
        <span v-if="sortKey === 'dept_code'">{{ sortOrders.dept_code > 0 ? '▲' : '▼' }}</span>
      </span>
    </div>
    <div class="flex items-center justify-center w-1/4 h-10 m-px bg-gray-200 cursor-pointer" @click="sortBy('pos_code')">
      <span class="text-lg font-bold">
        직급
        <span v-if="sortKey === 'pos_code'">{{ sortOrders.pos_code > 0 ? '▲' : '▼' }}</span>
      </span>
    </div>
  </div>
  <div class="relative w-full overflow-y-scroll custom-scrollbar" id="employee-body">
    <div class="flex" v-for="employee in sortedEmployees" :key="employee.emp_id" @click="onSelectEmployee(employee)">
      <div class="flex items-center justify-center w-1/4 h-7 m-px" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === employee.emp_id, 'bg-white text-black': selectedEmployeeId !== employee.emp_id }">
        <span>
          {{ employee.emp_id }}
        </span>
      </div>
      <div class="flex items-center justify-center w-1/4 h-7 m-px" :class="{ 'leave-emp': !employee.leave_stat, 'bg-blue-500 text-white': selectedEmployeeId === employee.emp_id, 'bg-white text-black': selectedEmployeeId !== employee.emp_id }">
        <span>
          {{ employee.emp_name }}
        </span>
      </div>
      <div class="flex items-center justify-center w-1/4 h-7 m-px" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === employee.emp_id, 'bg-white text-black': selectedEmployeeId !== employee.emp_id }">
        <span>
          {{ employee.dept_name }}
        </span>
      </div>
      <div class="flex items-center justify-center w-1/4 h-7 m-px" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === employee.emp_id, 'bg-white text-black': selectedEmployeeId !== employee.emp_id }">
        <span>
          {{ employee.pos_name }}
        </span>
      </div>
    </div>
  </div>
  <div class="absolute bottom-0 w-full" id="employee-foot">
    <div class="flex">
      <div class="flex items-center justify-center w-1/2 h-7 m-px pl-5 bg-blue-300">
        <span class="font-bold text-center">
          인원(퇴직)
        </span>
      </div>
      <div class="flex items-center justify-center w-1/2 h-7 m-px pr-5 bg-blue-300">
        <span class="font-bold text-center"> {{ leaveCount.true }}({{ leaveCount.false }}) </span>
      </div>
    </div>
  </div>
</template>

<script>
/********** API **********/
/********** VUE **********/
// EmployeeTable: 사원 정보 테이블 컴포넌트
export default {
  // 컴포넌트의 이름을 정의
  name: 'EmployeeTable',
  // 자식 컴포넌트를 정의
  components: {},
  // 부모로부터 전달받는 데이터를 정의
  props: {
    employees: {
      type: Array,
      required: true,
    },
    onSelect: {
      type: Function,
      required: true,
    },
    selectedEmployeeId: {
      type: [String, null],
      required: true,
    },
  },
  // 컴포넌트가 내보내는 이벤트를 정의
  emits: [],
  // 컴포넌트의 반응형 데이터를 정의
  data() {
    return {
      // 현재 정렬 키
      sortKey: '',
      // 각 정렬 키에 대한 정렬 순서
      sortOrders: {
        emp_id: 1,
        emp_name: 1,
        dept_code: 1,
        pos_code: 1,
      },
    };
  },
  // 계산된 속성을 정의
  computed: {
    // 정렬된 사원 목록 계산
    sortedEmployees() {
      const sortedArray = [...this.employees];
      if (this.sortKey) {
        sortedArray.sort((a, b) => {
          const order = this.sortOrders[this.sortKey];
          if (a[this.sortKey] > b[this.sortKey]) {
            return order;
          } else if (a[this.sortKey] < b[this.sortKey]) {
            return -order;
          } else {
            return 0;
          }
        });
      }
      return sortedArray;
    },
    // 퇴직 및 재직 사원 수 계산
    leaveCount() {
      return this.employees.reduce(
        (counts, employee) => {
          if (employee.leave_stat) {
            counts.true += 1;
          } else {
            counts.false += 1;
          }
          return counts;
        },
        { true: 0, false: 0 }
      );
    },
  },
  // 반응형 데이터 또는 props의 변화를 감지하여 동작을 정의
  watch: {},
  // -------------------- 라이프사이클 훅 --------------------
  // 인스턴스가 생성된 후 호출
  created() {},
  // 인스턴스가 DOM에 마운트된 후 호출
  mounted() {},
  // 컴포넌트가 DOM에 마운트되기 전 호출
  beforeMount() {},
  // 데이터가 갱신되기 전 호출
  beforeUpdate() {},
  // 데이터가 갱신된 후 호출
  updated() {},
  // 컴포넌트가 언마운트되기 전 호출
  beforeUnmount() {},
  // 컴포넌트가 언마운트된 후 호출
  unmounted() {},
  // -------------------- --------------- --------------------
  // 인스턴스 메서드를 정의
  methods: {
    // 정렬 키와 순서를 토글하는 메서드
    sortBy(key) {
      if (this.sortKey === key) {
        // 이미 선택된 키인 경우 순서를 반대로 변경
        this.sortOrders[key] = this.sortOrders[key] * -1;
      } else {
        // 새로운 키를 선택한 경우 해당 키로 정렬
        this.sortKey = key;
      }
    },
    // 선택된 사원 ID를 부모 컴포넌트에 전달
    onSelectEmployee(employee) {
      this.$emit('select', employee.emp_id);
    },
  },
};
</script>

<style scoped>
/* TAG */
/* CLASS */
.leave-emp {
  color: red;
}
.custom-scrollbar::-webkit-scrollbar {
  display: none;
}

.custom-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
