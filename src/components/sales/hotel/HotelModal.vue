<template>
  <div class="modal-overlay" @keydown.esc="handleClose">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header-item">
          <img
            src="@/assets/icons/hotel2.png"
            alt="hotel image"
            width="100"
            height="100"
            loading="lazy"
          />
        </div>
        <h1>{{ title }}</h1>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  name: "HotelModal",
  props: {
    title: {
      type: String,
      default: "호텔상품 상세",
    },
    headerIcon: {
      type: String,
      default: "@/assets/icons/hotel2.png",
    },
  },
  emits: ['close' ],
  setup(_, { emit }) {
    const isEditing = inject('isEditing');

    const handleClose = () => {
      isEditing.value = false;
      emit('close');
    };

    return {
      handleClose,
    };
  },
};
</script>

<style src="./HotelDashboard.css"></style>