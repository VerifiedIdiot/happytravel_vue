<template>
  <div class="xl" id="salary-payment">
    <div class="flex mx-10 mt-5" id="payment-group">
      <div class="relative w-full mx-2 p-px bg-gray-100" id="payment-table">
        <PaymentTable :paymentData="paymentData" @select="selectEmployee" :selectedEmployeeId="selectedEmployeeId" />
      </div>
    </div>
    <div class="flex mx-10 mt-5" id="payment-detail-group">
      <div class="relative w-full mx-2 p-px bg-gray-100" id="payment-table">
        <PaymentDetailTable :paymentDetailData="paymentDetailData" :selectedEmployeeId="selectedEmployeeId" />
      </div>
    </div>
  </div>
</template>

<script>
/********** API **********/
import { selectPaymentData, selectPaymentDatailData } from '@/api/salary/PaymentData';
/********** VUE **********/
import PaymentTable from '@/components/salary/PaymentTable.vue';
import PaymentDetailTable from '@/components/salary/PaymentDetailTable.vue';

// SalaryPayment: 급여 지급 내역 컴포넌트
export default {
  // 컴포넌트의 이름을 정의
  name: 'SalaryPayment',
  // 자식 컴포넌트를 정의
  components: {
    PaymentTable,
    PaymentDetailTable,
  },
  // 부모로부터 전달받는 데이터를 정의
  props: {},
  // 컴포넌트가 내보내는 이벤트를 정의
  emits: [],
  // 컴포넌트의 반응형 데이터를 정의
  data() {
    return {
      paymentYear: null, // 급여 년도
      paymentData: [], // 급여 지급 내역 정보
      selectedEmployeeId: null, // 선택된 사원 번호
      paymentDetailData: [], // 급여 지급 상세 내역 정보
    };
  },
  // 계산된 속성을 정의
  computed: {},
  // 반응형 데이터 또는 props의 변화를 감지하여 동작을 정의
  watch: {},
  // -------------------- 라이프사이클 훅 --------------------
  // 인스턴스가 생성된 후 호출
  created() {
    // 기본값으로 현재 연도 설정
    this.paymentYear = this.getTodayYear();
  },
  // 인스턴스가 DOM에 마운트된 후 호출
  mounted() {
    // 초기 급여 지급 내역 데이터 가져오기
    this.selectPaymentData();
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
    // 오늘 일자(년) 가져오는 함수
    getTodayYear() {
      const today = new Date();
      const year = today.getFullYear();
      return `${year}`;
    },
    // 급여 지급 내역 정보 가져오기
    async selectPaymentData() {
      if (!this.paymentYear) return;
      try {
        this.paymentData = await selectPaymentData(this.paymentYear);

        this.resetSelectedEmployee();
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    },
    // 선택된 직원 정보 초기화 함수
    resetSelectedEmployee() {
      this.selectedEmployeeId = null;
    },
    // 사원의 급여 공제 비동기
    async selectEmployee(empId) {
      // 선택된 직원 ID 설정
      this.selectedEmployeeId = empId;
      try {
        this.paymentDetailData = await selectPaymentDatailData(this.paymentYear, this.selectedEmployeeId);
      } catch (error) {
        console.error('Error fetching salary data:', error);
      }
    },
  },
};
</script>
