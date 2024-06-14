<template>
  <slot></slot>
</template>

<script setup>
import { provide, ref, reactive } from 'vue'
import { getPackageList, getPackageCnt, updatePackage, insertPackage } from '@/api/sales/PackageApi'
// import { getHotelList, getHotelCnt } from '@/api/sales/FlightApi';

import cloneDeep from 'lodash/cloneDeep'
//// 상태 관리 원본객체들 ////
const empId = sessionStorage.getItem('empId') || 'EMP30002'
const packages = ref([])

const CRUDStateEnum = Object.freeze({
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
})

const initialPackageState = {
  isModalOpen: false,
  packageCode: '',
  isEditing: false,
  crudState: CRUDStateEnum.CREATE,
  packageDetail: {},
  countries: [],
}


const initialPaginationState = {
  packageCnt: 0,
  currentPage: 1,
  itemsPerPage: 5,
  totalPages: 0,
}


const initialParterState = {
    selectedCountryCode : '',
    isSmallModalOpen : false,
    flights : [],
    hotels : [],
    agencies : [],
    flightCnt: 0,
    hotelCnt: 0,
    agencyCnt: 0,
    currentPage: 1,
    itemsPerPage: 5,
    flightTotalPages: 0,
    hotelTotalPages: 0,
    agencyTotalPages: 0,
}
//// 상태관리 원본객체 복사 ////
const packageState = reactive(cloneDeep(initialPackageState))
const paginationState = reactive({ ...initialPaginationState })
const partnerState = reactive(cloneDeep(initialParterState))

//// 객체 초기화 ////
const resetPartnerState = () => {
  Object.assign(partnerState, cloneDeep(initialParterState))
}

const resetPackageState = () => {
  Object.assign(packageState, cloneDeep(initialPackageState))
}

//// 비즈니스 로직 함수들  ////
const fetchPackages = async () => {
  const params = {
      empId,
      limit: paginationState.itemsPerPage,
      offset: paginationState.itemsPerPage * (paginationState.currentPage - 1),
    }
  try {
    const [data, cnt] = await Promise.all([
      getPackageList(params),
      getPackageCnt({ empId }),
    ])
    packages.value = data
    paginationState.packageCnt = cnt
    paginationState.totalPages = Math.ceil(cnt / paginationState.itemsPerPage)
  } catch (error) {
    console.error('Failed to fetch packages:', error)
  }
}

// const fetchPartners = async (countryCode) => {
//   const params = {
//       empId,
//       countryCode : countryCode,
//       limit: partnerState.itemsPerPage,
//       offset: partnerState.itemsPerPage * (partnerState.currentPage - 1),
//     }
//   try {
//     const [ hotelData, hotelCnt, flightData, flightCnt, agencyData, agencyCnt] =await Promise.all([
//       getHotelList(params),
//       getHotelCnt({empId}),
//       getFlightList(params),
//       getFlightCnt({empId}),
//       getAgencyList(params),
//       getAgencyCnt({empId}),
//     ])
//     Object.assign(partnerState, {
//       hotels: hotelData,
//       hotelCnt,
//       hotelTotalPages: Math.ceil(hotelCnt / partnerState.itemsPerPage),
//       flights: flightData,
//       flightCnt,
//       flightTotalPages: Math.ceil(flightCnt / partnerState.itemsPerPage),
//       agencies: agencyData,
//       agencyCnt,
//       agencyTotalPages: Math.ceil(agencyCnt / partnerState.itemsPerPage),
//     })
//   } catch (error) {
//     console.error('Failed to fetch partners:', error)
//   }
// } 

const submitForm = async () => {
  try {
    const params = {
      empId,
      ...packageState.packageDetail,
    }

    const response = packageState.crudState === CRUDStateEnum.CREATE
      ? await insertPackage(params)
      : await updatePackage(params)

    if (response === true) {
      packageState.isEditing = false
      resetPackageState()
      resetPartnerState()
      fetchPackages()
    } else {
      console.log('저장에 실패하였음');
    }
  } catch (error) {
    console.error('Failed to save package:', error)
  }
}

const filterPartners = () => {
    const selectedCountryCode = partnerState.selectedCountry;
    partnerState.flights = packageState.allFlights.filter(flight => flight.country_code === selectedCountryCode);
    partnerState.hotels = packageState.allHotels.filter(hotel => hotel.country_code === selectedCountryCode);
    partnerState.agencies = packageState.allAgencies.filter(agency => agency.country_code === selectedCountryCode);
  }


//// 자식 컴포넌트들에게 공유하는 상태들 (inject() 사용으로 필요시에만 접근가능)////
provide('empId', empId)
provide('packages', packages)
provide('CRUDStateEnum', CRUDStateEnum)
provide('packageState', packageState)
provide('resetPackageState', resetPackageState)
provide('partnerState', partnerState)
provide('resetPartnerState', resetPartnerState)
provide('paginationState', paginationState)
provide('fetchPackages', fetchPackages)
// provide('fetchPartners', fetchPartners)
provide('submitForm', submitForm)
</script>
