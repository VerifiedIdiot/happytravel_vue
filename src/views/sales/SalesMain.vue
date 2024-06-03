<template>
  <div>
    <h1>Sales Main Page</h1>
    <nav>
      <router-link to="/sales/partner">Partner</router-link> |
      <router-link to="/sales/product">Product</router-link>
    </nav>
    <router-view></router-view>
    <!-- 하위 라우트를 렌더링하는 영역 -->
  </div>
</template>

<script>
export default {
  name: "SalesMain",
};
</script>

<style></style>
