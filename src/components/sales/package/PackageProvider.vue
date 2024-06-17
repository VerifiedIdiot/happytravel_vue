<template>
  <slot></slot>
</template>

<script setup>
import { provide, ref, reactive } from 'vue';
import {
  getPackageList,
  getPackageCnt,
  updatePackage,
  insertPackage,
  getHotelList,
  getHotelCnt,
  getFlightList,
  getFlightCnt,
  getAgencyList,
  getAgencyCnt,
} from '@/api/sales/PackageApi';

import cloneDeep from 'lodash/cloneDeep';

const empId = sessionStorage.getItem('empId') || 'EMP30002';
const packages = ref([]);

const CRUDStateEnum = Object.freeze({
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
});

const initialPackageState = {
  isModalOpen: false,
  packageCode: '',
  isEditing: false,
  crudState: CRUDStateEnum.CREATE,
  packageDetail: {
    flightCountry: undefined,
    hotelCountry: undefined,
    agencyCountry: undefined,
  },
  countries: [],
};

const initialpartnerDisable = {
  flightDisable: true,
  hotelDisable: true,
  agencyDisable: true,
};

const initialPaginationState = {
  packageCnt: 0,
  currentPage: 1,
  itemsPerPage: 5,
  totalPages: 0,
};

const initialPartnerState = {
  selectedCountryCode: '',
  selectedCategory: '',
  isSmallModalOpen: false,
};

const initialFlightState = {
  flights: [],
  flightCnt: 0,
  currentPage: 1,
  itemsPerPage: 5,
  TotalPages: 0,
};

const initialHotelState = {
  hotels: [],
  hotelCnt: 0,
  currentPage: 1,
  itemsPerPage: 5,
  TotalPages: 0,
};

const initialAgencyState = {
  agencies: [],
  agencyCnt: 0,
  currentPage: 1,
  itemsPerPage: 5,
  TotalPages: 0,
};

const packageState = reactive(cloneDeep(initialPackageState));
const partnerDisable = reactive({...initialpartnerDisable});
const paginationState = reactive({ ...initialPaginationState });
const partnerState = reactive({ ...initialPartnerState });
const flightState = reactive(cloneDeep(initialFlightState));
const hotelState = reactive(cloneDeep(initialHotelState));
const agencyState = reactive(cloneDeep(initialAgencyState));

const resetPackageState = () => {
  Object.assign(packageState, cloneDeep(initialPackageState));
};

const resetPartnerDisable = () => {
  Object.assign(partnerDisable, initialpartnerDisable);
};

const resetPartnerState = () => {
  Object.assign(partnerState, initialPartnerState);
};

const resetFlightState = () => {
  Object.assign(flightState, cloneDeep(initialFlightState));
};

const resetHotelState = () => {
  Object.assign(hotelState, cloneDeep(initialHotelState));
};

const resetAgencyState = () => {
  Object.assign(agencyState, cloneDeep(initialAgencyState));
};

const resetAllState = () => {
  Object.assign(packageState, cloneDeep(initialPackageState));
  Object.assign(partnerState, initialPartnerState);
  Object.assign(flightState, cloneDeep(initialFlightState));
  Object.assign(hotelState, cloneDeep(initialHotelState));
  Object.assign(agencyState, cloneDeep(initialAgencyState));
  Object.assign(partnerDisable, initialpartnerDisable);
};

const resetAllPartnerState = () => {
  Object.assign(flightState, cloneDeep(initialFlightState));
  Object.assign(hotelState, cloneDeep(initialHotelState));
  Object.assign(agencyState, cloneDeep(initialAgencyState));
};

