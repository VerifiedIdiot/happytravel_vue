<template>
  <div id="emp-info" class="flex flex-col items-center w-full">
    <!-- 사원등록 / 수정 화면 -->
    <div class="flex w-full text-3xl pl-10">사원 정보 {{ buttonText }}</div>
    <div class="relative flex flex-col w-11/12 mt-5">
      <!-- 사원 사진 영역 시작 -->
      <div class="absolute w-2/5 right-0 top-1 flex justify-end items-end">
        <div class="w-36 h-40 bg-gray-100">
          <img
            :src="photoPreviewUrl || imgSrc || '사진 미리보기 영역'"
            @error="setDefaultImage"
            alt="사진 미리보기"
            class="w-full h-full object-cover"
          />
        </div>
        <button
          @click="openModal"
          :disabled="isDisabled"
          class="px-[6px] h-[25px] ml-1 bg-gray-200 hover:bg-gray-400 text-xs hover:text-white outline-none"
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
          :disabled="isDisabled"
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
          :disabled="isDisabled"
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
          :disabled="isDisabled"
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
          :disabled="isDisabled"
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
          :readonly="isReadOnly"
          :disabled="isDisabled"
          @input="validateSSNFirst"
          maxlength="6"
          class="flex w-1/6 h-8 px-1 border border-gray-200 outline-none"
        />
        <span class="text-base">-</span>
        <input
          type="text"
          id="ssn_last"
          v-model="ssnLast"
          :readonly="isReadOnly"
          :disabled="isDisabled"
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
          readonly
          :disabled="isDisabled"
          class="flex w-2/12 h-8 px-1 border border-gray-200 outline-none"
        />
        <input
          type="text"
          id="address"
          v-model="thisEmployee.address"
          :disabled="isDisabled"
          class="flex w-7/12 h-8 px-1 border border-gray-200 outline-none"
        />
        <button
          @click="searchAddress"
          :disabled="isDisabled"
          class="w-1/12 bg-gray-200 hover:bg-gray-400 hover:text-white"
        >
          검색
        </button>
      </div>
      <!--주소 검색 영역 시작-->
      <div class="flex gap-1 justify-end">
        <div id="wrap" class="hidden relative w-10/12 h-[600px]">
          <img
            src="//t1.daumcdn.net/postcode/resource/images/close.png"
            id="btnFoldWrap"
            style="
              cursor: pointer;
              position: absolute;
              right: 0px;
              top: 0px;
              z-index: 1;
            "
            @click="foldDaumPostcode"
            alt="접기 버튼"
          />
        </div>
      </div>
      <!-- 주소 검색 영역 끝 -->
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
          :disabled="isDisabled"
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
          :disabled="isDisabled"
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
          :disabled="isDisabled"
          @input="validatePhoneSecond"
          maxlength="4"
          class="flex w-1/6 h-8 px-1 border border-gray-200 outline-none"
        />
        <input
          type="text"
          id="phone_third"
          v-model="phoneThird"
          :disabled="isDisabled"
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
          :disabled="isDisabled"
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
          :disabled="isDisabled"
          @input="validateMobileSecond"
          class="flex w-1/6 h-8 px-1 border border-gray-200 outline-none"
          maxlength="4"
        />
        <input
          type="text"
          id="mobileThird"
          v-model="mobileThird"
          :disabled="isDisabled"
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
          :disabled="isDisabled"
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
          :disabled="isDisabled"
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
          :disabled="isDisabled"
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
          :disabled="isDisabled"
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
          :disabled="isDisabled"
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
          :disabled="isDisabled"
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
          :disabled="isDisabled"
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
          for="remarks"
          class="flex items-center justify-end w-2/12 h-8 px-1 text-base"
          >비고</label
        >
        <textarea
          rows="10"
          type="text"
          id="remarks"
          v-model="thisEmployee.remarks"
          :disabled="isDisabled"
          class="flex w-10/12 h-20 px-1 border border-gray-200 outline-none resize-none"
        ></textarea>
      </div>
      <div class="flex justify-center my-1 gap-1">
        <button
          @click="saveEmpHandler"
          :disabled="isDisabled"
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
            class="block w-1/2 object-cover max-w-48"
          />
        </div>
        <input type="file" @change="onFileChange" />
        <div class="w-full flex justify-center mt-3">
          <button
            @click="confirmPhoto"
            class="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-md text-white"
          >
            확인
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
  <!--
    모달 내용
    퇴사자 사원번호/사원명/부서/직급/퇴사일자 확인
    v-if="showConfirmModal"
  -->
  <div
    v-if="showConfirmModal"
    id="confirmModal"
    class="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75"
  >
    <div class="bg-white p-5 rounded-md px-10">
      <p class="w-full text-center mb-5 text-xl">
        재직상태를 '퇴사'로 변경하시겠습니까?
      </p>
      <div class="w-full flex justify-center">
        <button
          class="w-3/12 h-10 mx-1 bg-red-600 hover:bg-red-500 rounded-md text-white font-medium shadow-md outline-none"
          @click="confirmLeave"
        >
          확인
        </button>
        <button
          class="w-3/12 h-10 mx-1 bg-slate-500 hover:bg-slate-600 rounded-md text-white font-medium shadow-md outline-none"
          @click="cancelLeave"
        >
          취소
        </button>
      </div>
    </div>
  </div>
  <!--퇴사 확인 모달 끝-->
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
} from "@/api/hr/EmpFormApi";

