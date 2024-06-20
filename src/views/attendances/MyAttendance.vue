<template>
  <div>
    <AttendanceInfo></AttendanceInfo>
    <div class="calendar">
      <div class="calendar-header">
        <div class="calendar-header-button" @click="prevMonth">◁</div>
        <span>{{ currentYear }}년 {{ currentMonth + 1 }}월</span>
        <div class="calendar-header-button" @click="nextMonth">▷</div>
      </div>

      <div class="calendar-grid">
        <div
          class="day-header"
          v-for="(day, index) in dayNames"
          :key="index"
          :class="{ sunday: index === 0 }"
        >
          {{ day }}
        </div>
        <div
          v-for="(date, index) in calendarDates"
          :key="index"
          class="calendar-date"
          :class="dateClass(date)"
        >
          <div v-if="date">
            <span :class="{ 'sunday-text': date.getDay() === 0 }">
              {{ date.getUTCDate() }}
            </span>
            <div
              v-for="(attendance, index) in getAttendanceForDate(date)"
              :key="index"
              class="attendance-time"
            >
              <span class="attendance-time-start">
                {{ attendance.inTime }}
              </span>
              <span class="attendance-time-end">{{ attendance.outTime }}</span>
            </div>
            <div class="vacation" v-if="isVacation(date)">휴가</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import AttendanceInfo from "@/components/attendances/AttendanceInfo.vue"
import AttendancePopup from "@/components/attendances/AttendancePopup.vue"
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { getAttendance, getVacation } from "@/api/attendances/MyAttendanceApi.js";

export default {
  components: {
    AttendanceInfo,
    AttendancePopup,
  },
  setup() {
    const store = useStore();
    const loginInfo = store.state.loginInfo;
    const attendance = ref([]);
    const vacations = ref([]);
    const modalCheck = ref(false);
    const today = ref(new Date());
    const selectedDate = ref(null);
    const currentYear = ref(new Date().getUTCFullYear());
    const currentMonth = ref(new Date().getUTCMonth());
    const dayNames = ref([
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ]);

    const fetchAttendance = async () => {
      try {
        const data = await getAttendance(loginInfo.empId);
        attendance.value = data;
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    const fetchVacation = async () => {
      try {
        const data = await getVacation(loginInfo.empId);
        vacations.value = data;
      } catch (error) {
        console.error("Error fetching vacation data:", error);
      }
    };
    

    onMounted(() => {
      fetchAttendance();
      fetchVacation();
    });

    const calendarDates = computed(() => {
      const startOfMonth = new Date(
        Date.UTC(currentYear.value, currentMonth.value, 1)
      );
      const endOfMonth = new Date(
        Date.UTC(currentYear.value, currentMonth.value + 1, 0)
      );
      const startDay = startOfMonth.getUTCDay();
      const endDay = endOfMonth.getUTCDate();

      let dates = [];
      for (let i = 0; i < startDay; i++) {
        dates.push(null);
      }
      for (let i = 1; i <= endDay; i++) {
        dates.push(
          new Date(Date.UTC(currentYear.value, currentMonth.value, i))
        );
      }
      while (dates.length % 7 !== 0) {
        dates.push(null);
      }
      return dates;
    });

    const currentMonthName = computed(() => {
      return new Date(
        Date.UTC(currentYear.value, currentMonth.value)
      ).toLocaleString("default", { month: "long" });
    });

    const prevMonth = () => {
      if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value--;
      } else {
        currentMonth.value--;
      }
    };

    const nextMonth = () => {
      if (currentMonth.value === 11) {
        currentMonth.value = 0;
        currentYear.value++;
      } else {
        currentMonth.value++;
      }
    };

    const dateClass = (date) => {
      if (!date) return "empty";
      let classes = [];
      if (
        date.toISOString().split("T")[0] ===
        today.value.toISOString().split("T")[0]
      ) {
        classes.push("today");
      }
      if (date.getUTCDay() === 0) {
        classes.push("sunday");
      }
      return classes.join(" ");
    };

    const getAttendanceForDate = (date) => {
      if (!date) return [];
      const dateString = date.toISOString().split("T")[0];
      return attendance.value.filter((att) => att.day === dateString);
    };

    const isVacation = (date) => {
      if (!date) return false;
      const dateString = date.toISOString().split("T")[0];
      return vacations.value.some((vac) => {
        const start = new Date(vac.startDate).toISOString().split("T")[0];
        const end = new Date(vac.endDate).toISOString().split("T")[0];
        return dateString >= start && dateString <= end;
      });
    };

    return {
      attendance,
      vacations,
      modalCheck,
      today,
      selectedDate,
      currentYear,
      currentMonth,
      dayNames,
      fetchAttendance,
      fetchVacation,
      calendarDates,
      currentMonthName,
      prevMonth,
      nextMonth,
      dateClass,
      getAttendanceForDate,
      isVacation,
    };
  },
};
</script>
<style scoped>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.calendar-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #007bff;
  margin-bottom: 1px;
  color: white;
  font-size: 1.2em;
}

.calendar-header-button {
  margin: 0 5px 0 5px;
  font-size: 1.2em;
  cursor: pointer;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.day-header {
  text-align: center;
  font-weight: bold;
  padding: 10px 0;
  background-color: #007bff;
  color: white;
}

.calendar-date {
  position: relative;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 5px;
  font-size: 20px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  box-sizing: border-box;
}

.calendar-date.empty {
  background-color: #d0d0d0;
  cursor: default;
}

.sunday-text {
  color: red;
}

.attendance-time {
  font-size: 14px;
  margin-top: 5px;
}

.vacation {
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  color: blue;
}

/* dimmed */
.modal-btn {
  display: flex;
  justify-content: center;
  padding: 15px;
}

.modal-btn > button {
  font-size: 15px;
  padding: 5px 12px;
  margin: 5px;
  border: 1px solid black;
  border-radius: 10%;
  background: #007bff;
  color: #ffffff;
}
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
/* modal or popup */
.modal-container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1050px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}

.attendance-time {
  font-size: 14px;
  font-weight: bold;
}
.attendance-time > span {
  display: block;
}
.attendance-time > span::before {
  content: "●";
  font-size: 10px;
  margin-right: 3px;
  display: inline-block;
  vertical-align: middle;
}
.attendance-time-start {
  color: green;
}
.attendance-time-end {
  color: red;
}
</style>
