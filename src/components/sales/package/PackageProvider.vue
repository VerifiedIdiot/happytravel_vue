<template>
  <slot></slot>
</template>

<script setup>
import { provide, ref, reactive } from 'vue';
import { getPackageList, getPackageCnt } from '@/api/sales/PackageApi';

const empId = sessionStorage.getItem('empId') || 'EMP30002';
const packages = ref([]);

const initialPackageState = {
  isModalOpen: false,
  packageCode: '',
  isEditing: false,
  packageDetail: {},
  countries: [],
};
const packageState = reactive({ ...initialPackageState });

const initialPaginationState = {
  packageCnt: 0,
  currentPage: 1,
  itemsPerPage: 5,
  totalPages: 0,
};
const paginationState = reactive({ ...initialPaginationState });

const resetPackageState = () => {
  Object.assign(packageState, initialPackageState);
};

const fetchPackages = async () => {
  try {
    const params = {
      empId,
      limit: paginationState.itemsPerPage,
      offset: paginationState.itemsPerPage * (paginationState.currentPage - 1),
    };
    const [data, cnt] = await Promise.all([
      getPackageList(params),
      getPackageCnt({ empId }),
    ]);
    packages.value = data;
    paginationState.packageCnt = cnt;
    paginationState.totalPages = Math.ceil(cnt / paginationState.itemsPerPage);
  } catch (error) {
    console.error('Failed to fetch packages:', error);
  }
};

const setCurrentPage = (page) => {
  paginationState.currentPage = page;
  fetchPackages();
};

provide('empId', empId);
provide('packages', packages);
provide('packageState', packageState);
provide('resetPackageState', resetPackageState);
provide('paginationState', paginationState);
provide('setCurrentPage', setCurrentPage);
provide('fetchPackages', fetchPackages);
</script>
