<template>
  <div id="app" class="blue-theme">
    <main class="p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
      <UserInfo />
      <DepartmentNotices />
      <PersonalDashboard />
    </main>
  </div>
</template>

<script>
import UserInfo from "@/components/mypage/UserInfo.vue";
import DepartmentNotices from "@/components/mypage/DepartmentNotices.vue";
import PersonalDashboard from "@/components/mypage/PersonalDashboard.vue";
import { mapState } from "vuex";

export default {
  name: "MyPage",
  components: {
    UserInfo,
    DepartmentNotices,
    PersonalDashboard,
  },
  computed: {
    ...mapState({
      loginInfo: (state) => state.loginInfo,
    }),
  },
  created() {
    this.testLogin(); // 컴포넌트가 생성될 때 테스트 데이터를 설정합니다.
    this.fetchAllData(); // 모든 데이터를 한 번에 가져옵니다.
  },
  methods: {
    testLogin() {
      const testDepartments = [
        { deptCode: "1000", deptName: "인사", useYn: "Y" },
        { deptCode: "2000", deptName: "회계", useYn: "Y" },
        { deptCode: "3000", deptName: "영업", useYn: "Y" },
        { deptCode: "4000", deptName: "관리", useYn: "Y" },
        { deptCode: "9000", deptName: "임원", useYn: "Y" },
      ];
      const testPositions = [
        { posCode: "1000", posName: "사원", useYn: "Y" },
        { posCode: "1100", posName: "주임", useYn: "Y" },
        { posCode: "1200", posName: "대리", useYn: "Y" },
        { posCode: "1300", posName: "과장", useYn: "Y" },
        { posCode: "1400", posName: "차장", useYn: "Y" },
        { posCode: "1500", posName: "부장", useYn: "Y" },
        { posCode: "9100", posName: "이사", useYn: "Y" },
        { posCode: "9200", posName: "상무", useYn: "Y" },
        { posCode: "9300", posName: "전무", useYn: "Y" },
        { posCode: "9888", posName: "부사장", useYn: "Y" },
        { posCode: "9999", posName: "사장", useYn: "Y" },
      ];

      this.$store.commit("setDepartments", testDepartments);
      this.$store.commit("setPositions", testPositions);

      const testLoginInfo = {
        empId: "EMP30001",
        deptCode: "3000",
        empName: "변우석",
        posCode: "1000",
      };
      // this.$store.commit("setLoginInfo", testLoginInfo);
    },
    async fetchAllData() {
      try {
        await this.$store.dispatch("fetchAllData");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.blue-theme {
  @apply bg-white text-blue-800;
  font-family: Arial, sans-serif;
  min-height: 100vh;
}
</style>
