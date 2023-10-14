<script lang="ts" setup>
import Month from './Month.vue';  
import HomeIcon from 'vue-material-design-icons/Home.vue';
import CalendarIcon from 'vue-material-design-icons/CalendarRange.vue';
import CalendarEdit from 'vue-material-design-icons/CalendarEdit.vue';
import CalendarMonth from 'vue-material-design-icons/CalendarMonth.vue';
import CalendarClock from 'vue-material-design-icons/CalendarClock.vue';
import Help from 'vue-material-design-icons/Help.vue';
import Database from 'vue-material-design-icons/Database.vue';
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const sidebarData = [
  { label: "Нүүр хуудас", link: "/", icon: HomeIcon },
  { label: "Өдрийн төлөвлөгөө", link: "/day", icon: CalendarEdit },
  { label: "7 хоногийн төлөвлөгөө", link: "/week", icon: CalendarIcon },
  { label: "Сарын төлөвлөгөө", link: "/month", icon: CalendarMonth },
  { label: "Жилийн хуанли", link: "/year", icon: CalendarClock },
  { label: "Гүйцэтгэл хянах", link: "/performance", icon: Database },
  { label: "Тусламж", link: "/help", icon: Help },
]

const isSmallScreen = ref(false);
const showSidebar = ref(true);

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 850;
  if (isSmallScreen.value) {
    showSidebar.value = false;
  } else {
    showSidebar.value = true;
  }
};

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
  console.log('showSidebar.value :>> ', showSidebar.value);
}

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);
});

</script>

<template>
  <div class="sidebar-container">
    <div class="sidebar" v-if="!isSmallScreen || showSidebar">
      <div class="sidebarTop">
        <Month :showButton="true" />
      </div>
      <div v-for="item in sidebarData" :key="item.label" class="menu">
        <router-link :to="item.link">
          <component :is="item.icon" class="icon" />
          <span class="sidebar-item">{{ item.label }}</span>
        </router-link>
      </div>
    </div>
    <div v-if="isSmallScreen" class="menu-icon" @click="toggleSidebar">
      <MenuIcon />
    </div>
  </div>
</template>
