<template>
  <form @submit.prevent="submitForm">
    <div class="form-container">
      <div class="form-box">
        <div class="form-item">
          <label for="hotel_name">호텔명</label>
          <span v-if="!hotelState.isEditing">{{
            hotelState.hotelDetail.hotel_name
          }}</span>
          <input
            type="text"
            v-else
            v-model="hotelState.hotelDetail.hotel_name"
            required />
        </div>
        <div class="form-item">
          <label for="phone">전화번호</label>
          <span v-if="!hotelState.isEditing">{{
            hotelState.hotelDetail.phone
          }}</span>
          <input
            type="text"
            v-else
            v-model="hotelState.hotelDetail.phone"
            required />
        </div>
        <div class="form-item">
          <label for="country">국가</label>
          <span v-if="!hotelState.isEditing">{{
            hotelState.hotelDetail.country
          }}</span>
          <select
            class="select-country"
            v-else
            id="country"
            v-model="hotelState.hotelDetail.country"
            @change="setCountryCode">
            <option
              v-for="country in hotelState.countries"
              :key="country.country_code"
              :value="country.korean_name">
              {{ country.korean_name }}
            </option>
          </select>
        </div>
        <div class="form-item">
          <label for="address">주소</label>
          <span v-if="!hotelState.isEditing">{{
            hotelState.hotelDetail.address
          }}</span>
          <input
            type="text"
            v-else
            v-model="hotelState.hotelDetail.address"
            required />
        </div>
        <div class="form-item">
          <label for="price">가격</label>
          <span v-if="!hotelState.isEditing">{{
            hotelState.hotelDetail.price
          }}</span>
          <input
            v-else
            type="text"
            v-model="hotelState.hotelDetail.price"
            required />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { inject } from 'vue';

export default {
  name: 'HotelDetail',
  setup() {
    const hotelState = inject('hotelState');
    let countryCode = inject('countryCode');

    const setCountryCode = () => {
      const data = hotelState.countries.find(
        (country) => country.korean_name === hotelState.hotelDetail.country
      );
      if (data) {
        countryCode.value = data.country_code;
        console.log(countryCode);
      }
    };

    return {
      hotelState,
      setCountryCode,
    };
  },
};
</script>

<style src="./HotelDashboard.css"></style>