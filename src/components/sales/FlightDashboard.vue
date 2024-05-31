<template>
  <div>
    <h2>Flight Dashboard</h2>
    <table>
      <thead>
        <tr>
          <!-- <th>Flight Code</th> -->
          <th>Flight Number</th>
          <th>Airline</th>
          <th>Phone</th>
          <th>Departure</th>
          <th>Departure Time</th>
          <th>Destination</th>
          <th>Arrival Time</th>
          <th>Price</th>
          <th>Is Used</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="flight in flights" :key="flight.flight_code">
          <!-- <td>{{ flight.flight_code }}</td> -->
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
</template>

<script>
import { ref, onMounted } from 'vue';
import { getFlightList } from '@/api/sales/FlightApi';

export default {
  name: 'FlightDashboard',
  setup() {
    const flights = ref([]);

    const fetchFlights = async () => {
      try {
        flights.value = await getFlightList();
        console.log('Fetched flights:', flights.value);
      } catch (error) {
        console.error('Error fetching flight list:', error);
      }
    };

    const formatPrice = (price) => {
      return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
    };

    onMounted(fetchFlights);

    return {
      flights,
      formatPrice,
    };
  },
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  height: 1.8rem;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #f1f1f1;
}
</style>