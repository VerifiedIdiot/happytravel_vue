<template>
  <div>
    <h1>Agency Dashboard</h1>
    <div>
      <button>신규등록</button>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Agency Name</th>
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
          <tr v-for="agency in agencies" :key="agency.agency_code">
            <td>{{ agency.agency_name }}</td>
            <td>{{ agency.phone }}</td>
            <td>{{ agency.country }}</td>
            <td>{{ agency.region }}</td>
            <td>{{ agency.address }}</td>
            <td>{{ formatPrice(agency.price) }}</td>
            <td>{{ agency.is_used }}</td>
            <td><button>수정</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAgencyList } from '@/api/sales/AgencyApi';

export default {
  name: 'AgencyDashboard',
  setup() {
    const agencies = ref([]);

    const fetchAgencies = async () => {
      try {
        agencies.value = await getAgencyList();
        console.log('Fetched agencies:', agencies.value);
      } catch (error) {
        console.error('Error fetching agencies list:', error);
      }
    };

    const formatPrice = (price) => {
      return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
    };

    onMounted(fetchAgencies);

    return {
      agencies,
      formatPrice,
    };
  },
};
</script>
<style>
</style>