<template>
  <div class="modal-overlay" @keydown.esc="handleClose()">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header-item">
          <img src="@/assets/icons/flight.png" alt="flight image" width="100" height="100" loading="lazy" />
        </div>
        <div class="modal-header-title">
          <h1>{{ title }}</h1>
        </div>
      </div>
      <slot></slot>
      <div class="button-container">
        <button type="button" class="btn-delete" v-if="flightState.isEditing" @click="handleYN()">
          삭제
        </button>
        <button type="button" class="btn-update" v-if="!flightState.isEditing" @click="toggleEditing()">
          수정하기
        </button>
        <button type="submit" class="btn-save" v-if="flightState.isEditing" @click="handleSave()">
          저장
        </button>
        <button type="button" class="btn-close" @click="handleClose()">
          닫기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, onUnmounted } from "vue";
import { getCountries } from "@/api/sales/FlightApi";

export default {
  name: "FlightModal",
  props: {
    title: {
      type: String,
      default: "항공상품 상세",
    },
    headerIcon: {
      type: String,
      default: "@/assets/icons/flight.png",
    },
  },
  emits: ["close", "update:isEditing"],
  setup(_, { emit }) {
    const flightState = inject("flightState");
    const resetFlightState = inject("resetFlightState");
    const submitForm = inject("submitForm");
    const CRUDStateEnum = inject("CRUDStateEnum");
    const submitYN = inject('submitYN')

    const toggleEditing = async () => {
      const countryData = await getCountries();
      flightState.crudState = CRUDStateEnum.UPDATE;
      flightState.countries = countryData;
      if (flightState.countries) flightState.isEditing = true;
    };
    const handleYN = async () => {
      await submitYN()
    }

    const handleSave = async () => {
      await submitForm();
    };

    const handleClose = () => {
      resetFlightState();
      emit("close");
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        resetFlightState();
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
      flightState,
      handleClose,
      handleSave,
      toggleEditing,
      submitForm,
      CRUDStateEnum,
      handleYN
    };
  },
};
</script>

<style src="./FlightDashboard.css"></style>