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
            required
          />
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
            required
          />
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
            @change="setCountryCode"
          >
            >
            <option
              v-for="country in hotelState.countries"
              :key="country.country_code"
              :value="country.korean_name"
            >
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
            required
          />
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
            required
          />
        </div>
        <div class="form-item">
          <label for="is_used">사용유무</label>
          <span v-if="!hotelState.isEditing">{{
            hotelState.hotelDetail.is_used
          }}</span>
          <select v-else v-model="hotelState.hotelDetail.is_used" required>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { inject, ref } from "vue";
import { updateHotel } from "@/api/sales/HotelApi";

export default {
  name: "HotelDetail",
  setup(_, { emit }) {
    const hotelState = inject("hotelState");
    let country_code = ref("");

    const submitForm = async () => {
      try {
        
        if (country_code) {
          console.log(country_code)
          hotelState.hotelDetail = {
            ...hotelState.hotelDetail,
            country_code: country_code,
          };
        }

        console.log(hotelState.hotelDetail); // hotelDetail의 상태 확인
        if (hotelState.hotelDetail.country_code) {
          await updateHotel(hotelState.hotelDetail);
        }

        fetchHotels();
      } catch (error) {
        console.error("Failed to update hotel:", error);
      }
    };

    const setCountryCode = () => {
      const data = hotelState.countries.find(
        (country) => country.korean_name === hotelState.hotelDetail.country
      );
      if (data) {
        country_code = data.country_code;
        console.log(country_code)
      }
    };

    return {
      hotelState,
      submitForm,
      setCountryCode,
    };
  },
};
</script>

<style src="./HotelDashboard.css"></style>