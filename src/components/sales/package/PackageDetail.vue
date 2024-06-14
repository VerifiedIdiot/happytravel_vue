<template>
  <form @submit.prevent="submitForm()">
    <div class="form-upper">
      <div>
        <div class="form-item">
          <label for="packageName"><legend>상품 이름</legend></label>
        </div>
        <div class="form-item">
          <span v-if="!packageState.isEditing">{{
            packageState.packageDetail.packageName
          }}</span>
          <input
            v-else
            type="text"
            id="packageName"
            v-model="packageState.packageDetail.packageName"
            autocomplete="off" />
        </div>
        <div class="form-item">
          <label for="country"><legend>국가</legend></label>
        </div>
        <div class="form-item">
          <span v-if="!packageState.isEditing">{{
            packageState.packageDetail.country
          }}</span>

          <select
            class="custom-select"
            v-else
            id="country"
            v-model="packageState.packageDetail.country"
            @change="setCountryCode">
            >

            <option
              v-for="country in packageState.countries"
              :key="country.countryCode"
              :value="country.koreanName">
              {{ country.koreanName }}
            </option>
          </select>
          <p
            class="verification-text"
            v-if="
              partnerState.selectedCountryCode === '' &&
              packageState.isEditing &&
              packageState.packageDetail.country == undefined
            ">
            국가를 먼저 선택해 주세요
          </p>
        </div>
      </div>
      <div>
        <div class="form-item">
          <label for="startDate"><legend>여행시작일</legend></label>
        </div>
        <div class="form-item">
          <span v-if="!packageState.isEditing">{{
            packageState.packageDetail.startDate
          }}</span>
          <input
            v-else
            type="date"
            id="startDate"
            v-model="packageState.packageDetail.startDate"
            autocomplete="off" />
        </div>
        <div class="form-item">
          <label for="endDate"><legend>여행종료일</legend></label>
        </div>
        <div class="form-item">
          <span v-if="!packageState.isEditing">{{
            packageState.packageDetail.endDate
          }}</span>
          <input
            v-else
            type="date"
            id="endDate"
            v-model="packageState.packageDetail.endDate"
            autocomplete="off" />
        </div>
      </div>
      <div>
        <div class="form-item">
          <label for="saleStartDate"><legend>판매시작일</legend></label>
        </div>
        <div class="form-item">
          <span v-if="!packageState.isEditing">{{
            packageState.packageDetail.saleStartDate
          }}</span>
          <input
            v-else
            type="date"
            id="saleStartDate"
            v-model="packageState.packageDetail.saleStartDate"
            autocomplete="off" />
        </div>
        <div class="form-item">
          <label for="saleEndDate"><legend>판매종료일</legend></label>
        </div>
        <div class="form-item">
          <span v-if="!packageState.isEditing">{{
            packageState.packageDetail.saleEndDate
          }}</span>
          <input
            v-else
            type="date"
            id="saleEndDate"
            v-model="packageState.packageDetail.saleEndDate"
            autocomplete="off" />
        </div>
      </div>
    </div>
    <div class="form-middle">
      <div class="partner-info-container">
        <p
          class="verification-text"
          v-if="
            partnerState.selectedCountryCode === '' &&
            packageState.isEditing &&
            packageState.packageDetail.country == undefined
          ">
          국가를 먼저 선택해주세요
        </p>
        <p
          class="verification-text"
          style="color: blue"
          v-else-if="
            partnerState.selectedCountryCode !== '' && packageState.isEditing
          ">
          항공권을 선택해주세요
        </p>
        <label for="flightCode"><legend>항공권 정보</legend> </label>
        <div class="partner-info-box">
          <!-- <img
            src="@/assets/icons/passport.png"
            alt="passport image"
            loading="lazy" /> -->
          <span v-if="!packageState.isEditing"
            >항공사 {{ packageState.packageDetail.airline }}</span
          >
          <span v-if="!packageState.isEditing"
            >출발지 {{ packageState.packageDetail.departure }}</span
          >
          <span v-if="!packageState.isEditing"
            >도착지 {{ packageState.packageDetail.destination }}</span
          >
          <span v-if="!packageState.isEditing"
            >왕복 {{ packageState.packageDetail.flightPrice }}원</span
          >
          <button
            class="btn-search"
            v-if="
              packageState.packageDetail.countryCode !== undefined &&
              packageState.isEditing
            "
            @click.prevent="handleSearch()">
            검색
          </button>
        </div>
      </div>
      <div class="partner-info-container">
        <p
          class="verification-text"
          v-if="
            partnerState.selectedCountryCode === '' &&
            packageState.isEditing &&
            packageState.packageDetail.country == undefined
          ">
          국가를 먼저 선택해 주세요
        </p>
        <p
          class="verification-text"
          style="color: blue"
          v-else-if="
            partnerState.selectedCountryCode !== '' && packageState.isEditing
          ">
          호텔을 선택해주세요
        </p>
        <label for="hotelCode"><legend>호텔 정보</legend> </label>
        <div class="partner-info-box">
          <!-- <img
            src="@/assets/icons/hotel2.png"
            alt="hotel image"
            loading="lazy" /> -->
          <span v-if="!packageState.isEditing"
            >호텔명 {{ packageState.packageDetail.hotelName }}</span
          >
          <span v-if="!packageState.isEditing"
            >국가 {{ packageState.packageDetail.country }}</span
          >
          <span v-if="!packageState.isEditing"
            >지역 {{ packageState.packageDetail.hotelRegion }}</span
          >
          <span v-if="!packageState.isEditing"
            >1박 {{ packageState.packageDetail.hotelPrice }}원</span
          >
          <button
            class="btn-search"
            v-if="
              packageState.packageDetail.countryCode !== undefined &&
              packageState.isEditing
            "
            @click.prevent="handleSearch()">
            검색
          </button>
        </div>
      </div>
      <div class="partner-info-container">
        <p
          class="verification-text"
          v-if="
            partnerState.selectedCountryCode === '' &&
            packageState.isEditing &&
            packageState.packageDetail.country == undefined
          ">
          국가를 먼저 선택해 주세요
        </p>
        <p
          class="verification-text"
          style="color: blue"
          v-else-if="
            partnerState.selectedCountryCode !== '' && packageState.isEditing
          ">
          현지여행사를 선택해주세요
        </p>
        <label for="agencyCode"><legend>현지 여행사 정보</legend> </label>
        <div class="partner-info-box">
          <!-- <img
            src="@/assets/icons/agency.png"
            alt="agency image"
            loading="lazy" /> -->
          <span v-if="!packageState.isEditing"
            >여행사 {{ packageState.packageDetail.agencyName }}</span
          >
          <span v-if="!packageState.isEditing"
            >국가 {{ packageState.packageDetail.country }}</span
          >
          <span v-if="!packageState.isEditing"
            >지역 {{ packageState.packageDetail.agencyRegion }}</span
          >
          <span v-if="!packageState.isEditing"
            >하루 {{ packageState.packageDetail.agencyPrice }}원</span
          >
          <button
            class="btn-search"
            v-if="
              packageState.packageDetail.countryCode !== undefined &&
              packageState.isEditing
            "
            @click.prevent="handleSearch()">
            검색
          </button>
        </div>
      </div>
    </div>
    <div class="form-under">
      <div :class="[packageState.isEditing ? 'editing' : '']">
        <label for="totalPrice"><legend>총가격</legend></label>
        <span>{{ packageState.packageDetail.totalPrice }}</span>
      </div>
      <div :class="[packageState.isEditing ? 'editing' : '']">
        <label for="salePrice"><legend>판매가</legend></label>
        <span>{{ packageState.packageDetail.salePrice }}</span>
      </div>
      <div v-if="!packageState.isEditing">
        <label for="saleAmount"><legend>판매량</legend></label>
        <span>{{ packageState.packageDetail.saleAmount }}</span>
      </div>
      <div v-if="!packageState.isEditing">
        <label for="assignCode"><legend>승인상태</legend></label>
        <span v-if="!packageState.isEditing">{{
          packageState.packageDetail.assignCode
        }}</span>
      </div>
    </div>
  </form>
  <PartnerModal v-if="partnerState.isSmallModalOpen" @close="closeModal()">
    </PartnerModal>
