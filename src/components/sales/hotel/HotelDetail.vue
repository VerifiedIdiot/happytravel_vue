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
import { inject } from "vue";
import { updateHotel } from "@/api/sales/HotelApi";

export default {
  name: "HotelDetail",
  setup(_, { emit }) {
    const hotelState = inject("hotelState");
    const submitForm = async () => {
      try {
        await updateHotel(hotelDetail.value);
      } catch (error) {
        console.error("Failed to update hotel:", error);
      }
    };

    return {
      hotelState,
      submitForm,
    };
  },
};
</script>

<style src="./HotelDashboard.css"></style>