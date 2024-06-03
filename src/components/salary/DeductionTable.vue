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
  },
  data() {
    return {};
  },
  mounted() {
    // 여기에 mounted 로직을 추가하세요
  },
  computed: {
    // 여기에 computed 속성을 추가하세요
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
}
th {
  background-color: #f2f2f2;
  font-weight: bold;
}
/* CLASS */
.deduction-table {
  flex: 1;
  max-width: 25%;
}
</style>
