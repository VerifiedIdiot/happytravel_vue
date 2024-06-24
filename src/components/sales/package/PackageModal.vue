<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header-item">
          <img src="@/assets/icons/flight.png" alt="package image" width="150" height="150" loading="lazy" />
        </div>
        <h1>{{ title }}</h1>
      </div>
      <slot></slot>
      <div class="button-container">
        <div class="button-item-left">
          <button
            type="button"
            class="btn-delete"
            v-if="packageState.isEditing && !packageState.isCreating"
            @click="handleYN()">
            삭제
          </button>
          <button
            type="button"
            class="btn-reject"
            v-if="
              (packageState.isEditing && !packageState.isCreating) &&
              packageState.packageDetail.assignCode == '1000'
            "
            @click="handleAssign(assignState.rejected)">
            반려
          </button>
        </div>
        <div class="button-item-right">
          <button
            type="button"
            class="btn-assingn"
            v-if="
              (packageState.isEditing && !packageState.isCreating) &&
              packageState.packageDetail.assignCode == '1000'
            "
            @click="handleAssign(assignState.assigned)">
            승인
          </button>
          <button
            type="button"
            class="btn-update"
            v-if="!packageState.isEditing && parseInt(posCode) >= 1200"
            @click="toggleEditing()">
            수정
          </button>
          <button
            type="submit"
            class="btn-save"
            v-if="packageState.isEditing"
            @click="handleSave(assignState.waited)">
            저장
          </button>
          <button type="button" class="btn-close" @click="handleClose()">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, onUnmounted } from 'vue';
import { getCountries } from '@/api/sales/PackageApi';

const props = defineProps({
  title: {
    type: String,
    default: '여행상품 상세',
  },
});

const posCode = inject('posCode')

const packageState = inject('packageState');
const partnerState = inject('partnerState');
const resetAllState = inject('resetAllState');
const assignState = inject('assignState');
const submitYN = inject('submitYN');
const submitAssign = inject('submitAssign');
const submitForm = inject('submitForm');
const CRUDStateEnum = inject('CRUDStateEnum');
const filterState = inject('filterState');
const resetFilterState = inject('resetFilterState');

const toggleEditing = async () => {
  const countryData = await getCountries();
  packageState.crudState = CRUDStateEnum.UPDATE;
  packageState.countries = countryData;
  if (packageState.countries) packageState.isEditing = true;
};

const handleYN = async () => {
  await submitYN();
};

const handleSave = async (value) => {
  await submitForm(value);
  if (value === assignState.waited) {
    resetFilterState();
    filterState.waited = true;
  }
};

const handleAssign = async (value) => {
  if (value) 
  await submitAssign(value);

  if (value === assignState.assigned) {
    resetFilterState();
    filterState.assigned = true;
  } else if (value === assignState.rejected) {
    resetFilterState();
    filterState.rejected = true;
  }
};

const handleClose = () => {
  resetAllState();
};

const handleKeyDown = (event) => {
  if (event.key === 'Escape' && partnerState.isSmallModalOpen !== true) {
    handleClose();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  @apply bg-gray-100;
  padding: 0px;
  border-radius: 8px;
  border: 0px;
  height: 800px;
  min-width: 500px;
  width: 50%;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  @apply bg-blue-700;
  h1 {
    font-size: 3rem;
    color: white;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
  }
}

.modal-header-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 100%;
  border-radius: 4px 0px 0px 0px;
  img {
    object-fit: contain;
    height: 80%;
    width: auto;
  }
}

.button-container {
  display: flex;

  align-items: center;
  width: 90%;
  height: 50px;
}

.button-item-left {
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
}

.button-item-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  height: 100%;
}

.btn-create {
  @apply bg-blue-700 text-white font-bold rounded;
  transition: background-color 0.3s ease;
  width: 100px;
  height: 40px;
  &:hover {
    @apply bg-blue-900 transition ease-out;
  }
}

.btn-update {
  @apply bg-orange-400 text-white font-bold rounded;
  transition: background-color 0.3s ease;
  width: 100px;
  height: 40px;
  &:hover {
    @apply bg-orange-700 transition ease-out;
  }
}

.btn-save {
  @apply bg-green-500 text-white font-bold rounded;
  transition: background-color 0.3s ease;
  width: 100px;
  height: 40px;
  margin-left: 2px;
  &:hover {
    @apply bg-green-700 transition ease-out;
  }
}

.btn-delete {
  @apply bg-red-600 text-white font-bold rounded;
  transition: background-color 0.3s ease;
  width: 100px;
  height: 40px;
  margin-right: 2px;
  &:hover {
    @apply bg-red-900 transition ease-out;
  }
}

.btn-close {
  @apply bg-gray-400 text-white font-bold rounded;
  transition: background-color 0.3s ease;
  width: 100px;
  height: 40px;
  margin-left: 2px;
  &:hover {
    @apply bg-gray-600 transition ease-out;
  }
}

.btn-reject {
  @apply bg-red-950 text-white font-bold rounded;
  transition: background-color 0.3s ease;
  width: 100px;
  height: 40px;
  &:hover {
    @apply bg-black transition ease-out;
  }
}

.btn-assingn {
  @apply bg-cyan-400 text-white font-bold rounded;
  transition: background-color 0.3s ease;
  width: 100px;
  height: 40px;
  &:hover {
    @apply bg-cyan-700 transition ease-out;
  }
}
</style>
