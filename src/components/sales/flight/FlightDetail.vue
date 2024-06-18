<template>
  <form @submit.prevent="submitForm">
    <div class="form-container">
      <div class="form-box">
        <div class="form-item">
          <label for="flight_number">항공번호</label>
          <span v-if="!flightState.isEditing">{{
            flightState.flightDetail.flight_number
          }}</span>
          <input
            type="text"
            v-else
            v-model="flightState.flightDetail.flight_number"
            required
          />
        </div>
        <div class="form-item">
          <label for="airline">항공편</label>
          <span v-if="!flightState.isEditing">{{
            flightState.flightDetail.airline
          }}</span>
          <input
            type="text"
            v-else
            v-model="flightState.flightDetail.airline"
            required
          />
        </div>
        <div class="form-item">
          <label for="phone">전화번호</label>
          <span v-if="!flightState.isEditing">{{
            flightState.flightDetail.phone
          }}</span>
          <input
            type="text"
            v-else
            v-model="flightState.flightDetail.phone"
            required
          />
        </div>
        <div class="form-item">
          <label for="country">국가</label>
          <span v-if="!flightState.isEditing">{{
            flightState.flightDetail.country
          }}</span>
          <select
            class="select-country"
            v-else
            id="country"
            v-model="flightState.flightDetail.country"
            @change="setCountryCode"
          >
            <option
              v-for="country in flightState.countries"
              :key="country.country_code"
              :value="country.korean_name"
            >
              {{ country.korean_name }}
            </option>
          </select>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label for="departure">출발지</label>
            <span v-if="!flightState.isEditing">{{
              flightState.flightDetail.departure
            }}</span>
            <input
              type="text"
              v-else
              v-model="flightState.flightDetail.departure"
              required
            />
          </div>
          <div class="form-item">
            <label for="departure_time">출발시간</label>
            <span v-if="!flightState.isEditing">{{
              flightState.flightDetail.departure_time
            }}</span>
            <input
              type="datetime-local"
              v-else
              v-model="flightState.flightDetail.departure_time"
              required
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label for="destination">도착지</label>
            <span v-if="!flightState.isEditing">{{
              flightState.flightDetail.destination
            }}</span>
            <input
              type="text"
              v-else
              v-model="flightState.flightDetail.destination"
              required
            />
          </div>
          <div class="form-item">
            <label for="arrival_time">도착시간</label>
            <span v-if="!flightState.isEditing">{{
              flightState.flightDetail.arrival_time
            }}</span>
            <input
              type="datetime-local"
              v-else
              v-model="flightState.flightDetail.arrival_time"
              required
            />
          </div>
        </div>
        <div class="form-item">
          <label for="price">가격</label>
          <span v-if="!flightState.isEditing">{{
            flightState.flightDetail.price
          }}</span>
          <input
            type="text"
            v-else
            v-model="flightState.flightDetail.price"
            required
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { inject } from "vue";

const flightState = inject("flightState");

const setCountryCode = () => {
  const data = flightState.countries.find(
    (country) => country.korean_name === flightState.flightDetail.country
  );
  if (data) {
    flightState.flightDetail.country_code = data.country_code;
  }
};
</script>

<style src="./FlightDashboard.css">
</style>

