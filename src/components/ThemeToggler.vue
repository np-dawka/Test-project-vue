<script lang="ts" setup>
  import { onMounted} from 'vue';

  const changeTheme = (newTheme: string) => {
    const body = document.body;
    body.setAttribute('data-theme', newTheme);
  };

  onMounted(() => {
    changeTheme('dark');
  });

  const handleThemeChange = (e: Event) => {
    if ((e.target as HTMLInputElement).checked) {
      changeTheme('light');
    } else {
      changeTheme('dark');
    }
  };
</script>

<template>
  <div class="theme-toggler">
    <input type="checkbox" id="darkmode-toggle" @change="handleThemeChange">
    <label for="darkmode-toggle">
      <img src="../assets/sun.svg" class="sun" alt="BR"/>
      <img src="../assets/moon.svg" class="moon" alt="DR"/>       
    </label>
  </div>
</template>

<style>
    @import "../assets//styles/componentStyles.scss";
</style>