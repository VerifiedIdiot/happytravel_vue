<template>
  <div class="flex h-screen items-center justify-center" id="login-container">
    <div class="w-full max-w-md p-8 bg-white rounded shadow-md" id="login-group">
      <div class="mb-6 text-center" id="logo">
        <!-- 여기에 로고 이미지를 넣으세요 -->
        <img src="@/assets/img/logo.png" alt="Logo" class="mx-auto w-48 h-48" />
      </div>
      <h2 class="mb-6 text-2xl font-semibold text-center">로 그 인</h2>
      <div class="flex flex-col items-center space-y-4">
        <input type="text" v-model="empId" placeholder="사원번호" required maxlength="8" class="w-full px-4 py-2 rounded focus:outline-none ring-2 focus:ring-blue-500 focus:border-transparent" />
        <input type="password" v-model="password" placeholder="비밀번호" required class="w-full px-4 py-2 rounded focus:outline-none ring-2 focus:ring-blue-500 focus:border-transparent" />
        <div v-if="errorMessage" class="w-full text-center text-red-500">{{ errorMessage }}</div>
        <button @click="login" class="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          로그인
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/auth/AuthApi';
import { mapState } from "vuex";

export default {
  name: 'LoginMain',
  data() {
    return {
      empId: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
      const data = await login({empId: this.empId, password: this.password});
      if (data) {
        console.log(data);
        this.$store.commit("setLoginInfo", {
        empId: data.emp_id,
        empName: data.emp_name,
        deptCode: data.dept_code,
        posCode: data.pos_code,
      });
        this.$router.push('/main');
      } else {
        this.errorMessage = '사원번호 또는 비밀번호를 확인해주세요.';
      }
    } catch (error) {
        console.error('Error fetching login data:', error);
      }
    }
  },
};
</script>
