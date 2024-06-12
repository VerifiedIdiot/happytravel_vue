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
          v-if="packageState.isEditing"
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

    const toggleEditing = async () => {
      const countryData = await getCountries();
      packageState.countries = countryData;
      if (packageState.countries) packageState.isEditing = true;
    };

    const isEditing = inject("isEditing");

    const handleSave = () => {
      emit("update:isEditing", false);
      resetHotelState();
    };

    const handleClose = () => {
      resetHotelState();
      emit("close");
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
    };
  },
};
</script>

<style src="./HotelDashboard.css"></style>