</template>

<script setup>
import { inject } from 'vue';
import PartnerModal from '@/components/sales/package/PartnerModal.vue';
const packageState = inject('packageState')
const partnerState = inject('partnerState')
// const fetchPartners = inject('fetchPartnsers')

const setCountryCode = () => {
  const selectedCountry = packageState.countries.find((country) => country.koreanName === packageState.packageDetail.country
  )
  partnerState.selectedCountryCode = selectedCountry ? selectedCountry.countryCode : ''
  packageState.packageDetail.countryCode = selectedCountry ? selectedCountry.countryCode : ''
  
  if (partnerState.selectedCountryCode) {
    console.log(partnerState.selectedCountryCode)
    // fetchPartners(partnerState.selectedCountryCode)
  }
}

const handleSearch = () => {
  partnerState.isSmallModalOpen = true
  console.log('test')
}

</script>

<style scoped lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 90%;
  height: 630px;
  border-radius: 4px;
  @apply bg-white;
}
legend {
  font-size: 1.5rem;
  white-space: nowrap;
}
.verification-text {
  position: absolute;
  top: -16px;
  font-size: 0.7rem;
  color: red;
}
.form-upper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 30%;
  box-shadow: 2px 4px 15px 3px rgba(0, 0, 0, 0.2);
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 25%;
  }
  .form-item {
    position: relative;
    display: flex;
    width: 25%;
    height: 100%;
  }
  .verification-text {
    position: absolute;
    top: -10px;
    font-size: 0.7rem;
    color: red;
  }
}
.form-middle {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 50%;
  .partner-info-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 2px 4px 15px 3px rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 25%;
  }
  .partner-info-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70%;
    border-radius: 4px;
    img {
      object-fit: cover;
      height: 55%;
      width: auto;
    }
  }
}

