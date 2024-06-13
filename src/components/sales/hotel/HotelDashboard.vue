<template>
    <div class="hotel-container">
      <div class="hotel-box">
        <div class="hotel-item">
          <button class="btn-create" @click="openModalForCreate">
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
              v-for="htl in hotels"
              :key="htl.hotel_code"
              @click="openModal(htl.hotel_code)"
            >
              <td>{{ htl.hotel_name }}</td>
              <td>{{ htl.phone }}</td>
              <td>{{ htl.country }}</td>
              <td>{{ htl.address }}</td>
              <td>{{ htl.price }}</td>
              <td>{{ htl.is_used }}</td>
            </tr>
          </tbody>
        </table>
        <Pagination />
      </div>
      <HotelModal v-if="hotelState.isModalOpen" @close="closeModal">
        <HotelDetail />
      </HotelModal>
    </div>
  
</template>

<script setup>
import { inject, onMounted } from "vue";
import { getHotel, getCountries } from "@/api/sales/HotelApi";
import HotelDetail from "@/components/sales/hotel/HotelDetail.vue";
import HotelModal from "@/components/sales/hotel/HotelModal.vue";
import Pagination from "@/components/sales/hotel/HotelPagination.vue";

const hotels = inject("hotels");
const hotelState = inject("hotelState");
const resetHotelState = inject("resetHotelState");
const fetchHotels = inject("fetchHotels");
const empId = inject("empId");

onMounted(fetchHotels);

const openModal = async (htlCode = "") => {
  hotelState.hotelCode = htlCode;
  try {
    if (htlCode) {
      const data = await getHotel({
        hotelCode: htlCode,
        empId: empId,
      });
      hotelState.hotelDetail = data;
    } else {
      hotelState.hotelDetail = {};
    }

    if (hotelState.hotelDetail) {
      hotelState.isModalOpen = true;
    }
  } catch (error) {
    console.error("Failed to load hotel details:", error);
  }
};

const openModalForCreate = async () => {
  resetHotelState();
  hotelState.isEditing = true;
  const countryData = await getCountries();
  hotelState.countries = countryData;
  if (hotelState.countries.length > 0 && hotelState.isEditing) {
    hotelState.isModalOpen = true;
  }
};

const closeModal = () => {
  resetHotelState();
  hotelState.isModalOpen = false;
};
</script>

<style src="./HotelDashboard.css"></style>