export default {
  name: "EmpForm",
  emits: ["saved"],
  props: {
    employee: {
      type: Object,
      default: () => ({}),
    },
    imgSrc: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const defaultImage = require("@/assets/img/profile.png");
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
      remarks: "",
    };

    const buttonText = computed(() => {
      return Object.keys(props.employee.emp_name || {}).length === 0
        ? "등록"
        : "수정";
    });

    const isReadOnly = computed(() => {
      return Object.keys(props.employee.emp_name || {}).length > 0;
    });
    const isDisabled = ref(false);

    const thisEmployee = ref({ ...props.employee });
    const thisImgSrc = ref(props.imgSrc);

    const showModal = ref(false);
    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const imagePreviewUrl = ref(null);
    const photoPreviewUrl = ref(null);
    const selectedImageFile = ref(null);
    const confirmPhoto = () => {
      if (selectedImageFile.value) {
        photoPreviewUrl.value = imagePreviewUrl.value;
        closeModal();
        alert("사진 미리보기가 업데이트되었습니다.");
      } else {
        alert("사진을 선택해주세요.");
      }
    };

    const ssnFirst = ref("");
    const ssnLast = ref("");
    const phoneFirst = ref("");
    const phoneSecond = ref("");
    const phoneThird = ref("");
    const mobileFirst = ref("");
    const mobileSecond = ref("");
    const mobileThird = ref("");

    const departmentList = ref([]);
    const positionList = ref([]);
    const empStatusList = ref([]);
    const bankList = ref([]);

    const formList = ref({
      dept_code: "",
      dept_name: "",
      pos_code: "",
      pos_name: "",
      status_code: "",
      bank_code: "",
    });

    const showConfirmModal = ref(false);

    const confirmLeave = async () => {
      showConfirmModal.value = false;
      await saveEmployee();
    };

    const cancelLeave = () => {
      showConfirmModal.value = false;
    };

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

    const isResignedOrOnLeave = computed(() => {
      const statusName = getStatusName(thisEmployee.value.status_code);
      return statusName === "재직" || statusName === "휴직";
    });

    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const getStatusName = (statusCode) => {
      const status = empStatusList.value.find(
        (status) => status.stat_code === statusCode
      );
      return status ? status.stat_name : "";
    };

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
          } else {
            phoneFirst.value = "";
            phoneSecond.value = "";
            phoneThird.value = "";
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
          } else {
            mobileFirst.value = "";
            mobileSecond.value = "";
            mobileThird.value = "";
          }

          // 사원정보 조회 후 isDisabled 값을 업데이트
          isDisabled.value = newVal.status_code === "3000";
        } else {
          thisEmployee.value = { ...defaultEmployee };
          thisImgSrc.value = null; // 신규 등록 시 이미지 초기화
        }
      },
      { deep: true, immediate: true }
    );
    // watch End

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

    const onFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        selectedImageFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreviewUrl.value = e.target.result;
        };
        reader.readAsDataURL(file);

        selectedImageFile.value = file;
      }
    };

    const setDefaultImage = (event) => {
      event.target.src = defaultImage;
    };

    const validateInput = (input, maxLength) => {
      input.value = input.value.replace(/\D/g, "").slice(0, maxLength);
    };

    const validateSSNFirst = () => {
      validateInput(ssnFirst, 6);
    };

    const validateSSNLast = () => {
      validateInput(ssnLast, 7);
    };

    const validatePhoneSecond = () => {
      validateInput(phoneSecond, 4);
    };

    const validatePhoneThird = () => {
      validateInput(phoneThird, 4);
    };

    const validateMobileSecond = () => {
      validateInput(mobileSecond, 4);
    };
    const validateMobileThird = () => {
      validateInput(mobileThird, 4);
    };
    const validatePassword = (password) => {
      const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;
      return regex.test(password);
    };

    const saveEmpHandler = async () => {
      if (thisEmployee.value.status_code === "3000") {
        showConfirmModal.value = true;
      } else {
        await saveEmployee();
      }
    };

    const saveEmployee = async () => {
      try {
        const fieldsToCheck = [];
        // 사원 수정시 && 기존 비밀번호와 다를때 비밀번호 유효성 검사
        if (
          buttonText.value === "수정" &&
          props.employee.password !== thisEmployee.value.password &&
          !validatePassword(thisEmployee.value.password)
        ) {
          alert("비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.");
          return;
        }

        //주민번호 13자리 유효성 검사
        if (ssnFirst.value.length !== 6 || ssnLast.value.length !== 7) {
          alert("주민등록번호를 확인해주세요.");
          return;
        }

        if (thisEmployee.value.leave_date === "") {
          thisEmployee.value.leave_date = null;
        }

        thisEmployee.value.ssn = `${ssnFirst.value}-${ssnLast.value}`;
        thisEmployee.value.phone = `${phoneFirst.value}-${phoneSecond.value}-${phoneThird.value}`;
        thisEmployee.value.mobile = `${mobileFirst.value}-${mobileSecond.value}-${mobileThird.value}`;

        const data = thisEmployee.value;

        const formData = new FormData();
        formData.append(
          "employee",
          new Blob([JSON.stringify(thisEmployee.value)], {
            type: "application/json",
          })
        );

        if (selectedImageFile.value) {
          // 파일명을 사원번호로 변경하여 새로운 File 객체 생성
          const renamedFile = new File(
            [selectedImageFile.value],
            `${thisEmployee.value.emp_id}.jpg`,
            {
              type: selectedImageFile.value.type,
            }
          );
          formData.append("file", renamedFile);
        }

        if (buttonText.value === "등록") {
          await insertEmployee(formData);
          alert("사원정보 저장이 완료되었습니다.");
        } else {
          await updateEmployee(formData); // 얘도 formData 써야하나용?
          alert("사원정보 수정이 완료되었습니다.");
        }

        emit("saved");
        isDisabled.value = thisEmployee.value.status_code === "3000";
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

    /*************** kakao 주소 검색 api *******************/

    const foldDaumPostcode = () => {
      const wrap = document.getElementById("wrap");
      wrap.innerHTML = "";
      wrap.style.display = "none";
      addCloseButton(wrap);
    };

    const addCloseButton = (wrap) => {
      const closeButton = document.createElement("img");
      closeButton.src = "//t1.daumcdn.net/postcode/resource/images/close.png";
      closeButton.id = "btnFoldWrap";
      closeButton.style = `
        cursor: pointer;
        position: absolute;
        right: 0px;
        top: 0px;
        z-index: 1;
      `;
      closeButton.alt = "접기 버튼";
      closeButton.addEventListener("click", foldDaumPostcode);
      wrap.appendChild(closeButton);
    };

    const searchAddress = () => {
      const wrap = document.getElementById("wrap");
      wrap.style.display = "block";
      new daum.Postcode({
        oncomplete: function (data) {
          thisEmployee.value.zip_code = data.zonecode;
          thisEmployee.value.address = data.address;
          document.getElementById("address_detail").focus();
          foldDaumPostcode();
        },
        onresize: function (size) {
          const elementWrap = document.getElementById("wrap");
          if (elementWrap) {
            elementWrap.style.height = size.height + "px";
          }
        },
        width: "100%",
        height: "100%",
      }).embed(wrap);
      addCloseButton(wrap);
    };

    /*************** kakao 주소 검색 api *******************/

    onMounted(() => {
      fetchDepartmentListHandler();
      fetchPositionListHandler();
      fetchempStatusListHandler();
      fetchbankListHandler();
    });

    return {
      buttonText,
      isReadOnly,
      isDisabled,
      showModal,
      openModal,
      closeModal,
      thisEmployee,
      thisImgSrc,
      imagePreviewUrl,
      photoPreviewUrl,
      selectedImageFile,
      confirmPhoto,
      ssnFirst,
      ssnLast,
      phoneFirst,
      phoneSecond,
      phoneThird,
      mobileFirst,
      mobileSecond,
      mobileThird,
      departmentList,
      positionList,
      empStatusList,
      bankList,
      formList,
      showConfirmModal,
      confirmLeave,
      cancelLeave,
      phoneOptions,
      mobileOptions,
      isResignedOrOnLeave,
      formatDate,
      searchAddress,
      saveEmpHandler,
      validateSSNFirst,
      validateSSNLast,
      validatePhoneSecond,
      validatePhoneThird,
      validateMobileSecond,
      validateMobileThird,
      onFileChange,
      foldDaumPostcode,
      setDefaultImage,
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
#leaveEmpInfo div p {
  width: 100%;
  padding: 4px;
  text-align: center;
  border: 1px solid rgb(243, 244, 246);
  box-sizing: border-box;
}
input:disabled,
textarea:disabled {
  color: rgb(170, 170, 170);
}
button:disabled,
button:disabled:hover {
  background-color: rgb(170, 170, 170);
  color: #fff;
}
</style>
