<template>
  <div class="wrapper">
    <div class="partner-container">
      <table>
        <thead>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
          </tr>
        </tbody>
      </table>
    <Pagination />
    </div>
  </div>
</template>

<script setup>
import Pagination from '@/components/sales/package/Pagination.vue';


const selectPartner = () => {};
</script>

<style lang="scss" scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid black;
  width: 95%;
  height: 95%;
}

.partner-container {
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 85%;
}

table {
  /* border: 1px solid black; */
  border-spacing: 0;
}

th,
td {
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
