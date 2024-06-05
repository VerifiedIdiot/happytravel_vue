<template>
  <div class="flex" id="deduction-head">
    <div class="flex items-center justify-center w-1/2 h-10 m-px bg-gray-200">
      <span class="text-lg font-bold">
        공제 항목
      </span>
    </div>
    <div class="flex items-center justify-center w-1/2 h-10 m-px bg-gray-200">
      <span class="text-lg font-bold">
        금 액
      </span>
    </div>
  </div>
  <div class="relative w-full" id="deduction-body">
    <div class="flex" v-for="item in deductionBodyData" :key="item.code">
      <div class="flex items-center justify-start w-1/2 h-7 m-px pl-5 bg-white">
        <span>
          {{ item.name }}
        </span>
      </div>
      <div class="flex items-center justify-end w-1/2 h-7 m-px pr-5 bg-white">
        <span>
          {{ formatNumber(item.amount) }}
        </span>
      </div>
    </div>
  </div>
  <div class="absolute bottom-0 w-full" id="deduction-foot">
    <div class="flex" v-for="item in deductionFootData" :key="item.code">
      <div class="flex items-center justify-center w-1/2 h-7 m-px pl-5 bg-blue-300">
        <span class="font-bold text-center">
          {{ item.name }}
        </span>
      </div>
      <div class="flex items-center justify-end w-1/2 h-7 m-px pr-5 bg-blue-300">
        <span class="font-bold">
          {{ formatNumber(item.amount) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
/********** API **********/
/********** VUE **********/
// DeductionTable: 공제 항목 테이블 컴포넌트
export default {
  // 컴포넌트의 이름을 정의
  name: 'DeductionTable',
  // 자식 컴포넌트를 정의
  components: {},
  // 부모로부터 전달받는 데이터를 정의
  props: {
    salaryData: {
      type: Array,
      required: true,
    },
    salaryItem: {
      type: Array,
      required: true,
    },
  },
  // 컴포넌트가 내보내는 이벤트를 정의
  emits: [],
  // 컴포넌트의 반응형 데이터를 정의
  data() {
    return {
      mergedSalaryData: [], // 급여 정보 + 항목명
      deductionBodyData: [], // 급여 정보(공제)
      deductionFootData: [], // 급여 정보(공제 합계)
    };
  },
  // 계산된 속성을 정의
  computed: {},
  // 반응형 데이터 또는 props의 변화를 감지하여 동작을 정의
  watch: {
    salaryData: {
      handler() {
        this.salaryDataFilter();
      },
      immediate: true,
    },
    salaryItem: {
      handler() {
        this.salaryDataFilter();
      },
      immediate: true,
    },
  },
  // -------------------- 라이프사이클 훅 --------------------
  // 인스턴스가 생성된 후 호출
  created() {},
  // 인스턴스가 DOM에 마운트된 후 호출
  mounted() {
    this.salaryDataFilter();
  },
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
    // 급여 정보에 급여 항목명 추가
    mergedSalaryDataFunc() {
      if (this.salaryData.length === 0 || this.salaryItem.length === 0) return;

      this.mergedSalaryData = this.salaryData.map((dataItem) => {
        const matchingItem = this.salaryItem.find((item) => item.salary_item_code === dataItem.salary_item_code);
        return {
          code: dataItem.salary_item_code,
          name: matchingItem.salary_item_name,
          amount: dataItem.amount,
        };
      });
    },
    // 급여 정보에서 공제 부분 필터링
    salaryDataFilter() {
      this.mergedSalaryDataFunc();
      this.deductionBodyData = this.mergedSalaryData.filter((item) => item.code.charAt() === '2');
      this.deductionFootData = this.mergedSalaryData.filter((item) => item.code.charAt() === '9');
      return;
    },
  },
};
</script>
