<template>
  <div class="xl" id="salary-data">
    <div class="flex mx-10 mt-5" id="input-group">
      <div class="relative flex items-center justify-end w-1/4 mx-2 p-px">
        <label for="salary-date" class="mr-2">귀속연월</label>
        <input class="border-gray-400 border-2" id="salary-date" v-model="formattedSalaryDate" type="month" @change="fetchInitialData" />
      </div>
      <div class="relative flex items-center justify-end w-1/4 mx-2 p-px"></div>
      <div class="relative flex items-center justify-end w-1/4 mx-2 p-px">
        <button class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button" @click="updateSalaryData">수정</button>
      </div>
      <div class="relative flex items-center justify-end w-1/4 mx-2 p-px">
        <button class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button" @click="initSalaryData('')">
          급여 내역 생성(일괄 처리)
        </button>
        <button
          class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          @click="initSalaryData(this.selectedEmployeeId)"
          :disabled="selectedEmployeeId === null"
        >
          급여 내역 생성(단일 처리)
        </button>
      </div>
    </div>
    <div class="flex mx-10" id="table-group">
      <div class="relative w-1/4 mx-2 p-px bg-gray-100" id="employee-table">
        <EmployeeTable :employees="employees" @select="selectEmployee" :selectedEmployeeId="selectedEmployeeId" />
      </div>
      <div class="relative w-1/4 mx-2 p-px bg-gray-100" id="salary-table">
        <SalaryTable :salaryData="salaryData" :salaryItem="salaryItem" />
      </div>
      <div class="relative w-1/4 mx-2 p-px bg-gray-100" id="deduction-table">
        <DeductionTable :salaryData="salaryData" :salaryItem="salaryItem" />
      </div>
      <div class="relative w-1/4 mx-2 p-px bg-gray-100" id="total-table">
        <TotalSalaryTable :totalSalaryData="totalSalaryData" :salaryItem="salaryItem" />
      </div>
    </div>
  </div>
</template>

<script>
/* API */
import { selectAllLists } from '@/api/salary/ListApi';
import { initSalaryData, selectAllSalaryData } from '@/api/salary/SalaryData';
/* VUE */
import EmployeeTable from '@/components/salary/EmployeeTable.vue';
import SalaryTable from '@/components/salary/SalaryTable.vue';
import DeductionTable from '@/components/salary/DeductionTable.vue';
import TotalSalaryTable from '@/components/salary/TotalSalaryTable.vue';

export default {
  name: 'SalaryData',
  components: {
    EmployeeTable,
    SalaryTable,
    DeductionTable,
    TotalSalaryTable,
  },
  data() {
    return {
      salaryDate: '', // 급여 일자(년월)
      selectedEmployeeId: null, // 선택된 사원 번호
      salaryItem: [],
      employees: [], // 사원 테이블
      salaryData: [], // 급여 테이블
      totalSalaryData: [], // 합계 테이블
    };
  },
  created() {
    this.salaryDate = this.getTodayDate();
  },
  mounted() {
    this.fetchInitialData();
  },
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
        this.totalSalaryData = data.totalSalaryData;
        this.salaryData = this.salaryItem;
        this.resetSelectedEmployee();
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    },
    // 선택된 직원 정보 초기화 함수
    resetSelectedEmployee() {
      this.selectedEmployeeId = null;
      this.salaryData = this.salaryItem;
    },
    // 급여 내역 일괄 처리 & 단일 처리 비동기
    async initSalaryData(empId) {
      const data = await initSalaryData(this.salaryDate, empId);
      this.fetchInitialData();
    },
    // 사원의 급여 공제 비동기
    async selectEmployee(employee) {
      this.selectedEmployeeId = employee.emp_id; // 선택된 직원 ID 설정
      try {
        const data = await selectAllSalaryData(this.selectedEmployeeId, this.salaryDate);
        this.salaryData = data ? data : this.salaryItem;
      } catch (error) {
        console.error('Error fetching salary data:', error);
      }
    },
    // 수정 버튼 클릭 시 업데이트 함수
    async updateSalaryData() {
      console.log(this.salaryData);
      // try {
      //   // 업데이트 API 호출
      //   await updateSalaryData(this.salaryData);
      //   await this.fetchInitialData();
      //   alert('업데이트 되었습니다.');
      // } catch (error) {
      //   console.error('Error updating salary data:', error);
      //   alert('업데이트에 실패했습니다.');
      // }
    },
  },
  computed: {
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
};
</script>
