<template>
  <div id="app">
    
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> 컴포넌트 제거 -->
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/hr">HR Main</router-link> |
      <router-link to="/sales">Sales Main</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'app',
  components: {
  
  }
}
</script>

<style>
</style>
