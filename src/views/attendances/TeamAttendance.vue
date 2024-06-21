<template>
  <div class="calendar">
    <div class="calendar-header">
      <div class="calendar-header-button" @click="prevMonth">◁</div>
      <span>{{ currentYear }}년 {{ currentMonth }}</span>
      <div class="calendar-header-button" @click="nextMonth">▷</div>
    </div>


    <div class="calendar-grid">
      <div class="day-header" v-for="(day, index) in dayNames" :key="index" :class="{ sunday: index === 0 }">
        {{ day }}
      </div>
      <div v-for="(date, index) in calendarDates" :key="index" class="calendar-date" :class="dateClass(date)"
        @click="onDateClick(date)">
        <div v-if="date">
          <span :class="{ 'sunday-text': date.getDay() === 0 }">
            {{ date.getDate() }}
          </span>
          <div class="vacation" v-for="vacation in getVacations(date).slice(0, 2)" :key="vacation.name">
            {{ vacation.name }}
          </div>
          <div v-if="getVacations(date).length > 2" class="more-vacations">
            외 {{ getVacations(date).length - 2 }}명
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-show="modalCheck">
    <div class="modal-wrap">
      <div class="modal-container">
        <TeamAttendanceDetail :vacations="selectedVacations"></TeamAttendanceDetail>

        <div class="modal-btn">
          <button @click="modalOpen">닫기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { getTeamAttendance } from "@/api/attendances/TeamAttendanceApi.js";
import TeamAttendanceDetail from "@/components/attendances/TeamAttendanceDetail.vue";

function getDateRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export default {
  name: 'CalendarComponent',
  components: {
    TeamAttendanceDetail,
  },
  setup() {
    const store = useStore();
    const loginInfo = store.state.loginInfo;
    const modalCheck = ref(false);
    const currentYear = ref(new Date().getUTCFullYear());
    const currentMonth = ref(new Date().getUTCMonth());
    const today = ref(new Date());
    const selectedDate = ref(null);
    const vacations = ref([]);
    const processedVacations = ref([]);
    let department = ref

    const dayNames = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];

    const processVacations = () => {
      processedVacations.value = [];
      vacations.value.forEach((vacation) => {
        const dates = getDateRange(vacation.startDate, vacation.endDate);
        dates.forEach((date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          processedVacations.value.push({
            name: vacation.name,
            date: `${year}-${month}-${day}`,
            attendanceType: vacation.attendanceType,
            position: vacation.position,
          });
        });
      });
    };

    const fetchTeamAttendance = async () => {
      department.value = loginInfo.deptCode;
      if (!department.value) {
        error.value = "Department is required";
        return;
      }

      try {
        const data = await getTeamAttendance(department.value);
        vacations.value = data.map((item) => ({
          name: item.empName,
          startDate: item.startDate,
          endDate: item.endDate,
          attendanceType: item.attendanceType,
          position: item.position,
        }));
        processVacations();
      } catch (error) {
        console.error("Error fetching team attendance:", error);
      }
    };


    onMounted(() => {
      fetchTeamAttendance();
    });

    const calendarDates = computed(() => {
      const startOfMonth = new Date(Date.UTC(currentYear.value, currentMonth.value, 1));
      const endOfMonth = new Date(Date.UTC(currentYear.value, currentMonth.value + 1, 0));
      const startDay = startOfMonth.getUTCDay();
      const endDay = endOfMonth.getUTCDate();

      let dates = [];
      for (let i = 0; i < startDay; i++) {
        dates.push(null);
      }
      for (let i = 1; i <= endDay; i++) {
        dates.push(new Date(Date.UTC(currentYear.value, currentMonth.value, i)));
      }
      while (dates.length % 7 !== 0) {
        dates.push(null);
      }
      return dates;
    });

    const currentMonthText = computed(() => {
      return new Date(Date.UTC(currentYear.value, currentMonth.value)).toLocaleString("default", { month: "long" });
    });

    const selectedVacations = computed(() => {
      return getVacations(selectedDate.value);
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
      if (date.toDateString() === today.value.toDateString()) {
        classes.push("today");
      }
      if (date.getUTCDay() === 0) {
        classes.push("sunday");
      }
      return classes.join(" ");
    };

    const onDateClick = (date) => {
      if (!date) return;
      selectedDate.value = date;
      modalOpen();
    };

    const getVacations = (date) => {
      if (!date) return [];
      const dateString = date.toISOString().split("T")[0];
      return processedVacations.value.filter((vacation) => vacation.date === dateString);
    };

    const modalOpen = () => {
      modalCheck.value = !modalCheck.value;
    };

    return {
      modalCheck,
      currentYear,
      currentMonth: currentMonthText,
      dayNames,
      today,
      calendarDates,
      selectedVacations,
      fetchTeamAttendance,
      prevMonth,
      nextMonth,
      dateClass,
      onDateClick,
      modalOpen,
      getVacations,
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
  justify-content: flex-start;
  align-items: flex-start;
  padding: 5px;
  font-size: 20px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  box-sizing: border-box;
  cursor: pointer;
}

.calendar-date:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.calendar-date.empty {
  background-color: #d0d0d0;
  cursor: default;
}

.calendar-date div {
  cursor: pointer;
}

.sunday-text {
  color: red;
}

.vacation {
  margin-top: 5px;
  font-size: 0.8em;
  font-weight: bold;
  color: black;
}

.vacation::before {
  content: "●";
  margin-right: 3px;
  color: black;
  font-size: 0.8em;
  padding-bottom: 5px;
  display: inline-block;
  vertical-align: middle;
}

.more-vacations {
  margin-top: 5px;
  font-size: 0.8em;
  font-weight: bold;
  color: black;
}

.calendar-date.sunday div {
  color: inherit;
}

.calendar-date.today {
  background-color: #b0c4de;
}

/* dimmed */
.modal-btn {
  display: flex;
  justify-content: center;
  padding: 15px;
}

.modal-btn>button {
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
</style>
