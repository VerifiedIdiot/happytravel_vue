<template>
  <div class="flex items-center justify-end w-full m-px" id="payment-detail-button">
    <button class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button" @click="downloadExcel">
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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
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
  methods: {
    // 엑셀 내려받기
    downloadExcel() {
      // 엑셀의 첫 번째 행에 컬럼 이름을 설정
      const headers1 = ['월', '과세', , , , , , , '비과세', , , , , , '지급액'];
      const headers2 = ['월', '기본급', '가족수당', '직책수당', '식대', '연장근로수당', '야간근로수당', '휴일근로수당', '국민연금', '건강보험', '장기요양보험', '고용보험', '소득세', '지방소득세'];
      const data = this.paymentDetailData.map((item) => [item.salary_month, item.item1100, item.item1200, item.item1300, item.item1400, item.item1500, item.item1600, item.item1700, item.item2100, item.item2200, item.item2300, item.item2400, item.item2500, item.item2600, item.item9200]);
      const worksheet = XLSX.utils.aoa_to_sheet([headers1, headers2, ...data]);

      // 셀 병합
      worksheet['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } }, // A1: A2
        { s: { r: 0, c: 1 }, e: { r: 0, c: 7 } }, // B1: H1
        { s: { r: 0, c: 8 }, e: { r: 0, c: 13 } }, // I1: N2
        { s: { r: 0, c: 14 }, e: { r: 1, c: 14 } }, // A1: A2
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, '급여 지급 상세 내역');

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(dataBlob, '급여_지급_상세_내역.xlsx');
    },
  },
};
</script>
