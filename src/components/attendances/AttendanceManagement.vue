<template>
  <div class="attendance-management">
    <h2>휴가 승인 페이지</h2>
    <table class="attendance-table">
      <thead>
        <tr>
          <th>사원번호</th>
          <th>이름</th>
          <th>부서</th>
          <th>직급</th>
          <th>휴가종류</th>
          <th>사유</th>
          <th>요청날짜</th>
          <th>기간</th>
          <th>작업</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in leaveRequests" :key="request.id">
          <td>{{ request.empId }}</td>
          <td>{{ request.empName }}</td>
          <td>{{ request.departmentName }}</td>
          <td>{{ request.positionName }}</td>
          <td>{{ request.attendanceTypeName }}</td>
          <td>{{ request.reason }}</td>
          <td>{{ formatDate(request.creationDate) }}</td>
          <td>{{ formatDate(request.startDate) }} ~ {{ formatDate(request.endDate) }}</td>
          <td>
            <button @click="showConfirmModal(request, 'approve')">승인</button>
            <button @click="showConfirmModal(request, 'reject')">반려</button>
          </td>
        </tr>
      </tbody>
    </table>

    <ConfirmModal
      v-if="isModalVisible"
      :show="isModalVisible"
      :title="modalTitle"
      :message="modalMessage"
      :request="currentRequest"
      :confirmButtonText="confirmButtonText"
      :confirmButtonClass="confirmButtonClass"
      @confirm="confirmAction"
      @cancel="isModalVisible = false"
    />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getAttendanceManagementList, approveRequest, rejectRequest } from '@/api/attendances/AttendanceManagementApi.js';
import ConfirmModal from '@/components/attendances/ConfirmModal'; // 실제 파일 경로를 설정하세요

export default {
  name: 'LeaveRequests',
  components: {
    ConfirmModal,
  },
  setup() {
    const leaveRequests = ref([]);
    const isModalVisible = ref(false);
    const currentRequest = ref(null);
    const modalTitle = ref('');
    const modalMessage = ref('');
    const confirmButtonText = ref('');
    const confirmButtonClass = ref('');
    const currentAction = ref(null);

    const formatDate = (dateString) => {
      const dateObject = new Date(dateString);
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, '0');
      const day = String(dateObject.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const showConfirmModal = (request, action) => {
      currentRequest.value = request;
      isModalVisible.value = true;
      if (action === 'approve') {
        modalTitle.value = '휴가 승인';
        modalMessage.value = '정말로 휴가를 승인하시겠습니까?';
        confirmButtonText.value = '승인';
        confirmButtonClass.value = 'bg-blue-600 text-white rounded hover:bg-blue-700';
        currentAction.value = approveAttendance;
      } else if (action === 'reject') {
        modalTitle.value = '휴가 반려';
        modalMessage.value = '정말로 휴가를 반려하시겠습니까?';
        confirmButtonText.value = '반려';
        confirmButtonClass.value = 'bg-red-600 text-white rounded hover:bg-red-700';
        currentAction.value = rejectAttendance;
      }
    };

    const fetchLeaveRequests = async () => {
      try {
        const data = await getAttendanceManagementList();
        leaveRequests.value = data.map(item => ({
          ...item,
          creationDate: formatDate(item.creationDate),
          startDate: formatDate(item.startDate),
          endDate: formatDate(item.endDate)
        }));
        console.log('Fetched attendanceList :', leaveRequests.value);
      } catch (error) {
        console.error('Error fetching attendanceList list:', error);
      }
    };

    const confirmAction = () => {
      if (currentAction.value) {
        currentAction.value();
      }
    };

    const approveAttendance = async () => {
      try {
        const response = await approveRequest(currentRequest.value.attendanceCode, "approved");
        console.log(response);
        fetchLeaveRequests();
        isModalVisible.value = false;
      } catch (error) {
        console.error("There was an error approving the attendance!", error);
      }
    };

    const rejectAttendance = async () => {
      try {
        const response = await rejectRequest(currentRequest.value.attendanceCode, "rejected");
        console.log(response);
        fetchLeaveRequests();
        isModalVisible.value = false;
      } catch (error) {
        console.error("There was an error rejecting the attendance!", error);
      }
    };

    onMounted(fetchLeaveRequests);

    return {
      isModalVisible,
      leaveRequests,
      formatDate,
      showConfirmModal,
      confirmAction,
      approveAttendance,
      rejectAttendance,
      currentRequest,
      modalTitle,
      modalMessage,
      confirmButtonText,
      confirmButtonClass,
    };
  },
};
</script>

<style scoped>
.attendance-management {
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

.attendance-table td button {
  margin-right: 5px;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.attendance-table td button:hover {
  background-color: #3695fa;
}

.attendance-table td button:nth-child(2) {
  background-color: #dc3545;
}
.attendance-table td button:nth-child(2):hover {
  background-color: #db4e5c;
}
</style>
