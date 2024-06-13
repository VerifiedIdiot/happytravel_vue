<template>
  <div class="data-sheet">
    <h3>{{ date }}</h3>
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>직급</th>
          <th>날짜</th>
          <th>근태종류</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vacation in vacations" :key="vacation.name">
          <td>{{ vacation.name }}</td>
          <td>{{ vacation.position }}</td>
          <td>{{ vacation.date }}</td>
          <td>{{ vacation.attendanceType }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  props: {
    date: {
      type: String,
      required: true,
    },
    vacations: {
      type: Array,
      required: true,
    },
    attendanceType: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.data-sheet {
  margin-top: 20px;
}

.data-sheet table {
  width: 100%;
  border-collapse: collapse;
}

.data-sheet th,
.data-sheet td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.data-sheet th {
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>
