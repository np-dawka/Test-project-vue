<script lang="ts" setup>

const sidebarData = [
    { label: "Нүүр хуудас", link: "/", icon: "", to: "/" },
    { label: "Жилийн хуанли", link: "/year-plan", icon: "", to: "year" },
    { label: "Сарын төлөвлөгөө", link: "/month-plan", icon: "", to: "year" },
    { label: "7 хоногийн төлөвлөгөө", link: "/week-plan", icon: "", to: "year" },
    { label: "Өдрийн төлөвлөгөө", link: "/day-plan", icon: "", to: "year" },
    { label: "Гүйцэтгэл хянах", link: "/performance", icon: "", to: "year" },
    { label: "Тусламж", link: "/help", icon: "", to: "year" },
]



</script>

<template>
  <div class="sidebar">
    <div v-for="item in sidebarData" :key="item.label" class="sidebar-item">
        <router-link :to="item.to" class="sidebar-item_el">
            <!-- <menu-icon /> -->
            <span>{{ item.label }}</span>
        </router-link>
    </div>
  </div>
</template>

<style lang="scss">
/* Add your styles here if needed */
</style>