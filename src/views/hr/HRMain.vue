<template>
  <div class="xl flex mx-20 mt-10 gap-20" id="hr-main">
    <HREmp />
  </div>
</template>

<script>
import { ref } from "vue";
import HREmp from "./HREmp.vue";

export default {
  name: "HRMain",
  components: {
    HREmp,
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
