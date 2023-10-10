<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { VmButton } from 'vue3-material';
import { onMounted } from 'vue';

const changeTheme = (newTheme: string) => {
  const body = document.body;
  body.setAttribute('data-theme', newTheme);
};

// Use the onMounted lifecycle hook to set the initial theme when the component is mounted
onMounted(() => {
  changeTheme('dark'); // You can set the initial theme here
});
</script>

<template>
  <div>
    <button @click="changeTheme('light')">light theme</button>
    <button @click="changeTheme('dark')">dark theme</button>
    <p>hello</p>
    <VmButton>Ok</VmButton>
    <RouterView />
  </div>
</template>

<style lang="scss">
  @import "./assets/styles/styles.scss";
</style>