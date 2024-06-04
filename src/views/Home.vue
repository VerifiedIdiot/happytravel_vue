<template>
  <div>
    <h1>Home Page</h1>
    <button @click="goToMyPage">Go to MyPage</button>
    <nav></nav>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  methods: {
    goToMyPage() {
      this.$router.push({ name: "MyPage" });
    },
  },
};
</script>

<style scoped>
.home {
  text-align: center;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
