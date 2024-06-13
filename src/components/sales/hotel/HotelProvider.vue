<template>
  <slot></slot>
</template>

<script setup>
import { provide, ref, reactive } from 'vue';
import { getHotelList, getHotelCnt } from '@/api/sales/HotelApi';

const empId = sessionStorage.getItem('empId') || 'EMP30002';
const hotels = ref([]);

const initialHotelState = {
  isModalOpen: false,
  hotelCode: '',
  isEditing: false,
  hotelDetail: {},
  countries: [],
};

const hotelState = reactive({ ...initialHotelState });

const initialPaginationState = {
  hotelCnt: 0,
  currentPage: 1,
  itemsPerPage: 8,
  totalPages: 0,
};

const paginationState = reactive({ ...initialPaginationState });

const resetHotelState = () => {
  Object.assign(hotelState, initialHotelState);
};

const setCurrentPage = (page) => {
  paginationState.currentPage = page;
  fetchHotels();
};

const fetchHotels = async () => {
  try {
    const params = {
      empId,
      limit: paginationState.itemsPerPage,
      offset: paginationState.itemsPerPage * (paginationState.currentPage - 1),
    };
    const [data, cnt] = await Promise.all([
      getHotelList(params),
      getHotelCnt({ empId }),
    ]);
    hotels.value = data;
    paginationState.hotelCnt = cnt;
    paginationState.totalPages = Math.ceil(cnt / paginationState.itemsPerPage);
  } catch (error) {
    console.error('Failed to fetch hotels:', error);
  }
};

provide('empId', empId);
provide('hotels', hotels);
provide('hotelState', hotelState);
provide('resetHotelState', resetHotelState);
provide('setCurrentPage', setCurrentPage);
provide('fetchHotels', fetchHotels);
provide('paginationState', paginationState);
</script>
