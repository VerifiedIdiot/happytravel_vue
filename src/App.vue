<template>
  <div id="app">
    <MainHeader />
    <router-view />
  </div>
</template>

<script>
import MainHeader from './components/header/MainHeader.vue';

export default {
  name: 'App',
  components: {
    MainHeader,
  }
}
</script>

<style>

</style>
