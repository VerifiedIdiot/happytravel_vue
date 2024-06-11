<template>
  <slot></slot>
</template>

<script setup>
import { provide, ref, reactive } from 'vue'
import { getPackageList, getPackageCnt } from '@/api/sales/PackageApi'
//// 상태 관리들 ////
const empId = sessionStorage.getItem('empId') || 'EMP30002'
const packages = ref([])

const initialPackageState = {
  isModalOpen: false,
  packageCode: '',
  isEditing: false,
  packageDetail: {},
  countries: [],
}
const packageState = reactive({ ...initialPackageState })

const initialPaginationState = {
  packageCnt: 0,
  currentPage: 1,
  itemsPerPage: 5,
  totalPages: 0,
}
const paginationState = reactive({ ...initialPaginationState })

const initialParterState = {
    selectedCountryCode : '',
    flights : [],
    hotels : [],
    agencies : []
}
const partnerState = reactive({ ...initialParterState})


const resetPartnerState = () => {
    Object.assign(partnerState, initialParterState)
}

const resetPackageState = () => {
  Object.assign(packageState, initialPackageState);
}

//// 함수들 ////
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
    ])
    packages.value = data;
    paginationState.packageCnt = cnt;
    paginationState.totalPages = Math.ceil(cnt / paginationState.itemsPerPage);
  } catch (error) {
    console.error('Failed to fetch packages:', error);
  }
}

const filterPartners = () => {
    const selectedCountryCode = partnerState.selectedCountry;
    partnerState.flights = packageState.allFlights.filter(flight => flight.country_code === selectedCountryCode);
    partnerState.hotels = packageState.allHotels.filter(hotel => hotel.country_code === selectedCountryCode);
    partnerState.agencies = packageState.allAgencies.filter(agency => agency.country_code === selectedCountryCode);
  };

provide('empId', empId)
provide('fetchPackages', fetchPackages)
provide('packages', packages)
provide('packageState', packageState)
provide('resetPackageState', resetPackageState)
provide('partnerState', partnerState)
provide('resetPartnerState', resetPartnerState)
provide('paginationState', paginationState)


</script>
