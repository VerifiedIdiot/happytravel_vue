<template>
  <div>
    <!-- 캘린더 UI 요소들 -->
    <AttendanceInfo />
    <button @click="openApprovalPopup">근태 승인</button>
    <AttendanceApprovalPopup
      v-if="showApprovalPopup"
      @close="closeApprovalPopup"
    />
  </div>
</template>

<script>
import AttendanceInfo from "./AttendanceInfo.vue";
import AttendanceApprovalPopup from "./AttendanceApprovalPopup.vue";

export default {
  name: "AttendanceCalendar",
  components: {
    AttendanceApprovalPopup,
    AttendanceInfo,
  },
  data() {
    return {
      showApprovalPopup: false,
    };
  },
  methods: {
    openApprovalPopup() {
      this.showApprovalPopup = true;
    },
    closeApprovalPopup() {
      this.showApprovalPopup = false;
    },
  },
};
</script>
