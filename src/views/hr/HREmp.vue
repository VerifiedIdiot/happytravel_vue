<template>
  <div id="hr-emp" class="flex flex-col w-1/4 mx-2 p-px">
    <div id="serch-group" class="flex w-full">
      <select
        id="emplist2"
        name="emplist2"
        v-model="searchType"
        class="w-1/4 h-10 pl-1 border border-gray-200 outline-none"
      >
        <option value="">-</option>
        <option value="emp_id">사원번호</option>
        <option value="emp_name">사원명</option>
        <option value="dept_code">부서명</option>
        <option value="pos_code">직급</option>
      </select>
      <input
        id="searchQuery"
        v-model="searchQuery"
        type="text"
        class="w-1/2 h-10 pl-1 border border-gray-200 outline-none ml-[2px]"
        placeholder="검색어 입력"
      />
      <button
        id="newEmpBtn"
        @click="handleNewEmp"
        class="w-1/4 h-10 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-medium shadow-md outline-none ml-[2px]"
      >
        신규등록
      </button>
    </div>
    <div id="emp-table" class="w-full h-5/6 mt-1">
      <table class="text-center shadow-md border-0">
        <colgroup>
          <col class="w-1/4" />
          <col class="w-1/4" />
          <col class="w-1/4" />
          <col class="w-1/4" />
        </colgroup>
        <thead class="bg-slate-20 sticky top-[-1px]">
          <tr>
            <th class="text-center font-bold border border-gray-200">
              사원번호
            </th>
            <th class="text-center font-bold border border-gray-200">사원명</th>
            <th class="text-center font-bold border border-gray-200">부서</th>
            <th class="text-center font-bold border border-gray-200">직급</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <template v-if="empList.length > 0">
            <template v-for="emp in filteredEmpList" :key="emp.emp_id">
              <tr
                @click="updateEmpInfoHandler(emp.emp_id)"
                class="bg-white hover:bg-slate-50"
              >
                <td class="border border-gray-200">
                  {{ emp.emp_id }}
                </td>
                <td class="border border-gray-200">
                  {{ emp.emp_name }}
                </td>
                <td class="border border-gray-200">
                  {{ emp.dept_name }}
                </td>
                <td class="border border-gray-200">
                  {{ emp.pos_name }}
                </td>
              </tr>
            </template>
          </template>
          <template v-else>
            <tr>
              <td colspan="4" class="text-center">데이터 없음</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
  <div id="hr-emp-form" class="flex w-6/12 mx-2 p-px h-full overflow-scroll">
    <EmpForm
      v-if="onEmpForm"
      :employee="employee"
      @saved="handleEmpSaved"
      :imgSrc="imgSrc"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import {
  getEmpList,
  getEmpInfo,
  searchEmpList,
  generateLastEmpId,
} from "@/api/hr/HREmpApi";
import EmpForm from "@/components/hr/EmpForm.vue";

export default {
  name: "HREmp",
  components: {
    EmpForm,
  },
  setup() {
    const onEmpForm = ref(false);

    const empList = ref([]);
    const employee = ref([]);
    const imgSrc = ref(null);

    const searchType = ref("");
    const searchQuery = ref("");

    // 사원 리스트 불러오기
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
        let empInfo = await getEmpInfo(empId);
        employee.value = empInfo.employee;
        imgSrc.value = `data:image/jpeg;base64,${empInfo.imageData}`;
        onEmpForm.value = true;

        sessionStorage.setItem("loginInfo",JSON.stringify({
          empId: employee.value.emp_id,
          empName: employee.value.emp_name,
          deptCode: employee.value.dept_code,
          posCode: employee.value.pos_code,
        }));

        console.log(sessionStorage.getItem("loginInfo"));

      } catch (error) {
        console.error("Error fetching emp info: ", error);
      }
    };

    const handleNewEmp = async () => {
      const newId = await generateLastEmpId();
      employee.value = {
        emp_id: `${newId}`,
        password: "000000",
        photo_url: "",
        emp_name: "",
        dept_code: "",
        pos_code: "",
        join_date: "",
        ssn: "",
        zip_code: "",
        address: "",
        address_detail: "",
        phone: "",
        mobile: "",
        status_code: "",
        leave_date: "",
        bank_code: "",
        account_no: "",
        salary: "",
        remarks: "",
      };
      imgSrc.value = null;
      onEmpForm.value = true;
    };

    const handleEmpSaved = async () => {
      onEmpForm.value = false;
      await fetchEmpListHandler();
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
        } else if (searchType.value === "emp_id") {
          return emp.emp_id
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());
        } else if (searchType.value === "emp_name") {
          return emp.emp_name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());
        }
      });
    });

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
      handleEmpSaved,
      imgSrc,
    };
  },
};
</script>

<style scoped>
#hr-emp-form::-webkit-scrollbar {
  display: none;
}
#emp-table {
  overflow: scroll;
  -ms-overflow-style: none;
}
#emp-table::-webkit-scrollbar {
  display: none;
}
table * {
  background-color: white;
}
input,
select,
textarea,
th,
td {
  border: 1.5px solid rgb(245, 245, 245);
}
tr {
  background-color: #fff;
  height: 30px;
}
tbody tr {
}
tbody tr:hover {
  background: rgb(235, 235, 235);
}
table,
thead,
tbody,
th {
  background: rgb(229 231 235);
}
</style>
