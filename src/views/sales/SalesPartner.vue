<template>
  <div class="wrapper">
    <div class="sales-container">
      <div class="sales-box">
        <p>협력사 관리</p>
      </div>
    </div>
    <div class="sales-item">
      <button :class="{ 'active-tab': currentComponent === 'HotelDashboard' }"
        @click="currentComponent = 'HotelDashboard'">
        호텔
      </button>
      <button :class="{ 'active-tab': currentComponent === 'FlightDashboard' }"
        @click="currentComponent = 'FlightDashboard'">
        항공사
      </button>
      <button :class="{ 'active-tab': currentComponent === 'AgencyDashboard' }"
        @click="currentComponent = 'AgencyDashboard'">
        현지여행사
      </button>
    </div>

  </div>
  <div class="sales-container">
    <component :is="currentComponent"></component>
  </div>

</template>


<script>
import HotelDashboard from '@/components/sales/hotel/HotelDashboard.vue';
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

<style src="../../components/sales/hotel/SalesDashboard.css"></style>
