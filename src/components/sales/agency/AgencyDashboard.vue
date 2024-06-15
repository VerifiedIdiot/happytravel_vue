<template>
  <div class="wrapper">
    <div class="agency-container">
      <div class="agency-box">
        <div class="agency-item">
          <button class="btn-create" @click="openModalForCreate()">
            <p>신규등록</p>
          </button>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>여행사 이름</th>
              <th>전화번호</th>
              <th>국가</th>
              <th>주소</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="agy in agencies"
              :key="agy.agency_code"
              @click="openModal(agy.agency_code)"
            >
              <td>{{ agy.agency_name }}</td>
              <td>{{ agy.phone }}</td>
              <td>{{ agy.country }}</td>
              <td>{{ agy.address }}</td>
              <td>{{ agy.price }}</td>
            </tr>
          </tbody>
        </table>
        
      </div>
      <AgencyModal v-if="agencyState.isModalOpen" @close="closeModal">
        <AgencyDetail />
      </AgencyModal>
    </div>
    <Pagination />
  </div>
</template>

<script setup>
import { inject, onMounted } from "vue";
import { getAgency, getCountries } from "@/api/sales/AgencyApi";
import AgencyDetail from "@/components/sales/agency/AgencyDetail.vue";
import AgencyModal from "@/components/sales/agency/AgencyModal.vue";
import Pagination from "@/components/sales/agency/AgencyPagination.vue";

const agencies = inject("agencies")
const agencyState = inject("agencyState")
const resetAgencyState = inject("resetAgencyState");
const fetchAgencies = inject("fetchAgencies")
const empId = inject("empId");

onMounted(fetchAgencies);

const openModal = async (agyCode = "") => {
  agencyState.agenciesCode = agyCode;
  try {
    if (agyCode) {
      const data = await getAgency({
        agencyCode: agyCode,
        empId: empId,
      });
      agencyState.agencyDetail = data;
    } else {
      agencyState.agencyDetail = {};
    }

    if (agencyState.agencyDetail) {
      agencyState.isModalOpen = true;
    }
  } catch (error) {
    console.error("Failed to load agency details:", error);
  }
};

const openModalForCreate = async () => {
  resetAgencyState();
  agencyState.isEditing = true;
  const countryData = await getCountries();
  agencyState.countries = countryData;
  if (agencyState.countries.length > 0 && agencyState.isEditing) {
    agencyState.isModalOpen = true;
  }
};

const closeModal = () => {
  resetAgencyState();
  agencyState.isModalOpen = false;
};
</script>

<style src="./AgencyDashboard.css"></style>
