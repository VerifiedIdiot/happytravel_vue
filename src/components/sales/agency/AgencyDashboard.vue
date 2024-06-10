<template>
  <div class="wrapper">
    <div class="agency-container">
      <div class="agency-box">
        <div class="agency-item">
          <button class="btn-create" @click="openModal"><p>신규등록</p></button>
        </div>
      </div>
      <div>
      <table>
      <thead>
        <tr>
          <th>여행사 이름</th>
          <th>전화번호</th>
          <th>나라</th>
          <th>지역</th>
          <th>주소</th>
          <th>가격</th>
          <th>
            <select v-model="filterOption">
              <option value="all">전체</option>
              <option value="Y">사용</option>
              <option value="N">미사용</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="agency in filterAgencys"
          :key="agency.agency_code"
          @click="openModal(agency)"
        >
          <td>{{ agency.agency_name }}</td>
          <td>{{ agency.phone }}</td>
          <td>{{ agency.country }}</td>
          <td>{{ agency.region }}</td>
          <td>{{ agency.address }}</td>
          <td>{{ formatPrice(agency.price) }}</td>
          <td>{{ agency.is_used }}</td>
        </tr>
      </tbody>
    </table>
    </div>
    </div>
    
  </div>

  <AgencyDetail
    v-if="isModalOpen"
    :agency="currentAgency"
    @close="closeModal"
  />
</template>

<script>
import { ref, onMounted, computed, provide } from "vue";
import { getAgencyList } from "@/api/sales/AgencyApi";
import AgencyDetail from "@/components/sales/agency/AgencyDetail.vue";

export default {
  name: "AgencyDashboard",
  components: {
    AgencyDetail,
  },
  setup() {
    const agencies = ref([]);
    const isModalOpen = ref(false);
    const AgencyCode = ref("");
    const currentAgency = ref(null);
    const filterOption = ref("all");

    // 건들지말고해
    const fetchAgencies = async () => {
      try {
        agencies.value = await getAgencyList();
        console.log("Fetched agencies:", agencies.value);
      } catch (error) {
        console.error("Error fetching agencies list:", error);
      }
    };

    const formatPrice = (price) => {
      return new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
      }).format(price);
    };

    const filterAgencys = computed(() => {
      if (filterOption.value === "all") {
        return agencies.value;
      }
      return agencies.value.filter(
        (agency) => agency.is_used === filterOption.value
      );
    });

    const openModal = (agency) => {
      currentAgency.value = agency;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      currentAgency.value = null;
    };

    // 건들지말고해
    onMounted(fetchAgencies);

    return {
      agencies,
      formatPrice,
      isModalOpen,
      openModal,
      closeModal,
      currentAgency,
      filterAgencys,
      filterOption,
    };
  },
};
</script>

<style src="./AgencyDashboard.css"></style>