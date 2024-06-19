<template>
  <div class="wrapper">
    <div class="partner-container">
      <table>
        <thead>
          <tr>
            <th v-for="column in currentColumns" :key="column">{{ column }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in currentData"
            :key="row.code"
            @click="selectPartner(row)">
            <td>{{ row.name }}</td>
            <td>{{ row.country }}</td>
            <td>{{ row.region }}</td>
            <td>{{ row.price }}</td>
          </tr>
        </tbody>
      </table>
      <PartnerPagination />
    </div>
  </div>
</template>

<script setup>
import { computed, inject, watch } from 'vue';
import PartnerPagination from '@/components/sales/package/partner/PartnerPagination.vue';

const columns = {
  flight: ['항공사', '국가', '지역', '왕복금액'],
  hotel: ['호텔명', '국가', '지역', '1박금액'],
  agency: ['여행사', '국가', '지역', '하루금액'],
};
const packageState = inject('packageState')
const partnerDisable = inject('partnerDisable')
const partnerState = inject('partnerState');
const flightState = inject('flightState');
const hotelState = inject('hotelState');
const agencyState = inject('agencyState');
const selectRow = inject('selectRow');
const updateTotalPrice = inject('updateTotalPrice')

const currentData = computed(() => {
  if (partnerState.selectedCategory === 'flight') {
    return flightState.flights;
  } else if (partnerState.selectedCategory === 'hotel') {
    return hotelState.hotels;
  } else if (partnerState.selectedCategory === 'agency') {
    return agencyState.agencies;
  }
  return [];
});

const currentColumns = computed(() => columns[partnerState.selectedCategory]);

const selectPartner = (row) => {
  const isRowSelected = selectRow(row);
  if (isRowSelected) {
    const category = partnerState.selectedCategory;
    // 동적 row 선언
    const detailMap = {
      flight: ['flightCode', 'airline', 'flightCountry', 'destination', 'flightPrice', 'flightDisable'],
      hotel: ['hotelCode', 'hotelName', 'hotelCountry', 'hotelRegion', 'hotelPrice', 'hotelDisable'],
      agency: ['agencyCode', 'agencyName', 'agencyCountry', 'agencyRegion', 'agencyPrice', 'agencyDisable']
    };

    if (detailMap[category]) {
      const [code, name, country, region, price, disable] = detailMap[category];
      packageState.packageDetail[code] = row.code;
      packageState.packageDetail[name] = row.name;
      packageState.packageDetail[country] = row.country;
      packageState.packageDetail[region] = row.region;
      packageState.packageDetail[price] = parseInt(row.price) || 0;
      partnerDisable[disable] = true;
    }
    updateTotalPrice();
    partnerState.isSmallModalOpen = false;
  }
};
// 날짜를 선택하고 각 협력사를 선택했을때 총 금액을 계산
watch(
  () => [
    packageState.packageDetail.flightPrice,
    packageState.packageDetail.hotelPrice,
    packageState.packageDetail.agencyPrice,
    packageState.packageDetail.startDate,
    packageState.packageDetail.endDate
  ],
  updateTotalPrice
);

</script>

<style lang="scss" scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid black;
  width: 95%;
  height: 95%;
}

.partner-container {
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 85%;
}

table {
  /* border: 1px solid black; */
  border-spacing: 0;
}

th,
td {
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
