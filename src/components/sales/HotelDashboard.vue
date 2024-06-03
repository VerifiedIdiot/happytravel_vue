<template>
  <div>
    <h1>Hotel Dashboard</h1>
    <div>
      <button @click="openModal()">신규등록</button>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Hotel Name</th>
            <th>Phone</th>
            <th>Country</th>
            <th>Region</th>
            <th>Address</th>
            <th>Price</th>
            <th>Is Used</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hotel in isUsedHotel" :key="hotel.hotel_code" >
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
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ newHotel ? 'Hotel 등록' : 'Hotel 수정' }}</h2>
        <form @submit.prevent="saveHotel">
          <div>
            <label for="hotel_name">Hotel Name:</label>
            <input type="text" v-model="currentHotel.hotel_name" required>
          </div>
          <div>
            <label for="phone">Phone:</label>
            <input type="text" v-model="currentHotel.phone" required>
          </div>
          <div>
            <label for="country">Country:</label>
            <input type="text" v-model="currentHotel.country" required>
          </div>
          <div>
            <label for="region">Region:</label>
            <input type="text" v-model="currentHotel.region" required>
          </div>
          <div>
            <label for="address">Address:</label>
            <input type="text" v-model="currentHotel.address" required>
          </div>
          <div>
            <label for="price">Price:</label>
            <input type="number" v-model="currentHotel.price" required>
          </div>
          <div>
            <label for="is_used">Is Used:</label>
            <select v-model="currentHotel.is_used" required>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
          </div>
          <div>
            <button type="submit">{{ newHotel ? '등록' : '저장' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { getHotelList,getLastHotelCode,insertHotel, updateHotel } from '@/api/sales/HotelApi';

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

        if(newHotel.value) {
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

<style>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>

