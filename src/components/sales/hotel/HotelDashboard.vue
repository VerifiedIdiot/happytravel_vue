<template>
  <div class="wrapper">
    <div class="hotel-container">
      <div class="hotel-box">
        <div class="hotel-item">
          <button class="btn-create" @click="openModal()">
            <p>신규등록</p>
          </button>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>호텔명</th>
              <th>전화번호</th>
              <th>국가</th>
              <th>주소</th>
              <th>가격</th>
              <th>
                <select v-model="filterOption">
                  <option value="all">사용유무</option>
                  <option value="Y">사용</option>
                  <option value="N">미사용</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="hotel in filterHotels"
              :key="hotel.hotel_code"
              @click="openModal(hotel)"
            >
              <td>{{ hotel.hotel_name }}</td>
              <td>{{ hotel.phone }}</td>
              <td>{{ hotel.country }}</td>
              <td>{{ hotel.address }}</td>
              <td>{{ formatPrice(hotel.price) }}</td>
              <td>{{ hotel.is_used }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header-item">
          <img
            src="@/assets/icons/hotel2.png"
            alt="hotel image"
            width="100"
            height="100"
            loading="lazy"
          />
        </div>
        <h1>{{ newHotel ? "신규등록" : "수정" }}</h1>
      </div>
      <form @submit.prevent="saveHotel">
        <div class="form-container">
          <div class="form-box">
            <div class="form-item">
              <label for="hotel_name">호텔명</label>
              <input type="text" v-model="currentHotel.hotel_name" required />
            </div>
            <div class="form-item">
              <label for="phone">전화번호</label>
              <input type="text" v-model="currentHotel.phone" required />
            </div>
            <div class="form-item">
              <label for="country">국가</label>
              <select
                id="country"
                v-model="currentHotel.country_code"
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
              <input type="text" v-model="currentHotel.address" required />
            </div>
            <div class="form-item">
              <label for="price">가격</label>
              <input type="text" v-model="currentHotel.price" required />
            </div>
            <div class="form-item">
              <label for="is_used">사용유무</label>
              <select v-model="currentHotel.is_used" required>
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </div>
          </div>
        </div>

        <div class="button-container">
          <button class="rounded-md btn-update" type="button"
          @click="saveHotel">
            {{ newHotel ? "등록" : "저장" }}
          </button>
          <button
            class="rounded-md btn-close"
            type="button"
            @click="closeModal"
          >
            닫기
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import {
  getHotelList,
  insertHotel,
  updateHotel,
  getCountries,
} from "@/api/sales/HotelApi";

export default {
  name: "HotelDashboard",

  setup() {
    const hotels = ref([]);
    const countries = ref([]);
    const showModal = ref(false);
    const currentHotel = ref({
      hotel_code: "",
      hotel_name: "",
      phone: "",
      country_code: "",
      country: "",
      address: "",
      price: 0,
      is_used: "Y",
    });
    const newHotel = ref(true);
    const filterOption = ref("all");

    const formatPrice = (price) => {
      return new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
      }).format(price);
    };
    const openModal = (hotel) => {
      if (hotel) {
        currentHotel.value = { ...hotel };
        currentHotel.value.country_code =
          countries.value.find(
            (country) => country.korean_name === hotel.country
          )?.country_code || "";
        newHotel.value = false;
      } else {
        currentHotel.value = {
          hotel_name: "",
          phone: "",
          country_code: "",
          country: "",
          address: "",
          price: 0,
          is_used: "Y",
        };
        newHotel.value = true;
      }
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const saveHotel = async () => {
      try {
        console.log("Current Hotel before save:", currentHotel.value);
        if (newHotel.value) {
          const insertResult = await insertHotel(currentHotel.value);
          console.log("Hotel inserted:", insertResult);

          if (insertResult) {
            // 새로 삽입된 호텔 정보를 가져온 후 hotels 리스트에 추가
            const data = await getHotelList();
            hotels.value = data;
          }
        } else {
          const hotelCode = currentHotel.value.hotel_code;
          const updateResult = await updateHotel(hotelCode, currentHotel.value);
          console.log("Hotel updated:", updateResult);

          const index = hotels.value.findIndex(
            (h) => h.hotel_code === currentHotel.value.hotel_code
          );
          if (index !== -1) {
            hotels.value[index] = { ...currentHotel.value };
          }
        }

        closeModal();
      } catch (error) {
        console.error("Error saving hotel:", error);
      }
    };

    onMounted(async () => {
      try {
        const data = await getHotelList();
        hotels.value = data;
        const countryData = await getCountries();
        countries.value = countryData;
        console.log("Fetched hotels:", hotels.value);
        console.log("Fetched countries:", countries.value);
      } catch (error) {
        console.error("Error fetching hotel list:", error);
      }
    });

    const filterHotels = computed(() => {
      if (filterOption.value === "all") {
        return hotels.value;
      }
      return hotels.value.filter(
        (hotel) => hotel.is_used === filterOption.value
      );
    });

    const updateCountryName = (e) => {
      const selectedCountryCode = e.target.value;
      const selectedCountry = countries.value.find(
        (country) => country.country_code === selectedCountryCode
      );
      if (selectedCountry) {
        currentHotel.value.country = selectedCountry.korean_name;
      }
    };

    return {
      hotels,
      showModal,
      currentHotel,
      formatPrice,
      openModal,
      closeModal,
      saveHotel,
      newHotel,
      filterOption,
      filterHotels,
      countries,
      updateCountryName,
    };
  },
};
</script>

<style src="./HotelDashboard.css"></style>
