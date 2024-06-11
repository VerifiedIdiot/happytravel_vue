<template>
  <div class="wrapper">
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
      </div>
    </div>
    <HotelModal v-if="isModalOpen" @close="closeModal">
      <HotelDetail />
    </HotelModal>
  </div>
</template>

<script>
import { ref, onMounted, provide } from "vue";
import { getHotelList, getHotel, getCountries } from "@/api/sales/HotelApi";
import HotelDetail from "@/components/sales/hotel/HotelDetail.vue";
import HotelModal from "@/components/sales/hotel/HotelModal.vue";

export default {
  name: "HotelDashboard",
  components: {
    HotelDetail,
    HotelModal,
  },

  setup() {
    const hotels = ref([]);
    const isModalOpen = ref(false);
    const hotelCode = ref("");
    const empId = sessionStorage.getItem("empId") || "EMP30002";
    const hotelDetail = ref({});
    const countries = ref([]);

    const fetchHotels = async () => {
      try {
        // 서버에 요청을 보낼 때 사용할 매개변수를 설정함
        const params = {
          empId,
        };
        // getHotelList 함수를 호출하여 호텔 리스트를 가져옴
        const hotelList = await getHotelList(params);
        // 가져온 호텔 리스트를 처리함
        hotels.value = hotelList;
        console.log(hotels.value);
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      }
    };

    onMounted(fetchHotels);

    const openModal = async (htlCode = '') => {
      console.log(htlCode)
      hotelCode.value = htlCode;
      isModalOpen.value = false;

      try {
        if (htlCode) {
          const data = await getHotel({
            hotelCode: htlCode,
            empId: empId,
          });
          if (data) {
            console.log(data)
          }
          
          hotelDetail.value = data;
        } else {
          hotelDetail.value = {};
        }

        if (hotelDetail.value) {
          setTimeout(() => {
            isModalOpen.value = true;
          }, 0);
        }
      } catch (error) {
        console.error("Failed to load hotel details:", error);
      }
    };

    const openModalForCreate = async () => {
      // isModalOpen.value = true;
      hotelCode.value = "";
      hotelDetail.value = {};
      const countryData = await getCountries();
      countries.value = countryData;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      hotelCode.value = "";
      hotelDetail.value = {};
    };

    provide("empId", empId);
    provide("hotelCode", hotelCode);
    provide("hotelDetail", hotelDetail);
    provide("countries", countries);

    return {
      hotels,
      isModalOpen,
      openModal,
      closeModal,
      openModalForCreate,
      hotelCode,
      empId,
      hotelDetail,
      countries,
    };
  },
};
</script>

<style src="./HotelDashboard.css"></style>