.btn-search {
  @apply bg-blue-700 text-white font-bold rounded;
  transition: background-color 0.3s ease;
  width: 100px;
  height: 40px;
  &:hover {
    @apply bg-blue-900 transition ease-out;
  }
}
.form-under {
  display: flex;

  justify-content: center;
  width: 100%;
  height: 10%;
  box-shadow: 2px 4px 15px 3px rgba(0, 0, 0, 0.2);
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
  }
}

.editing {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-select {
  appearance: none; /* 기본 브라우저 스타일 제거 */
  -webkit-appearance: none; /* 웹킷 브라우저 (크롬, 사파리) 기본 스타일 제거 */
  -moz-appearance: none; /* 파이어폭스 기본 스타일 제거 */
  background-color: white;
  border: 1px solid #ccc;
  padding: 0.5em;
  font-size: 1em;

  width: 100%;
  max-width: 300px;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuNjA2NTUsNS44Mjk2NyBMNy45NTM2MiwxMi4xNzY2IEwxNC4zOTM0LDYuNzM2NCAxMy4xODI0LDUuNTI1MyA3Ljk1MzYyLDEwLjc1NCAxLjcwNjU1LDUuNTA5MzkgTDEuNjA2NTUsNS44Mjk2NyBaIiBmaWxsPSIjNjY2NjY2IiBzdHJva2U9IiM2NjY2NjYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 10px;
}

.custom-select:focus {
  border-color: #66afe9;
  outline: none;
  box-shadow: 0 0 5px rgba(102, 175, 233, 0.6);
}
</style>
