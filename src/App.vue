<template>
  <div id="app">
    <Header v-if="showHeader" />
    <router-view />
  </div>
</template>

<script>
import Header from './components/header/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
  data() {
    return {
      showHeader: true,
    };
  },
  watch: {
    $route(to) {
      this.showHeader = to.name !== 'Login';
    },
  },
  created() {
    this.showHeader = this.$route.name !== 'Login';
  },
};
</script>
