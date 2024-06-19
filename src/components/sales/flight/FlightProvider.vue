<template>
  <slot></slot>
</template>

<script setup>
import { provide, ref, reactive } from 'vue';
import { getFlightList, getFlightCnt, insertFlight, updateFlight, updateFlightYN } from '@/api/sales/FlightApi';
import { useToast } from 'vue-toast-notification';

const toast = useToast();
const empId = sessionStorage.getItem('empId') || 'EMP30002';
const flights = ref([]);
const countryCode = ref('');

const CRUDStateEnum = Object.freeze({
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
});

const initialFlightState = {
  isModalOpen: false,
  flightCode: '',
  isEditing: false,
  crudState: CRUDStateEnum.CREATE,
  flightDetail: {
    flight_number: '',
    airline: '',
    phone: '',
    departure: '',
    departure_time: '',
    destination: '',
    arrival_time: '',
    price: '',
  },
  countries: [],
};
const flightState = reactive({ ...initialFlightState });

const initialPaginationState = {
  flightCnt: 0,
  currentPage: 1,
  itemsPerPage: 8,
  totalPages: 0,
};

const paginationState = reactive({ ...initialPaginationState });

const resetFlightState = () => {
  Object.assign(flightState, initialFlightState);
};

const setCurrentPage = (page) => {
  paginationState.currentPage = page;
  fetchFlights();
};

const fetchFlights = async () => {
  try {
    const params = {
      empId,
      limit: paginationState.itemsPerPage,
      offset: paginationState.itemsPerPage * (paginationState.currentPage - 1),
    };
    const [data, cnt] = await Promise.all([
      getFlightList(params),
      getFlightCnt({ empId }),
    ]);
    flights.value = data;
    paginationState.flightCnt = cnt;
    paginationState.totalPages = Math.ceil(cnt / paginationState.itemsPerPage);
  } catch (error) {
    console.error('Failed to fetch flight:', error);
  }
};

// 폼 유효성 검사 함수
const validateForm = () => {
  const fieldNames = {
    flight_number: '항공번호',
    airline: '항공편',
    phone: '전화번호',
    departure: '출발지',
    departure_time: '출발시간',
    destination: '도착지',
    arrival_time: '도착시간',
    price: '가격',
  };

  const requiredFields = [
    'flight_number',
    'airline',
    'phone',
    'departure',
    'departure_time',
    'destination',
    'arrival_time',
    'price',
  ];

  for (const field of requiredFields) {
    if (!flightState.flightDetail[field]) {
      toast.open({
        message: `${fieldNames[field]} 이/가 누락되었습니다.`,
        type: 'warning'
      });
      return false;
    }

    // 가격 필드에 대한 추가 유효성 검사
    if (field === 'price' && isNaN(flightState.flightDetail[field])) {
      toast.open({
        message: '가격은 숫자로 입력해주세요.',
        type: 'warning'
      });
      return false;
    }
  }

  // 날짜 유효성 검증
  const startDate = new Date(flightState.flightDetail.departure_time);
  const endDate = new Date(flightState.flightDetail.arrival_time);

  if (startDate > endDate) {
    toast.open({
      message: '출발일은 도착일보다 늦을 수 없습니다.',
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

    const params = {
      empId,
      ...flightState.flightDetail,
    }

    const response = flightState.crudState === CRUDStateEnum.CREATE
      ? await insertFlight(params)
      : await updateFlight(params);

    if (response === true) {
      flightState.isEditing = false;

      toast.open({
        message: '저장에 성공했습니다.',
        type: 'success'
      });
      resetFlightState();
      fetchFlights();
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
      flightCode : flightState.flightDetail.flight_code
    }
    const response = await updateFlightYN(params);
    console.log(params);
    console.log(response);

    if (response) {
      flightState.isEditing = false;
      
      toast.open({
        message: '해당 항공상품이 삭제되었습니다.',
        type: 'success'
      });
      resetFlightState();
      fetchFlights();
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


provide('empId', empId);
provide('flights', flights);
provide('flightState', flightState);
provide('resetFlightState', resetFlightState);
provide('setCurrentPage', setCurrentPage);
provide('fetchFlights', fetchFlights);
provide('paginationState', paginationState);
provide('submitForm', submitForm)
provide('submitYN', submitYN)
provide('CRUDStateEnum', CRUDStateEnum)

</script>