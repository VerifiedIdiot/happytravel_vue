<template>
  <div class="wrapper">
    <div class="package-container">
      <div class="package-box">
        <div class="package-item">
          <div class="filters">
            <button
              class="btn-filter"
              :class="selectedFilter === 'waited' ? 'btn-selected-waited' : 'btn-unselected'"
              @click="selectFilter('waited')"
            >
              진행중
            </button>
            <button
              class="btn-filter"
              :class="selectedFilter === 'assigned' ? 'btn-selected-assigned' : 'btn-unselected'"
              @click="selectFilter('assigned')"
            >
              완료
            </button>
            <button
              class="btn-filter"
              :class="selectedFilter === 'rejected' ? 'btn-selected-rejected' : 'btn-unselected'"
              @click="selectFilter('rejected')"
            >
              반려
            </button>
          </div>
          <div class="top-buttons">
            <button class="btn-create" @click="openModalForCreate()">
              <p>신규등록</p>
            </button>
          </div>
        </div>
      </div>
      <table class="custom-table">
        <thead>
          <tr>
            <th class="col-name">여행상품 이름</th>
            <th class="col-country">여행국가</th>
            <th class="col-start">여행시작일</th>
            <th class="col-end">여행종료일</th>
            <th class="col-sale-start">여행상품 판매 시작일</th>
            <th class="col-sale-end">여행상품 판매 종료일</th>
            <th class="col-payment">결제유무</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pkg in packages" :key="pkg.packageCode" @click="openModal(pkg.packageCode)">
            <td class="col-name">{{ pkg.packageName }}</td>
            <td class="col-country">{{ pkg.country }}</td>
            <td class="col-start">{{ pkg.startDate }}</td>
            <td class="col-end">{{ pkg.endDate }}</td>
            <td class="col-sale-start">{{ pkg.saleStartDate }}</td>
            <td class="col-sale-end">{{ pkg.saleEndDate }}</td>
            <td class="col-payment">
              <div class="status">
                <span
                  class="status"
                  :class="{
                    'status-waited': pkg.assignCode === '1000' && !packageState.isEditing,
                    'status-assigned': pkg.assignCode === '2000',
                    'status-rejected': pkg.assignCode === '3000'
                  }"
                >
                  {{
                    pkg.assignCode === '1000'
                      ? '진행중'
                      : pkg.assignCode === '2000'
                      ? '완료'
                      : pkg.assignCode === '3000'
                      ? '반려'
                      : null
                  }}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </div>
    <PackageModal v-if="packageState.isModalOpen" @close="closeModal()">
      <PackageDetail />
    </PackageModal>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import { getPackage, getCountries } from '@/api/sales/PackageApi';
import PackageDetail from '@/components/sales/package/PackageDetail.vue';
import PackageModal from '@/components/sales/package/PackageModal.vue';
import Pagination from '@/components/sales/package/Pagination.vue';

const empId = inject('empId');
const packages = inject('packages');
const fetchPackages = inject('fetchPackages');
const assignState = inject('assignState');
const packageState = inject('packageState');
const partnerState = inject('partnerState');
const resetPackageState = inject('resetPackageState');
const resetAllState = inject('resetAllState');

const selectedFilter = ref('waited');

onMounted(() => {
  fetchPackages();
});

const selectFilter = (filter) => {
  selectedFilter.value = filter;
  fetchPackages(assignState[filter]);
};

const openModal = async (pkgCode = '') => {
  packageState.packageCode = pkgCode;

  try {
    if (pkgCode) {
      const data = await getPackage({ packageCode: pkgCode, empId: empId });
      if (data) {
        packageState.packageDetail = {
          ...data,
          hotelCountry: data.country,
          flightCountry: data.country,
          agencyCountry: data.country
        };
        partnerState.selectedCountryCode = data.countryCode;
      } else {
        packageState.packageDetail = {};
      }
    } else {
      packageState.packageDetail = {};
    }

    const { packageCode } = packageState.packageDetail;
    const { selectedCountryCode } = partnerState;

    if (packageCode !== undefined && selectedCountryCode !== undefined) {
      packageState.isModalOpen = true;
    }
  } catch (error) {
    console.error('Failed to load package details:', error);
  }
};

const openModalForCreate = async () => {
  resetPackageState();
  packageState.isEditing = true;
  const countryData = await getCountries();
  packageState.countries = countryData;
  if (packageState.countries.length > 0 && packageState.isEditing) {
    packageState.isModalOpen = true;
  }
};

const closeModal = () => {
  resetAllState();
};
</script>

<style scoped lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

.wrapper {
  @apply flex flex-col justify-center items-center w-full h-auto bg-gray-200;
}

.package-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  min-height: 85.5dvh;
  @apply bg-gray-50 shadow-md;
}

.package-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 99%;
  height: 20dvh;
  @apply bg-gray-50 shadow-sm;
}

.package-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
}

.filters {
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
}

.btn-filter {
  @apply font-bold rounded transition ease-out;
  width: 100px;
  height: 36px;
  margin-right: 10px;
}

.btn-selected {
  @apply bg-blue-700 text-white shadow-md;
}

.btn-selected-waited {
  @apply bg-orange-400 text-white shadow-md;
}

.btn-selected-assigned {
  @apply bg-green-500 text-white shadow-md;
}

.btn-selected-rejected {
  @apply bg-red-600 text-white shadow-md;
}



.btn-unselected {
  @apply bg-white text-black border shadow-sm;
}

.btn-filter-waited:hover {
  @apply bg-orange-700;
}

.btn-filter-assigned:hover {
  @apply bg-green-700;
}

.btn-filter-rejected:hover {
  @apply bg-red-900;
}

table.custom-table {
  @apply border border-gray-200 border-spacing-0 bg-white rounded-b-lg;
  width: 99%;
}

thead {
  @apply bg-gray-200;
  font-weight: bold;
  border-collapse: collapse;
}

th,
td {
  @apply align-middle overflow-hidden overflow-ellipsis whitespace-nowrap border-b border-gray-200 text-gray-700;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

th.col-name,
td.col-name {
  @apply w-1/6;
}

th.col-country,
td.col-country,
th.col-start,
td.col-start,
th.col-end,
td.col-end,
th.col-sale-start,
td.col-sale-start,
th.col-sale-end,
td.col-sale-end {
  @apply w-1/6;
}

th.col-payment,
td.col-payment {
  @apply w-1/12;
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

td {
  cursor: pointer;
}

.status {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

@keyframes blink {
  0%,
  50% {
    display: none;
  }
  51%,
  100% {
    display: flex;
  }
}

.status-waited {
  @apply bg-orange-400 text-white font-bold rounded px-2 py-1;
  animation: blink 0.7s infinite;
}

.status-assigned {
  @apply bg-green-500 text-white font-bold rounded px-2 py-1;
}

.status-rejected {
  @apply bg-red-600 text-white font-bold rounded px-2 py-1;
}

.btn-create {
  @apply bg-blue-700 text-white font-bold rounded;
  transition: background-color 0.3s ease;
  width: 100px;
  height: 40px;

  &:hover {
    @apply bg-blue-900 transition ease-out;
  }
}
</style>
