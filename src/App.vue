<script lang="ts" setup>
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Topbar from './components/Topbar.vue'
// import { BeakerIcon } from '@heroicons/vue/24/solid'

</script>

<template>
  <div class="container">
    <Sidebar />
    <div>
      <Topbar/>
      <div class="container-content">
        <RouterView />
      </div>
  </div>
</div></template>

<style lang="scss">
@import "./assets/styles/mainStyles.scss";
</style>