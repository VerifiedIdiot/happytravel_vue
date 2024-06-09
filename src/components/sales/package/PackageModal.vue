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
          <button type="button" class="btn-update" v-if="!isEditing" @click="toggleEditing">
            수정하기
          </button>
          <button type="submit" class="btn-update" v-if="isEditing" @click="handleSave">
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
        
        default: '여행상품 상세'
      },
      headerIcon: {
        type: String,
        
        default: '@/assets/icons/flight.png'
      }
    },
    emits: ['close', 'update:isEditing'],
    setup(_, { emit }) {
      const isEditing = inject('isEditing');
  
      const handleClose = () => {
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
        handleSave
      };
    }
  };
  </script>
  
  <style src="./packageDashboard.css"></style>
  