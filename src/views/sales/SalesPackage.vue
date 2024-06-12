<template>
    <PackageProvider>
      <component :is="currentComponent"></component>
    </PackageProvider>
</template>

<script setup>
import { ref, markRaw } from 'vue';
import PackageDashboard from '@/components/sales/package/PackageDashboard.vue';
import PackageProvider from '@/components/sales/package/PackageProvider.vue';

const currentComponent = ref(markRaw(PackageDashboard));

const showPackageDashboard = () => {
  currentComponent.value = PackageDashboard;
};
</script>


