<template>
  <div v-if="userDetails" class="info-card">
    <h2 class="card-title">사용자 정보</h2>
    <div class="flex">
      <div class="w-1/2 flex justify-center items-center">
        <img
          :src="userDetails.photoURL || require('@/assets/img/logo-temp.png')"
          alt="Profile"
          class="w-16 h-16 rounded-full"
        />
      </div>
      <div class="w-1/2">
        <p><strong>사원 번호:</strong> {{ loginInfo.empId }}</p>
        <p><strong>이름:</strong> {{ loginInfo.empName }}</p>
        <p><strong>직위:</strong> {{ positionName }}</p>
        <p><strong>부서:</strong> {{ departmentName }}</p>
        <p><strong>연락처:</strong> {{ userDetails.mobile }}</p>
        <p>
          <strong>입사일:</strong> {{ userDetails.join_date.split("T")[0] }}
        </p>
      </div>
    </div>
  </div>
  <div v-else class="info-card">
    <h2 class="card-title">사용자 정보</h2>
    <p>사용자 정보를 불러오는 중입니다...</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "UserInfo",
  computed: {
    ...mapState({
      userDetails: (state) => state.userDetails,
      loginInfo: (state) => state.loginInfo,
    }),
    ...mapGetters(["getDeptName", "getPosName"]),
    positionName() {
      return this.getPosName(this.loginInfo?.posCode || "");
    },
    departmentName() {
      return this.getDeptName(this.loginInfo?.deptCode || "");
    },
  },
};
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.info-card {
  @apply bg-white text-black rounded-lg p-5 mb-5 shadow-lg;
}

.card-title {
  @apply text-2xl mb-4 bg-blue-600 text-white p-2 rounded-lg;
}
</style>
