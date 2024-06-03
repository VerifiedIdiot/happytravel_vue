<template>
  <div>
    <div class="container">
      <div>
        <input
          v-model="formattedSalaryDate"
          type="month"
          @change="fetchInitialData"
        />
      </div>
      <div>
        <button
          type="button"
          class="adu ajn ard arp avz awf bag bbm bil bot bou bow bpc"
          @click="initSalaryData('')"
        >
          급여 내역 생성(일괄 처리)
        </button>
        <button
          type="button"
          class="adu ajn ard arp avz awf bag bbm bil bot bou bow bpc"
          @click="initSalaryData(this.selectedEmployeeId)"
        >
          급여 내역 생성(단일 처리)
        </button>
      </div>
    </div>
    <div class="container">
      <EmployeeTable
        :employees="employees"
        @select="selectEmployee"
        :selectedEmployeeId="selectedEmployeeId"
      />
      <SalaryTable :salaryData="salaryData" :salaryItem="salaryItem" />
      <!-- <DeductionTable :deductions="deductionData" :salaryItem="salaryItem" /> -->
      <TotalSalaryBox
        :totalSalaryData="totalSalaryData"
        :salaryItem="salaryItem"
      />
      <TotalSalaryTable
        :totalSalaryData="totalSalaryData"
        :salaryItem="salaryItem"
      />
    </div>
  </div>
</template>

<script>
/* API */
import { selectAllLists } from "@/api/salary/ListApi";
import { initSalaryData, selectAllSalaryData } from "@/api/salary/SalaryData";
/* VUE */
import EmployeeTable from "@/components/salary/EmployeeTable.vue";
import SalaryTable from "@/components/salary/SalaryTable.vue";
import DeductionTable from "@/components/salary/DeductionTable.vue";
import TotalSalaryTable from "@/components/salary/TotalSalaryTable.vue";
import TotalSalaryBox from "@/components/salary/TotalSalaryBox.vue"

export default {
  name: "SalaryData",
  components: {
    EmployeeTable,
    SalaryTable,
    DeductionTable,
    TotalSalaryTable,
    TotalSalaryBox,
  },
  data() {
    return {
      salaryDate: "", // 급여 일자(년월)
      selectedEmployeeId: null, // 선택된 사원 번호
      salaryItem: [],
      employees: [], // 사원 테이블
      salaryData: [], // 급여 테이블
      deductionData: [], // 공제 테이블
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
      const month = String(today.getMonth() + 1).padStart(2, "0");
      return `${year}${month}`;
    },
    // 초기 데이터 비동기 - 사원 정보, 합계 정보
    async fetchInitialData() {
      if (!this.salaryDate) return;
      try {
        const data = await selectAllLists(this.salaryDate);
        console.log("init");
        console.log(data);
        this.salaryItem = data.salaryItem;
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
        console.log("salary");
        console.log(data);
        this.salaryData = [];
        this.deductionData = [];
      } catch (error) {
        console.error("Error fetching salary data:", error);
      }
    },
    // 선택된 직원 정보 초기화 함수
    resetSelectedEmployee() {
      this.selectedEmployeeId = null;
      this.salaryData = [];
      this.deductionData = [];
    },
    // 급여 내역 일괄 처리 & 단일 처리 비동기
    async initSalaryData(empId) {
      alert(empId);
      console.log("initSalaryData");
      console.log(empId);
      const data = await initSalaryData(this.salaryDate, empId);
      console.log(data);
    },
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
</style>
