<template>
    <form @submit.prevent="submitForm">
      <div class="form-upper">
        <FieldGroup
          v-for="(fieldGroup, index) in upperFields"
          :key="index"
          :fields="fieldGroup.fields"
          :is-editing="packageState.isEditing"
          :package-detail="packageState.packageDetail"
        />
      </div>
      <div class="form-middle">
        <PartnerInfo
          v-for="(partner, index) in partners"
          :key="index"
          :label="partner.label"
          :image="partner.image"
          :details="partner.details"
          :is-editing="packageState.isEditing"
          :package-detail="packageState.packageDetail"
        />
      </div>
      <div class="form-under">
        <div :class="[packageState.isEditing ? 'editing' : '']">
          <label for="totalPrice"><legend>총가격</legend></label>
          <span>{{ packageState.packageDetail.total_price }}</span>
        </div>
        <div :class="[packageState.isEditing ? 'editing' : '']">
          <label for="salePrice"><legend>판매가</legend></label>
          <span>{{ packageState.packageDetail.sale_price }}</span>
        </div>
        <div v-if="!packageState.isEditing">
          <label for="saleAmount"><legend>판매량</legend></label>
          <span>{{ packageState.packageDetail.sale_amount }}</span>
        </div>
        <div v-if="!packageState.isEditing">
          <label for="assignCode"><legend>승인상태</legend></label>
          <span v-if="!packageState.isEditing">{{
            packageState.packageDetail.assign_code
          }}</span>
        </div>
      </div>
    </form>
  </template>
  
  <script>
  import { inject } from 'vue';
  import { updatePackage } from '@/api/sales/PackageApi';
  
  export default {
    name: 'PackageDetail',
    setup(_, { emit }) {
      const packageState = inject('packageState');
  
      const submitForm = async () => {
        try {
          await updatePackage(packageState.packageDetail);
          packageState.isEditing = false;
          emit('update:isEditing', false);
        } catch (error) {
          console.error('Failed to update package:', error);
        }
      };
  
      const upperFields = [
        {
          fields: [
            { id: 'packageName', label: '상품 이름', type: 'text', model: 'package_name' },
            { id: 'country', label: '국가', type: 'select', model: 'country', options: packageState.countries, optionKey: 'country_code', optionLabel: 'korean_name' },
          ],
        },
        {
          fields: [
            { id: 'startDate', label: '여행시작일', type: 'date', model: 'start_date' },
            { id: 'endDate', label: '여행종료일', type: 'date', model: 'end_date' },
          ],
        },
        {
          fields: [
            { id: 'saleStartDate', label: '판매시작일', type: 'date', model: 'sale_start_date' },
            { id: 'saleEndDate', label: '판매종료일', type: 'date', model: 'sale_end_date' },
          ],
        },
      ];
  
      const partners = [
        {
          label: '항공권 정보',
          image: '@/assets/icons/passport.png',
          details: [
            { label: '항공사', value: 'airline' },
            { label: '출발지', value: 'departure' },
            { label: '도착지', value: 'destination' },
            { label: '왕복', value: 'flight_price', suffix: '원' },
            { id: 'flightCode', type: 'text', model: 'flight_code' },
          ],
        },
        {
          label: '호텔 정보',
          image: '@/assets/icons/hotel2.png',
          details: [
            { label: '호텔명', value: 'hotel_name' },
            { label: '국가', value: 'country' },
            { label: '지역', value: 'hotel_region' },
            { label: '1박', value: 'hotel_price', suffix: '원' },
            { id: 'hotelCode', type: 'text', model: 'hotel_code' },
          ],
        },
        {
          label: '현지 여행사 정보',
          image: '@/assets/icons/agency.png',
          details: [
            { label: '여행사', value: 'agency_name' },
            { label: '국가', value: 'country' },
            { label: '지역', value: 'agency_region' },
            { label: '하루', value: 'agency_price', suffix: '원' },
            { id: 'agencyCode', type: 'text', model: 'agency_code' },
          ],
        },
      ];
  
      return {
        packageState,
        submitForm,
        upperFields,
        partners,
      };
    },
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
    height: 630px;
    border-radius: 4px;
    @apply bg-white;
  }
  legend {
    font-size: 1.5rem;
  }
  
  .form-upper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 30%;
    box-shadow: 2px 4px 15px 3px rgba(0, 0, 0, 0.2);
  }
  .form-middle {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    height: 50%;
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
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
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
  
  <!-- FieldGroup.vue
  <template>
    <div>
      <div v-for="(field, index) in fields" :key="index" class="form-item">
        <label :for="field.id"><legend>{{ field.label }}</legend></label>
        <span v-if="!isEditing">{{ packageDetail[field.model] }}</span>
        <input
          v-if="isEditing && field.type === 'text'"
          :type="field.type"
          :id="field.id"
          v-model="packageDetail[field.model]"
          autocomplete="off" />
        <input
          v-if="isEditing && field.type === 'date'"
          :type="field.type"
          :id="field.id"
          v-model="packageDetail[field.model]"
          autocomplete="off" />
        <select
          v-if="isEditing && field.type === 'select'"
          class="custom-select"
          :id="field.id"
          v-model="packageDetail[field.model]">
          <option
            v-for="option in field.options"
            :key="option[field.optionKey]"
            :value="option[field.optionLabel]">
            {{ option[field.optionLabel] }}
          </option>
        </select>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FieldGroup',
    props: {
      fields: Array,
      isEditing: Boolean,
      packageDetail: Object,
    },
  };
  </script> -->
  
  <!-- PartnerInfo.vue
  <template>
    <div class="partner-info-container">
      <label :for="details[details.length - 1].id"><legend>{{ label }}</legend></label>
      <div class="partner-info-box">
        <img :src="image" alt="icon" loading="lazy" />
        <span
          v-for="(detail, index) in details.slice(0, -1)"
          :key="index"
          v-if="!isEditing">
          {{ detail.label }} {{ packageDetail[detail.value] }}{{ detail.suffix || '' }}
        </span>
        <input
          v-if="isEditing && details[details.length - 1].type === 'text'"
          :type="details[details.length - 1].type"
          :id="details[details.length - 1].id"
          v-model="packageDetail[details[details.length - 1].model]"
          autocomplete="off" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PartnerInfo',
    props: {
      label: String,
      image: String,
      details: Array,
      isEditing: Boolean,
      packageDetail: Object,
    },
  };
  </script> -->
  