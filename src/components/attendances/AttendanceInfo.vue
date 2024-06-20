<template>
  <div class="info-panel">
    <div class="left-section">
      <div>근태신청</div>
    </div>
    <div class="middle-section">
      <div>{{ new Date().getUTCFullYear() }}년 {{ new Date().getMonth() + 1 }}월</div>
      <div>총 근무일수 {{ attendanceCount }}일</div>
      <div>총 근무시간 {{ attendanceCount * 8}}시간</div>
    </div>
    <div class="right-section">
      <button @click="openLeavePopup">근태 신청</button>
      <AttendancePopup v-if="showLeavePopup" @close="closeLeavePopup" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { insertAttendance, updateAttendance } from '../../api/attendances/AttendanceApi';
import { getAttendanceCount } from '@/api/attendances/AttendanceManagementApi';
import AttendancePopup from '@/components/attendances/AttendancePopup.vue';

export default {
  name: 'AttendanceInfo',
  components: {
    AttendancePopup,
  },
  setup() {
    const store = useStore();
    const loginInfo = store.state.loginInfo;
    const showLeavePopup = ref(false);
    const isClockedIn = ref(false);
    const attendanceCount = ref(0);

    const openLeavePopup = () => {
      console.log('openLeavePopup');
      showLeavePopup.value = true;
    };

    const closeLeavePopup = () => {
      showLeavePopup.value = false;
    };

    const fetchAttendanceCount = async () => {
      try {
        const empId = loginInfo.empId;
        const count = await getAttendanceCount(empId);
        attendanceCount.value = count;
      } catch (error) {
        console.error('Error fetching attendance count:', error);
      }
    };

    const toggleClockInOut = () => {
      const now = new Date();
      const empId = loginInfo.empId;

      if (!isClockedIn.value) {
        // 출근 기록 삽입
        const attendance = {
          emp_id: empId,
          today: formatDate(now, 'yyyyMMdd'),
          in_time: formatDate(now, 'ISO'),
        };

        insertAttendance(attendance)
          .then((response) => {
            console.log(response);
            isClockedIn.value = true;
            fetchAttendanceCount(); // 출근 후 출근 기록 수 업데이트
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } else {
        // 퇴근 시간 업데이트
        const attendance = {
          emp_id: empId,
          today: formatDate(now, 'yyyyMMdd'),
          out_time: formatDate(now, 'ISO'),
        };

        updateAttendance(attendance)
          .then((response) => {
            console.log(response);
            isClockedIn.value = false;
            fetchAttendanceCount(); // 퇴근 후 출근 기록 수 업데이트
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    };

    const formatDate = (date, format) => {
      const year = date.getFullYear();
      const month = `0${date.getMonth() + 1}`.slice(-2);
      const day = `0${date.getDate()}`.slice(-2);
      if (format === 'yyyyMMdd') {
        return `${year}${month}${day}`;
      } else if (format === 'ISO') {
        return date.toISOString();
      }
    };

    onMounted(fetchAttendanceCount);

    return {
      showLeavePopup,
      isClockedIn,
      attendanceCount,
      openLeavePopup,
      closeLeavePopup,
      toggleClockInOut,
    };
  },
};
</script>

<style scoped>
.info-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0066cc;
  color: white;
  padding: 10px;
}
.left-section {
  display: flex;
  align-items: center;
}
.left-section img {
  margin-right: 10px;
}
.middle-section {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.middle-section div {
  margin-right: 20px;
}
.right-section {
  font-size: 14px;
}
button {
  background-color: white;
  color: #0066cc;
  border: none;
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  background-color: #005bb5;
  color: white;
}
</style>
