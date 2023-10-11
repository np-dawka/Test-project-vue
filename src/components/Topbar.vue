<script lang="ts" setup>
  import { onMounted } from 'vue';

  const Logout=()=>{
  
  }
  
  const userModalData = [
      { label: "Нууц үе солих", link: "/forgot-password", icon: '' },
      { label: "Гарах", link: "/", icon: '', function: Logout }
  ]

  const userAccessModalData = [
      { label: "Нэвтрэх", link: "/login", icon: '' },
      { label: "Бүртгүүлэх", link: "/signup", icon: '', function: Logout }
  ]

  const changeTheme = (newTheme: string) => {
    const body = document.body;
    body.setAttribute('data-theme', newTheme);
  };

  onMounted(() => {
    changeTheme('dark');
  });
</script>

<template>
  <div class=" topbar">
    <button @click="changeTheme('light')">light theme</button>
    <button @click="changeTheme('dark')">dark theme</button> 
  </div>
</template>

<style lang="scss">

</style>