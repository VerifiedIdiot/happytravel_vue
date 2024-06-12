<template>
  <div class="info-card">
    <router-link to="/notices">
      <h2 class="card-title cursor-pointer">부서별 공지사항</h2>
    </router-link>
    <table class="w-full table-auto">
      <thead>
        <tr class="bg-blue-600 text-white">
          <th class="p-2">작성자</th>
          <th class="p-2">작성일자</th>
          <th class="p-2">제목</th>
          <th class="p-2">내용</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="notifications && notifications.length > 0"
          v-for="(notice, index) in notifications.slice(0, 5)"
          :key="index"
          class="border-b"
        >
          <td class="p-2">{{ notice.emp_name }}</td>
          <td class="p-2">{{ formatDate(notice.creation_date) }}</td>
          <td class="p-2">{{ notice.title }}</td>
          <td class="p-2">{{ notice.content }}</td>
        </tr>
        <tr v-else>
          <td class="p-2" colspan="4">공지사항을 불러오는 중입니다...</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DepartmentNotices",
  computed: {
    ...mapState({
      notifications: (state) => state.notifications,
    }),
  },
  mounted() {
    this.$store.dispatch("fetchAllData");
  },
  methods: {
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
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
