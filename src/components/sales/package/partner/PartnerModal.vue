<template>
  <div class="small-modal-overlay">
    <div class="small-modal-content">
      <div class="small-modal-header">
        <div class="small-modal-header-item"></div>
        <h1>{{ title }} 검색결과</h1>
      </div>
      <slot></slot>
      <div class="small-button-container">
        <!-- <button
          type="button"
          class="btn-update"
          v-if="!packageState.isEditing"
          @click="toggleEditing()">
          수정하기
        </button>
        <button
          type="submit"
          class="btn-update"
          v-if="packageState.isEditing"
          @click="handleSave()">
          저장
        </button> -->
        <button type="button" class="btn-close" @click="handleClose()">
          닫기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, onUnmounted } from 'vue';

const partnerState = inject('partnerState');
const props = defineProps({
  title: {
    type: String,
  },
});

const handleClose = () => {
  partnerState.isSmallModalOpen = false;
};

const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
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
  align-items: center;
  @apply bg-white;
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
    height: 70%;
    width: auto;
  }
}

.small-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
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
