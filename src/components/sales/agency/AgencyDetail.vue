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
        <div class="form-item">
          <label for="image">이미지</label>
          <span v-if="!agencyState.isEditing">
            <img
              v-if="agencyState.agencyDetail.image_url"
              :src="agencyState.agencyDetail.image_url"
              alt="Agency Image"
            />
            <span v-else>이미지가 없습니다</span>
          </span>
          <div v-if="agencyState.isEditing" class="form-img">
            <div class="form-img-pos">
              <img
                v-if="state.previewImageUrl || agencyState.agencyDetail.image_url"
                :src="state.previewImageUrl || agencyState.agencyDetail.image_url"
                alt="Agency Image"
              />
              <span v-else>이미지가 없습니다</span>
              <button
                v-if="agencyState.agencyDetail.image_url"
                @click="deleteImageFile"
                class="delete-btn"
              >
                X
              </button>
            </div>
            <input type="file" @change="onFileChange" />
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { inject, reactive } from "vue";
import {
  uploadImage,
  saveAgencyImageUrl,
  deleteImage,
  removeImageUrl,
} from "../../../firebase";

const agencyState = inject("agencyState");

// 반응형 상태로 설정
const state = reactive({
  previewImageUrl: null,
});

const setCountryCode = () => {
  const data = agencyState.countries.find(
    (country) => country.korean_name === agencyState.agencyDetail.country
  );
  if (data) {
    agencyState.agencyDetail.country_code = data.country_code;
  }
};

const onFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {

    // 파일업로드시 미리보기
    state.previewImageUrl = URL.createObjectURL(file);

    try {
      // URL
      const imageUrl = await uploadImage(
        file,
        `images/${agencyState.agencyDetail.agency_code}`
      );
      agencyState.agencyDetail.imageUrl = imageUrl;

      const storedImageUrl = imageUrl;

      // Save
      await saveAgencyImageUrl(
        agencyState.agencyDetail.agency_code,
        storedImageUrl
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
};

const deleteImageFile = async () => {
  const imageUrl = agencyState.agencyDetail.image_url;
  const agencyCode = agencyState.agencyDetail.agency_code;

  if (imageUrl && agencyCode) {
    try {
      // 이미지 숨기기
      agencyState.agencyDetail.image_url = "";
      state.previewImageUrl = null;

      // Firebase에서 이미지 삭제
      await deleteImage(imageUrl);
      await removeImageUrl(agencyCode);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  } else {
    console.warn("No image URL or agency code found");
  }
};
</script>
<style src="./AgencyDashboard.css"></style>