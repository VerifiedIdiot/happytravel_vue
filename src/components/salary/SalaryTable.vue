<template>
  <div class="flex" id="salary-head">
    <div class="flex items-center justify-center w-1/2 h-10 m-px bg-gray-200">
      <span class="text-lg font-bold">
        급여 항목
      </span>
    </div>
    <div class="flex items-center justify-center w-1/2 h-10 m-px bg-gray-200">
      <span class="text-lg font-bold">
        금 액
      </span>
    </div>
  </div>
  <div class="relative w-full" id="salary-body">
    <div class="flex w-full" v-for="item in salaryData" :key="item.code">
      <div class="flex w-full" v-if="item.code.charAt(0) === '1'">
        <div class="flex items-center justify-start w-1/2 h-7 m-px pl-5 bg-white">
          <span>
            {{ item.name }}
          </span>
        </div>
        <div class="flex items-center justify-end w-1/2 h-7 m-px pr-5 bg-white">
          <input class="text-right" type="text" :value="formatNumber(item.amount)" @input="updateAmount($event, item)" />
        </div>
      </div>
    </div>
  </div>
  <div class="absolute bottom-0 w-full" id="salary-foot">
    <div class="flex w-full" v-for="item in salaryData" :key="item.code">
      <div class="flex w-full" v-if="item.code.charAt(0) === '8'">
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
  </div>
</template>

<script>
/********** API **********/
/********** VUE **********/
// SalaryTable: 급여 항목 테이블 컴포넌트
export default {
  // 컴포넌트의 이름을 정의
  name: 'SalaryTable',
  // 자식 컴포넌트를 정의
  components: {},
  // 부모로부터 전달받는 데이터를 정의
  props: {
    salaryData: {
      type: Array,
      required: true,
    },
  },
  // 컴포넌트가 내보내는 이벤트를 정의
  emits: [],
  // 컴포넌트의 반응형 데이터를 정의
  data() {
    return {};
  },
  // 계산된 속성을 정의
  computed: {},
  // 반응형 데이터 또는 props의 변화를 감지하여 동작을 정의
  watch: {
    salaryData: {
      handler() {
        // this.mergedSalaryDataFunc();
      },
      immediate: true,
    },
  },
  // -------------------- 라이프사이클 훅 --------------------
  // 인스턴스가 생성된 후 호출
  created() {},
  // 인스턴스가 DOM에 마운트된 후 호출
  mounted() {
    // this.mergedSalaryDataFunc();
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
    // 금액 변동
    updateAmount(event, item) {
      const value = event.target.value.replace(/,/g, '');
      item.amount = parseInt(value, 10);
    },
  },
};
</script>
