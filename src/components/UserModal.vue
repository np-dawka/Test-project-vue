<script lang="ts" setup>
//   const userModalData = [
//       { label: "Нууц үе солих", link: "/forgot-password", icon: '' },
//       { label: "Гарах", link: "/", icon: '' }
//   ]

  const userAccessModalData = [
      { label: "Нэвтрэх", link: "/login", icon: '' },
      { label: "Бүртгүүлэх", link: "/signup", icon: '' }
  ]

</script>

<template>
    <div v-for="item in userAccessModalData" :key="item.label">
        <router-link :to="item.link" >
            <span class="item">{{ item.label }}</span>
        </router-link>
    </div>
</template>

<style lang="scss">

</style>