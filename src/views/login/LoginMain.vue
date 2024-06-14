<template>
    <div class="login-container">
      <div class="login-logo">
        <div class="logo-circle">
          <span class="logo-text">LOGO</span>
        </div>
      </div>
      <h1>로그인</h1>
      <form @submit.prevent="login">
        <div class="input-group">
          <input type="text" v-model="username" placeholder="사원번호" required>
        </div>
        <div class="input-group">
          <input type="password" v-model="password" placeholder="비밀번호" required>
        </div>
        <div v-if="error" class="error-message">
          사원번호 또는 비밀번호를 확인해주세요.
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  </template>
  
  <script>
  import AuthApi from '@/api/auth/AuthApi';
  
  export default {
    name: 'LoginMain',
    data() {
      return {
        username: '',
        password: '',
        error: false
      };
    },
    methods: {
      async login() {
        try {
          const response = await AuthApi.login(this.username, this.password);
          if (response.data) {
            this.$router.push('/main');
          }
        } catch (error) {
          this.error = true;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .login-logo .logo-circle {
    width: 200px;
    height: 200px;
    background-color: #007bff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .login-logo .logo-text {
    color: white;
    font-size: 24px;
    font-weight: bold;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  input {
    width: 300px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    width: 300px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error-message {
    color: red;
    margin-bottom: 10px;
  }
  </style>
  