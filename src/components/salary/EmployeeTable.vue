<template>
  <div class="employee-table">
    <table>
      <caption>
        사원 리스트
      </caption>
      <thead>
        <tr>
          <th>사원번호</th>
          <th>사원명</th>
          <th>부서</th>
          <th>직급</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="employee in employees"
          :key="employee.emp_id"
          @click="$emit('select', employee)"
        >
          <td>{{ employee.emp_id }}</td>
          <td :class="{ 'leave-emp': !employee.leave_stat }">
            {{ employee.emp_name }}
          </td>
          <td>{{ employee.dept_name }}</td>
          <td>{{ employee.pos_name }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">
            인원(퇴직)
          </td>
          <td>{{ leaveCount.true }}({{ leaveCount.false }})</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  name: "EmployeeTable",
  props: {
    employees: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selectEmployee(employee) {
      this.$emit("select", employee);
    },
  },
  computed: {
    leaveCount() {
      return this.employees.reduce(
        (counts, employee) => {
          if (employee.leave_stat) {
            counts.true += 1;
          } else {
            counts.false += 1;
          }
          return counts;
        },
        { true: 0, false: 0 }
      );
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
  width: 25%;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
/* CLASS */
.employee-table {
  flex: 1;
  max-width: 25%;
}
.leave-emp {
  color: red;
}
</style>
