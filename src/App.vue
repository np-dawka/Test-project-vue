<script lang="ts" setup>
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Topbar from './components/Topbar.vue'
// import { AnnotationIcon, ArrowCircleUpIcon} from '@vue-hero-icons/outline'
</script>

<template>
  <div class="container">
    <Sidebar />
    <div>
      <Topbar/>
      <!-- <AnnotationIcon size="1.5x" class="custom-class" />
      <ArrowCircleUpIcon size="1.5x" class="custom-class" /> -->

      <div class="container-content">
        <RouterView />
      </div>
  </div>
</div></template>

<style lang="scss">
@import "./assets/styles/mainStyles.scss";
</style>