<template>
  <div class="pagination">
    <button
      @click="goToFirstPage"
      :disabled="paginationState.currentPage === 1">
      «
    </button>
    <button
      @click="prevGroup"
      v-if="paginationState.totalPages > 10"
      :disabled="startPage <= 1">
      ‹
    </button>
    <button
      v-for="page in pageNumbers"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: paginationState.currentPage === page }">
      {{ page }}
    </button>
    <button
      @click="nextGroup"
      v-if="paginationState.totalPages > 10"
      :disabled="endPage >= paginationState.totalPages">
      ›
    </button>
    <button
      @click="goToLastPage"
      :disabled="paginationState.currentPage === paginationState.totalPages">
      »
    </button>
  </div>
</template>

<script>
import { inject, computed } from 'vue';

export default {
  name: 'AgencyPagination',
  setup() {
    const paginationState = inject('paginationState');
    const fetchFlights = inject('fetchFlights');

    const setCurrentPage = (page) => {
      paginationState.currentPage = page;
      fetchFlights();
    };

    const prevPage = () => {
      if (paginationState.currentPage > 1) {
        setCurrentPage(paginationState.currentPage - 1);
      }
    };

    const nextPage = () => {
      if (paginationState.currentPage < paginationState.totalPages) {
        setCurrentPage(paginationState.currentPage + 1);
      }
    };

    const goToPage = (page) => {
      setCurrentPage(page);
    };

    const goToFirstPage = () => {
      setCurrentPage(1);
    };

    const goToLastPage = () => {
      setCurrentPage(paginationState.totalPages);
    };

    const prevGroup = () => {
      if (startPage.value > 1) {
        setCurrentPage(startPage.value - 10);
      }
    };

    const nextGroup = () => {
      if (endPage.value < paginationState.totalPages) {
        setCurrentPage(startPage.value + 10);
      }
    };

    const startPage = computed(
      () => Math.floor((paginationState.currentPage - 1) / 10) * 10 + 1
    );
    const endPage = computed(() =>
      Math.min(startPage.value + 9, paginationState.totalPages)
    );

    const pageNumbers = computed(() => {
      const pages = [];
      for (let i = startPage.value; i <= endPage.value; i++) {
        pages.push(i);
      }
      return pages;
    });

    return {
      paginationState,
      prevPage,
      nextPage,
      goToPage,
      goToFirstPage,
      goToLastPage,
      prevGroup,
      nextGroup,
      pageNumbers,
      startPage,
      endPage,
    };
  },
};
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