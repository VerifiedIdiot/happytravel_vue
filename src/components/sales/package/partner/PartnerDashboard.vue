<template>
  <div class="wrapper">
    <div class="partner-container">
      <table class="custom-table">
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
// 부모 컴포넌트의 이벤트의 값을 확인하고 해당 테이블의 대시보드를 동적으로 생성
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
// provider에서 정의한 partnerState의 값을 메모제이션
const currentColumns = computed(() => columns[partnerState.selectedCategory]);

// 대시보드에 동적으로 렌더링 된 row 클릭시 발생하는 이벤트

const selectPartner = (row) => {
  const isRowSelected = selectRow(row);
  if (isRowSelected) {
    const category = partnerState.selectedCategory;
    // 동적 key 선언
    const detailMap = {
      flight: ['flightCode', 'airline', 'flightCountry', 'destination', 'flightPrice', 'flightDisable'],
      hotel: ['hotelCode', 'hotelName', 'hotelCountry', 'hotelRegion', 'hotelPrice', 'hotelDisable'],
      agency: ['agencyCode', 'agencyName', 'agencyCountry', 'agencyRegion', 'agencyPrice', 'agencyDisable']
    };

    if (detailMap[category]) {
      // detailMap[category] 배열의 요소들을 개별 변수에 구조 분해 할당
      const [code, name, country, region, price, disable] = detailMap[category];
      // packageState.packageDetail 객체의 각 속성에 row 객체의 값을 할당
      packageState.packageDetail[code] = row.code;
      packageState.packageDetail[name] = row.name;
      packageState.packageDetail[country] = row.country;
      packageState.packageDetail[region] = row.region;
      packageState.packageDetail[price] = parseInt(row.price) || 0;
      partnerDisable[disable] = true;
    }
    // 금액을 계산하는 함수를 호출
    updateTotalPrice();
    // 모달 비활성화
    partnerState.isSmallModalOpen = false;
  }
};
// 날짜를 선택하고 각 협력사를 선택했을때 총 금액을 계산을 감지
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
  
  width: 95%;
  height: 95%;
  @apply bg-gray-200 rounded;
}

.partner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 98%;
  height: 95%;
  box-shadow: 2px 4px 15px 3px rgba(0, 0, 0, 0.2);
  @apply bg-gray-50 shadow-lg rounded;
}

table.custom-table {
  @apply border border-gray-200 border-spacing-0 bg-white rounded-b-lg;
  width: 98%;
  margin-top: 5px;
}

thead {
  @apply bg-gray-200;
  font-weight: bold;
  border-collapse: collapse;
}

tbody tr:nth-child(even) {
  @apply bg-gray-100;
}

tbody tr {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

tbody tr td {
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}


th,
td {
  @apply align-middle overflow-hidden overflow-ellipsis whitespace-nowrap border-b border-gray-200 text-gray-700;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

td {
  cursor: pointer;
}
</style>
