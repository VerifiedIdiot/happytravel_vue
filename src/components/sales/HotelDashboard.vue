<template>
  <div>
    <h1>Hotel Management</h1>
    <form @submit.prevent="insertHotelHandler">
      <input v-model="newHotel.hotelName" placeholder="Hotel Name" required />
      <input v-model="newHotel.phone" placeholder="Phone" required />
      <input v-model="newHotel.country" placeholder="Country" required />
      <input v-model="newHotel.region" placeholder="Region" required />
      <input v-model="newHotel.address" placeholder="Address" required />
      <input v-model="newHotel.price" placeholder="Price" type="number" required />
      <input v-model="newHotel.isUsed" placeholder="Is Used" required />
      <button type="submit">Add Hotel</button>
    </form>
    <h1>Hotel List</h1>
    <ul>
      <li v-for="hotel in hotels" :key="hotel.hotelCode">
        <div v-if="editHotelCode === hotel.hotelCode">
          <input v-model="hotel.hotelName" placeholder="Hotel Name" />
          <input v-model="hotel.phone" placeholder="Phone" />
          <input v-model="hotel.country" placeholder="Country" />
          <input v-model="hotel.region" placeholder="Region" />
          <input v-model="hotel.address" placeholder="Address" />
          <input v-model="hotel.price" placeholder="Price" type="number" />
          <input v-model="hotel.isUsed" placeholder="Is Used" />
          <button @click="updateHotelHandler(hotel)">Save</button>
          <button @click="editHotelCode = null">Cancel</button>
        </div>
        <div v-else>
          <p><strong>Hotel Code:</strong> {{ hotel.hotelCode }}</p>
          <p><strong>Hotel Name:</strong> {{ hotel.hotelName }}</p>
          <p><strong>Phone:</strong> {{ hotel.phone }}</p>
          <p><strong>Country:</strong> {{ hotel.country }}</p>
          <p><strong>Region:</strong> {{ hotel.region }}</p>
          <p><strong>Address:</strong> {{ hotel.address }}</p>
          <p><strong>Price:</strong> {{ hotel.price }}</p>
          <p><strong>Is Used:</strong> {{ hotel.isUsed }}</p>
          <button @click="editHotelCode = hotel.hotelCode">Edit</button>
          <button @click="deleteHotelHandler(hotel.hotelCode)">Delete</button>
          <hr />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getHotelList, insertHotel, updateHotel, deleteHotel } from '@/api/sales/HotelApi'; 

export default {
  name: 'HotelDashboard',
  setup() {
    const hotels = ref([]);
    const editHotelCode = ref(null);
    const newHotel = ref({
      hotelName: '',
      phone: '',
      country: '',
      region: '',
      address: '',
      price: 0,
      isUsed: '',
    });

    const fetchHotelHandler = async () => {
      try {
        hotels.value = await getHotelList();
        console.log('Fetched hotels:', hotels.value);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    const insertHotelHandler = async () => {
      try {
        const addedHotel = await insertHotel(newHotel.value);
        hotels.value.push(addedHotel);
        newHotel.value = {
          hotelName: '',
          phone: '',
          country: '',
          region: '',
          address: '',
          price: 0,
          isUsed: '',
        };
      } catch (error) {
        console.error('Error adding hotel:', error);
      }
    };

    const updateHotelHandler = async (hotel) => {
      try {
        await updateHotel(hotel.hotelCode, hotel);
        editHotelCode.value = null;
      } catch (error) {
        console.error('Error updating hotel:', error);
      }
    };

    const deleteHotelHandler = async (hotelCode) => {
      try {
        await deleteHotel(hotelCode);
        hotels.value = hotels.value.filter(hotel => hotel.hotelCode !== hotelCode);
      } catch (error) {
        console.error('Error deleting hotel:', error);
      }
    };

    onMounted(fetchHotelHandler);

    return {
      hotels,
      newHotel,
      editHotelCode,
      insertHotelHandler,
      updateHotelHandler,
      deleteHotelHandler,
    };
  },
};
</script>
