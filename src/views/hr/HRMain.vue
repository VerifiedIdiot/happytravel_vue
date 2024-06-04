<template>
  <div>
    <h1>HR Main Page</h1>
    <AttendanceCalender />
  </div>
</template>

<script>
import AttendanceCalender from "@/components/attendances/AttendanceCalender.vue";

export default {
  name: "HRMain",
  components: {
    AttendanceCalender,
  },
};
</script>

<style scoped></style>
