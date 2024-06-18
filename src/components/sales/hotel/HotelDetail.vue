<template>
  <form @submit.prevent="submitForm">
    <div class="form-container">
      <div class="form-box">
        <div class="form-item">
          <label for="hotel_name">호텔명</label>
          <span v-if="!hotelState.isEditing">{{
            hotelState.hotelDetail.hotel_name
          }}</span>
          <input
            type="text"
            v-else
            v-model="hotelState.hotelDetail.hotel_name"
            required
          />
        </div>
        <div class="form-item">
          <label for="phone">전화번호</label>
          <span v-if="!hotelState.isEditing">{{
            hotelState.hotelDetail.phone
          }}</span>
          <input
            type="text"
            v-else
            v-model="hotelState.hotelDetail.phone"
            required
          />
        </div>
        <div class="form-item">
          <label for="country">국가</label>
          <span v-if="!hotelState.isEditing">{{
            hotelState.hotelDetail.country
          }}</span>
          <select
            class="select-country"
            v-else
            id="country"
            v-model="hotelState.hotelDetail.country"
            @change="setCountryCode"
          >
            <option
              v-for="country in hotelState.countries"
              :key="country.country_code"
              :value="country.korean_name"
            >
              {{ country.korean_name }}
            </option>
          </select>
        </div>
        <div class="form-item">
          <label for="address">주소</label>
          <span v-if="!hotelState.isEditing">{{
            hotelState.hotelDetail.address
          }}</span>
          <div v-else>
            <input
              type="text"
              v-model="hotelState.hotelDetail.address"
              id="address-input"
              placeholder="Enter an address"
              required
            />
          </div>
        </div>
        <div class="form-item">
          <label for="price">가격</label>
          <span v-if="!hotelState.isEditing">{{
            hotelState.hotelDetail.price
          }}</span>
          <input
            v-else
            type="text"
            v-model="hotelState.hotelDetail.price"
            required
          />
        </div>
        <div class="form-item">
          <label for="image">이미지</label>
          <span v-if="!hotelState.isEditing">
            <img
              v-if="hotelState.hotelDetail.image_url"
              :src="hotelState.hotelDetail.image_url"
              alt="Agency Image"
            />
            <span v-else>이미지가 없습니다</span>
          </span>
          <div v-if="hotelState.isEditing" class="form-img">
            <div class="form-img-pos">
              <img
                v-if="state.previewImageUrl || hotelState.hotelDetail.image_url"
                :src="state.previewImageUrl || hotelState.hotelDetail.image_url"
                alt="Agency Image"
              />
              <span v-else>이미지가 없습니다</span>
              <button
                v-if="hotelState.hotelDetail.image_url"
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

<script>
import { inject, ref, reactive, onMounted } from "vue";
import {
  uploadImage,
  saveHotelImageUrl,
  deleteImage,
  removeImageUrl,
} from "../../../firebase";

export default {
  name: "HotelDetail",
  setup() {
    const hotelState = inject("hotelState");
    const isKorean = ref(false); // 국내 주소 검색 여부 판단

    // 반응형 상태로 설정
    const state = reactive({
      previewImageUrl: null,
    });

    const loadScript = (src, onload) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = onload;
      script.async = true;
      document.head.appendChild(script);
    };

    const initializeAutocomplete = () => {
      const input = document.getElementById("address-input");
      const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["geocode"],
      });
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
          hotelState.hotelDetail.address = place.formatted_address;
        }
      });
    };

    onMounted(() => {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}&libraries=places`,
        initializeAutocomplete
      );
    });

    const setCountryCode = () => {
      const data = hotelState.countries.find(
        (country) => country.korean_name === hotelState.hotelDetail.country
      );
      if (data) {
        hotelState.hotelDetail.country_code = data.country_code;
        console.log(hotelState.hotelDetail);
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
            `images/${hotelState.hotelDetail.hotel_code}`
          );
          hotelState.hotelDetail.imageUrl = imageUrl;

          const storedImageUrl = imageUrl;

          await saveHotelImageUrl(
            hotelState.hotelDetail.hotel_code,
            storedImageUrl
          );
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    };

    const deleteImageFile = async () => {
      const imageUrl = hotelState.hotelDetail.image_url;
      const hotelCode = hotelState.hotelDetail.hotel_code;

      if (imageUrl && hotelCode) {
        try {
          // 이미지 숨기기
          hotelState.hotelDetail.image_url = "";
          state.previewImageUrl = null;

          // Firebase에서 이미지 삭제
          await deleteImage(imageUrl);
          await removeImageUrl(hotelCode);
        } catch (error) {
          console.error("Error deleting image:", error);
        }
      } else {
        console.warn("No image URL or agency code found");
      }
    };

    return {
      hotelState,
      state,
      setCountryCode,
      onFileChange,
      deleteImageFile,
      // openPostcode,
      // handleCountryChange,
      // isKorean,
    };
  },
};
</script>

<style src="./HotelDashboard.css">
</style>