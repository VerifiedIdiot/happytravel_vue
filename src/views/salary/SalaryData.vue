<template>
  <div>
    <div class="container">
      <input
        v-model="formattedSalaryDate"
        type="month"
        @change="fetchInitialData"
      />
      <input
        value="급여 내역 생성(일괄 처리)"
        type="button"
        @click="batchInitSalaryData"
      ></input>
      <input
        value="급여 내역 생성(단일 처리)"
        type="button"
        @click="singleInitSalaryData"
      ></input>
    </div>
    <div class="container">
      <EmployeeTable
        :employees="employees"
        @select="selectEmployee"
        :selectedEmployeeId="selectedEmployeeId"
      />
      <SalaryTable :salaryItems="salaryData" />
      <DeductionTable :deductions="deductionData" />
      <TotalSalaryTable :salaryItems="totalSalaryData" />
    </div>
  </div>
</template>

<script>
import { selectAllLists } from "@/api/salary/ListApi";
import { batchInitSalaryData, singleInitSalaryData, selectAllSalaryData } from "@/api/salary/SalaryData";

import EmployeeTable from "@/components/salary/EmployeeTable.vue";
import SalaryTable from "@/components/salary/SalaryTable.vue";
import DeductionTable from "@/components/salary/DeductionTable.vue";
import TotalSalaryTable from "@/components/salary/TotalSalaryTable.vue";

export default {
  name: "SalaryData",
  components: {
    EmployeeTable,
    SalaryTable,
    DeductionTable,
    TotalSalaryTable,
  },
  data() {
    return {
      salaryDate: "",
      employees: [],
      selectedEmployeeId: null, // 추가
      salaryData: [],
      deductionData: [],
      totalSalaryData: [],
    };
  },
  created() {
    this.salaryDate = this.getTodayDate();
  },
  mounted() {
    this.fetchInitialData();
  },
  methods: {
    getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      return `${year}${month}`;
    },
    // 초기 데이터 비동기 - 사원 정보, 합계 정보
    async fetchInitialData() {
      if (!this.salaryDate) return;
      try {
        const data = await selectAllLists(this.salaryDate);
        console.log(data);
        this.employees = data.employmentInfo;
        this.totalSalaryData = data.totalSalaryData;
        this.resetSelectedEmployee();
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    },
    // 사원의 급여 공제 비동기
    async selectEmployee(employee) {
      this.selectedEmployeeId = employee.emp_id; // 선택된 직원 ID 설정
      try {
        const data = await selectAllSalaryData(
          this.selectedEmployeeId,
          this.salaryDate
        );
        console.log(data);
        this.salaryData = [];
        this.deductionData = [];
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    },
    // 선택된 직원 초기화
    resetSelectedEmployee() {
      this.selectedEmployeeId = null;
      this.salaryData = [];
      this.deductionData = [];
    },
    // 급여 내역 일괄 처리 비동기
    async batchInitSalaryData() {
      const data = await batchInitSalaryData(this.salaryDate);
      console.log(data);
    },
    // 급여 내역 단일 처리 비동기
    async singleInitSalaryData() {
      const data = await singleInitSalaryData(this.selectedEmployeeId, this.salaryDate);
      console.log(data);
    }
  },
  computed: {
    formattedSalaryDate: {
      get() {
        if (!this.salaryDate) return "";
        const year = this.salaryDate.substring(0, 4);
        const month = this.salaryDate.substring(4, 6);
        return `${year}-${month}`;
      },
      set(value) {
        this.salaryDate = value.replace("-", "");
      },
    },
  },
};
</script>

<style scoped>
/* TAG */

/* CLASS */
.container {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin: 0 20px;
  align-items: stretch;
}
.amount {
  text-align: right;
}
</style>
