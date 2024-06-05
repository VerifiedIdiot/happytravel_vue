<template>
  <div class="flex items-center justify-end w-full m-px" id="payment-button">
    <button class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button" @click="downloadExcel">
      급여 지급 내역 내려 받기 (Excel)
    </button>
  </div>
  <div class="flex" id="payment-head">
    <div class="flex items-center justify-center w-1/12 h-10 m-px bg-gray-200" v-for="title in titles" :key="title">
      <span class="text-lg font-bold">
        {{ title }}
      </span>
    </div>
  </div>
  <div class="relative w-full overflow-y-scroll custom-scrollbar" id="payment-body">
    <div class="flex" v-for="item in paymentData" :key="item.empId" @click="onSelectEmployee(item)">
      <div class="flex items-center justify-center w-1/12 h-7 m-px" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === item.emp_id, 'bg-white text-black': selectedEmployeeId !== item.emp_id }">
        <span>
          {{ item.emp_id }}
        </span>
      </div>
      <div class="flex items-center justify-center w-1/12 h-7 m-px" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === item.emp_id, 'bg-white text-black': selectedEmployeeId !== item.emp_id }">
        <span>
          {{ item.emp_name }}
        </span>
      </div>
      <div class="flex items-center justify-center w-1/12 h-7 m-px" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === item.emp_id, 'bg-white text-black': selectedEmployeeId !== item.emp_id }">
        <span>
          {{ item.dept_name }}
        </span>
      </div>
      <div class="flex items-center justify-center w-1/12 h-7 m-px" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === item.emp_id, 'bg-white text-black': selectedEmployeeId !== item.emp_id }">
        <span>
          {{ item.pos_name }}
        </span>
      </div>
      <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === item.emp_id, 'bg-white text-black': selectedEmployeeId !== item.emp_id }">
        <span>
          {{ formatNumber(item.month01) }}
        </span>
      </div>
      <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === item.emp_id, 'bg-white text-black': selectedEmployeeId !== item.emp_id }">
        <span>
          {{ formatNumber(item.month02) }}
        </span>
      </div>
      <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === item.emp_id, 'bg-white text-black': selectedEmployeeId !== item.emp_id }">
        <span>
          {{ formatNumber(item.month03) }}
        </span>
      </div>
      <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === item.emp_id, 'bg-white text-black': selectedEmployeeId !== item.emp_id }">
        <span>
          {{ formatNumber(item.month04) }}
        </span>
      </div>
      <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === item.emp_id, 'bg-white text-black': selectedEmployeeId !== item.emp_id }">
        <span>
          {{ formatNumber(item.month05) }}
        </span>
      </div>
      <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === item.emp_id, 'bg-white text-black': selectedEmployeeId !== item.emp_id }">
        <span>
          {{ formatNumber(item.month06) }}
        </span>
      </div>
      <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === item.emp_id, 'bg-white text-black': selectedEmployeeId !== item.emp_id }">
        <span>
          {{ formatNumber(item.month07) }}
        </span>
      </div>
      <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === item.emp_id, 'bg-white text-black': selectedEmployeeId !== item.emp_id }">
        <span>
          {{ formatNumber(item.month08) }}
        </span>
      </div>
      <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === item.emp_id, 'bg-white text-black': selectedEmployeeId !== item.emp_id }">
        <span>
          {{ formatNumber(item.month09) }}
        </span>
      </div>
      <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === item.emp_id, 'bg-white text-black': selectedEmployeeId !== item.emp_id }">
        <span>
          {{ formatNumber(item.month10) }}
        </span>
      </div>
      <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === item.emp_id, 'bg-white text-black': selectedEmployeeId !== item.emp_id }">
        <span>
          {{ formatNumber(item.month11) }}
        </span>
      </div>
      <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1" :class="{ 'bg-blue-500 text-white': selectedEmployeeId === item.emp_id, 'bg-white text-black': selectedEmployeeId !== item.emp_id }">
        <span>
          {{ formatNumber(item.month12) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
/********** API **********/
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
/********** VUE **********/
// PaymentTable: 급여 지급 내역 컴포넌트
export default {
  // 컴포넌트의 이름을 정의
  name: 'PaymentTable',
  // 자식 컴포넌트를 정의
  components: {},
  // 부모로부터 전달받는 데이터를 정의
  props: {
    paymentData: {
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
      titles: ['사원번호', '사원명', '부서', '직급', '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], // 컬럼 명
    };
  },
  // 계산된 속성을 정의
  computed: {},
  // 반응형 데이터 또는 props의 변화를 감지하여 동작을 정의
  watch: {
    paymentData: {
      handler() {},
      immediate: true,
    },
  },
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
    // 사원 행 선택 이벤트
    onSelectEmployee(employee) {
      this.$emit('select', employee.emp_id);
    },
    // 엑셀 내려받기
    downloadExcel() {
      // 엑셀의 첫 번째 행에 컬럼 이름을 설정
      const headers = ['사원번호', '사원명', '부서', '직급', '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
      const data = this.paymentData.map((item) => [item.emp_id, item.emp_name, item.dept_name, item.pos_name, item.month01, item.month02, item.month03, item.month04, item.month05, item.month06, item.month07, item.month08, item.month09, item.month10, item.month11, item.month12]);
      const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, '급여 지급 내역');

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(dataBlob, '급여_지급_내역.xlsx');
    },
  },
};
</script>

<style scope>
/* TAG */
/* ID */
#payment-body {
  max-height: 150px; /* 기본 최대 높이 설정: (4 * x(tailwind h-x) + 2) * 최대 row 갯수 */
}
/* CLASS */
.custom-scrollbar::-webkit-scrollbar {
  display: none;
}
.custom-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
