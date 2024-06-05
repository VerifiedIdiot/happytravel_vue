<template>
  <div class="flex items-center justify-end w-full m-px" id="payment-detail-button">
    <button class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button" @click="downloadExcel()">
      급여 지급 상세 내역 내려 받기 (Excel)
    </button>
  </div>
  <div class="flex" id="payment-detail-head">
    <div class="flex items-center justify-center w-20 h-21 m-px bg-gray-200">
      <span class="text-lg font-bold">월</span>
    </div>
    <div class="flex flex-col w-full">
      <div class="flex">
        <div class="flex items-center justify-center w-7/12 h-10 m-px bg-gray-200">
          <span class="text-lg font-bold">과세</span>
        </div>
        <div class="flex items-center justify-center w-6/12 h-10 m-px bg-gray-200">
          <span class="text-lg font-bold">비과세</span>
        </div>
      </div>
      <div class="flex">
        <div class="flex items-center justify-center w-1/12 h-10 m-px bg-gray-200" v-for="title in titles" :key="title">
          <span class="text-lg font-bold">
            {{ title }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center w-1/12 h-21 m-px bg-gray-200">
      <span class="text-lg font-bold">지급액</span>
    </div>
  </div>
  <div class="relative flex-col" id="payment-detail-body">
    <div class="flex" v-for="item in paymentDetailData" :key="item.salary_month">
      <div class="flex items-center justify-center w-20 h-7 m-px bg-white">
        <span> {{ item.salary_month }}월</span>
      </div>
      <div class="flex flex-col w-full">
        <div class="flex">
          <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1 bg-white">
            <span>
              {{ formatNumber(item.item1100) }}
            </span>
          </div>
          <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1 bg-white">
            <span>
              {{ formatNumber(item.item1200) }}
            </span>
          </div>
          <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1 bg-white">
            <span>
              {{ formatNumber(item.item1300) }}
            </span>
          </div>
          <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1 bg-white">
            <span>
              {{ formatNumber(item.item1400) }}
            </span>
          </div>
          <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1 bg-white">
            <span>
              {{ formatNumber(item.item1500) }}
            </span>
          </div>
          <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1 bg-white">
            <span>
              {{ formatNumber(item.item1600) }}
            </span>
          </div>
          <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1 bg-white">
            <span>
              {{ formatNumber(item.item1700) }}
            </span>
          </div>
          <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1 bg-white">
            <span>
              {{ formatNumber(item.item2100) }}
            </span>
          </div>
          <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1 bg-white">
            <span>
              {{ formatNumber(item.item2200) }}
            </span>
          </div>
          <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1 bg-white">
            <span>
              {{ formatNumber(item.item2300) }}
            </span>
          </div>
          <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1 bg-white">
            <span>
              {{ formatNumber(item.item2400) }}
            </span>
          </div>
          <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1 bg-white">
            <span>
              {{ formatNumber(item.item2500) }}
            </span>
          </div>
          <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1 bg-white">
            <span>
              {{ formatNumber(item.item2600) }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end w-1/12 h-7 m-px pr-1 bg-white">
        <span> {{ formatNumber(item.item9200) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
/********** API **********/
/********** VUE **********/
// PaymentDetailTable: 급여 지급 내역 상세 내역 컴포넌트
export default {
  // 컴포넌트의 이름을 정의
  name: 'PaymentDetailTable',
  // 자식 컴포넌트를 정의
  components: {},
  // 부모로부터 전달받는 데이터를 정의
  props: {
    paymentDetailData: {
      type: Array,
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
      titles: ['기본급', '가족수당', '직책수당', '식대', '연장근로수당', '야간근로수당', '휴일근로수당', '국민연금', '건강보험', '장기요양보험', '고용보험', '소득세', '지방소득세'], // 컬럼 명
    };
  },
  // 계산된 속성을 정의
  computed: {},
  // 반응형 데이터 또는 props의 변화를 감지하여 동작을 정의
  watch: {
    paymentDetailData: {
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
  methods: {},
};
</script>
