<template>
  <div class="info-card lg:col-span-2">
    <h2 class="card-title">개인화된 대시보드</h2>
    <div class="mb-4" v-if="attendance">
      <h3 class="text-xl font-bold">최근 근태 현황</h3>
      <ul>
        <li class="mb-2">
          출근 시간: {{ formatDateTime(attendance.in_time) }}
        </li>
        <li>퇴근 시간: {{ formatDateTime(attendance.out_time) }}</li>
      </ul>
    </div>
    <div v-else>
      <p>근태 현황을 불러오는 중입니다...</p>
    </div>
    <div class="mb-4">
      <h3 class="text-xl font-bold">급여 정보</h3>
      <ul>
        <li class="mb-2">연봉: {{ salary }}</li>
      </ul>
    </div>
    <div>
      <h3 class="text-xl font-bold">근태 신청 현황</h3>
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-blue-600 text-white">
            <th class="p-2">제목</th>
            <th class="p-2">유형</th>
            <th class="p-2">시작일</th>
            <th class="p-2">종료일</th>
            <th class="p-2">사유</th>
            <th class="p-2">진행</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="leaveTravel && leaveTravel.length > 0"
            v-for="(item, index) in leaveTravel.slice(0, 5)"
            :key="index"
            class="border-b"
          >
            <td class="p-2">{{ item.title }}</td>
            <td class="p-2">{{ item.attendance_type_name }}</td>
            <td class="p-2">{{ formatDate(item.start_date) }}</td>
            <td class="p-2">{{ formatDate(item.end_date) }}</td>
            <td class="p-2">{{ item.reason }}</td>
            <td class="p-2">{{ item.assign_name }}</td>
          </tr>
          <tr v-else>
            <td class="p-2" colspan="6">
              근태 신청 현황을 불러오는 중입니다...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PersonalDashboard",
  computed: {
    ...mapState({
      attendance: (state) => state.attendance,
      leaveTravel: (state) => state.leaveTravel,
      salary: (state) => state.userDetails?.salary, // 연봉 정보는 userDetails에서 가져옵니다
    }),
  },
  methods: {
    formatDateTime(dateString) {
      if (!dateString) return "정보 없음";
      const date = new Date(dateString);
      return date.toLocaleString();
    },
    getCurrentDateFormatted() {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
      const dd = String(today.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    },
    formatDate(dateString) {
      if (!dateString || dateString.length !== 8) return "정보 없음";
      const year = dateString.slice(0, 4);
      const month = dateString.slice(4, 6);
      const day = dateString.slice(6, 8);
      return `${year}-${month}-${day}`;
    },
  },
  mounted() {
    const todayFormatted = this.getCurrentDateFormatted();
    console.log("오늘 날짜:", todayFormatted);
    this.$store.dispatch("fetchAllData", { today: todayFormatted });
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

table {
  @apply w-full table-auto;
}

th,
td {
  @apply p-2;
}

thead th {
  @apply bg-blue-600 text-white;
}

tbody tr {
  @apply border-b;
}
</style>
