<template>
  <div id="emp-info" class="flex flex-col items-center w-full">
    <!-- 사원등록 / 수정 화면 -->
    <div class="flex w-full text-3xl pl-10">사원 정보 {{ buttonText }}</div>
    <div class="relative flex flex-col w-11/12 mt-5">
      <!-- 사원 사진 영역 시작 -->
      <div
        class="absolute w-2/5 right-0 top-1 flex justify-end items-end bg-green-100"
      >
        <div class="w-36 h-40 bg-gray-100">
          <img
            :src="thisEmployee.photo_url || '사진 미리보기 영역'"
            alt="사진 미리보기"
            v-if="thisEmployee.photo_url"
            class="w-full h-full object-cover"
          />
        </div>
        <button
          @click="openModal"
          class="w-3/12 h-[25px] ml-1 bg-slate-200 hover:bg-slate-300 rounded text-xs shadow-md outline-none"
        >
          사진 등록
        </button>
      </div>
      <!-- 사원 사진 영역 끝-->
      <div class="flex my-1 gap-1">
        <label
          for="emp_id"
          class="flex items-center justify-end w-2/12 h-8 px-1 text-base"
          ><span class="text-red-500">*</span>사원번호</label
        >
        <input
          type="text"
          id="emp_id"
          v-model="thisEmployee.emp_id"
          :readonly="isReadOnly"
          class="flex w-2/6 h-8 px-1 border border-slate-200 outline-none"
        />
      </div>
      <div class="flex my-1 gap-1">
        <label
          for="password"
          class="flex items-center justify-end w-2/12 h-8 px-1 text-base"
          ><span class="text-red-500">*</span>비밀번호</label
        >
        <input
          type="password"
          id="password"
          v-model="thisEmployee.password"
          class="flex w-2/6 h-8 px-1 border border-gray-200 outline-none"
        />
      </div>
      <div class="flex my-1 gap-1">
        <label
          for="emp_name"
          class="flex items-center justify-end w-2/12 h-8 px-1 text-base"
          ><span class="text-red-500">*</span>사원명</label
        >
        <input
          type="text"
          id="emp_name"
          v-model="thisEmployee.emp_name"
          :readonly="isReadOnly"
          class="flex w-2/6 h-8 px-1 border border-gray-200 outline-none"
        />
      </div>
      <div class="flex my-1 gap-1">
        <label
          for="join_date"
          class="flex items-center justify-end w-2/12 h-8 px-1 text-base"
          ><span class="text-red-500">*</span>입사일자</label
        >
        <input
          type="date"
          id="join_date"
          v-model="thisEmployee.join_date"
          :readonly="isReadOnly"
          class="flex w-2/6 h-8 px-1 border border-gray-200 outline-none"
        />
      </div>
      <div class="flex my-1 gap-1">
        <label
          for="ssn"
          class="flex items-center justify-end w-2/12 h-8 px-1 text-base"
          ><span class="text-red-500">*</span>주민등록번호</label
        >
        <input
          type="text"
          id="ssn_first"
          v-model="ssnFirst"
          @input="validateSSNFirst"
          maxlength="6"
          class="flex w-1/6 h-8 px-1 border border-gray-200 outline-none"
        />
        <span class="text-base">-</span>
        <input
          type="text"
          id="ssn_last"
          v-model="ssnLast"
          @input="validateSSNLast"
          maxlength="7"
          class="flex w-1/6 h-8 px-1 border border-gray-200 outline-none"
        />
      </div>
      <div class="flex my-1 gap-1">
        <label
          for="zip_code"
          class="flex items-center justify-end w-2/12 h-8 px-1 text-base"
          ><span class="text-red-500">*</span>주소</label
        >
        <input
          type="text"
          placeholder="우편번호"
          id="zip_code"
          v-model="thisEmployee.zip_code"
          :readonly="isReadOnly"
          class="flex w-2/12 h-8 px-1 border border-gray-200 outline-none"
        />
        <input
          type="text"
          id="address"
          v-model="thisEmployee.address"
          class="flex w-7/12 h-8 px-1 border border-gray-200 outline-none"
        />
        <button @click="searchAddress" class="w-1/12 bg-slate-200">검색</button>
      </div>
      <!-- 주소 검색 팝업창 -->
      <div class="flex my-1 gap-1">
        <label
          for="address_detail"
          class="flex items-center justify-end w-2/12 h-8 px-1 text-base"
          ><span class="text-red-500">*</span>상세주소</label
        >
        <input
          type="text"
          id="address_detail"
          v-model="thisEmployee.address_detail"
          class="flex w-10/12 h-8 px-1 border border-gray-200 outline-none"
        />
      </div>
      <div class="flex my-1 gap-1">
        <label
          for="phone"
          class="flex items-center justify-end w-2/12 h-8 px-1 text-base"
          >전화번호</label
        >
        <select
          v-model="phoneFirst"
          class="flex w-1/6 h8 px-1 border border-gray-200 ouline-none"
        >
          <option value="">-</option>
          <option v-for="option in phoneOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <input
          type="text"
          id="phone_second"
          v-model="phoneSecond"
          @input="validatePhoneSecond"
          maxlength="4"
          class="flex w-1/6 h-8 px-1 border border-gray-200 outline-none"
        />
        <input
          type="text"
          id="phone_third"
          v-model="phoneThird"
          @input="validatePhoneThird"
          maxlength="4"
          class="flex w-1/6 h-8 px-1 border border-gray-200 outline-none"
        />
      </div>
      <div class="flex my-1 gap-1">
        <label
          for="mobile"
          class="flex items-center justify-end w-2/12 h-8 px-1 text-base"
          ><span class="text-red-500">*</span>휴대전화</label
        >
        <select
          v-model="mobileFirst"
          class="flex w-1/6 px-1 border border-gray-200 outline-none"
        >
          <option value="">-</option>
          <option v-for="option in mobileOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <input
          type="text"
          id="moblieSecond"
          v-model="mobileSecond"
          @input="validateMobileSecond"
          class="flex w-1/6 h-8 px-1 border border-gray-200 outline-none"
          maxlength="4"
        />
        <input
          type="text"
          id="mobileThird"
          v-model="mobileThird"
          @input="validateMobileThird"
          class="flex w-1/6 h-8 px-1 border border-gray-200 outline-none"
          maxlength="4"
        />
      </div>
      <div class="flex my-1 gap-1">
        <label
          for="dept_code"
          class="flex items-center justify-end w-2/12 h-8 px-1 text-base"
          ><span class="text-red-500">*</span>부서</label
        >
        <select
          name=""
          id="dept_code"
          v-model="thisEmployee.dept_code"
          class="flex w-1/6 h-8 px-1 border border-gray-200 outline-none"
        >
          <option value="">-</option>
          <option
            :value="department.dept_code"
            v-for="department in departmentList"
            :key="department.dept_code"
          >
            {{ department.dept_name }}
          </option>
        </select>
      </div>
      <div class="flex my-1 gap-1">
        <label
          for="pos_code"
          class="flex items-center justify-end w-2/12 h-8 px-1 text-base"
          ><span class="text-red-500">*</span>직급</label
        >
        <select
          name=""
          id="pos_code"
          v-model="thisEmployee.pos_code"
          class="flex w-1/6 h-8 px-1 border border-gray-200 outline-none"
        >
          <option value="">-</option>
          <option
            :value="position.pos_code"
            v-for="position in positionList"
            :key="position.pos_code"
          >
            {{ position.pos_name }}
          </option>
        </select>
      </div>
      <div class="flex my-1 gap-1">
        <label
          for="status_code"
          class="flex items-center justify-end w-2/12 h-8 px-1 text-base"
          ><span class="text-red-500">*</span>재직상태</label
        >
        <select
          name=""
          id="status_code"
          v-model="thisEmployee.status_code"
          class="flex w-1/6 h-8 px-1 border border-gray-200 outline-none"
        >
          <option value="">-</option>
          <option
            :value="empStatus.stat_code"
            v-for="empStatus in empStatusList"
            :key="empStatus.stat_code"
          >
            {{ empStatus.stat_name }}
          </option>
        </select>
        <input
          type="date"
          id="leave_date"
          v-model="thisEmployee.leave_date"
          :readonly="isResignedOrOnLeave"
          class="flex w-2/6 h-8 px-1 border border-gray-200 outline-none"
        />
      </div>
      <div class="flex my-1 gap-1">
        <label
          for="bank_code"
          class="flex items-center justify-end w-2/12 h-8 px-1 text-base"
          ><span class="text-red-500">*</span>은행</label
        >
        <select
          name=""
          id="bank_code"
          v-model="thisEmployee.bank_code"
          class="flex w-3/12 h-8 px-1 border border-gray-200 outline-none"
        >
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
          id="account_no"
          v-model="thisEmployee.account_no"
          class="flex w-7/12 h-8 px-1 border border-gray-200 outline-none"
        />
      </div>
      <div class="flex my-1 gap-1">
        <label
          for="salary"
          class="flex items-center justify-end w-2/12 h-8 px-1 text-base"
          ><span class="text-red-500">*</span>기본급(연봉)</label
        >
        <input
          type="text"
          id="salary"
          v-model="thisEmployee.salary"
          class="flex w-2/6 h-8 px-1 border border-gray-200 outline-none"
        />
        <label
          for="salary"
          class="flex items-center justify-start w-2/12 h-8 px-1 text-sm"
          >만원</label
        >
      </div>
      <div class="flex my-1 gap-1">
        <label
          for="remaerks"
          class="flex items-center justify-end w-2/12 h-8 px-1 text-base"
          >비고</label
        >
        <textarea
          rows="10"
          type="text"
          id="remaerks"
          v-model="thisEmployee.remaerks"
          class="flex w-10/12 h-20 px-1 border border-gray-200 outline-none resize-none"
        ></textarea>
      </div>
      <div class="flex justify-center my-1 gap-1">
        <button
          @click="saveEmpHandler"
          class="w-1/6 h-10 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-medium shadow-md outline-none"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
  <!-- 사진 업로드 모달 시작 -->
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75"
  >
    <div class="bg-white p-5 rounded-md">
      <h2 class="text-xl mb-4">사진 업로드</h2>
      <div class="mt-4">
        <div
          id="modalPreview"
          class="w-full mt-2 flex justify-center mb-3"
          v-if="imagePreviewUrl"
        >
          <img
            :src="imagePreviewUrl"
            alt="미리보기 이미지"
            class="block w-1/2 object-cover"
          />
        </div>
        <input type="file" @change="onFileChange" />
        <div class="w-full flex justify-center mt-3">
          <button
            @click="uploadPhoto"
            class="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-md text-white"
          >
            업로드
          </button>
          <button
            @click="closeModal"
            class="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded-md text-white ml-2"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 사진 업로드 모달 끝 -->
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import {
  getDeptList,
  getPosList,
  getempStatusList,
  getbankList,
  insertEmployee,
  updateEmployee,
  checkDuplicate,
  uploadPhotoFile,
} from "@/api/hr/EmpApi";

