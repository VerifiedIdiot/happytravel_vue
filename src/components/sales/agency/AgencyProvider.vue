<template>
  <slot></slot>
</template>

<script setup>
import { provide, ref, reactive } from 'vue';
import { getAgencyList, getAgencyCnt, insertAgency, updateAgency } from '@/api/sales/AgencyApi';

const empId = sessionStorage.getItem('empId') || 'EMP30002';
const agencies = ref([]);

const CRUDStateEnum = Object.freeze({
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
});

const initialAgencyState = {
  isModalOpen: false,
  agencyCode: '',
  isEditing: false,
  crudState: CRUDStateEnum.CREATE,
  agencyDetail: {},
  countries: [],
};

const agencyState = reactive({ ...initialAgencyState });

const initialPaginationState = {
  agencyCnt: 0,
  currentPage: 1,
  itemsPerPage: 5,
  totalPages: 0,
};

const paginationState = reactive({ ...initialPaginationState });

const resetAgencyState = () => {
  Object.assign(agencyState, initialAgencyState);
};

const setCurrentPage = (page) => {
  paginationState.currentPage = page;
  fetchAgencies();
};

const fetchAgencies = async () => {
  try {
    const params = {
      empId,
      limit: paginationState.itemsPerPage,
      offset: paginationState.itemsPerPage * (paginationState.currentPage - 1),
    };
    const [data, cnt] = await Promise.all([
      getAgencyList(params),
      getAgencyCnt({ empId }),
    ]);
    agencies.value = data;
    paginationState.agencyCnt = cnt;
    paginationState.totalPages = Math.ceil(cnt / paginationState.itemsPerPage);
  } catch (error) {
    console.error('Failed to fetch agency:', error);
  }
};

const submitForm = async () => {

  if (!validateForm()) {
    alert('빈 칸을 채워주세요.');
    resetAgencyState();
    return;
  }

  try {
    const params = {
      empId,
      ...agencyState.agencyDetail, 
    }
    
    const response = agencyState.crudState === CRUDStateEnum.CREATE
      ? await insertAgency(params)
      : await updateAgency(params);
      
    if (response === true) {
      agencyState.isEditing = false;
      resetAgencyState();
      fetchAgencies();
    } else {
      console.log('save failed');
    }
  } catch (error) {
    console.error('Failed to save agencies:', error);
  }
};

// 폼 유효성 검사 함수
const validateForm = () => {
  const { agency_name, phone, country, address, price } = agencyState.agencyDetail;
  return agency_name && phone && country && address && price;
};

provide('empId', empId);
provide('agencies', agencies);
provide('agencyState', agencyState);
provide('resetAgencyState', resetAgencyState);
provide('setCurrentPage', setCurrentPage);
provide('fetchAgencies', fetchAgencies);
provide('paginationState', paginationState);
provide('submitForm', submitForm)
provide('CRUDStateEnum', CRUDStateEnum)

</script>