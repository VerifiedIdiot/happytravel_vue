<template>
  <div class="flex" id="employee-head">
    <div class="flex items-center justify-center w-1/4 h-10 m-px bg-gray-200">
      <span class="text-lg font-bold">
        사원번호
      </span>
    </div>
    <div class="flex items-center justify-center w-1/4 h-10 m-px bg-gray-200">
      <span class="text-lg font-bold">
        사원명
      </span>
    </div>
    <div class="flex items-center justify-center w-1/4 h-10 m-px bg-gray-200">
      <span class="text-lg font-bold">
        부서
      </span>
    </div>
    <div class="flex items-center justify-center w-1/4 h-10 m-px bg-gray-200">
      <span class="text-lg font-bold">
        직급
      </span>
    </div>
  </div>
  <div class="relative w-full overflow-y-scroll custom-scrollbar" id="employee-body">
    <div
      class="flex"
      v-for="employee in employees"
      :key="employee.emp_id"
      @click="selectEmployee(employee)"
      :class="{ 'bg-blue-500 text-white': selectedEmployeeId === employee.emp_id, 'bg-white text-black': selectedEmployeeId !== employee.emp_id }"
    >
      <div class="flex items-center justify-center w-1/4 h-7 m-px">
        <span>
          {{ employee.emp_id }}
        </span>
      </div>
      <div class="flex items-center justify-center w-1/4 h-7 m-px" :class="{ 'leave-emp': !employee.leave_stat }">
        <span>
          {{ employee.emp_name }}
        </span>
      </div>
      <div class="flex items-center justify-center w-1/4 h-7 m-px">
        <span>
          {{ employee.dept_name }}
        </span>
      </div>
      <div class="flex items-center justify-center w-1/4 h-7 m-px">
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
export default {
  name: 'EmployeeTable',
  props: {
    employees: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedEmployeeId: null,
    };
  },
  mounted() {},
  computed: {
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
  watch: {
    employees: {
      handler() {
        this.selectedEmployeeId = null;
      },
      immediate: true,
    },
  },
  methods: {
    selectEmployee(employee) {
      this.selectedEmployeeId = employee.emp_id;
      this.$emit('select', employee);
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
