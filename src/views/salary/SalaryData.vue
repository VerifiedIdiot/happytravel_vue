<template>
  <div class="xl" id="salary-data">
    <div class="flex mx-10 mt-5" id="input-group">
      <div class="relative flex items-center justify-end w-1/4 mx-2 p-px">
        <label for="salary-date" class="mr-2">귀속연월</label>
        <input class="border-gray-400 border-2" id="salary-date" v-model="formattedSalaryDate" type="month" @change="fetchInitialData" />
      </div>
      <div class="relative flex items-center justify-end w-1/4 mx-2 p-px"></div>
      <div class="relative flex items-center justify-end w-1/4 mx-2 p-px">
        <button class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button" @click="updateSalaryData" :disabled="selectedEmployeeId === null">
          수정
        </button>
      </div>
      <div class="relative flex items-center justify-end w-1/4 mx-2 p-px">
        <button class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button" @click="initSalaryData('')">
          급여 내역 생성(일괄 처리)
        </button>
        <button class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button" @click="initSalaryData(this.selectedEmployeeId)" :disabled="selectedEmployeeId === null">
          급여 내역 생성(단일 처리)
        </button>
      </div>
    </div>
    <div class="flex mx-10" id="table-group">
      <div class="relative w-1/4 mx-2 p-px bg-gray-100" id="employee-table">
        <EmployeeTable ref="employeeTable" :employees="employees" @select="selectEmployee" :selectedEmployeeId="selectedEmployeeId" />
      </div>
      <div class="relative w-1/4 mx-2 p-px bg-gray-100" id="salary-table">
        <SalaryTable :salaryData="salaryData" />
      </div>
      <div class="relative w-1/4 mx-2 p-px bg-gray-100" id="deduction-table">
        <DeductionTable :salaryData="salaryData" />
      </div>
      <div class="relative w-1/4 mx-2 p-px bg-gray-100" id="total-table">
        <TotalSalaryTable :totalSalaryData="totalSalaryData" />
      </div>
    </div>
  </div>
</template>

<script>
/********** API **********/
import { selectAllLists } from '@/api/salary/ListApi';
import { initSalaryData, selectAllSalaryData, updataSalaryData } from '@/api/salary/SalaryData';
/********** VUE **********/
import EmployeeTable from '@/components/salary/EmployeeTable.vue';
import SalaryTable from '@/components/salary/SalaryTable.vue';
import DeductionTable from '@/components/salary/DeductionTable.vue';
import TotalSalaryTable from '@/components/salary/TotalSalaryTable.vue';
// SalaryData: 급여 자료 컴포넌트
export default {
  // 컴포넌트의 이름을 정의
  name: 'SalaryData',
  // 자식 컴포넌트를 정의
  components: {
    EmployeeTable,
    SalaryTable,
    DeductionTable,
    TotalSalaryTable,
  },
  // 부모로부터 전달받는 데이터를 정의
  props: {},
  // 컴포넌트가 내보내는 이벤트를 정의
  emits: [],
  // 컴포넌트의 반응형 데이터를 정의
  data() {
    return {
      salaryDate: '', // 귀속 연월(년월)
      selectedEmployeeId: null, // 선택된 사원 번호
      salaryItem: [], // 급여 항목
      employees: [], // 사원 정보
      salaryData: [], // 급여 정보
      totalSalaryData: [], // 급여 합계 정보
    };
  },
  // 계산된 속성을 정의
  computed: {
    // 귀속연월 포메터: YYYYMM <-> YYYY-MM
    formattedSalaryDate: {
      get() {
        if (!this.salaryDate) return '';
        const year = this.salaryDate.substring(0, 4);
        const month = this.salaryDate.substring(4, 6);
        return `${year}-${month}`;
      },
      set(value) {
        this.salaryDate = value.replace('-', '');
      },
    },
  },
  // 반응형 데이터 또는 props의 변화를 감지하여 동작을 정의
  watch: {},
  // -------------------- 라이프사이클 훅 --------------------
  // 인스턴스가 생성된 후 호출
  created() {
    this.salaryDate = this.getTodayDate();
  },
  // 인스턴스가 DOM에 마운트된 후 호출
  mounted() {
    this.fetchInitialData();
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
    // 오늘 일자(년월) 가져오는 함수
    getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      return `${year}${month}`;
    },
    // 초기 데이터 비동기 - 사원 정보, 합계 정보
    async fetchInitialData() {
      if (!this.salaryDate) return;
      try {
        const data = await selectAllLists(this.salaryDate);
        this.salaryItem = data.salaryItem;
        this.employees = data.employmentInfo;
        this.totalSalaryData = this.mergedSalaryDataFunc(data.totalSalaryData);
        this.salaryData = this.mergedSalaryDataFunc(this.salaryItem);
        this.resetSelectedEmployee();
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    },
    // 선택된 직원 정보 초기화 함수
    resetSelectedEmployee() {
      this.selectedEmployeeId = null;
      this.mergedSalaryDataFunc(this.salaryItem);
    },
    // 급여 내역 일괄 처리 & 단일 처리 비동기
    async initSalaryData(empId) {
      const data = await initSalaryData(this.salaryDate, empId);
      this.fetchInitialData();
    },
    // 사원의 급여 공제 비동기
    async selectEmployee(employee) {
      this.selectedEmployeeId = employee; // 선택된 직원 ID 설정
      try {
        const data = await selectAllSalaryData(this.selectedEmployeeId, this.salaryDate);
        this.salaryData = this.mergedSalaryDataFunc(data ? data : this.salaryItem);
      } catch (error) {
        console.error('Error fetching salary data:', error);
      }
    },
    // 급여 정보에 급여 항목명 추가
    mergedSalaryDataFunc(data) {
      if (data.length === 0 || this.salaryItem.length === 0) return;

      return data.map((dataItem) => {
        const matchingItem = this.salaryItem.find((item) => item.salary_item_code === dataItem.salary_item_code);
        return {
          salary_item_code: dataItem.salary_item_code,
          salary_item_name: matchingItem.salary_item_name,
          amount: dataItem.amount,
        };
      });
    },
    // 수정 버튼 클릭 시 업데이트 함수
    async updateSalaryData() {
      try {
        const empId = this.selectedEmployeeId;
        const data = await updataSalaryData(this.selectedEmployeeId, this.salaryDate, this.salaryData);
        // 데이터 갱신 후 selectedEmployeeId 유지 및 해당 직원 다시 선택
        await this.fetchInitialData(); // 초기 데이터 갱신
        this.selectedEmployeeId = empId; // 선택된 직원 ID 유지
        this.$nextTick(() => {
          this.$refs.employeeTable.onSelectEmployee({ emp_id: this.selectedEmployeeId });
        });
      } catch (error) {
        console.error('Error updating salary data:', error);
      }
    },
  },
};
</script>
