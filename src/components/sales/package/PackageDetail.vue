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
            class="styled-input"
            v-else
            type="text"
            id="packageName"
            v-model="packageState.packageDetail.packageName"
            placeholder="입력이 필요합니다."
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
              packageState.isEditing &&
              packageState.packageDetail.countryCode == undefined
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
            class="date-picker"
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
            class="date-picker"
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
            class="date-picker"
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
            class="date-picker"
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
            packageState.isEditing &&
            packageState.packageDetail.countryCode == undefined
          ">
          국가를 먼저 선택해주세요
        </p>
        <label class="partner-label" for="flightCode"
          ><legend>항공권 정보</legend>
        </label>
        <div class="partner-info-box">
          <!-- <img
            src="@/assets/icons/passport.png"
            alt="passport image"
            loading="lazy" /> -->
          <div
            class="partner-info-detail"
            v-if="
              partnerDisable.flightDisable &&
              packageState.packageDetail.flightCode
            ">
            <span>항공사: {{ packageState.packageDetail.airline }}</span>
            <span>국가: {{ packageState.packageDetail.flightCountry }}</span>
            <span>지역: {{ packageState.packageDetail.destination }}</span>
            <span>왕복: {{ packageState.packageDetail.flightPrice }}원</span>
          </div>
          <div class="partner-info-detail" v-if="!partnerDisable.flightDisable">
            <span style="color: blue">항공권을 검색해 주세요 </span>
          </div>
          <button
            class="btn-search"
            v-if="
              packageState.isEditing &&
              packageState.packageDetail.countryCode !== undefined
            "
            @click.prevent="handleSearch('flight')">
            검색
          </button>
        </div>
      </div>
      <div class="partner-info-container">
        <p
          class="verification-text"
          v-if="
            packageState.isEditing &&
            packageState.packageDetail.countryCode == undefined
          ">
          국가를 먼저 선택해 주세요
        </p>
        <label class="partner-label" for="hotelCode"
          ><legend>호텔 정보</legend>
        </label>
        <div class="partner-info-box">
          <!-- <img
            src="@/assets/icons/hotel2.png"
            alt="hotel image"
            loading="lazy" /> -->
          <div
            class="partner-info-detail"
            v-if="
              partnerDisable.hotelDisable &&
              packageState.packageDetail.hotelCode
            ">
            <span>호텔명: {{ packageState.packageDetail.hotelName }}</span>
            <span>국가: {{ packageState.packageDetail.hotelCountry }}</span>
            <span>지역: {{ packageState.packageDetail.hotelRegion }}</span>
            <span>하루: {{ packageState.packageDetail.hotelPrice }}원</span>
          </div>
          <div class="partner-info-detail" v-if="!partnerDisable.hotelDisable">
            <span style="color: blue">호텔을 검색해 주세요 </span>
          </div>
          <button
            class="btn-search"
            v-if="
              packageState.isEditing &&
              packageState.packageDetail.countryCode !== undefined
            "
            @click.prevent="handleSearch('hotel')">
            검색
          </button>
        </div>
      </div>
      <div class="partner-info-container">
        <p
          class="verification-text"
          v-if="
            packageState.isEditing &&
            packageState.packageDetail.countryCode == undefined
          ">
          국가를 먼저 선택해 주세요
        </p>
        <label class="partner-label" for="agencyCode"
          ><legend>현지 여행사 정보</legend>
        </label>
        <div class="partner-info-box">
          <!-- <img
            src="@/assets/icons/agency.png"
            alt="agency image"
            loading="lazy" /> -->
          <div
            class="partner-info-detail"
            v-if="
              partnerDisable.agencyDisable &&
              packageState.packageDetail.agencyCode
            ">
            <span>여행사: {{ packageState.packageDetail.agencyName }}</span>
            <span>국가: {{ packageState.packageDetail.agencyCountry }}</span>
            <span>지역: {{ packageState.packageDetail.agencyRegion }}</span>
            <span>하루: {{ packageState.packageDetail.agencyPrice }}원</span>
          </div>
          <div class="partner-info-detail" v-if="!partnerDisable.agencyDisable">
            <span style="color: blue">여행사를 검색해 주세요 </span>
          </div>
          <button
            class="btn-search"
            v-if="
              packageState.isEditing &&
              packageState.packageDetail.countryCode !== undefined
            "
            @click.prevent="handleSearch('agency')">
            검색
          </button>
        </div>
      </div>
    </div>
    <div class="form-under">
      <div
        class="form-under-item"
        :class="[packageState.isEditing ? 'editing' : '']">
        <div class="form-under-label">
          <label for="totalPrice"><legend>총금액</legend></label>
        </div>
        <div class="form-under-item-value">
          <span>{{ formattedTotalPrice }}원</span>
        </div>
      </div>
      <div
        class="form-under-item"
        :class="[packageState.isEditing ? 'editing' : '']">
        <div class="form-under-label">
          <label for="salePrice"><legend>판매가</legend></label>
        </div>
        <div class="form-under-item-value">
          <span>{{ formattedSalePrice }}원</span>
        </div>
      </div>
      <div class="form-under-item" v-if="!packageState.isEditing">
        <div class="form-under-label">
          <label for="saleAmount"><legend>판매량</legend></label>
        </div>
        <div class="form-under-item-value">
          <span>{{ packageState.packageDetail.saleAmount }}</span>
        </div>
      </div>
      <div class="form-under-item" v-if="!packageState.isEditing">
        <div class="form-under-label">
          <label for="assignCode"><legend>승인상태</legend></label>
        </div>
        <div class="form-under-item-value">
          <span v-if="!packageState.isEditing">{{
            packageState.packageDetail.assignCode
          }}</span>
        </div>
      </div>
    </div>
  </form>
  <PartnerModal v-if="partnerState.isSmallModalOpen" @close="closeModal()">
    <PartnerDashboard />
  </PartnerModal>
