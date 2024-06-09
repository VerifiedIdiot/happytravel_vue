<template>
  <div class="wrapper">
    <div class="package-container">
      <div class="package-box">
        <div class="package-item">
          <button class="btn-create" @click="openModal"><p>신규등록</p></button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>여행상품 이름</th>
            <th>여행국가</th>
            <th>여행시작일</th>
            <th>여행종료일</th>
            <th>여행상품 판매 시작일</th>
            <th>여행상품 판매 종료일</th>
            <th>결제유무</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="pkg in packages"
            :key="pkg.package_code"
            @click="openModal(pkg.package_code)">
            <td>{{ pkg.package_name }}</td>
            <td>{{ pkg.country }}</td>
            <td>{{ pkg.start_date }}</td>
            <td>{{ pkg.end_date }}</td>
            <td>{{ pkg.sale_start_date }}</td>
            <td>{{ pkg.sale_end_date }}</td>
            <td>{{ pkg.assign_code }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <PackageModal v-if="isModalOpen" @close="closeModal">
      <PackageDetail :packageCode="packageCode" :isEditing="isEditing" :empId="empId" @update:isEditing="setIsEditing"/>
    </PackageModal>
  </div>

</template>

<script>
import { ref, onMounted, provide } from 'vue';
import { getPackageList } from '@/api/sales/PackageApi';
import PackageDetail from '@/components/sales/package/PackageDetail.vue';
import PackageModal from '@/components/sales/package/PackageModal.vue';

export default {
  name: 'PackageDashboard',
  components: {
    PackageDetail,
    PackageModal
  },
  setup() {
    const packages = ref([]);
    const isModalOpen = ref(false);
    const packageCode = ref('');
    const empId = sessionStorage.getItem('empId') || 'EMP30002';
    const isEditing = ref(false);

    onMounted(async () => {
      try {
        const params = { empId };
        const data = await getPackageList(params);
        packages.value = data;
      } catch (error) {
        console.error('Failed to fetch packages:', error);
      }
    });

    const openModal = (pkgCode = '') => {
      packageCode.value = pkgCode; 
      isModalOpen.value = true; 
      
    };

    const closeModal = () => {
      isModalOpen.value = false; // 모달 닫기
    };

    const setIsEditing = (editing) => {
      isEditing.value = editing;
    };

    provide('empId', empId);
    provide('packageCode', packageCode);
    provide('isEditing', isEditing);
    return {
      packages,
      isModalOpen,
      openModal,
      closeModal,
      packageCode,
      empId,
      isEditing,
      setIsEditing
    };
  },
};
</script>

<style src="./packageDashboard.css"></style>
