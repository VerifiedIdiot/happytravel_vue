<template>
  <div class="wrapper">
    <div class="flight-container">
      <div class="flight-box">
        <div class="flight-item">
          <button class="btn-create" @click="openModal">신규등록</button>
        </div>
      </div>
      <div class="flight-box">
        <table>
          <thead>
            <tr>
              <th>항공번호</th>
              <th>항공편</th>
              <th>전화번호</th>
              <th>출발지</th>
              <th>출발시간</th>
              <th>도착지</th>
              <th>도착시간</th>
              <th>가격</th>
              <th>
                <select v-model="filterOption">
                  <option value="all">전체</option>
                  <option value="Y">사용</option>
                  <option value="N">미사용</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="flight in filterFlights"
              :key="flight.flight_code"
              @click="openModal(flight)"
            >
              <td>{{ flight.flight_number }}</td>
              <td>{{ flight.airline }}</td>
              <td>{{ flight.phone }}</td>
              <td>{{ flight.departure }}</td>
              <td>{{ flight.departure_time }}</td>
              <td>{{ flight.destination }}</td>
              <td>{{ flight.arrival_time }}</td>
              <td>{{ formatPrice(flight.price) }}</td>
              <td>{{ flight.is_used }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <FlightDetail
      v-if="isModalOpen"
      :flight="currentFlight"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import FlightDetail from '@/components/sales/flight/FlightDetail.vue';

export default {
  name: 'FlightDashboard',
  components: {
    FlightDetail
  },
  setup() {
    const store = useStore();
    const flights = computed(() => store.getters['flight/flights']);
    const isModalOpen = ref(false);
    const currentFlight = ref(null);
    const filterOption = ref('all');

    onMounted(() => {
      store.dispatch('flight/fetchFlights');
    });

    const formatPrice = price => {
      return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW'
      }).format(price);
    };

    const openModal = flight => {
      currentFlight.value = flight
        ? { ...flight }
        : {
            flight_number: '',
            airline: '',
            phone: '',
            departure: '',
            departure_time: '',
            destination: '',
            arrival_time: '',
            price: '',
            is_used: ''
          };
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      currentFlight.value = null;
    };

    const filterFlights = computed(() => {
      if (filterOption.value === 'all') {
        return flights.value;
      }
      return flights.value.filter(flight => flight.is_used === filterOption.value);
    });

    return {
      flights,
      formatPrice,
      isModalOpen,
      openModal,
      closeModal,
      currentFlight,
      filterFlights,
      filterOption
    };
  }
};
</script>

<style src="./FlightDashboard.css"></style>
