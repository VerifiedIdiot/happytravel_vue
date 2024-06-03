<template>
  <div class="total-table">
    <div class="row">
      <table class="total-salary-table">
        <thead>
          <tr>
            <th class="hidden-tag">코드</th>
            <th>급여 항목</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in salaryBodyData" :key="item.code">
            <td class="hidden-tag">{{ item.code }}</td>
            <td>{{ item.name }}</td>
            <td class="amount">{{ formatNumber(item.amount) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr v-for="item in salaryFootData" :key="item.code">
            <td class="hidden-tag">{{ item.code }}</td>
            <td class="item-name">{{ item.name }}</td>
            <td class="amount">{{ formatNumber(item.amount) }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="row"><br /><br /><br /><br /><br /></div>
    <div class="row">
      <table class="total-deduction-table">
        <thead>
          <tr>
            <th class="hidden-tag">코드</th>
            <th>급여 항목</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in deductionBodyData" :key="item.code">
            <td class="hidden-tag">{{ item.code }}</td>
            <td>{{ item.name }}</td>
            <td class="amount">{{ formatNumber(item.amount) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr v-for="item in deductionFootData" :key="item.code">
            <td class="hidden-tag">{{ item.code }}</td>
            <td class="item-name">{{ item.name }}</td>
            <td class="amount">{{ formatNumber(item.amount) }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TotalSalaryTable",
  props: {
    totalSalaryData: {
      type: Array,
      required: true,
    },
    salaryItem: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      mergedTotalSalaryData: [],
      salaryBodyData: [],
      salaryFootData: [],
      deductionBodyData: [],
      deductionFootData: [],
    };
  },
  mounted() {
    this.totalDataFilter();
  },
  computed: {},
  methods: {
    mergedTotalSalaryDataFunc() {
      this.mergedTotalSalaryData = this.totalSalaryData.map((dataItem) => {
        const matchingItem = this.salaryItem.find(
          (item) => item.salary_item_code === dataItem.salary_item_code
        );
        return {
          code: dataItem.salary_item_code,
          name: matchingItem.salary_item_name,
          amount: dataItem.amount,
        };
      });
    },
    totalDataFilter() {
      this.mergedTotalSalaryDataFunc();
      this.salaryBodyData = this.mergedTotalSalaryData.filter(
        (item) => item.code.charAt() === "1"
      );
      this.salaryFootData = this.mergedTotalSalaryData.filter(
        (item) => item.code.charAt() === "8"
      );
      this.deductionBodyData = this.mergedTotalSalaryData.filter(
        (item) => item.code.charAt() === "2"
      );
      this.deductionFootData = this.mergedTotalSalaryData.filter(
        (item) => item.code.charAt() === "9"
      );
      return;
    },
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
  border: 2px solid #dddddd;
  vertical-align: middle;
}
th {
  text-align: center;
  font-weight: bold;
  background-color: #f0f0f0;
}
td {
  padding-left: 10px;
}
tbody td {
  background-color: #ffffff;
}
tfoot {
  background-color: #a7ccfa;
  letter-spacing:normal;
  text-align: center;
}
/* CLASS */
.total-table {
  flex: 1;
  max-width: 25%;
  background-color: #f7f7f7;
}
.hidden-tag {
  display: none;
}
.item-name {
  font-weight: bold;
}
.amount {
  text-align: right;
  padding-right: 10px;
  font-weight: bold;
}
</style>
