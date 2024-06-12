<template>
  <div class="wrapper">
    <div class="package-container">
      <div class="package-box">
        <div class="package-item">
          <button class="btn-create" @click="openModalForCreate()">
            <p>신규등록</p>
          </button>
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
            :key="pkg.package_code"
            @click="openModal(pkg.package_code)">
            <td>{{ pkg.package_name }}</td>
            <td>{{ pkg.country }}</td>
            <td>{{ pkg.start_date }}</td>
            <td>{{ pkg.end_date }}</td>
            <td>{{ pkg.sale_start_date }}</td>
            <td>{{ pkg.sale_end_date }}</td>
            <td>{{ pkg.assign_code }}</td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </div>

    <PackageModal v-if="packageState.isModalOpen" @close="closeModal">
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

const packages = inject('packages');
const packageState = inject('packageState');
const resetPackageState = inject('resetPackageState');
const resetPartnerState = inject('resetPartnerState')
const fetchPackages = inject('fetchPackages');
const empId = inject('empId');

onMounted(() => {
  fetchPackages()
  console.log()
});

const openModal = async (pkgCode = '') => {
  packageState.packageCode = pkgCode;
 
  try {
    if (pkgCode) {
      const data = await getPackage({
        packageCode: pkgCode,
        empId: empId,
      });
      packageState.packageDetail = data;
      if (packageState.packageDetail)
      console.log(packageState.packageDetail)
    } else {
      packageState.packageDetail = {};
    }

    if (packageState.packageDetail) {
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
  resetPackageState()
  resetPartnerState()
  packageState.isModalOpen = false
};
</script>

<style scoped>
/* 스타일 정의 */
</style>

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
