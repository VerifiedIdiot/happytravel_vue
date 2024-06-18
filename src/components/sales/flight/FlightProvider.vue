<template>
  <slot></slot>
</template>

<script setup>
import { provide, ref, reactive } from 'vue';
import { getFlightList, getFlightCnt, insertFlight, updateFlight } from '@/api/sales/FlightApi';

const empId = sessionStorage.getItem('empId') || 'EMP30002';
const flights = ref([]);

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
  flightDetail: {},
  countries: [],
};

const flightState = reactive({ ...initialFlightState });

const initialPaginationState = {
  flightCnt: 0,
  currentPage: 1,
  itemsPerPage: 5,
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

const submitForm = async () => {

  if (!validateForm()) {
    alert('빈 칸을 채워주세요.');
    resetFlightState();
    return;
  }

  try {
    const params = {
      empId,
      ...flightState.flightDetail, 
    }
    
    const response = flightState.crudState === CRUDStateEnum.CREATE
      ? await insertFlight(params)
      : await updateFlight(params);
      
    if (response === true) {
      flightState.isEditing = false;
      resetFlightState();
      fetchFlights();
    } else {
      console.log('save failed');
    }
  } catch (error) {
    console.error('Failed to save flights:', error);
  }
};

// 폼 유효성 검사 함수
const validateForm = () => {
  const { flight_number, airline, phone, departure, departure_time, destination,  arrival_time, price } = flightState.flightDetail;
  return flight_number && airline && phone && departure && departure_time && destination && arrival_time && price;
};

provide('empId', empId);
provide('flights', flights);
provide('flightState', flightState);
provide('resetFlightState', resetFlightState);
provide('setCurrentPage', setCurrentPage);
provide('fetchFlights', fetchFlights);
provide('paginationState', paginationState);
provide('submitForm', submitForm)
provide('CRUDStateEnum', CRUDStateEnum)

</script>