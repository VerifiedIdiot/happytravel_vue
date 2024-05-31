<template>
  <div>
    <h1>여행상품 관리</h1>
    <button @click="currentComponent = PackageDashboard">
      여행상품 리스트
    </button>
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
import PackageDashboard from "@/components/sales/PackageDashboard.vue";

export default {
  name: "SalesProduct",
  components: {
    PackageDashboard
  },
  data() {
    return {
      currentComponent: PackageDashboard 
    };
  },
  methods: {
    showPackageDashboard() {
      this.currentComponent = PackageDashboard;
    }
  }
};
</script>

<style></style>
