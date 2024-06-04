<template>
  <div>
    <h1>HR Main Page</h1>
    <AttendanceCalender />

    <button @click="showEmpComponent = true">인사관리</button>
    <HREmp v-if="showEmpComponent" />
  </div>
</template>

<script>
import { ref } from "vue";
import HREmp from "./HREmp.vue";
import AttendanceCalender from "@/components/attendances/AttendanceCalender.vue";

export default {
  name: "HRMain",
  components: {
    HREmp,
    AttendanceCalender,
  },
  setup() {
    const showEmpComponent = ref(false);

    return {
      showEmpComponent,
    };
  },
};
</script>

<style scoped></style>
