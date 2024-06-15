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
// 패키지 상세정보 원본객체
const initialPackageState = {
  isModalOpen: false,
  packageCode: '',
  isEditing: false,
  crudState: CRUDStateEnum.CREATE,
  packageDetail: {},
  countries: [],
}

// 패키지 게시판 페이지네이션 원본객체
const initialPaginationState = {
  packageCnt: 0,
  currentPage: 1,
  itemsPerPage: 5,
  totalPages: 0,
}

const initialPartnerState = {
  selectedCountryCode : '',
  isSmallModalOpen : false,
}
// 항공사 리스트 원본객체
const initialFlightState = {
    flights : [],
    flightCnt: 0,
    currentPage: 1,
    itemsPerPage: 5,
    TotalPages: 0,
}

const initialHotelState = {
    hotels : [],
    hotelCnt: 0,
    currentPage: 1,
    itemsPerPage: 5,
    TotalPages: 0,
}

const initialAgencyState = {
    agencies : [],
    agencyCnt: 0,
    currentPage: 1,
    itemsPerPage: 5,
    TotalPages: 0,
}
//// 상태관리 원본객체 복사 ////
const packageState = reactive(cloneDeep(initialPackageState))
const paginationState = reactive({ ...initialPaginationState })
const partnerState = reactive({ ...initialPartnerState})
const flightState = reactive(cloneDeep(initialFlightState))
const hotelState = reactive(cloneDeep(initialHotelState))
const agencyState = reactive(cloneDeep(initialAgencyState))

//// 객체 초기화 ////
const resetPackageState = () => {
  Object.assign(packageState, cloneDeep(initialPackageState))
}

const resetPartnerState = () => {
  Object.assign(partnerState, initialPartnerState)
}

const resetFlightState = () => {
  Object.assign(flightState, cloneDeep(initialFlightState))
}

const resetHotelState = () => {
  Object.assign(hotelState, cloneDeep(initialHotelState))
}

const resetAgencyState = () => {
  Object.assign(agencyState, cloneDeep(initialAgencyState))
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

const fetchFlights = async () => {
  const params = {
      empId,
      limit: flightState.itemsPerPage,
      offset: flightState.itemsPerPage * (flightState.currentPage - 1),
    }
    try {
      const [data, cnt] = await Promise.all([
      getFlightList(params),
      getFlightCnt({ empId }),
    ])
    flightState.flights = data
    flightState.flightCnt = cnt
    flightState.totalPages = Math.ceil(cnt / flightState.itemsPerPage)
  } catch (error) {
    console.error('Failed to fetch flights:', error)
  }
}

const fetchHotels = async () => {
  const params = {
      empId,
      limit: hotelState.itemsPerPage,
      offset: hotelState.itemsPerPage * (hotelState.currentPage - 1),
    }
    try {
      const [data, cnt] = await Promise.all([
      getHotelList(params),
      getHotelCnt({ empId }),
    ])
    hotelState.flights = data
    hotelState.flightCnt = cnt
    hotelState.totalPages = Math.ceil(cnt / hotelState.itemsPerPage)
  } catch (error) {
    console.error('Failed to fetch flights:', error)
  }
}

const fetchAgencies = async () => {
  const params = {
      empId,
      limit: agencyState.itemsPerPage,
      offset: agencyState.itemsPerPage * (agencyState.currentPage - 1),
    }
    try {
      const [data, cnt] = await Promise.all([
      getAgencyList(params),
      getAgencyCnt({ empId }),
    ])
    agencyState.flights = data
    agencyState.flightCnt = cnt
    agencyState.totalPages = Math.ceil(cnt / agencyState.itemsPerPage)
  } catch (error) {
    console.error('Failed to fetch flights:', error)
  }
}


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



//// 자식 컴포넌트들에게 공유하는 상태들 (inject() 사용으로 필요시에만 접근가능)////
provide('empId', empId)
provide('CRUDStateEnum', CRUDStateEnum)

provide('packages', packages)
provide('fetchPackages', fetchPackages)
provide('packageState', packageState)
provide('resetPackageState', resetPackageState)
provide('paginationState', paginationState)
provide('submitForm', submitForm)

provide('partnerState', partnerState)
provide('resetPartnerState', resetPartnerState)

provide('flightState', flightState)
provide('fetchFlights', fetchFlights)
provide('resetFlightState', resetFlightState)

provide('hotelState', hotelState)
provide('fetchHotels', fetchHotels)
provide('resetHotelState', resetHotelState)

provide('agencyState', agencyState)
provide('fetchAgencies', fetchAgencies)
provide('resetAgencyState', resetAgencyState)


</script>
