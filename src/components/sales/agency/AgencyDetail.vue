<template>
  <form @submit.prevent="submitForm">
    <div class="form-container">
      <div class="form-box">
        <div class="form-item">
          <label for="agency_name">여행사명</label>
          <span v-if="!agencyState.isEditing">{{
            agencyState.agencyDetail.agency_name
          }}</span>
          <input
            type="text"
            v-else
            v-model="agencyState.agencyDetail.agency_name"
            required
          />
        </div>
        <div class="form-item">
          <label for="phone">전화번호</label>
          <span v-if="!agencyState.isEditing">{{
            agencyState.agencyDetail.phone
          }}</span>
          <input
            type="text"
            v-else
            v-model="agencyState.agencyDetail.phone"
            required
          />
        </div>
        <div class="form-item">
          <label for="country">국가</label>
          <span v-if="!agencyState.isEditing">{{
            agencyState.agencyDetail.country
          }}</span>
          <select
            class="select-country"
            v-else
            id="country"
            v-model="agencyState.agencyDetail.country"
            @change="setCountryCode"
          >
            <option
              v-for="country in agencyState.countries"
              :key="country.country_code"
              :value="country.korean_name"
            >
              {{ country.korean_name }}
            </option>
          </select>
        </div>
        <div class="form-item">
          <label for="address">주소</label>
          <span v-if="!agencyState.isEditing">{{
            agencyState.agencyDetail.address
          }}</span>
          <input
            type="text"
            v-else
            v-model="agencyState.agencyDetail.address"
            required
          />
        </div>
        <div class="form-item">
          <label for="price">가격</label>
          <span v-if="!agencyState.isEditing">{{
            agencyState.agencyDetail.price
          }}</span>
          <input
            type="text"
            v-else
            v-model="agencyState.agencyDetail.price"
            required
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { inject } from "vue";

const agencyState = inject("agencyState");

const setCountryCode = () => {
  const data = agencyState.countries.find(
    (country) => country.korean_name === agencyState.agencyDetail.country
  );
  if (data) {
    agencyState.agencyDetail.country_code = data.country_code;
  }
};
</script>

<style>
</style>