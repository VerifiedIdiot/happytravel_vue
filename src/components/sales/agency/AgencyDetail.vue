<template>
  <div class="modal-overlay" @keydown.esc="handleClose">
    <div class="modal-content">
      <div class="modal-header">
        <h1>{{ flightDetail.flight_code ? "✈️ Edit" : "✈️ New" }}</h1>
      </div>
      <form @submit.prevent="submitForm">
        <div class="form-upper">
          <div>
            <label for="packageName"><legend>여행사 이름</legend></label>
            <span v-if="!isEditing">{{ packageDetail.package_name }}</span>
            <input
              v-else
              type="text"
              id="packageName"
              v-model="packageDetail.package_name" />

            <label for="country"><legend>국가</legend></label>
            <span v-if="!isEditing">{{ packageDetail.country }}</span>
            <input
              v-else
              type="text"
              id="country"
              v-model="packageDetail.country" />
          </div>
          <div>
            <label for="startDate"><legend>여행시작일</legend></label>
            <span v-if="!isEditing">{{ packageDetail.start_date }}</span>
            <input
              v-else
              type="date"
              id="startDate"
              v-model="packageDetail.start_date" />
            <label for="endDate"><legend>여행종료일</legend></label>
            <span v-if="!isEditing">{{ packageDetail.end_date }}</span>
            <input
              v-else
              type="date"
              id="endDate"
              v-model="packageDetail.end_date" />
          </div>
          <div>
            <label for="saleStartDate"><legend>판매시작일</legend></label>
            <span v-if="!isEditing">{{ packageDetail.sale_start_date }}</span>
            <input
              v-else
              type="date"
              id="saleStartDate"
              v-model="packageDetail.sale_start_date" />
            <label for="saleEndDate"><legend>판매종료일</legend></label>
            <span v-if="!isEditing">{{ packageDetail.sale_end_date }}</span>
            <input
              v-else
              type="date"
              id="saleEndDate"
              v-model="packageDetail.sale_end_date" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AgencyDetail',
  setup() {
    const agencies = ref([]);

    const fetchAgencies = async () => {
      try {
        agencies.value = await getAgencyList();
        console.log('Fetched agencies:', agencies.value);
      } catch (error) {
        console.error('Error fetching agencies list:', error);
      }
    };

    const formatPrice = (price) => {
      return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
    };

    onMounted(fetchAgencies);

    return {
      agencies,
      formatPrice,
    };
  },
};
</script>

<style>
</style>