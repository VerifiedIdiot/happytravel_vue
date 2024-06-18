<template>
  <slot></slot>
</template>

<script setup>
import { provide, ref, reactive } from 'vue';
import { getHotelList, getHotelCnt, insertHotel, updateHotel } from '@/api/sales/HotelApi';

const empId = sessionStorage.getItem('empId') || 'EMP30002';
const hotels = ref([]);
const countryCode = ref('')

const CRUDStateEnum = Object.freeze({
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
});

const initialHotelState = {
  isModalOpen: false,
  hotelCode: '',
  isEditing: false,
  crudState: CRUDStateEnum.CREATE,
  hotelDetail: {
    country_code: '',
  },
  countries: [],
};

const hotelState = reactive({ ...initialHotelState });

const initialPaginationState = {
  hotelCnt: 0,
  currentPage: 1,
  itemsPerPage: 5,
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

const submitForm = async (countryCode) => {

  if (!validateForm()) {
    alert('빈 칸을 채워주세요.');
    resetHotelState();
    return;
  }

  try {

    if (!validateForm()) {
    alert('빈 칸을 채워주세요.');
    resetHotelState();
    return;
  }
    const params = {
      empId,
      ...hotelState.hotelDetail, 
    }
    
    const response = hotelState.crudState === CRUDStateEnum.CREATE
      ? await insertHotel(params)
      : await updateHotel(params);
      
    if (response === true) {
      hotelState.isEditing = false;
      resetHotelState();
      fetchHotels();
    } else {
      console.log('save failed');
    }
  } catch (error) {
    console.error('Failed to save hotels:', error);
  }
};

// 폼 유효성 검사 함수
const validateForm = () => {
  const { hotel_name, phone, country, address, price } = hotelState.hotelDetail;
  return hotel_name && phone && country && address && price;
};

provide('empId', empId);
provide('hotels', hotels);
provide('hotelState', hotelState);
provide('resetHotelState', resetHotelState);
provide('setCurrentPage', setCurrentPage);
provide('fetchHotels', fetchHotels);
provide('paginationState', paginationState);
provide('submitForm', submitForm)
provide('CRUDStateEnum', CRUDStateEnum)
provide('countryCode', countryCode)
</script>