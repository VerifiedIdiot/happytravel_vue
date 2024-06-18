<template>
  <div class="wrapper">
    <div class="package-container">
      <div class="package-box">
        <div class="package-item">
          <div class="filters">
            <button
              class="btn-filter btn-filter-waited"
              @click="fetchPackages(assignState.waited)">
              진행중
            </button>
            <button
              class="btn-filter btn-filter-assigned"
              @click="fetchPackages(assignState.assigned)">
              완료
            </button>
            <button
              class="btn-filter btn-filter-rejected"
              @click="fetchPackages(assignState.rejected)">
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
      <table>
        <thead>
          <tr>
            <th>여행상품 이름</th>
            <th>여행국가</th>
            <th>여행시작일</th>
            <th>여행종료일</th>
            <th>여행상품 판매 시작일</th>
            <th>여행상품 판매 종료일</th>
            <th>결제유무</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="pkg in packages"
            :key="pkg.packageCode"
            @click="openModal(pkg.packageCode)">
            <td>{{ pkg.packageName }}</td>
            <td>{{ pkg.country }}</td>
            <td>{{ pkg.startDate }}</td>
            <td>{{ pkg.endDate }}</td>
            <td>{{ pkg.saleStartDate }}</td>
            <td>{{ pkg.saleEndDate }}</td>
            <td>
              <div class="status">
                <span
                  class="status"
                  v-bind:class="{
                    'status-waited': pkg.assignCode === '1000' && !packageState.isEditing,
                    'status-assigned': pkg.assignCode === '2000',
                    'status-rejected': pkg.assignCode === '3000',
                  }">
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
import { inject, onMounted } from 'vue';
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

onMounted(() => {
  fetchPackages();
});

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
          agencyCountry: data.country,
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
}

.package-container {
  display: flex;
  flex-direction: column;
  width: 95%;
  min-height: 85.5dvh;
}

.package-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 20dvh;
}

.package-item {
  display: flex;
  justify-content: flex-end;
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

.top-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  height: 100%;
}
.btn-filter {
  @apply text-white font-bold rounded;
  transition: background-color 0.3s ease;
  width: 100px;
  height: 40px;
  margin-right: 10px;
}

.btn-filter-waited {
  @apply bg-orange-400;
}

.btn-filter-waited:hover {
  @apply bg-orange-700;
}

.btn-filter-assigned {
  @apply bg-green-500;
}

.btn-filter-assigned:hover {
  @apply bg-green-700;
}

.btn-filter-rejected {
  @apply bg-red-600;
}

.btn-filter-rejected:hover {
  @apply bg-red-900;
}

table {
  border: 1px solid black;
  border-spacing: 0;
}

th,
td {
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  .status {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
  }
}

@keyframes blink {
  0%, 50% {
    display: none;
  }
  51%, 100% {
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
