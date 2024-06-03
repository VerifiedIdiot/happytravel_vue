<template>
  <header class="bg-blue-500 p-4 text-white">
    <div class="header-top flex justify-between items-center">
      <div class="logo text-xl font-bold">LOGO</div>
      <div class="user-info">
        <span>Happy 님</span>
      </div>
    </div>
    <div>
      <nav class="navbar mt-2">
        <router-link to="/" class="text-white mr-4">Home</router-link> |
        <router-link to="/hr" class="text-white mr-4">HR Main</router-link> |
        <router-link to="/sales" class="text-white">Sales Main</router-link>
        <!-- ================================================== 20240603 - S ================================================== -->
        ||||| <router-link to="/salary/data">급여 내역</router-link>
        | <router-link to="/salary/payment">급여 지급 내역</router-link>
        <!-- ================================================== 20240603 - E ================================================== -->
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "MainHeader",
};
</script>

<style scoped>
.header-top {
  @apply bg-blue-600 p-2 rounded;
}

.navbar a {
  @apply hover:text-gray-300;
}
</style>
