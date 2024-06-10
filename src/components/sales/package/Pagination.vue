<template>
    <div class="pagination">
      <button @click="goToFirstPage" :disabled="currentPage === 1">«</button>
      <button @click="prevGroup" v-if="totalPages > 10" :disabled="startPage <= 1">‹</button>
      <button v-for="page in pageNumbers" :key="page" @click="goToPage(page)" :class="{ active: currentPage === page }">{{ page }}</button>
      <button @click="nextGroup" v-if="totalPages > 10" :disabled="endPage >= totalPages">›</button>
      <button @click="goToLastPage" :disabled="currentPage === totalPages">»</button>
    </div>
  </template>
  
  <script>
  import { inject, computed } from 'vue';
  
  export default {
    name: 'Pagination',
    setup() {
      const currentPage = inject('currentPage');
      const totalPages = inject('totalPages');
      const setCurrentPage = inject('setCurrentPage');
  
      const prevPage = () => {
        if (currentPage.value > 1) {
          setCurrentPage(currentPage.value - 1);
        }
      };
  
      const nextPage = () => {
        if (currentPage.value < totalPages.value) {
          setCurrentPage(currentPage.value + 1);
        }
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
  
      const startPage = computed(() => Math.floor((currentPage.value - 1) / 10) * 10 + 1);
      const endPage = computed(() => Math.min(startPage.value + 9, totalPages.value));
  
      const pageNumbers = computed(() => {
        const pages = [];
        for (let i = startPage.value; i <= endPage.value; i++) {
          pages.push(i);
        }
        return pages;
      });
  
      return {
        currentPage,
        totalPages,
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
  
  <style scoped>
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
  