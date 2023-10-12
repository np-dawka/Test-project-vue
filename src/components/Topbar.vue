<script lang="ts" setup>
import { ref } from 'vue';
import ThemeToggler from './ThemeToggler.vue';
import UserModal from './UserModal.vue';

  // const Logout=()=>{
  
  // }

  const showModal = ref(false);

  const toggleModal=()=>{
    showModal.value = !showModal.value;
    console.log('showModal.value :>> ', showModal.value);
  }

</script>

<template>
  <div class="topbar">
      <ThemeToggler/>
    <div class="user" @click="toggleModal">
      <!-- <img src="../assets/user.svg"/> -->
      <svg class="userIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="6" r="4" fill="#fff"></circle> <path d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" fill="#fff"></path> </g></svg>
    </div>
    <div class="usermodal-view" v-if="showModal">
      <UserModal />
    </div>
  </div>
</template>
