<script lang="ts" setup>
import { computed } from 'vue';
import Lock from 'vue-material-design-icons/Lock.vue';
import Logout from 'vue-material-design-icons/Logout.vue';
import Login from 'vue-material-design-icons/Login.vue';
import NoteEdit from 'vue-material-design-icons/NoteEdit.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

let { isLoggedIn, toggleModal, signout } = defineProps([
  'isLoggedIn',
  'toggleModal',
  'signout'
]);

const userModalData = [
  { label: "Нууц үе солих", link: "/change-password", icon: Lock },
  { label: "Гарах", link: "/", icon: Logout }
];

const userAccessModalData = [
  { label: "Нэвтрэх", link: "/login", icon: Login },
  { label: "Бүртгүүлэх", link: "/signup", icon: NoteEdit }
];

const modalData = computed(() => {
  return isLoggedIn ? userModalData : userAccessModalData;
});

const clickHandler = (link: string) => {
  if(link === '/'){
    signout()
    toggleModal()
  } else{
    router.push(link); 
    toggleModal()
  }
};
</script>

<template>
  <div v-for="item in modalData" :key="item.label" class="item" @click="clickHandler(item.link)">
      <component :is="item.icon" class="icon" />
      <span class="text">{{ item.label }}</span>
  </div>
</template>
