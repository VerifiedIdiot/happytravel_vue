<template>
  <slot></slot>
</template>

<script setup>
import { provide, ref, reactive } from 'vue';
import { getAgencyList, getAgencyCnt, insertAgency, updateAgency, updateAgencyYN } from '@/api/sales/AgencyApi';
import { useToast } from 'vue-toast-notification';

const toast = useToast();
const empId = sessionStorage.getItem('empId') || 'EMP30002';
const agencies = ref([]);
const countryCode = ref('');

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
  itemsPerPage: 8,
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

// 폼 유효성 검사 함수
const validateForm = () => {
  const fieldNames = {
    agency_name: '에이전시명',
    phone: '전화번호',
    country: '국가',
    address: '주소',
    price: '가격',
  };

  const requiredFields = [
    'agency_name',
    'phone',
    'country',
    'address',
    'price',
  ];

  for (const field of requiredFields) {
    if (!agencyState.agencyDetail[field]) {
      toast.open({
        message: `${fieldNames[field]} 이/가 누락되었습니다.`,
        type: 'warning'
      });
      return false;
    }

    // 가격 필드에 대한 추가 유효성 검사
    if (field === 'price' && isNaN(agencyState.agencyDetail[field])) {
      toast.open({
        message: '가격은 숫자로 입력해주세요.',
        type: 'warning'
      });
      return false;
    }
  }
  return true;
};

const submitForm = async () => {

  if (!validateForm()) {
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

      toast.open({
        message: '저장에 성공했습니다.',
        type: 'success'
      });
      resetAgencyState();
      fetchAgencies();
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
      agencyCode : agencyState.agencyDetail.agency_code
    }

    const response = await updateAgencyYN(params);
    if (response) {
      agencyState.isEditing = false;
      
      toast.open({
        message: '해당 에이전시상품이 삭제되었습니다.',
        type: 'success'
      });
      resetAgencyState();
      fetchAgencies();
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
provide('agencies', agencies);
provide('agencyState', agencyState);
provide('resetAgencyState', resetAgencyState);
provide('setCurrentPage', setCurrentPage);
provide('fetchAgencies', fetchAgencies);
provide('paginationState', paginationState);
provide('submitForm', submitForm)
provide('CRUDStateEnum', CRUDStateEnum)
provide('submitYN', submitYN)

</script>