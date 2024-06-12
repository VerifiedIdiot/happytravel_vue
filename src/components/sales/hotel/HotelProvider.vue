<template>
  <slot></slot>
</template>

<script setup>
import { provide, ref, reactive } from 'vue';
import { getHotelList, getHotelCnt } from '@/api/sales/HotelApi';

const empId = sessionStorage.getItem('empId') || 'EMP30002';
const hotels = ref([]);

// 초기화
const initialHotelState = {
  isModalOpen: false,
  hotelCode: '',
  isEditing: false,
  hotelDetail: {},
  countries: [],
};

const hotelState = reactive({ ...initialHotelState });

// 초기세팅
const initialPaginationState = {
  hotelCnt: 0,
  currentPage: 1,
  itemsPerPage: 5,
  totalPages: 0,
};

const paginationState = reactive({ ...initialHotelState });

// 필드 초기화
const resetHotelState = () => {
  Object.assign(hotelState, initialHotelState);
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

const setCurrentPage = (page) => {
  paginationState.currentPage = page;
  fetchHotels();
};

provide('empId', empId);
provide('hotels', hotels);
provide('hotelState', hotelState);
provide('resetHotelState', resetHotelState);
provide('paginationState', paginationState);
provide('setCurrentPage', setCurrentPage);
provide('fetchHotels', fetchHotels);
</script>
