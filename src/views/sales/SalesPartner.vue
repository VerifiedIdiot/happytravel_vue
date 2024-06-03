<template>
  <div>
    <h1>협력사 관리</h1>
    <button @click="currentComponent = 'HotelDashboard'">
      Show Hotel Dashboard
    </button>
    <button @click="currentComponent = 'AgencyDashboard'">
      Show Agency Dashboard
    </button>
    <button @click="currentComponent = 'FlightDashboard'">
      Show Flight Dashboard
    </button>

    <component :is="currentComponent"></component>
  </div>
</template>

<script>
import HotelDashboard from '@/components/sales/HotelDashboard.vue';
import AgencyDashboard from '@/components/sales/AgencyDashboard.vue';
import FlightDashboard from '@/components/sales/FlightDashboard.vue';

export default {
  name: 'SalesPartner',
  components: {
    HotelDashboard,
    AgencyDashboard,
    FlightDashboard,
  },
  data() {
    return {
      currentComponent: 'HotelDashboard',
    };
  },
};
</script>

<style></style>
