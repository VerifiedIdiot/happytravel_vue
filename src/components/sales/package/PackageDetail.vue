<template>
  <div class="modal-overlay" @keydown.esc="handleClose">
    <div class="modal-content" tabindex="2">
      <h2>Package Details</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="packageName">Package Name:</label>
          <input type="text" id="packageName" v-model="packageDetail.package_name" />
        </div>
        <div>
          <label for="country">Country:</label>
          <input type="text" id="country" v-model="packageDetail.country" />
        </div>
        <div>
          <label for="startDate">Start Date:</label>
          <input type="date" id="startDate" v-model="packageDetail.start_date" />
        </div>
        <div>
          <label for="endDate">End Date:</label>
          <input type="date" id="endDate" v-model="packageDetail.end_date" />
        </div>
        <div>
          <label for="saleStartDate">Sale Start Date:</label>
          <input type="date" id="saleStartDate" v-model="packageDetail.sale_start_date" />
        </div>
        <div>
          <label for="saleEndDate">Sale End Date:</label>
          <input type="date" id="saleEndDate" v-model="packageDetail.sale_end_date" />
        </div>
        <div>
          <label for="assignCode">Assign Code:</label>
          <input type="text" id="assignCode" v-model="packageDetail.assign_code" />
        </div>
        <button type="submit">Save</button>
        <button type="button" @click="handleDelete">Delete</button>
        <button type="button" @click="handleClose">Close</button>
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

    onMounted(async () => {
      if (packageCode && packageCode.value) {
        try {
          const data = await getPackage({ packageCode: packageCode.value, empId });
          console.log(data);
          packageDetail.value = data;
        } catch (error) {
          console.error('Failed to fetch package details:', error);
        }
      }
    });

    const submitForm = async () => {
      try {
        await updatePackage(packageDetail.value);
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
      submitForm,
      handleDelete,
      handleClose
    };
  }
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
