<template>
  <form @submit.prevent="submitForm">
    <div class="form-container">
      <div class="form-box">
        <div class="form-row">
          <div class="form-item">
            <label for="departure">출발지</label>
            <span v-if="!flightState.isEditing">{{
              flightState.flightDetail.departure
            }}</span>
            <input type="text" v-else v-model="flightState.flightDetail.departure" required />
          </div>
          <div class="form-item">
            <label for="departure_time">출발시간</label>
            <span v-if="!flightState.isEditing">{{
              formattedDepartureTime 
            }}</span>
            <input type="datetime-local" v-else v-model="formattedDepartureTime" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label for="destination">도착지</label>
            <span v-if="!flightState.isEditing">{{
              flightState.flightDetail.destination
            }}</span>
            <input type="text" v-else v-model="flightState.flightDetail.destination" required />
          </div>
          <div class="form-item">
            <label for="arrival_time">도착시간</label>
            <span v-if="!flightState.isEditing">{{
              formattedArrivalTime 
            }}</span>
            <input type="datetime-local" v-else v-model="formattedArrivalTime" required />
          </div>
        </div>
        <div class="form-item">

          <label for="flight_number">항공번호</label>
          <span v-if="!flightState.isEditing">{{
            flightState.flightDetail.flight_number
          }}</span>
          <input type="text" v-else v-model="flightState.flightDetail.flight_number" required />
        </div>
        <div class="form-item">
          <label for="airline">항공편</label>
          <span v-if="!flightState.isEditing">{{
            flightState.flightDetail.airline
          }}</span>
          <input type="text" v-else v-model="flightState.flightDetail.airline" required />
        </div>
        <div class="form-item">
          <label for="phone">전화번호</label>
          <span v-if="!flightState.isEditing">{{
            flightState.flightDetail.phone
          }}</span>
          <input type="text" v-else v-model="flightState.flightDetail.phone" required />
        </div>
        <div class="form-item">
          <label for="price">가격</label>
          <span v-if="!flightState.isEditing">{{
            flightState.flightDetail.price
          }}</span>
          <input type="text" v-else v-model="flightState.flightDetail.price" required />
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { inject, computed, watchEffect } from "vue";
import dayjs from 'dayjs';

const flightState = inject("flightState");

// 날짜 포맷팅을 위한 computed 속성
const formatDatetime = (datetime) => {
  return datetime ? dayjs(datetime).format('YYYY-MM-DDTHH:mm') : '';
};

// Watcher를 사용하여 날짜를 포맷팅합니다.
watchEffect(() => {
  if (flightState.flightDetail.departure_time) {
    flightState.flightDetail.departure_time = formatDatetime(flightState.flightDetail.departure_time);
  }
  if (flightState.flightDetail.arrival_time) {
    flightState.flightDetail.arrival_time = formatDatetime(flightState.flightDetail.arrival_time);
  }
});

// 날짜 포맷팅을 위한 computed 속성
const formattedDepartureTime = computed({
  get() {
    return flightState.flightDetail.departure_time ? dayjs(flightState.flightDetail.departure_time).format('YYYY-MM-DDTHH:mm') : '';
  },
  set(value) {
    flightState.flightDetail.departure_time = value;
  }
});

const formattedArrivalTime = computed({
  get() {
    return flightState.flightDetail.arrival_time ? dayjs(flightState.flightDetail.arrival_time).format('YYYY-MM-DDTHH:mm') : '';
  },
  set(value) {
    flightState.flightDetail.arrival_time = value;
  }
});

</script>

<style src="./FlightDashboard.css"></style>
