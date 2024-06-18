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
        <tr v-for="history in attendanceHistory" :key="history.id">
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
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAttendanceHistory } from '@/api/attendances/AttendanceManagementApi.js';

export default {
  name: 'AttendanceDashboard',
  setup() {
    const attendanceHistory = ref([]);

    const fetchAttendanceHistory = async () => {
      try {
        const data = await getAttendanceHistory();
        attendanceHistory.value = data.map(item => ({
          ...item,
          startDate: formatDate(item.startDate),
          endDate: formatDate(item.endDate)
        }));
        console.log('Fetched attendance history:', attendanceHistory.value);
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

    onMounted(fetchAttendanceHistory);

    return {
      attendanceHistory,
      formatDate,
    };
  },
};
</script>

<style scoped>
.attendance-history {
  padding: 20px;
}

.attendance-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.attendance-table th,
.attendance-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.attendance-table th {
  background-color: #f2f2f2;
}
</style>
