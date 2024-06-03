<template>
  <div class="total-salary-box">
    <table id="total-salary-table">
      <thead>
        <tr>
          <th>
            급여 항목
          </th>
          <th>금액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in mergedTotalSalaryDate" :key="item.code">
          <td>{{ item.code }}</td>
          <td>{{ item.name }}</td>
          <td class="amount">{{ formatNumber(item.amount) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scope>
/* TAG */
/* CLASS */
.total-salary-box {
  flex: 1;
  max-width: 25%;
}
.row {
  display: flex;
}
.col {
  flex: 1;
}
</style>
