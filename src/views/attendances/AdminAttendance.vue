<template>
  <div id="attendance">
    <div class="tabs">
      <div
        class="tab"
        :class="{ active: currentTab === 'approval' }"
        @click="currentTab = 'approval'"
      >
        휴가 승인
      </div>
      <div
        class="tab"
        :class="{ active: currentTab === 'history' }"
        @click="currentTab = 'history'"
      >
        휴가 완료 내역
      </div>
    </div>
    <div class="tab-content">
      <AttendanceManagement v-if="currentTab === 'approval'" />
      <AttendanceHistory v-if="currentTab === 'history'" />
    </div>
  </div>
</template>

<script>
import AttendanceManagement from "@/components/attendances/AttendanceManagement.vue";
import AttendanceHistory from "@/components/attendances/AttendanceHistory.vue";

export default {
  components: {
    AttendanceManagement,
    AttendanceHistory,
  },
  data() {
    return {
      currentTab: "approval",
    };
  },
};
</script>

<style>
#attendance {
  text-align: center;
  margin-top: 60px;
}

.tabs {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ddd;
}

.tab {
  padding: 10px 0px;
  width: 50%;
  cursor: pointer;
  border-bottom: none;
  background-color: #007bff;
  font-weight: bold;
  color: white;
}

.tab:hover {
  background-color: #4e9ef3;
}

.tab.active {
  border-bottom: 4px solid white;
  background-color: #4e9ef3;
}

.tab-content {
  padding: 20px;
  border: 1px solid #ddd;
  border-top: none;
  background-color: white;
}
</style>
