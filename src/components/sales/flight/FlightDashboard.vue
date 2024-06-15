<template>
  <div class="wrapper">
    <div class="flight-container">
      <div class="flight-box">
        <div class="flight-item">
          <button class="btn-create" @click="openModalForCreate()">
            <p>신규등록</p>
          </button>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>항공번호</th>
              <th>항공편</th>
              <th>전화번호</th>
              <th>출발지</th>
              <th>출발시간</th>
              <th>도착지</th>
              <th>도착시간</th>
              <th>가격</th>
              <th>
                <select>
                  <option value="all">사용유무</option>
                  <option value="Y">사용</option>
                  <option value="N">미사용</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="flt in flights"
              :key="flt.flight_code"
              @click="openModal(flt.flight_code)"
            >
              <td>{{ flt.flight_number }}</td>
              <td>{{ flt.airline }}</td>
              <td>{{ flt.phone }}</td>
              <td>{{ flt.departure }}</td>
              <td>{{ flt.departure_time }}</td>
              <td>{{ flt.destination }}</td>
              <td>{{ flt.arrival_time }}</td>
              <td>{{ flt.price }}</td>
              <td>{{ flt.is_used }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <FlightModal v-if="flightState.isModalOpen" @close="closeModal">
        <FlightDetail />
      </FlightModal>
    </div>
    <Pagination />
  </div>
</template>

<script setup>
import { inject, onMounted } from "vue";
import { getFlight, getCountries } from "@/api/sales/FlightApi";

import FlightDetail from "@/components/sales/flight/FlightDetail.vue";
import FlightModal from "@/components/sales/flight/FlightModal.vue";
import Pagination from "@/components/sales/flight/FlightPagination.vue";

const flights = inject("flights");
const flightState = inject("flightState");
const resetFlightState = inject("resetFlightState");
const fetchFlights = inject("fetchFlights");
const empId = inject("empId");

onMounted(fetchFlights);

const openModal = async (fltCode = "") => {
  flightState.flightCode = fltCode;
  try {
    if (fltCode) {
      const data = await getFlight({
        flightCode: fltCode,
        empId: empId,
      });
      flightState.flightDetail = data;
    } else {
      flightState.flightDetail = {};
    }

    if (flightState.flightDetail) {
      flightState.isModalOpen = true;
    }
  } catch (error) {
    console.error("Failed to load flight details:", error);
  }
};
</script>

<style src="./FlightDashboard.css"></style>
