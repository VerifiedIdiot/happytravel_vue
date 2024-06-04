<template>
  <div class="popup-overlay">
    <div class="popup">
      <form @submit.prevent="submitForm">
        <h2>근태 신청</h2>
        <div class="form-row">
          <div class="form-group">
            <label for="empId">사원번호</label>
            <input
              type="text"
              id="empId"
              v-model="user.empId"
              disabled
              class="disabled-input"
            />
          </div>
          <div class="form-group">
            <label for="department">부서</label>
            <input
              type="text"
              id="department"
              v-model="user.deptCode"
              disabled
              class="disabled-input"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="name">이름</label>
            <input
              type="text"
              id="name"
              v-model="user.empName"
              disabled
              class="disabled-input"
            />
          </div>
          <div class="form-group">
            <label for="position">직급</label>
            <input
              type="text"
              id="position"
              v-model="user.posCode"
              disabled
              class="disabled-input"
            />
          </div>
        </div>
        <div class="form-group full-width">
          <label for="type">종류</label>
          <select id="type" v-model="type">
            <option value="">-</option>
            <option value="3000">외근</option>
            <option value="4000">야근</option>
            <option value="5000">연차</option>
            <option value="5100">병가</option>
            <option value="5500">경조사</option>
          </select>
        </div>
        <div class="form-group full-width">
          <label for="title">제목</label>
          <input type="text" id="title" v-model="title" />
        </div>
        <div class="form-group full-width">
          <label for="period">기간</label>
          <div class="form-row period-row">
            <div class="form-group">
              <input
                type="date"
                id="startDate"
                v-model="startDate"
                :min="minDate"
                :max="maxDate"
              />
            </div>
            <div class="tilde">~</div>
            <div class="form-group">
              <input
                type="date"
                id="endDate"
                v-model="endDate"
                :min="minDate"
                :max="maxDate"
              />
            </div>
          </div>
        </div>
        <div class="form-group full-width">
          <label for="reason">내용</label>
          <textarea id="reason" v-model="reason"></textarea>
        </div>
        <div class="button-group">
          <button type="submit" class="submit-button">근태 신청</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  insertAttendanceManagement,
  getMaxAttendanceTypeCode,
} from "../../api/attendances/AttendanceManagementApi";
import { getManagerIdByDeptCode } from "../../api/attendances/EmployeeInfoApi";

export default {
  name: "AttendancePopup",
  data() {
    return {
      type: "",
      title: "",
      startDate: "",
      endDate: "",
      reason: "",
      minDate: "",
      maxDate: "",
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    async submitForm() {
      // 오늘 날짜를 YYYYMMDD 형식으로 생성
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const creationDate = `${year}${month}${day}`;

      let typeCodeSuffix = "01";

      try {
        // 데이터베이스에서 현재 날짜에 해당하는 최대 코드 조회
        const maxCodeResponse = await getMaxAttendanceTypeCode(creationDate);
        if (maxCodeResponse && maxCodeResponse.maxCode) {
          const maxCode = maxCodeResponse.maxCode;
          const currentSuffix = parseInt(maxCode.slice(-2), 10);
          const newSuffix = (currentSuffix + 1).toString().padStart(2, "0");
          typeCodeSuffix = newSuffix;
        }
      } catch (error) {
        console.error("Error fetching max attendance type code:", error);
      }

      const attendanceCode = `${creationDate}${typeCodeSuffix}`;

      let managerId = "";
      try {
        // 부서 코드로 부장 직급의 사원 ID 조회
        const managerResponse = await getManagerIdByDeptCode(
          this.user.deptCode
        );

        if (managerResponse) {
          managerId = managerResponse;
        }
      } catch (error) {
        console.error("Error fetching manager ID:", error);
      }

      const attendanceManagement = {
        attendance_code: attendanceCode,
        emp_id: this.user.empId,
        attendance_type_code: this.type,
        start_date: this.startDate,
        end_date: this.endDate,
        assign_code: "1000",
        assign_emp_id: managerId,
        title: this.title,
        reason: this.reason,
        creation_date: creationDate,
      };

      try {
        const response = await insertAttendanceManagement(attendanceManagement);
        console.log("근태 신청 성공:", response);
      } catch (error) {
        console.error("근태 신청 실패:", error);
      }

      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup {
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 700px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-size: 14px;
}

.popup h2 {
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.5em;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
  width: 48%;
}

.form-group.full-width {
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333; /* 텍스트 색상 명시적으로 지정 */
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  color: #333; /* 입력 필드 텍스트 색상 명시적으로 지정 */
}

.form-group .disabled-input {
  background-color: #f5f5f5;
  color: #888;
}

.form-group textarea {
  height: 100px;
}

.form-row.period-row {
  align-items: center;
}

.tilde {
  margin: 0 10px;
  font-size: 1.2em;
  color: #333;
}

.button-group {
  text-align: right;
}

.submit-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 1em;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
