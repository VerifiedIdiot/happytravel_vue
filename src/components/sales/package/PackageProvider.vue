<template>
  <slot></slot>
</template>

<script setup>
import { provide, ref, reactive, computed } from 'vue';
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
  updatePackageYN,
  assignPackage
} from '@/api/sales/PackageApi';

import cloneDeep from 'lodash/cloneDeep';
import { useToast } from 'vue-toast-notification';

const toast = useToast();
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

const assignState = {
  waited : 1000,
  assigned : 2000,
  rejected : 3000
}

const packageState = reactive(cloneDeep(initialPackageState));
const partnerDisable = reactive({ ...initialpartnerDisable });
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

const fetchPackages = async (assignCode ='1000') => {
  const params = {
    empId,
    assignCode: assignCode,
    limit: paginationState.itemsPerPage,
    offset: paginationState.itemsPerPage * (paginationState.currentPage - 1),
  };
  try {

    const [data, cnt] = await Promise.all([
      getPackageList(params),
      getPackageCnt({ empId, assignCode }),
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
    toast.open({
      message: '협력사를 선택하는데 실패했습니다.',
      type: error,
    });
  }
};

const formatPrice = (value) => {
  if (!value) return '0';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const useFormattedPrices = () => {
  const formattedTotalPrice = computed(() =>
    formatPrice(packageState.packageDetail.totalPrice)
  );
  const formattedSalePrice = computed(() =>
    formatPrice(packageState.packageDetail.salePrice)
  );

  return { formattedTotalPrice, formattedSalePrice };
};



const calculateDateDifference = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = end - start;
  const dayDiff = timeDiff / (1000 * 3600 * 24);
  return dayDiff;
};

const updateTotalPrice = () => {
  let totalPrice = 0;
  const days = calculateDateDifference(
    packageState.packageDetail.startDate,
    packageState.packageDetail.endDate
  );

  const flightPrice = parseInt(packageState.packageDetail.flightPrice) || 0;
  const hotelPrice =
    (parseInt(packageState.packageDetail.hotelPrice) || 0) * days;
  const agencyPrice =
    (parseInt(packageState.packageDetail.agencyPrice) || 0) * days;

  totalPrice += flightPrice + hotelPrice + agencyPrice;

  totalPrice = Math.max(totalPrice, 0);

  packageState.packageDetail.totalPrice = totalPrice;
  packageState.packageDetail.salePrice = totalPrice * 1.2;
};

const validateForm = () => {
  const fieldNames = {
    agencyCode: '여행사',
    countryCode: '국가',
    hotelCode: '호텔',
    flightCode: '항공사',
    packageName: '상품 이름',
    startDate: '여행 시작일',
    endDate: '여행 종료일',
    saleStartDate: '판매 시작일',
    saleEndDate: '판매 종료일',
  };

  const requiredFields = [
    'agencyCode',
    'countryCode',
    'hotelCode',
    'flightCode',
    'packageName',
    'startDate',
    'endDate',
    'saleStartDate',
    'saleEndDate',
  ];

  for (const field of requiredFields) {
    if (!packageState.packageDetail[field]) {
      toast.open({
        message: `${fieldNames[field]}이/가 누락되었습니다.`,
        type: 'warning'
      });
      return false;
    }
  }

  // 날짜 유효성 검증
  const startDate = new Date(packageState.packageDetail.startDate);
  const endDate = new Date(packageState.packageDetail.endDate);
  const saleStartDate = new Date(packageState.packageDetail.saleStartDate);
  const saleEndDate = new Date(packageState.packageDetail.saleEndDate);

  if (startDate > endDate) {
    toast.open({
      message: '여행 시작일은 여행 종료일보다 늦을 수 없습니다.',
      type: 'warning'
    });
    return false;
  }

  if (saleStartDate > saleEndDate) {
    toast.open({
      message: '판매 시작일은 판매 종료일보다 늦을 수 없습니다.',
      type: 'warning'
    });
    return false;
  }

  if (startDate < saleEndDate) {
    toast.open({
      message: '여행 시작일은 판매 종료일보다 늦어야 합니다.',
      type: 'warning'
    });
    return false;
  }

  return true;
};

const submitForm = async () => {
  try {
    if (!validateForm()) {
      return;
    }

    const requestParams = {
      packageCode: packageState.packageDetail.packageCode || null,
      agencyCode: packageState.packageDetail.agencyCode,
      countryCode: packageState.packageDetail.countryCode,
      hotelCode: packageState.packageDetail.hotelCode,
      flightCode: packageState.packageDetail.flightCode,
      packageName: packageState.packageDetail.packageName,
      startDate: packageState.packageDetail.startDate,
      endDate: packageState.packageDetail.endDate,
      saleStartDate: packageState.packageDetail.saleStartDate,
      saleEndDate: packageState.packageDetail.saleEndDate,
    };

    const params = {
      empId,
      ...requestParams,
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
      toast.open({
        message: '저장에 성공했습니다.',
        type: 'success'
      });
    } else {
      toast.open({
        message: '저장에 실패했습니다.',
        type: 'error'
      });
    }
  } catch (error) {
    toast.open({
      message: `에러가 발생했습니다. 관리자에게 문의해주세요: ${error.message}`,
      type: 'error'
    });
  }
};

const submitYN = async () => {
  try {
  if(empId !== undefined) {
    const params = {
      empId,
      packageCode : packageState.packageDetail.packageCode
    }

    const response = await updatePackageYN(params)
    if (response) {
      packageState.isEditing = false;
      resetPackageState();
      resetPartnerState();
      fetchPackages();
      toast.open({
        message: '해당 여행상품이 삭제되었습니다.',
        type: 'success'
      });
    } else {
      toast.open({
        message: '삭제에 실패했습니다.',
        type: 'error'
      });
    }
  }
} catch (error) {
  toast.open({
      message: `에러가 발생했습니다. 관리자에게 문의해주세요: ${error.message}`,
      type: 'error'
    });
}
}

const submitAssign = async () => {
  try {
    if(empId !== undefined) {
      const params = {
        empId,
        packageCode : packageState.packageDetail.packageCode,
        assignCode : assignState
      }

    const response = await assignPackage(params)
    if (response) {
      packageState.isEditing = false;
      resetPackageState();
      fetchPackages();
      toast.open({
        message: '해당 여행상품 결제가 완료되었습니다.',
        type: 'success'
      });
    } else {
      toast.open({
        message: '결제에 실패했습니다.',
        type: 'error'
      });
    }
  }
} catch (error) {
  toast.open({
      message: `에러가 발생했습니다. 관리자에게 문의해주세요: ${error.message}`,
      type: 'error'
    });
}
}

provide('empId', empId);
provide('CRUDStateEnum', CRUDStateEnum);

provide('packages', packages);
provide('fetchPackages', fetchPackages);
provide('packageState', packageState);
provide('partnerDisable', partnerDisable);
provide('resetPackageState', resetPackageState);
provide('paginationState', paginationState);
provide('resetAllState', resetAllState);
provide('assignState', assignState)
provide('submitYN', submitYN)
provide('submitAssign', submitAssign)
provide('submitForm', submitForm);

provide('partnerState', partnerState);
provide('selectRow', selectRow);
provide('updateTotalPrice', updateTotalPrice);
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
provide('useFormattedPrices', useFormattedPrices);
</script>
