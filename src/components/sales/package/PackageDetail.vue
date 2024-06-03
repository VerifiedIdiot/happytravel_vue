<template>
  <div class="modal-overlay" @keydown.esc="handleClose">
    <div class="modal-content">
      <h1>여행상품 상세</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="packageName">Package Name:</label>
          <span v-if="!isEditing">{{ packageDetail.package_name }}</span>
          <input v-else type="text" id="packageName" v-model="packageDetail.package_name" />
        </div>
        <div>
          <label for="country">Country:</label>
          <span v-if="!isEditing">{{ packageDetail.country }}</span>
          <input v-else type="text" id="country" v-model="packageDetail.country" />
        </div>
        <div>
          <label for="startDate">Start Date:</label>
          <span v-if="!isEditing">{{ packageDetail.start_date }}</span>
          <input v-else type="date" id="startDate" v-model="packageDetail.start_date" />
        </div>
        <div>
          <label for="endDate">End Date:</label>
          <span v-if="!isEditing">{{ packageDetail.end_date }}</span>
          <input v-else type="date" id="endDate" v-model="packageDetail.end_date" />
        </div>
        <div>
          <label for="saleStartDate">Sale Start Date:</label>
          <span v-if="!isEditing">{{ packageDetail.sale_start_date }}</span>
          <input v-else type="date" id="saleStartDate" v-model="packageDetail.sale_start_date" />
        </div>
        <div>
          <label for="saleEndDate">Sale End Date:</label>
          <span v-if="!isEditing">{{ packageDetail.sale_end_date }}</span>
          <input v-else type="date" id="saleEndDate" v-model="packageDetail.sale_end_date" />
        </div>
        <div>
          <label for="assignCode">Assign Code:</label>
          <span v-if="!isEditing">{{ packageDetail.assign_code }}</span>
          <input v-else type="text" id="assignCode" v-model="packageDetail.assign_code" />
        </div>
        <div>
          <label for="agencyCode">Agency Code:</label>
          <span v-if="!isEditing">{{ packageDetail.agency_code }}</span>
          <input v-else type="text" id="agencyCode" v-model="packageDetail.agency_code" />
        </div>
        <div>
          <label for="flightCode">Flight Code:</label>
          <span v-if="!isEditing">{{ packageDetail.flight_code }}</span>
          <input v-else type="text" id="flightCode" v-model="packageDetail.flight_code" />
        </div>
        <div>
          <label for="hotelCode">Hotel Code:</label>
          <span v-if="!isEditing">{{ packageDetail.hotel_code }}</span>
          <input v-else type="text" id="hotelCode" v-model="packageDetail.hotel_code" />
        </div>
        <div>
          <label for="saleAmount">Sale Amount:</label>
          <span v-if="!isEditing">{{ packageDetail.sale_amount }}</span>
          <input v-else type="number" id="saleAmount" v-model="packageDetail.sale_amount" />
        </div>
        <div>
          <label for="salePrice">Sale Price:</label>
          <span>{{ packageDetail.sale_price }}</span>
        </div>
        <div>
          <label for="totalPrice">Total Price:</label>
          <span>{{ packageDetail.total_price }}</span>
        </div>
        <button type="button" class="btn-update" v-if="!isEditing" @click="isEditing = true">수정하기</button>
        <button type="submit" class="btn-update" v-if="isEditing">저장</button>
        <button type="button" class="btn-delete" @click="handleDelete">삭제하기</button>
        <button type="button" class="btn-close" @click="handleClose">닫기</button>
      </form>
      
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
          const data = await getPackage({ packageCode: packageCode.value, empId });
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
      handleClose
    };
  }
};
</script>

<style src="./packageDashboard.css"></style>
