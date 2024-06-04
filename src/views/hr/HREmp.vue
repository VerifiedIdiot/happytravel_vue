<template>
  <div id="HREmp">
    <div class="empList1">
      <span>사원 리스트 조회</span>
      <p>
        <span>
          <select v-model="searchType" name="emplist2" id="emplist2">
            <option value="">-</option>
            <option value="emp_id">사원번호</option>
            <option value="emp_name">사원명</option>
            <option value="dept_code">부서명</option>
            <option value="pos_code">직급</option>
          </select>
          <input v-model="searchQuery" type="text" />
          <button @click="handleSearch">조회</button>
        </span>
      </p>
      <div class="list">
        <table>
          <colgroup width="100px">
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>
          <thead>
            <tr>
              <th>사원번호</th>
              <th>사원명</th>
              <th>부서</th>
              <th>직급</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="empList.length > 0">
              <template v-for="emp in filteredEmpList" :key="emp.emp_id">
                <tr @click="updateEmpInfoHandler(emp.emp_id)">
                  <td>{{ emp.emp_id }}</td>
                  <td>{{ emp.emp_name }}</td>
                  <td>{{ emp.dept_name }}</td>
                  <td>{{ emp.pos_name }}</td>
                </tr>
              </template>
            </template>
            <template v-else>
              <tr>
                <td colspan="7">데이터 없음</td>
              </tr>
            </template>
          </tbody>
        </table>
        <div>
          <button @click="handleNewEmp">신규등록</button>
        </div>
      </div>
    </div>
    <div v-if="onEmpForm">
      <EmpForm :employee="employee" />
      <!-- :employee="selectedEmployee" -->
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { getEmpList, getEmpInfo, searchEmpList } from "@/api/hr/EmpApi";
import EmpForm from "@/components/hr/EmpForm.vue";

export default {
  name: "HREmp",
  setup() {
    const empList = ref([]);
    const onEmpForm = ref(false);
    const employee = ref([]);

    const searchType = ref("");
    const searchQuery = ref("");

    const fetchEmpListHandler = async () => {
      try {
        empList.value = await getEmpList();
      } catch (error) {
        console.error("Error fetching empList:", error);
      }
    };

    const showEmpForm = () => {
      onEmpForm.value = true;
    };

    const updateEmpInfoHandler = async (empId) => {
      try {
        const empInfo = await getEmpInfo(empId);
        employee.value = empInfo; // empInfo를 selectedEmployee에 할당
        onEmpForm.value = true;
      } catch (error) {
        console.error("Error fetching emp info: ", error);
      }
    };

    const handleNewEmp = () => {
      employee.value = null; // 신규 등록 시 selectedEmployee를 null로 설정
      onEmpForm.value = true;
    };

    const filteredEmpList = computed(() => {
      if (!searchType.value || !searchQuery.value) {
        return empList.value;
      }
      return empList.value.filter((emp) => {
        if (searchType.value === "dept_code") {
          return emp.dept_name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());
        } else if (searchType.value === "pos_code") {
          return emp.pos_name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());
        } else {
          emp[searchType.value]
            .toString()
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());
        }
      });
    });

    const handleSearch = async () => {
      if (!searchType.value || !searchQuery.value) {
        alert("검색 조건을 입력하세요.");
        return;
      }
      try {
        empList.value = await searchEmpList(
          searchType.value,
          searchQuery.value
        );
      } catch (error) {
        console.error("Error searching empList:", error);
      }
    };

    onMounted(() => {
      fetchEmpListHandler();
    });
    return {
      empList,
      onEmpForm,
      showEmpForm,
      updateEmpInfoHandler,
      employee,
      handleNewEmp,
      searchType,
      searchQuery,
      filteredEmpList,
      handleSearch,
    };
  },
  data() {
    return {};
  },
  components: {
    EmpForm,
  },
};
</script>

<style>
#HREmp {
  display: flex;
  justify-content: left;
}
#HREmp .empList1,
#HREmp .empSave {
  padding: 30px;
}
#HREmp .empList1 tr td {
  text-align: center;
}
.empSave div p {
  margin: 10px 0;
}
.empSave div p input {
  margin: 0 10px;
}
</style>