const fetchPackages = async () => {
  const params = {
    empId,
    limit: paginationState.itemsPerPage,
    offset: paginationState.itemsPerPage * (paginationState.currentPage - 1),
  };
  try {
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

const fetchFlights = async () => {
  const params = {
    empId,
    countryCode: partnerState.selectedCountryCode,
    limit: flightState.itemsPerPage,
    offset: flightState.itemsPerPage * (flightState.currentPage - 1),
  };
  try {
    const [data, cnt] = await Promise.all([
      getFlightList(params),
      getFlightCnt({ empId, countryCode: partnerState.selectedCountryCode }),
    ]);
    if ((data, cnt)) {
      flightState.flights = data;
      flightState.flightCnt = cnt;
      flightState.totalPages = Math.ceil(cnt / flightState.itemsPerPage);
    }
  } catch (error) {
    console.error('Failed to fetch flights:', error);
  }
};

const fetchHotels = async () => {
  const params = {
    empId,
    countryCode: partnerState.selectedCountryCode,
    limit: hotelState.itemsPerPage,
    offset: hotelState.itemsPerPage * (hotelState.currentPage - 1),
  };
  try {
    const [data, cnt] = await Promise.all([
      getHotelList(params),
      getHotelCnt({ empId, countryCode: partnerState.selectedCountryCode }),
    ]);
    if ((data, cnt)) {
      hotelState.hotels = data;
      hotelState.hotelCnt = cnt;
      hotelState.totalPages = Math.ceil(cnt / hotelState.itemsPerPage);
    }
  } catch (error) {
    console.error('Failed to fetch hotels:', error);
  }
};

const fetchAgencies = async () => {
  const params = {
    empId,
    countryCode: partnerState.selectedCountryCode,
    limit: agencyState.itemsPerPage,
    offset: agencyState.itemsPerPage * (agencyState.currentPage - 1),
  };
  try {
    const [data, cnt] = await Promise.all([
      getAgencyList(params),
      getAgencyCnt({ empId, countryCode: partnerState.selectedCountryCode }),
    ]);
    if ((data, cnt)) {
      agencyState.agencies = data;
      agencyState.agencyCnt = cnt;
      agencyState.totalPages = Math.ceil(cnt / agencyState.itemsPerPage);
    }
  } catch (error) {
    console.error('Failed to fetch agencies:', error);
  }
};

const selectRow = (row) => {
  if (partnerState.selectedCategory === 'flight') {
    packageState.packageDetail.flightCode = row.code;
    console.log(packageState.packageDetail.flightCode);
    return true;
  } else if (partnerState.selectedCategory === 'hotel') {
    packageState.packageDetail.hotelCode = row.code;
    return true;
  } else if (partnerState.selectedCategory === 'agency') {
    packageState.packageDetail.agencyCode = row.code;
    return true;
  } else {
    console.error('협력사를 선택하는데 실패했습니다.');
  }
};

const calculateDateDifference = (startDate, endDate) => {
  if (!startDate || !endDate) return 0; 
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = end - start;
  const dayDiff = timeDiff / (1000 * 3600 * 24); 
  return dayDiff 
};

const updateTotalPrice = () => {
  let totalPrice = 0; 
  const days = calculateDateDifference(packageState.packageDetail.startDate, packageState.packageDetail.endDate);

  // 항목 별 가격을 계산하여 totalPrice에 누적
  const flightPrice = parseInt(packageState.packageDetail.flightPrice) || 0;
  const hotelPrice = (parseInt(packageState.packageDetail.hotelPrice) || 0) * days;
  const agencyPrice = (parseInt(packageState.packageDetail.agencyPrice) || 0) * days;

  totalPrice += flightPrice + hotelPrice + agencyPrice;

  // 총 가격과 판매 가격 업데이트
  packageState.packageDetail.totalPrice = totalPrice;
  packageState.packageDetail.salePrice = totalPrice * 1.2;
  // console.log(packageState.packageDetail.flightPrice)
  // console.log(packageState.packageDetail.hotelPrice)
  // console.log(packageState.packageDetail.agencyPrice)
  // console.log(flightPrice)
  // console.log(totalPrice)
  // console.log(packageState.packageDetail.totalPrice)
};

const submitForm = async () => {
  try {
    const params = {
      empId,
      ...packageState.packageDetail,
    };

    const response =
      packageState.crudState === CRUDStateEnum.CREATE
        ? await insertPackage(params)
        : await updatePackage(params);

    if (response === true) {
      packageState.isEditing = false;
      resetPackageState();
      resetPartnerState();
      fetchPackages();
    } else {
      console.log('저장에 실패했습니다.');
    }
  } catch (error) {
    console.error('패키지 저장에 실패했습니다:', error);
  }
};

provide('empId', empId);
provide('CRUDStateEnum', CRUDStateEnum);

provide('packages', packages);
provide('fetchPackages', fetchPackages);
provide('packageState', packageState);
provide('partnerDisable', partnerDisable);
provide('resetPackageState', resetPackageState);
provide('paginationState', paginationState);
provide('resetAllState', resetAllState);
provide('submitForm', submitForm);

provide('partnerState', partnerState);
provide('selectRow', selectRow);
provide('updateTotalPrice', updateTotalPrice)
provide('resetPartnerState', resetPartnerState);

provide('flightState', flightState);
provide('fetchFlights', fetchFlights);
provide('resetFlightState', resetFlightState);

provide('hotelState', hotelState);
provide('fetchHotels', fetchHotels);
provide('resetHotelState', resetHotelState);

provide('agencyState', agencyState);
provide('fetchAgencies', fetchAgencies);
provide('resetAgencyState', resetAgencyState);

provide('resetAllPartnerState', resetAllPartnerState);
</script>
