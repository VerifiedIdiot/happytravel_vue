<template>
  <slot></slot>
</template>

<script setup>
import { provide, ref, reactive } from 'vue';
import { getHotelList, getHotelCnt, insertHotel, updateHotel } from '@/api/sales/HotelApi';
import { useToast } from 'vue-toast-notification';

const toast = useToast();
const empId = sessionStorage.getItem('empId') || 'EMP30002';
const hotels = ref([]);
const countryCode = ref('');

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
    hotel_name: '',
    phone: '',
    country: '',
    address: '',
    price: '',
    image_url: '',
    country_code: '',
  },
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
  hotelState.isModalOpen = false;
  hotelState.hotelCode = '';
  hotelState.isEditing = false;
  hotelState.crudState = CRUDStateEnum.CREATE;
  hotelState.hotelDetail = {
    hotel_name: '',
    phone: '',
    country: '',
    address: '',
    price: '',
    image_url: '',
    country_code: '',
  };
  hotelState.countries = [];
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

const submitForm = async () => {
  try {
    if (!validateForm()) {
      toast.open({
        message: '빈 칸을 채워주세요.',
        type: 'warning'
      });
      return;
    }

    const requestParams = {
      empId,
      ...hotelState.hotelDetail,
    };

    const response = hotelState.crudState === CRUDStateEnum.CREATE
      ? await insertHotel(requestParams)
      : await updateHotel(requestParams);

    if (response === true) {
      hotelState.isEditing = false;
      
      toast.open({
        message: '저장에 성공했습니다.',
        type: 'success'
      });
      resetHotelState();
      fetchHotels();
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
provide('submitForm', submitForm);
provide('CRUDStateEnum', CRUDStateEnum);
provide('countryCode', countryCode);
</script>
