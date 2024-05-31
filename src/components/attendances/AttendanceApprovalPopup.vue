<template>
  <div class="popup-overlay">
    <div class="popup">
      <h2>근태 신청 승인</h2>
      <form @submit.prevent="approveLeave">
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
              v-model="user.department"
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
              v-model="user.name"
              disabled
              class="disabled-input"
            />
          </div>
          <div class="form-group">
            <label for="position">직급</label>
            <input
              type="text"
              id="position"
              v-model="user.position"
              disabled
              class="disabled-input"
            />
          </div>
        </div>
        <div class="form-group full-width">
          <label for="type">종류</label>
          <select id="type" v-model="type" disabled class="disabled-input">
            <option value="">-</option>
            <option value="연차">연차</option>
            <option value="반차">반차</option>
            <option value="병가">병가</option>
          </select>
        </div>
        <div class="form-group full-width">
          <label for="title">제목</label>
          <input
            type="text"
            id="title"
            v-model="title"
            disabled
            class="disabled-input"
          />
        </div>
        <div class="form-group full-width">
          <label for="period">기간</label>
          <input
            type="text"
            id="period"
            v-model="period"
            placeholder="YYYY년 MM월 DD일 ~ YYYY년 MM월 DD일 (X일간)"
            disabled
            class="disabled-input"
          />
        </div>
        <div class="form-group full-width">
          <label for="reason">사유</label>
          <textarea
            id="reason"
            v-model="reason"
            disabled
            class="disabled-input"
          ></textarea>
        </div>
        <div class="button-group">
          <button type="button" class="approve-button" @click="approveLeave">
            승인
          </button>
          <button type="button" class="reject-button" @click="rejectLeave">
            반려
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AttendanceApprovalPopup",
  data() {
    return {
      type: "연차",
      title: "휴가 신청",
      period: "2023년 12월 25일 ~ 2023년 12월 26일 (2일간)",
      reason: "가족 행사",
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    approveLeave() {
      console.log(
        "승인되었습니다:",
        this.user,
        this.type,
        this.title,
        this.period,
        this.reason
      );
      this.$emit("close");
    },
    rejectLeave() {
      console.log(
        "반려되었습니다:",
        this.user,
        this.type,
        this.title,
        this.period,
        this.reason
      );
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

.button-group {
  text-align: right;
}

.approve-button,
.reject-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-right: 10px;
}

.approve-button {
  background-color: #28a745;
  color: white;
}

.reject-button {
  background-color: #dc3545;
  color: white;
}

.approve-button:hover {
  background-color: #218838;
}

.reject-button:hover {
  background-color: #c82333;
}
</style>
