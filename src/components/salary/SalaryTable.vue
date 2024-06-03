<template>
  <div class="salary-table">
    <table>
      <caption>
        급여
      </caption>
      <thead>
        <tr>
          <th>급여 항목</th>
          <th>금액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in salaryData" :key="item.salary_item_code">
          <td>{{ item.salary_item_code }}</td>
          <td class="amount">{{ $formatNumber(item.amount) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "SalaryTable",
  props: {
    salaryData: {
      type: Array,
      required: true,
    },
    salaryItem: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {},
};
</script>

<style scoped>
/* TAG */
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  width: 50%;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
/* CLASS */
.salary-table {
  flex: 1;
  max-width: 25%;
}
.amount {
  text-align: right;
}
</style>
