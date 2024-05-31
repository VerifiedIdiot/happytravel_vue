<template>
  <div class="info-panel">
    <div class="left-section">
      <img src="#" alt="Logo" height="40" />
      <div>근태신청</div>
    </div>
    <div class="middle-section">
      <div>총 근무일수 3일</div>
      <div>총 근무시간 24시간 00분</div>
      <div>연장근무시간 03시간 00분</div>
      <div>야간근무시간 00시간 00분</div>
      <div>휴가시간 00시간 00분</div>
    </div>
    <div class="right-section">
      <button @click="toggleClockInOut">
        {{ isClockedIn ? "퇴근" : "출근" }}
      </button>
      <button @click="openLeavePopup">휴가 신청</button>
      <AttendancePopup v-if="showLeavePopup" @close="closeLeavePopup" />
    </div>
  </div>
</template>

<script>
import {
  insertAttendance,
  updateAttendance,
} from "../../api/attendances/AttendanceApi";
import AttendancePopup from "./AttendancePopup.vue";

export default {
  name: "AttendanceInfo",
  components: {
    AttendancePopup,
  },
  computed: {
    loginInfo() {
      return this.$store.state.loginInfo;
    },
  },
  data() {
    return {
      showLeavePopup: false,
      isClockedIn: false, // 출근 상태 관리
    };
  },
  methods: {
    navigate(url) {
      window.location.href = url;
    },
    openLeavePopup() {
      this.showLeavePopup = true;
    },
    closeLeavePopup() {
      this.showLeavePopup = false;
    },
    formatDate(date, format) {
      const year = date.getFullYear();
      const month = `0${date.getMonth() + 1}`.slice(-2);
      const day = `0${date.getDate()}`.slice(-2);
      if (format === "yyyyMMdd") {
        return `${year}${month}${day}`;
      } else if (format === "ISO") {
        return date.toISOString();
      }
    },
    async toggleClockInOut() {
      const now = new Date();
      const empId = "EMP00006";

      if (!this.isClockedIn) {
        // 출근 기록 삽입
        const attendance = {
          emp_id: empId,
          day: this.formatDate(now, "yyyyMMdd"),
          in_time: this.formatDate(now, "ISO"),
        };

        try {
          const response = await insertAttendance(attendance);
          console.log(response);
          this.isClockedIn = true;
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        // 퇴근 시간 업데이트
        const attendance = {
          emp_id: empId,
          day: this.formatDate(now, "yyyyMMdd"),
          out_time: this.formatDate(now, "ISO"),
        };

        try {
          const response = await updateAttendance(attendance);
          console.log(response);
          this.isClockedIn = false;
        } catch (error) {
          console.error("Error:", error);
        }
      }
    },
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
