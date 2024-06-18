<template>
  <div class="pagination">
    <button @click="goToFirstPage" :disabled="currentPage === 1">«</button>
    <button
      @click="prevGroup"
      v-if="totalPages > 10"
      :disabled="startPage <= 1">
      ‹
    </button>
    <button
      v-for="page in pageNumbers"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: currentPage === page }">
      {{ page }}
    </button>
    <button
      @click="nextGroup"
      v-if="totalPages > 10"
      :disabled="endPage >= totalPages">
      ›
    </button>
    <button @click="goToLastPage" :disabled="currentPage === totalPages">
      »
    </button>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue';

const partnerState = inject('partnerState');
const flightState = inject('flightState');
const hotelState = inject('hotelState');
const agencyState = inject('agencyState');
const fetchFlights = inject('fetchFlights');
const fetchHotels = inject('fetchHotels');
const fetchAgencies = inject('fetchAgencies');

const currentState = computed(() => {
  if (partnerState.selectedCategory === 'flight') {
    return flightState;
  } else if (partnerState.selectedCategory === 'hotel') {
    return hotelState;
  } else if (partnerState.selectedCategory === 'agency') {
    return agencyState;
  }
  return { currentPage: 1, totalPages: 1 };
});

const currentPage = computed(() => currentState.value.currentPage);
const totalPages = computed(() => currentState.value.totalPages);

const fetchPartners = () => {
  if (partnerState.selectedCategory === 'flight') {
    fetchFlights();
  } else if (partnerState.selectedCategory === 'hotel') {
    fetchHotels();
  } else if (partnerState.selectedCategory === 'agency') {
    fetchAgencies();
  }
};

const setCurrentPage = (page) => {
  currentState.value.currentPage = page;
  fetchPartners();
};

const goToPage = (page) => {
  setCurrentPage(page);
};

const goToFirstPage = () => {
  setCurrentPage(1);
};

const goToLastPage = () => {
  setCurrentPage(totalPages.value);
};

const prevGroup = () => {
  if (startPage.value > 1) {
    setCurrentPage(startPage.value - 10);
  }
};

const nextGroup = () => {
  if (endPage.value < totalPages.value) {
    setCurrentPage(startPage.value + 10);
  }
};

const startPage = computed(
  () => Math.floor((currentPage.value - 1) / 10) * 10 + 1
);

const endPage = computed(() => Math.min(startPage.value + 9, totalPages.value));

const pageNumbers = computed(() => {
  const pages = [];
  for (let i = startPage.value; i <= endPage.value; i++) {
    pages.push(i);
  }
  return pages;
});
</script>

<style scoped="scss">
.pagination {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  background: white;
  border: 1px solid #ddd;
  font-size: 16px;
}

.pagination button.active {
  font-weight: bold;
  color: white;
  background-color: #007bff;
}

.pagination button:disabled {
  opacity: 0.5;
}
</style>
