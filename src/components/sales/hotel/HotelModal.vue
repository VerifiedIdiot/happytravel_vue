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
        <div class="modal-header-title">
          <h1>{{ title }}</h1>
        </div>
      </div>
      <slot></slot>
      <div class="button-container">
        <button
          type="button"
          class="btn-update"
          v-if="!hotelState.isEditing"
          @click="toggleEditing"
        >
          수정하기
        </button>
        <button
          type="submit"
          class="btn-update"
          v-if="hotelState.isEditing"
          @click="handleSave"
        >
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
import { inject, onMounted, onUnmounted } from "vue";
import { getCountries } from "@/api/sales/HotelApi";

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
  emits: ["close", "update:isEditing"],
  setup(_, { emit }) {
    const hotelState = inject("hotelState");
    const resetHotelState = inject("resetHotelState");
    const submitForm = inject("submitForm");
    const CRUDStateEnum = inject("CRUDStateEnum");
    const countryCode = inject('countryCode')

    const toggleEditing = async () => {
      const countryData = await getCountries();
      hotelState.crudState = CRUDStateEnum.UPDATE;
      hotelState.countries = countryData;
      if (hotelState.countries) hotelState.isEditing = true;
    };

    const handleSave = async () => {
      await submitForm();
    };

    const handleClose = () => {
      resetHotelState();
      emit("close");
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        resetHotelState();
        handleClose();
      }
    };

    onMounted(() => {
      document.addEventListener("keydown", handleKeyDown);
    });

    onUnmounted(() => {
      document.removeEventListener("keydown", handleKeyDown);
    });

    return {
      hotelState,
      handleClose,
      handleSave,
      toggleEditing,
      submitForm,
      CRUDStateEnum,
    };
  },
};
</script>

<style src="./HotelDashboard.css"></style>