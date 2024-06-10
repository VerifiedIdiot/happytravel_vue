<template>
  <div class="wrapper">
    <div class="package-container">
      <div class="package-box">
        <div class="package-item">
          <button class="btn-create" @click="openModalForCreate">
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

    <PackageModal v-if="isModalOpen" @close="closeModal">
      <PackageDetail />
    </PackageModal>
  </div>
</template>

<script>
import { ref, onMounted, provide } from 'vue';
import {
  getPackageList,
  getPackage,
  getCountries,
  getPackageCnt,
} from '@/api/sales/PackageApi';
import PackageDetail from '@/components/sales/package/PackageDetail.vue';
import PackageModal from '@/components/sales/package/PackageModal.vue';
import Pagination from '@/components/sales/package/Pagination.vue';

export default {
  name: 'PackageDashboard',
  components: {
    PackageDetail,
    PackageModal,
    Pagination,
  },
  setup() {
    const packages = ref([]);
    const isModalOpen = ref(false);
    const packageCode = ref('');
    const empId = sessionStorage.getItem('empId') || 'EMP30002';
    const isEditing = ref(false);
    const packageDetail = ref({});
    const countries = ref([]);
    const packageCnt = ref(0);

    const currentPage = ref(1);
    const itemsPerPage = 5;
    const totalPages = ref(0);

    const fetchPackages = async () => {
      try {
        const params = {
          empId,
          limit: itemsPerPage,
          offset: itemsPerPage * (currentPage.value - 1),
        };
        const [data, cnt] = await Promise.all([
          getPackageList(params),
          getPackageCnt({ empId }), 
        ]);
        packages.value = data;
        packageCnt.value = cnt;
        totalPages.value = Math.ceil(cnt / itemsPerPage);
        console.log(Math.ceil(cnt / itemsPerPage))
      } catch (error) {
        console.error('Failed to fetch packages:', error);
      }
    };

    onMounted(fetchPackages);

    const openModal = async (pkgCode = '') => {
      packageCode.value = pkgCode;
      isModalOpen.value = false;

      try {
        if (pkgCode) {
          const data = await getPackage({
            packageCode: pkgCode,
            empId: empId,
          });
          packageDetail.value = data;
        } else {
          packageDetail.value = {};
        }

        if (packageDetail.value) {
          setTimeout(() => {
            isModalOpen.value = true;
          }, 0);
        }
      } catch (error) {
        console.error('Failed to load package details:', error);
      }
    };

    const openModalForCreate = async () => {
      isModalOpen.value = true;
      packageCode.value = '';
      isEditing.value = true;
      packageDetail.value = {};
      const countryData = await getCountries();
      countries.value = countryData;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      isEditing.value = false;
      packageDetail.value = {};
      packageCode.value = '';
    };

    const setCurrentPage = (page) => {
      currentPage.value = page;
      fetchPackages();
    };

    provide('empId', empId);
    provide('packageCode', packageCode);
    provide('isEditing', isEditing);
    provide('packageDetail', packageDetail);
    provide('countries', countries);
    provide('packageCnt', packageCnt);
    provide('currentPage', currentPage);
    provide('totalPages', totalPages);
    provide('setCurrentPage', setCurrentPage);

    return {
      packages,
      isModalOpen,
      openModal,
      openModalForCreate,
      closeModal,
      packageCode,
      empId,
      isEditing,
      packageDetail,
      countries,
      currentPage,
      totalPages,
      setCurrentPage,
    };
  },
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
