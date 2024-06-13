<template>
  <div class="wrapper">
    <div class="sales-container">
      <div class="sales-box">
        <p>협력사 관리</p>
      </div>
    </div>
    <div class="sales-item">
        <button
          :class="{ 'active-tab': currentComponent === 'HotelDashboard' }"
          @click="currentComponent = 'HotelDashboard'"
        >
          호텔
        </button>
      <button
        :class="{ 'active-tab': currentComponent === 'FlightDashboard' }"
        @click="currentComponent = 'FlightDashboard'"
      >
        항공사
      </button>
      <button
        :class="{ 'active-tab': currentComponent === 'AgencyDashboard' }"
        @click="currentComponent = 'AgencyDashboard'"
      >
        여행사
      </button>
    </div>
  </div>
  <div class="sales-container">
    <component :is="currentProvider">
      <component :is="currentComponent"></component>
    </component>
    
  </div>
</template>


<script>
import HotelDashboard from "@/components/sales/hotel/HotelDashboard.vue";
import AgencyDashboard from "@/components/sales/agency/AgencyDashboard.vue";
import FlightDashboard from "@/components/sales/flight/FlightDashboard.vue";
import HotelProvider from "@/components/sales/hotel/HotelProvider.vue";

export default {
  name: "SalesPartner",
  components: {
    HotelDashboard,
    AgencyDashboard,
    FlightDashboard,
    HotelProvider,
  },
  data() {
    return {
      currentComponent: "HotelDashboard",
      currentProvider: "HotelProvider"
    };
  },
};
</script>

<style src="./SalesPartnerMenu.css"></style>
