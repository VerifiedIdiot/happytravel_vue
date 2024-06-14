<template>
  <div class="modal-overlay" @keydown.esc="handleClose">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header-item">
          <img
            src="@/assets/icons/agency.png"
            alt="agency image"
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
          v-if="!agencyState.isEditing"
          @click="toggleEditing()"
        >
          수정하기
        </button>
        <button
          type="submit"
          class="btn-update"
          v-if="agencyState.isEditing"
          @click="handleSave()"
        >
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
import { getCountries } from "@/api/sales/AgencyApi";

export default {
  name: "AgencyModal",
  props: {
    title: {
      type: String,
      default: "여행상품 상세",
    },
    headerIcon: {
      type: String,
      default: "@/assets/icons/agency.png",
    },
  },
  emits: ["close", "update:isEditing"],
  setup(_, { emit }) {
    const agencyState = inject("agencyState");
    const resetAgencyState = inject("resetAgencyState");
    const submitForm = inject("submitForm");
    const CRUDStateEnum = inject("CRUDStateEnum");
    

    const toggleEditing = async () => {
      const countryData = await getCountries();
      agencyState.crudState = CRUDStateEnum.UPDATE;
      agencyState.countries = countryData;
      if (agencyState.countries) agencyState.isEditing = true;
    };

    const handleSave = async () => {
      await submitForm();
    };

    const handleClose = () => {
      resetAgencyState();
      emit("close");
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        resetAgencyState();
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
      agencyState,
      handleClose,
      handleSave,
      toggleEditing,
      submitForm,
      CRUDStateEnum,
    };
  },
};
</script>

<style src="./AgencyDashboard.css"></style>