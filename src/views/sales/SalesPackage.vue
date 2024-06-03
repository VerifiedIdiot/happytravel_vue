<template>

  <div>
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
import PackageDashboard from '@/components/sales/package/PackageDashboard.vue';

export default {
  name: 'SalesPackage',
  components: {
    PackageDashboard,
  },
  data() {
    return {
      currentComponent: PackageDashboard,
    };
  },
  methods: {
    showPackageDashboard() {
      this.currentComponent = PackageDashboard;
    },
  },
};
</script>

<!-- <style lang="scss">
.container {
  display: flex;
  width: 100%;
  height: 30dvh;
}
</style> -->
