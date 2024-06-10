<template>
  <div class="modal-overlay" @keydown.esc="handleClose">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header-item">
          <img
            src="@/assets/icons/flight.png"
            alt="flight image"
            loading="lazy" />
        </div>
        <h1>{{ title }}</h1>
      </div>
      <slot></slot>
      <div class="button-container">
        <button
          type="button"
          class="btn-update"
          v-if="!isEditing"
          @click="toggleEditing">
          수정하기
        </button>
        <button
          type="submit"
          class="btn-update"
          v-if="isEditing"
          @click="handleSave">
          저장
        </button>
        <button type="button" class="btn-close" @click="handleClose">
          닫기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  name: 'PackageModal',
  props: {
    title: {
      type: String,
      default: '여행상품 상세',
    },
    headerIcon: {
      type: String,
      default: '@/assets/icons/flight.png',
    },
  },
  emits: ['close', 'update:isEditing'],
  setup(_, { emit }) {
    const isEditing = inject('isEditing');

    const handleClose = () => {
      isEditing.value = false;
      emit('close');
    };

    const toggleEditing = () => {
      isEditing.value = !isEditing.value;
    };

    const handleSave = () => {
      emit('update:isEditing', false);
    };

    return {
      isEditing,
      handleClose,
      toggleEditing,
      handleSave,
    };
  },
};
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
  width:  50%;
  overflow-y: auto;
}

.modal-header {
  display:flex;
  
  align-items: center;
  
  width: 100%;
  height: 100px;
  @apply bg-blue-700;
  h1 {
    font-size: 3rem;
    color:white;
    text-align: center;
    vertical-align: middle;
  }
}
.modal-header-item {
  display:flex;
  justify-content:center;
  align-items:center;
  
  width:10%;
  height:100%;
  border-radius: 4px 0px 0px 0px;
  img {
    object-fit:contain;
    height: 70%;
    width: auto;
  }
}
.button-container {
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  height: 100px;
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
  &:hover {
    @apply bg-gray-600 transition ease-out;
  }
}
</style>