export default {
  name: "EmpForm",
  emits: ["saved"],
  props: {
    employee: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    // 기본 데이터 초기화
    const defaultEmployee = {
      emp_id: "",
      password: "",
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
      remaerks: "",
    };

    const thisEmployee = ref({ ...props.employee });

    const showModal = ref(false);
    const imagePreviewUrl = ref(null);
    const selectedImageFile = ref(null);

    const ssnFirst = ref("");
    const ssnLast = ref("");
    const phoneFirst = ref("");
    const phoneSecond = ref("");
    const phoneThird = ref("");
    const mobileFirst = ref("");
    const mobileSecond = ref("");
    const mobileThird = ref("");

    const phoneOptions = [
      "02",
      "031",
      "032",
      "033",
      "041",
      "042",
      "043",
      "044",
      "051",
      "052",
      "053",
      "054",
      "055",
      "061",
      "062",
      "063",
      "064",
    ];
    const mobileOptions = ["010", "011", "016", "017", "018", "019"];

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
      return Object.keys(props.employee.emp_name || {}).length > 0;
    });

    const buttonText = computed(() => {
      return Object.keys(props.employee.emp_name || {}).length === 0
        ? "등록"
        : "수정";
    });

    /*************** kakao 주소 검색 api *******************/
    const searchAddress = () => {
      new daum.Postcode({
        oncomplete: function (data) {
          thisEmployee.value.zip_code = data.zonecode;
          thisEmployee.value.address = data.address;
          document.getElementById("address_detail").focus();
        },
      }).open();
    };
    /*************** kakao 주소 검색 api *******************/

    const getStatusName = (statusCode) => {
      const status = empStatusList.value.find(
        (status) => status.stat_code === statusCode
      );
      return status ? status.stat_name : "";
    };

    const isResignedOrOnLeave = computed(() => {
      const statusName = getStatusName(thisEmployee.value.status_code);
      return statusName === "재직" || statusName === "휴직";
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

          ssnFirst.value = newVal.ssn ? newVal.ssn.slice(0, 6) : "";
          ssnLast.value = newVal.ssn ? newVal.ssn.slice(7) : "";

          if (newVal.phone) {
            if (newVal.phone.startsWith("02")) {
              phoneFirst.value = "02";
              phoneSecond.value = newVal.phone.slice(
                3,
                newVal.phone.indexOf("-", 4)
              );
              phoneThird.value = newVal.phone.slice(
                newVal.phone.lastIndexOf("-") + 1
              );
            } else {
              phoneFirst.value = newVal.phone.slice(
                0,
                newVal.phone.indexOf("-")
              );
              phoneSecond.value = newVal.phone.slice(
                newVal.phone.indexOf("-") + 1,
                newVal.phone.lastIndexOf("-")
              );
              phoneThird.value = newVal.phone.slice(
                newVal.phone.lastIndexOf("-") + 1
              );
            }
          }

          if (newVal.mobile) {
            mobileFirst.value = newVal.mobile.slice(
              0,
              newVal.mobile.indexOf("-")
            );
            mobileSecond.value = newVal.mobile.slice(
              newVal.mobile.indexOf("-") + 1,
              newVal.mobile.lastIndexOf("-")
            );
            mobileThird.value = newVal.mobile.slice(
              newVal.mobile.lastIndexOf("-") + 1
            );
          }
        } else {
          thisEmployee.value = { ...defaultEmployee };
        }
      },
      { deep: true, immediate: true }
    );
    // watch End

    const formList = ref({
      dept_code: "",
      dept_name: "",
      pos_code: "",
      pos_name: "",
      status_code: "",
      bank_code: "",
    });

    // START 사원 정보 폼 select option 리스트 가져오기
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
    // END 사원 정보 폼 select option 리스트 가져오기

    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      imagePreviewUrl.value = null;
      selectedImageFile.value = null;
    };

    const onFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        selectedImageFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreviewUrl.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const uploadPhoto = async () => {
      //업로드 버튼 눌렀을때 함수 작동
      if (!selectedImageFile.value) {
        alert("사진을 선택해주세요.");
        return;
      }

      try {
        const photoUrl = await uploadPhotoFile(selectedImageFile.value);
        thisEmployee.value.photo_url = photoUrl;
        closeModal();
        alert("사진 업로드가 완료되었습니다.");
      } catch (error) {
        console.error("Error uploading photo: ", error);
        alert("사진 업로드에 실패했습니다.");
      }
    };

    const validateSSNFirst = () => {
      ssnFirst.value = ssnFirst.value.replace(/\D/g, "").slice(0, 6);
    };

    const validateSSNLast = () => {
      ssnLast.value = ssnLast.value.replace(/\D/g, "").slice(0, 7);
    };

    const validatePhoneSecond = () => {
      phoneSecond.value = phoneSecond.value.replace(/\D/g, "").slice(0, 4);
    };

    const validatePhoneThird = () => {
      phoneThird.value = phoneThird.value.replace(/\D/g, "").slice(0, 4);
    };

    const validateMobileSecond = () => {
      mobileSecond.value = mobileSecond.value.replace(/\D/g, "").slice(0, 4);
    };

    const validateMobileThird = () => {
      mobileThird.value = mobileThird.value.replace(/\D/g, "").slice(0, 4);
    };

    const checkDuplicates = async () => {
      const fieldsToCheck = [
        { field: "ssn", value: `${ssnFirst.value}-${ssnLast.value}` },
        {
          field: "mobile",
          value: `${mobileFirst.value}-${mobileSecond.value}-${mobileThird.value}`,
        },
        {
          field: "bank",
          value: `${thisEmployee.value.bank_code}-${thisEmployee.value.account_no}`,
        },
      ];

      for (const { field, value } of fieldsToCheck) {
        const isDuplicate = await checkDuplicate(field, value);
        if (isDuplicate) {
          alert(
            `중복된 ${
              field === "ssn"
                ? "주민등록번호"
                : field === "mobile"
                ? "휴대전화"
                : "은행 계좌"
            }입니다.`
          );
          return true;
        }
      }
      return false;
    };

    const validatePassword = (password) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{8,}$/;
      return regex.test(password);
    };

    const saveEmpHandler = async () => {
      try {
        // 사원 수정시에만 비밀번호 유효성 검사
        if (
          buttonText.value === "수정" &&
          !validatePassword(thisEmployee.value.password)
        ) {
          alert(
            "비밀번호는 영문 대문자, 소문자, 숫자, 특수문자 중 최소 3가지 이상을 포함해야 합니다."
          );
          return;
        }

        //주민번호 13자리 유효성 검사
        if (ssnFirst.value.length !== 6 || ssnLast.value.length !== 7) {
          alert("주민등록번호를 확인해주세요.");
          return;
        }

        if (await checkDuplicates()) {
          return;
        }

        if (thisEmployee.value.leave_date === "") {
          thisEmployee.value.leave_date = null;
        }

        thisEmployee.value.ssn = `${ssnFirst.value}-${ssnLast.value}`;
        thisEmployee.value.phone = `${phoneFirst.value}-${phoneSecond.value}-${phoneThird.value}`;
        thisEmployee.value.mobile = `${mobileFirst.value}-${mobileSecond.value}-${mobileThird.value}`;

        const data = thisEmployee.value;

        if (buttonText.value === "등록") {
          await insertEmployee(thisEmployee.value);
          alert("사원정보 저장이 완료되었습니다.");
        } else {
          await updateEmployee(thisEmployee.value);
          alert("사원정보 수정이 완료되었습니다.");
        }

        emit("saved");
      } catch (error) {
        if (buttonText.value === "등록") {
          console.error("Error saving employee: ", error);
          alert("사원정보 저장에 실패했습니다.");
        } else {
          console.error("Error saving employee: ", error);
          alert("사원정보 수정에 실패했습니다.");
        }
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
      searchAddress,
      saveEmpHandler,
      validateSSNFirst,
      validateSSNLast,
      validatePhoneSecond,
      validatePhoneThird,
      validateMobileSecond,
      validateMobileThird,
      ssnFirst,
      ssnLast,
      phoneFirst,
      phoneSecond,
      phoneThird,
      mobileFirst,
      mobileSecond,
      mobileThird,
      phoneOptions,
      mobileOptions,
      showModal,
      openModal,
      closeModal,
      isResignedOrOnLeave,
      checkDuplicates,
      imagePreviewUrl,
      onFileChange,
      uploadPhoto,
      selectedImageFile,
    };
  },
};
</script>

<style scoped>
input,
select,
textarea,
th,
td {
  border: 1px solid rgb(243, 244, 246);
}
table,
thead,
tbody th,
td {
  background-color: #fff;
}
</style>
