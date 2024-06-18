<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header-item">
          <!-- <img
            src="@/assets/icons/flight.png"
            alt="flight image"
            loading="lazy" /> -->
        </div>
        <h1>{{ title }}</h1>
      </div>
      <slot></slot>
      <div class="button-container">
        <div class="button-item-left">
          <button
          type="button"
          class="btn-delete"
          v-if="packageState.isEditing"
          @click="handleYN()">
          삭제
        </button>
        <!-- <button
          type="button"
          class="btn-assign"
          v-if="packageState.isEditing && isManager"
          @click="handleAssign()">
          삭제
        </button> -->
        </div>
        <div class="button-item-right">
        <button
          type="button"
          class="btn-update"
          v-if="!packageState.isEditing"
          @click="toggleEditing()">
          수정
        </button>
        <button
          type="submit"
          class="btn-save"
          v-if="packageState.isEditing"
          @click="handleSave()">
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
import { inject, onMounted, onUnmounted } from 'vue'
import { getCountries } from '@/api/sales/PackageApi'


const props = defineProps({
  title: {
    type: String,
    default: '여행상품 상세',
  },
})

const packageState = inject('packageState')
const partnerState = inject('partnerState')
const resetAllState = inject('resetAllState')
const submitYN = inject('submitYN')
const submitForm = inject('submitForm')  
const CRUDStateEnum = inject('CRUDStateEnum')

const toggleEditing = async () => {
  const countryData = await getCountries()
  packageState.crudState = CRUDStateEnum.UPDATE
  packageState.countries = countryData
  if (packageState.countries) packageState.isEditing = true
}

const handleYN = async () => {
  await submitYN()
}

const handleSave = async () => {
  await submitForm()
}

const handleClose = () => {
  resetAllState()
}

const handleKeyDown = (event) => {
  if (event.key === 'Escape' && partnerState.isSmallModalOpen !== true ) {
    handleClose()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
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
  @apply bg-white;
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
    height: 70%;
    width: auto;
  }
}

.button-container {
  display: flex;
  
  align-items: center;
  width: 90%;
  height: 100px;
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
  &:hover {
    @apply bg-green-700 transition ease-out;
  }
}

.btn-delete {
  @apply bg-red-600 text-white font-bold rounded;
  transition: background-color 0.3s ease;
  width: 100px;
  height: 40px;
  &:hover {
    @apply bg-red-900 transition ease-out;
  }
}

.btn-close {
  @apply bg-gray-400 text-white font-bold rounded;
  transition: background-color 0.3s ease;
  width: 100px;
  height: 40px;
  margin-left: 5px;
  &:hover {
    @apply bg-gray-600 transition ease-out;
  }
}
</style>