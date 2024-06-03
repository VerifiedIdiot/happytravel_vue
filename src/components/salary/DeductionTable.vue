<template>
  <div class="deduction-table">
    <table>
      <caption>
        공제 항목
      </caption>
      <thead>
        <tr>
          <th>공제 항목</th>
          <th>금액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in deductions" :key="item.salary_item_code">
          <td>{{ item.salary_item_code }}</td>
          <td class="amount">{{ $formatNumber(item.amount) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "DeductionTable",
  props: {
    deductions: {
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
  mounted() {
  },
  computed: {
  },
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
.deduction-table {
  flex: 1;
  max-width: 25%;
}
.amount {
  text-align: right;
}
</style>