</template>

<script setup>
import { inject, watch } from 'vue';
import PartnerModal from '@/components/sales/package/partner/PartnerModal.vue';
import PartnerDashboard from '@/components/sales/package/partner/PartnerDashboard.vue';
import { useToast } from 'vue-toast-notification';
const toast = useToast();

const packageState = inject('packageState');
const partnerDisable = inject('partnerDisable');
const partnerState = inject('partnerState');
const fetchFlights = inject('fetchFlights');
const fetchHotels = inject('fetchHotels');
const fetchAgencies = inject('fetchAgencies');
const flightState = inject('flightState');
const hotelState = inject('hotelState');
const agencyState = inject('agencyState');
const useFormattedPrices = inject('useFormattedPrices');
const updateTotalPrice = inject('updateTotalPrice');

const { formattedTotalPrice, formattedSalePrice } = useFormattedPrices();
// 여행종료일이 여행시작일보다 앞서는지 확인
watch(
  () => packageState.packageDetail.saleEndDate,
  (newVal, oldVal) => {
    if (
      newVal &&
      packageState.packageDetail.saleStartDate &&
      new Date(newVal) < new Date(packageState.packageDetail.saleStartDate)
    ) {
      toast.open({
        message: '판매 종료일은 판매 시작일보다 빠를 수 없습니다.',
        type: 'warining',
      });
      // Reset to old value or a valid default
      packageState.packageDetail.saleEndDate = oldVal;
    }
  }
);
// 판매종료일이 판매시작일보다 앞서는지 확인
watch(
  () => packageState.packageDetail.endDate,
  (newVal, oldVal) => {
    if (
      newVal &&
      packageState.packageDetail.startDate &&
      new Date(newVal) < new Date(packageState.packageDetail.startDate)
    ) {
      toast.open({
        message: '여행 종료일은 여행 시작일보다 빠를 수 없습니다.',
        type: 'warning',
      });
      // Reset to old value or a valid default
      packageState.packageDetail.endDate = oldVal;
    }
  }
);
// 협력사를 먼저 선택한뒤 날짜를 선택한경우 다시 총 금액을 계산
watch(
  () => [
    packageState.packageDetail.startDate,
    packageState.packageDetail.endDate,
  ],
  updateTotalPrice
);

