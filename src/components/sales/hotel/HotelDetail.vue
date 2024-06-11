<template>
  <form @submit.prevent="submitForm">
    <div class="form-container">
      <div class="form-box">
        <div class="form-item">
          <label for="hotel_name">호텔명</label>
          <input type="text" v-model="hotelDetail.hotel_name" required />
        </div>
        <div class="form-item">
          <label for="phone">전화번호</label>
          <input type="text" v-model="hotelDetail.phone" required />
        </div>
        <div class="form-item">
          <label for="country">국가</label>
          <select
            id="country"
            v-model="hotelDetail.country_code"
            @change="updateCountryName"
          >
            <option
              v-for="country in countries"
              :key="country.country_code"
              :value="country.country_code"
            >
              {{ country.korean_name }}
            </option>
          </select>
        </div>
        <div class="form-item">
          <label for="address">주소</label>
          <input type="text" v-model="hotelDetail.address" required />
        </div>
        <div class="form-item">
          <label for="price">가격</label>
          <input type="text" v-model="hotelDetail.price" required />
        </div>
        <div class="form-item">
          <label for="is_used">사용유무</label>
          <select v-model="hotelDetail.is_used" required>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>
      </div>
    </div>

    <div class="button-container">
      <button class="rounded-md btn-update" type="button" @click="saveHotel">
        {{ newHotel ? "등록" : "저장" }}
      </button>
      <button class="rounded-md btn-close" type="button" @click="closeModal">
        닫기
      </button>
    </div>
  </form>
</template>

<script>
import { ref, inject, onMounted } from "vue";
import { getHotel, getCountries, updateHotel } from "@/api/sales/HotelApi";

export default {
  name: "HotelDetail",
  setup(_, { emit }) {
    const hotelCode = inject("hotelCode");
    const hotelDetail = inject("hotelDetail");
    const empId = inject("empId");
    const countries = ref([]);

    onMounted(async () => {
      if (hotelCode && hotelCode.value) {
        try {
          const data = await getHotel({
            hotelCode: hotelCode.value,
            empId: empId,
          });
          hotelDetail.value = data;
        } catch (error) {
          console.error("Failed to fetch hotel details:", error);
        }
      }
      try {
        const countryData = await getCountries();
        countries.value = countryData;
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    });

    const submitForm = async () => {
      try {
        await updateHotel(hotelDetail.value);
      } catch (error) {
        console.error("Failed to update hotel:", error);
      }
    };

    return {
      hotelDetail,
      countries,
      submitForm,
    };
  },
};
</script>