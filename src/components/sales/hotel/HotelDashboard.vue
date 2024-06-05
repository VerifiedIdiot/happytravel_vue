<template>
  <div class="wrapper">
    <!-- <p>Hotel Dashboard</p> -->
    <div class="btn-item">
      <button class="btn-create" @click="openModal()">신규등록</button>
    </div>
    <div class="sales-container">
      <table>
        <thead>
          <tr>
            <th>호텔명</th>
            <th>전화번호</th>
            <th>국가</th>
            <th>지역</th>
            <th>주소</th>
            <th>가격</th>
            <th>Y/N</th>
            <th>수정</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hotel in isUsedHotel" :key="hotel.hotel_code">
            <td>{{ hotel.hotel_name }}</td>
            <td>{{ hotel.phone }}</td>
            <td>{{ hotel.country }}</td>
            <td>{{ hotel.region }}</td>
            <td>{{ hotel.address }}</td>
            <td>{{ formatPrice(hotel.price) }}</td>
            <td>{{ hotel.is_used }}</td>
            <td><button @click="openModal(hotel)">수정</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ newHotel ? '호텔 등록' : '호텔 수정' }}</h2>
        </div>
        <div class="modal-box">
          <form @submit.prevent="saveHotel">
            <div>
              <div class="modal-item">
                <label for="hotel_name">호텔명 |</label>
                <input type="text" v-model="currentHotel.hotel_name" required>
              </div>
              <div class="modal-item">
                <label for="phone">전화번호 |</label>
                <input type="text" v-model="currentHotel.phone" required>
              </div>
              <div class="modal-item">
                <label for="country">국가 |</label>
                <input type="text" v-model="currentHotel.country" required>
              </div>
              <!-- <div class="modal-item">
                <label for="region">지역 |</label>
                <input type="text" v-model="currentHotel.region" required>
              </div>
              <div class="modal-item">
                <label for="address">주소 |</label>
                <input type="text" v-model="currentHotel.address" required>
              </div> -->
              <div class="modal-item">
                <label for="price">가격 |</label>
                <input type="text" v-model="currentHotel.price" required>
              </div>
              <div class="modal-item">
                <label for="is_used">Y/N |</label>
                <select v-model="currentHotel.is_used" required>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </select>
              </div>
            </div>

            <div class="btn-reg">
              <button class="rounded-md btn-submit" type="submit">{{ newHotel ? '등록' : '저장' }}</button>
              <button class="rounded-md btn-close" type="button" @click="closeModal">닫기</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { getHotelList, getLastHotelCode, insertHotel, updateHotel } from '@/api/sales/HotelApi';

export default {
  name: 'HotelDashboard',
  setup() {
    const hotels = ref([]);
    const showModal = ref(false);
    const currentHotel = ref({});
    const newHotel = ref(true);

    const formatPrice = (price) => {
      return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
    };

    const fetchHotels = async () => {
      try {

        hotels.value = await getHotelList();
        console.log('Fetched flights:', hotels.value);
      } catch (error) {
        console.error('Error fetching flight list:', error);
      }
    };

    const openModal = (hotel) => {
      if (hotel) {
        currentHotel.value = { ...hotel };
        newHotel.value = false;
      } else {
        currentHotel.value = {
          hotel_name: '',
          phone: '',
          country: '',
          region: '',
          address: '',
          price: '',
          is_used: 'Y',
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
        const empId = sessionStorage.getItem('empId') || 'EMP30002';
        // currentHotel.value.empId = empId;
        console.log('Updating hotel with data:', currentHotel.value, empId);
        const hotelCode = currentHotel.value.hotel_code;

        if (newHotel.value) {
          const lastHotelCode = await getLastHotelCode();
          let newHotelCode;
          if (lastHotelCode) {
            const numericPart = parseInt(lastHotelCode.replace('H', ''), 10);
            const newNumericPart = numericPart + 1;
            newHotelCode = `H${String(newNumericPart).padStart(3, '0')}`;
          } else {
            newHotelCode = 'H001';
          }
          currentHotel.value.hotel_code = newHotelCode;
          const newHotel = await insertHotel(currentHotel.value);
          hotels.value.push(newHotel);
        } else {
          const hotelCode = currentHotel.value.hotel_code;
          await updateHotel(hotelCode, currentHotel.value);
          const index = hotels.value.findIndex(h => h.hotel_code === hotelCode);
          if (index !== -1) {
            hotels.value[index] = { ...currentHotel.value };
          }
        }

        const index = hotels.value.findIndex(h => h.hotel_code === hotelCode);
        if (index !== -1) {
          hotels.value[index] = { ...currentHotel.value };
        } else {
          hotels.value.push({ ...currentHotel.value });
        }

        closeModal();
      } catch (error) {
        console.error('Error saving hotel:', error);
      }
    };

    const isUsedHotel = computed(() => {
      return hotels.value.filter(hotel => hotel.is_used === 'Y');
    });

    onMounted(fetchHotels);

    return {
      hotels,
      showModal,
      currentHotel,
      formatPrice,
      openModal,
      closeModal,
      saveHotel,
      newHotel,
      isUsedHotel,
    };
  },
};
</script>

<style src="./HotelDashboard.css"></style>