const setCountryCode = () => {
  const selectedCountry = packageState.countries.find(
    (country) => country.koreanName === packageState.packageDetail.country
  );

  const countryCode = selectedCountry ? selectedCountry.countryCode : null;
  partnerState.selectedCountryCode = countryCode;
  packageState.packageDetail.countryCode = countryCode;

  if (selectedCountry?.koreanName === packageState.packageDetail.country) {
    Object.keys(partnerDisable).forEach((key) => {
      partnerDisable[key] = false;
    });
    packageState.packageDetail.flightPrice = 0;
    packageState.packageDetail.hotelPrice = 0;
    packageState.packageDetail.agencyPrice = 0;
    packageState.packageDetail.totalPrice = undefined;
    packageState.packageDetail.salePrice = undefined;
  }
};

const handleSearch = async (category) => {
  partnerState.selectedCategory = category;
  if (partnerState.selectedCategory == 'flight') {
    await fetchFlights();
    if (flightState.flights.length > 0) {
      partnerState.isSmallModalOpen = true;
    } else {
      toast.open({
        message:
          '해당 국가의 항공권 정보가 없습니다. 다른 국가를 선택해 주세요',
        type: 'warning',
      });
    }
  } else if (partnerState.selectedCategory == 'hotel') {
    await fetchHotels();
    if (hotelState.hotels.length > 0) {
      partnerState.isSmallModalOpen = true;
    } else {
      toast.open({
        message: '해당 국가의 호텔 정보가 없습니다. 다른 국가를 선택해 주세요',
        type: 'warning',
      });
    }
  } else if (partnerState.selectedCategory == 'agency') {
    await fetchAgencies();
    if (agencyState.agencies.length > 0) {
      partnerState.isSmallModalOpen = true;
    } else {
      toast.open({
        message:
          '해당 국가의 여행사 정보가 없습니다. 다른 국가를 선택해 주세요',
        type: 'warning',
      });
    }
  } else {
    console.error(`${category} 카테고리 입력값을 확인하세요`);
  }
};
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
  height: 700px;
  border-radius: 4px;
  @apply bg-gray-100;
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
  @apply rounded;
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
  @apply rounded;
  .partner-info-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 4px 15px 3px rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 25%;
    @apply rounded;
  }
  .partner-info-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 99%;
    height: 70%;
    border-radius: 4px;
    img {
      object-fit: cover;
      height: 55%;
      width: auto;
    }
  }
  .partner-info-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    height: 70%;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.partner-label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  @apply bg-gray-200;
}

.btn-search {
  @apply bg-blue-700 text-white font-bold rounded;
  transition: background-color 0.3s ease;
  width: 90px;
  height: 35px;
  /* margin-left: 10px; */
  &:hover {
    @apply bg-blue-900 transition ease-out;
  }
}
.form-under {
  display: flex;

  justify-content: center;
  width: 100%;
  height: 15%;
  box-shadow: 2px 4px 15px 3px rgba(0, 0, 0, 0.2);
  @apply rounded;
}
.form-under-item {
  display: flex;
  flex-direction: column;

  width: 50%;
  height: 100%;
}
.form-under-label {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
  @apply rounded bg-gray-200;
}
.form-under-item-value {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
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

.styled-input {
  @apply bg-white border border-gray-300 rounded px-3 py-2 w-full;
  transition: border-color 0.2s ease;
}

.styled-input:focus {
  border-color: #66afe9;
  outline: none;
  box-shadow: 0 0 5px rgba(102, 175, 233, 0.6);
}

.styled-input::placeholder {
  color: #999;
}

.date-picker {
  @apply bg-white border border-gray-300 rounded px-3 py-2 w-full;
  transition: border-color 0.2s ease;
}

.date-picker:focus {
  border-color: #66afe9;
  outline: none;
  box-shadow: 0 0 5px rgba(102, 175, 233, 0.6);
}
</style>
