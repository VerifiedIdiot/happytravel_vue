<template>
  <div class="modal-overlay" @keydown.esc="handleClose">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header-item">
          <img src="@/assets/icons/flight.png" />
        </div>
        <h1>여행상품 상세</h1>
      </div>

      <form @submit.prevent="submitForm">
        <div class="form-upper">
          <div>
            <label for="packageName"><legend>상품 이름</legend></label>
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
        <div class="form-middle">
          <div>
            <label for="agencyCode"><legend>현지 여행사 정보</legend></label>
            <div class="partner-info">
            <span v-if="!isEditing">{{ packageDetail.agency_code }}</span>
            <input
              v-else
              type="text"
              id="agencyCode"
              v-model="packageDetail.agency_code" />
            </div>
          </div>
          <div>
            <label for="flightCode"><legend>항공권 정보</legend></label>
            <div class="partner-info">
            <span v-if="!isEditing">{{ packageDetail.flight_code }}</span>
            <input
              v-else
              type="text"
              id="flightCode"
              v-model="packageDetail.flight_code" />
            </div>
          </div>
          <div>
            <label for="hotelCode"><legend>호텔 정보</legend></label>
            <div class="partner-info">
            <span v-if="!isEditing">{{ packageDetail.hotel_code }}</span>
            <input
              v-else
              type="text"
              id="hotelCode"
              v-model="packageDetail.hotel_code" />
            </div>
          </div>
        </div>
        <div class="form-under">
          <div>
            <label for="totalPrice"><legend>원가</legend></label>
            <span>{{ packageDetail.total_price }}</span>
          </div>
          <div>
            <label for="salePrice"><legend>판매가</legend></label>
            <span>{{ packageDetail.sale_price }}</span>
          </div>
          <div>
            <label for="saleAmount"><legend>판매량</legend></label>
            <span v-if="!isEditing">{{ packageDetail.sale_amount }}</span>
            <input
              v-else
              type="number"
              id="saleAmount"
              v-model="packageDetail.sale_amount" />
          </div>
          <div>
            <label for="assignCode"><legend>승인상태</legend></label>
            <span v-if="!isEditing">{{ packageDetail.assign_code }}</span>
            <input
              v-else
              type="text"
              id="assignCode"
              v-model="packageDetail.assign_code" />
          </div>
        </div>
        
      </form>
      <div class="button-container">
        <button
          type="button"
          class="btn-update"
          v-if="!isEditing"
          @click="isEditing = true">
          수정하기
        </button>
        <button type="submit" class="btn-update" v-if="isEditing">저장</button>
        <!-- <button type="button" class="btn-delete" @click="handleDelete">
          삭제하기
        </button> -->
        <button type="button" class="btn-close" @click="handleClose">
          닫기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref, onMounted } from 'vue';
import { getPackage, updatePackage } from '@/api/sales/PackageApi';

export default {
  name: 'PackageDetail',
  setup(_, { emit }) {
    const packageCode = inject('packageCode');
    const empId = inject('empId');
    const packageDetail = ref({});
    const isEditing = ref(false);
    const hasEditPermission = ref(false);

    onMounted(async () => {
      if (packageCode && packageCode.value) {
        try {
          const data = await getPackage({
            packageCode: packageCode.value,
            empId,
          });
          console.log(data);
          packageDetail.value = data;
          // 권한 확인 로직
          hasEditPermission.value = checkEditPermission(empId); // 예: 특정 조건에 따라 권한 확인
        } catch (error) {
          console.error('Failed to fetch package details:', error);
        }
      }
    });

    const checkEditPermission = (empId) => {
      // 수정 권한 확인 로직 구현
      // 예: empId가 특정 값이면 true 반환
      return empId === 'EMP30002'; // 예시로 'EMP30002'인 경우 수정 권한이 있다고 가정
    };

    const submitForm = async () => {
      try {
        await updatePackage(packageDetail.value);
        isEditing.value = false; // 수정 후 다시 읽기 모드로 전환
        emit('close');
      } catch (error) {
        console.error('Failed to update package:', error);
      }
    };

    const handleDelete = async () => {
      try {
        // 삭제 작업 수행
        emit('close');
      } catch (error) {
        console.error('Failed to delete package:', error);
      }
    };

    const handleClose = () => {
      emit('close');
    };

    return {
      packageDetail,
      isEditing,
      hasEditPermission,
      submitForm,
      handleDelete,
      handleClose,
    };
  },
};
</script>

<style src="./packageDashboard.css"></style>
