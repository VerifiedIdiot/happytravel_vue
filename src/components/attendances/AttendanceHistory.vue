<template>
  <div class="attendance-history p-5">
    <h2 class="text-2xl font-semibold mb-5">휴가 완료 내역</h2>
    <table class="attendance-table w-full border-collapse mt-5">
      <thead>
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-left">사원번호</th>
          <th class="border border-gray-300 px-4 py-2 text-left">이름</th>
          <th class="border border-gray-300 px-4 py-2 text-left">부서</th>
          <th class="border border-gray-300 px-4 py-2 text-left">직급</th>
          <th class="border border-gray-300 px-4 py-2 text-left">휴가종류</th>
          <th class="border border-gray-300 px-4 py-2 text-left">사유</th>
          <th class="border border-gray-300 px-4 py-2 text-left">기간</th>
          <th class="border border-gray-300 px-4 py-2 text-left">승인</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="history in attendanceHistory" :key="history.empId">
          <td class="border border-gray-300 px-4 py-2">{{ history.empId }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ history.empName }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ history.departmentName }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ history.positionName }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ history.attendanceTypeName }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ history.reason }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ formatDate(history.startDate) }} ~ {{ formatDate(history.endDate) }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ history.assignEmpName }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination mt-5 flex justify-center items-center">
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1"
        class="px-4 py-2 border border-gray-300 bg-gray-200 text-gray-800"
      >
        &lt;
      </button>
      <button 
        v-for="page in totalPages" 
        :key="page" 
        @click="goToPage(page)" 
        :class="{'bg-blue-500 text-white': page === currentPage, 'px-4 py-2 border border-gray-300 bg-gray-200 text-gray-800': true}"
        class="px-4 py-2 border border-gray-300 bg-gray-200 text-gray-800"
      >
        {{ page }}
      </button>
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages"
        class="px-4 py-2 border border-gray-300 bg-gray-200 text-gray-800"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { getAttendanceHistory } from '@/api/attendances/AttendanceManagementApi.js';

export default {
  name: 'AttendanceDashboard',
  setup() {
    const attendanceHistory = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 5; 
    const totalItems = ref(0);

    const fetchAttendanceHistory = async () => {
      try {
        attendanceHistory.value = [];  // 페이지 전환 시 데이터 초기화
        const data = await getAttendanceHistory(itemsPerPage, (currentPage.value - 1) * itemsPerPage);
        if (Array.isArray(data.attendanceConfirmResponseList) && typeof data.total === 'number') {
          attendanceHistory.value = data.attendanceConfirmResponseList.map(item => ({
            ...item,
            startDate: formatDate(item.startDate),
            endDate: formatDate(item.endDate)
          }));
          totalItems.value = data.total;
          console.log('Fetched attendance history:', attendanceHistory.value);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching attendance history:', error);
      }
    };

    const formatDate = (dateString) => {
      const dateObject = new Date(dateString);
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, '0');
      const day = String(dateObject.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const totalPages = computed(() => {
      return Math.ceil(totalItems.value / itemsPerPage);
    });

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
        fetchAttendanceHistory();
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
        fetchAttendanceHistory();
      }
    };

    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        fetchAttendanceHistory();
      }
    };

    onMounted(fetchAttendanceHistory);

    return {
      attendanceHistory,
      formatDate,
      currentPage,
      totalPages,
      prevPage,
      nextPage,
      goToPage,
    };
  },
};
</script>


<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>