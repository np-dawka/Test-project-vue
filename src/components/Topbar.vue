<script lang="ts" setup>
  import { onMounted } from 'vue';

  const changeTheme = (newTheme: string) => {
    const body = document.body;
    body.setAttribute('data-theme', newTheme);
  };

  onMounted(() => {
    changeTheme('dark');
  });
</script>

<template>
  <div class="sidebar topbar">
    <button @click="changeTheme('light')">light theme</button>
    <button @click="changeTheme('dark')">dark theme</button> 
  </div>
</template>

<style lang="scss">

</style>