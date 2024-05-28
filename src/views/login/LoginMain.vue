<template>
    <div>
      <h1>Login Page</h1>
      <button @click="login">Login</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginMain',
    methods: {
      login() {
        this.$router.push({ name: 'Home' });
      }
    }
  };
  </script>
  
  <style>
  </style>
  