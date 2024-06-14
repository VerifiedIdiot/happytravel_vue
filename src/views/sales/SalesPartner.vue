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
        @click="setCurrentComponent('HotelDashboard', 'HotelProvider')"
      >
        호텔
      </button>
      <button
        :class="{ 'active-tab': currentComponent === 'FlightDashboard' }"
        @click="setCurrentComponent('FlightDashboard')"
      >
        항공사
      </button>
      <button
        :class="{ 'active-tab': currentComponent === 'AgencyDashboard' }"
        @click="setCurrentComponent('AgencyDashboard', 'AgencyProvider')"
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
import AgencyProvider from "@/components/sales/agency/AgencyProvider.vue";
// import FlightProvider from "@/components/sales/flight/FlightProvider.vue";

export default {
  name: "SalesPartner",
  components: {
    HotelDashboard,
    AgencyDashboard,
    FlightDashboard,
    HotelProvider,
    AgencyProvider,
    // FlightProvider,
  },
  data() {
    return {
      currentComponent: "HotelDashboard",
      currentProvider: "HotelProvider"
    };
  },
  methods: {
    setCurrentComponent(component, provider) {
      this.currentComponent = component;
      this.currentProvider = provider;
    }
  }
};
</script>

<style src="./SalesPartnerMenu.css"></style>
