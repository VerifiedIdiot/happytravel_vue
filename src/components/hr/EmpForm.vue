<template>
  <!-- 사원등록 / 수정 화면 -->
  <div>사원 등록</div>
  <div class="empSave">
    <div>
      <p>
        사원번호<input
          type="text"
          v-model="thisEmployee.emp_id"
          :readonly="isReadOnly"
        />
      </p>
      <!-- 사원번호 자동생성 ex) 입사년도4자리 + 입사순서 4자리 -->
      <p>비밀번호<input type="password" v-model="thisEmployee.password" /></p>
      <p>사원명<input type="text" v-model="thisEmployee.emp_name" /></p>
      <p>
        입사일자<input
          type="date"
          v-model="thisEmployee.join_date"
          :readonly="isReadOnly"
        />
      </p>
      <p>
        주민등록번호<input
          type="text"
          v-model="thisEmployee.ssn"
          :readonly="isReadOnly"
        />
      </p>
      <p>
        주소<input
          type="text"
          placeholder="우편번호"
          v-model="thisEmployee.zip_code"
        /><input type="text" v-model="thisEmployee.address" /><button>
          검색
        </button>
      </p>
      <!-- 주소 검색 팝업창 -->
      <p>상세주소<input type="text" v-model="thisEmployee.address_detail" /></p>
      <p>전화번호<input type="text" v-model="thisEmployee.phone" /></p>
      <p>휴대전화<input type="text" v-model="thisEmployee.mobile" /></p>
      <p>
        부서
        <select name="" id="" v-model="thisEmployee.dept_code">
          <option value="">-</option>
          <option
            :value="department.dept_code"
            v-for="department in departmentList"
            :key="department.dept_code"
          >
            {{ department.dept_name }}
          </option>
        </select>
      </p>
      <p>
        직급
        <select name="" id="" v-model="thisEmployee.pos_code">
          <option value="">-</option>
          <option
            :value="position.pos_code"
            v-for="position in positionList"
            :key="position.pos_code"
          >
            {{ position.pos_name }}
          </option>
        </select>
      </p>
      <p>
        재직상태
        <select name="" id="" v-model="thisEmployee.status_code">
          <option value="">-</option>
          <option
            :value="empStatus.stat_code"
            v-for="empStatus in empStatusList"
            :key="empStatus.stat_code"
          >
            {{ empStatus.stat_name }}
          </option>
        </select>
        퇴사일자<input type="date" v-model="thisEmployee.leave_date" />
      </p>
      <p>
        은행
        <select name="" id="" v-model="thisEmployee.bank_code">
          <option value="">-</option>
          <option
            :value="bank.bank_code"
            v-for="bank in bankList"
            :key="bank.bank_code"
          >
            {{ bank.bank_name }}
          </option>
        </select>
        <input
          type="text"
          placeholder="계좌번호"
          v-model="thisEmployee.account_no"
        />
      </p>
      <p>
        기본급(연봉)<input type="text" v-model="thisEmployee.salary" /><span
          style="font-size: 12px"
          >만원</span
        >
      </p>
      <p>비고<input type="text" v-model="thisEmployee.remaerks" /></p>
      <button @click="saveEmployee">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import {
  getDeptList,
  getPosList,
  getempStatusList,
  getbankList,
} from "@/api/hr/EmpApi";

export default {
  name: "EmpForm",
  props: {
    employee: {
      type: Object,
      // required: true,
      default: () => ({}),
    },
  },
  setup(props) {
    const defaultEmployee = {
      emp_id: "",
      password: "",
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
      remaerks: "",
    };

    const thisEmployee = ref({ ...props.employee });

    const departmentList = ref([]);
    const positionList = ref([]);
    const empStatusList = ref([]);
    const bankList = ref([]);

    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const isReadOnly = computed(() => {
      return Object.keys(props.employee || {}).length > 0;
    });

    const buttonText = computed(() => {
      return Object.keys(props.employee || {}).length === 0 ? "등록" : "수정";
    });

    watch(
      () => props.employee,
      (newVal) => {
        if (newVal && Object.keys(newVal).length > 0) {
          thisEmployee.value = {
            ...newVal,
            join_date: formatDate(newVal.join_date),
            leave_date: newVal.leave_date ? formatDate(newVal.leave_date) : "",
          };
        } else {
          thisEmployee.value = { ...defaultEmployee };
        }
        console.log("Updated employee prop: ", newVal);
      },
      { deep: true, immediate: true }
    );

    const formList = ref({
      dept_code: "",
      dept_name: "",
      pos_code: "",
      pos_name: "",
      status_code: "",
      bank_code: "",
    });

    const fetchDepartmentListHandler = async () => {
      try {
        departmentList.value = await getDeptList();
      } catch (error) {
        console.error("Error fetching deptList:", error);
      }
    };

    const fetchPositionListHandler = async () => {
      try {
        positionList.value = await getPosList();
      } catch (error) {
        console.error("Error fetching posList:", error);
      }
    };

    const fetchempStatusListHandler = async () => {
      try {
        empStatusList.value = await getempStatusList();
      } catch (error) {
        console.error("Error fetching empStatusList:", error);
      }
    };

    const fetchbankListHandler = async () => {
      try {
        bankList.value = await getbankList();
      } catch (error) {
        console.error("Error fetching bankList:", error);
      }
    };

    onMounted(() => {
      fetchDepartmentListHandler();
      fetchPositionListHandler();
      fetchempStatusListHandler();
      fetchbankListHandler();
    });

    return {
      formList,
      positionList,
      departmentList,
      empStatusList,
      bankList,
      thisEmployee,
      formatDate,
      buttonText,
      isReadOnly,
    };
  },
};
</script>

<style scoped></style>
