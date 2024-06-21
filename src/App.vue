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
<<<<<<< HEAD
  data() {
=======
  setup() {
    const route = useRoute();
    const showHeader = computed(() => route.name !== 'Login'  , route.name !== 'Root');

>>>>>>> 1190e45571186c6e2715e5d08e62c10bcbbf587a
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
