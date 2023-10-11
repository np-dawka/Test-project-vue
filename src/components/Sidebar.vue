<script lang="ts" setup>
import Month from './Month.vue';
const sidebarData = [
    { label: "Нүүр хуудас", link: "/", icon: "", },
    { label: "Өдрийн төлөвлөгөө", link: "/day", icon: "", },
    { label: "7 хоногийн төлөвлөгөө", link: "/week", icon: "", },
    { label: "Сарын төлөвлөгөө", link: "/month", icon: "", },
    { label: "Жилийн хуанли", link: "/year", icon: "",},
    { label: "Гүйцэтгэл хянах", link: "/performance", icon: "", },
    { label: "Тусламж", link: "/help", icon: "", },
]

</script>

<template>
  <div class="sidebar">
    <div class="sidebarTop">
      <Month :showButton="true"  />
    </div>
    <div v-for="item in sidebarData" :key="item.label" class="sidebar-item">
        <router-link :to="item.link" class="sidebar-item_el">
            <!-- <menu-icon /> -->
            <span>{{ item.label }}</span>
        </router-link>
    </div>
  </div>
</template>

<style lang="scss">
/* Add your styles here if needed */
</style>