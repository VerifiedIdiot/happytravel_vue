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

<script>
import { ref, reactive, onMounted, provide, markRaw } from 'vue';
import {
  getPackageList,
  getPackage,
  getCountries,
  getPackageCnt,
} from '@/api/sales/PackageApi';
import PackageDetail from '@/components/sales/package/PackageDetail.vue';
import PackageModal from '@/components/sales/package/PackageModal.vue';
import Pagination from '@/components/sales/package/Pagination.vue';

export default markRaw({
  name: 'PackageDashboard',
  components: {
    PackageDetail,
    PackageModal,
    Pagination,
  },
  setup() {
    const empId = sessionStorage.getItem('empId') || 'EMP30002';
    const packages = ref([]);

    // 패키지 상세정보들 상태
    const packageState = reactive({
      isModalOpen: false,
      packageCode: '',
      isEditing: false,
      packageDetail: {},
      countries: [],
    });
    // 페이지네이션 요소들 상태
    const paginationState = reactive({
      packageCnt: 0,
      currentPage: 1,
      itemsPerPage: 5,
      totalPages: 0,
    });

    const fetchPackages = async () => {
      try {
        const params = {
          empId,
          limit: paginationState.itemsPerPage,
          offset:
            paginationState.itemsPerPage * (paginationState.currentPage - 1),
        };
        const [data, cnt] = await Promise.all([
          getPackageList(params),
          getPackageCnt({ empId }),
        ]);
        packages.value = data;
        paginationState.packageCnt = cnt;
        paginationState.totalPages = Math.ceil(cnt / paginationState.itemsPerPage
        );
      } catch (error) {
        console.error('Failed to fetch packages:', error);
      }
    };

    onMounted(fetchPackages);

    const openModal = async (pkgCode = '') => {
      packageState.packageCode = pkgCode;
      packageState.isModalOpen = false;
      try {
        if (pkgCode) {
          const data = await getPackage({
            packageCode: pkgCode,
            empId: empId,
          });
          packageState.packageDetail = data;
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
      packageState.packageCode = '';
      packageState.isEditing = true;
      packageState.packageDetail = {};
      const countryData = await getCountries();
      packageState.countries = countryData;
      if (packageState.countries.length > 0) {
        packageState.isModalOpen = true;
      }
    };

    const closeModal = () => {
      Object.assign(packageState, {
        isModalOpen: false,
        packageCode: '',
        isEditing: false,
        packageDetail: {},
        countries: [],
      });
    };

    const setCurrentPage = (page) => {
      paginationState.currentPage = page;
      fetchPackages();
    };

    provide('packageState', packageState);
    provide('paginationState', paginationState);
    provide('setCurrentPage', setCurrentPage);
    provide('empId', empId);

    return {
      packages,
      packageState,
      paginationState,
      openModal,
      openModalForCreate,
      closeModal,
      setCurrentPage,
    };
  },
});
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
