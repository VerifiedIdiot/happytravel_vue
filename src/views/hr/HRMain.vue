<template>
  <div>

    <h1>HR Main Page</h1>
    <AttendanceCalender />

    <h1>Login Page</h1>
    <button @click="login">Login</button>

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

<style></style>

export default {
  name: 'HrMain',
}
</script>

<style scoped>
</style>

