<template>
  <div class="small-modal-overlay">
    <div class="small-modal-content">
      <div class="small-modal-header">
        <div class="small-modal-header-item">
          <img
            :src="imageSrc"
            alt="package image"
            width="120"
            height="120"
            loading="lazy" />
        </div>
        <h1>{{ modalTitle }} 검색결과</h1>
      </div>
      <slot></slot>
      <div class="small-button-container">
        <button type="button" class="btn-close" @click="handleClose()">
          닫기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, onUnmounted } from 'vue';

const partnerState = inject('partnerState');
const resetAllPartnerState = inject('resetAllPartnerState');
const props = defineProps({
  title: {
    type: String,
  },
});

const imageSrc = computed(() => {
  const category = partnerState.selectedCategory;
  if (category === 'flight') {
    return require('@/assets/icons/passport.png');
  } else if (category === 'hotel') {
    return require('@/assets/icons/hotel2.png');
  } else if (category === 'agency') {
    return require('@/assets/icons/agency.png');
  }
  return '';
});

const modalTitle = computed(() => {
  const category = partnerState.selectedCategory;
  if (category === 'flight') {
    return '항공사';
  } else if (category === 'hotel') {
    return '호텔';
  } else if (category === 'agency') {
    return '여행사';
  }
  return '';
});
// 모달 비활성화
const handleClose = () => {
  resetAllPartnerState();
  partnerState.isSmallModalOpen = false;
};
// 모달 활성화 될때 esc 클릭시 모달 비활성화
const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
    handleClose();
  }
};
// 모달 활성화 될때 esc 이벤트 감지하는 lister 등록
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});
// 모달 활성화 될때 esc 이벤트 감지하는 lister 해제
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
.small-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.small-modal-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @apply bg-gray-200;
  border-radius: 8px;
  border: 0px;
  padding: 0px;
  height: 700px;
  width: 45%;
  min-width: 450px;
}

.small-modal-header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  border-radius: 8px 8px 0px 0px;
  @apply bg-blue-700;
  h1 {
    font-size: 2rem;
    color: white;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
  }
}

.small-modal-header-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 100%;
  border-radius: 4px 0px 0px 0px;
  img {
    object-fit: contain;
    height: 60%;
    width: auto;
  }
}

.small-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
}

.btn-close {
  @apply bg-gray-400 text-white font-bold rounded;
  transition: background-color 0.3s ease;
  width: 100px;
  height: 40px;
  &:hover {
    @apply bg-gray-600 transition ease-out;
  }
}
</style>
