<template>
  <div id="app">
    <Header v-if="showHeader" />
    <router-view />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from './components/header/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
  setup() {
    const route = useRoute();
    const showHeader = computed(() => route.name !== 'Login');

    return {
      showHeader,
    };
  },
};
</script>

<style></style>
