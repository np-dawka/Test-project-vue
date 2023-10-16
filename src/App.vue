<script lang="ts" setup>
import { RouterView, useRouter } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Topbar from './components/Topbar.vue'
import { onMounted, ref } from 'vue';
import { signOut, onAuthStateChanged} from 'firebase/auth';
import { auth } from './firebase';

const isLoggedIn = ref(false)
const router = useRouter()

const login =()=>{
  isLoggedIn.value= true
  router.push('/')
}

const signout =()=>{
  isLoggedIn.value= false
  signOut(auth)
  router.push('/')
  localStorage.setItem("token","")
}

onMounted(() => {
  // const token =localStorage.getItem("token") ?? '';
  onAuthStateChanged(auth, (user)=>{
    if(user){ 
      isLoggedIn.value= true
      router.push('/')
    } else{
      isLoggedIn.value= false
    }
  })
});

</script>

<template>
  <div class="container">
    <div v-if="isLoggedIn">
      <Sidebar />
    </div>
    <div>
      <Topbar :isLoggedIn="isLoggedIn" :signout="signout"/>
      <div class="container-content" :class="{containerFull: !isLoggedIn}">
        <RouterView :isLoggedIn="isLoggedIn" :login="login"/>
      </div>
  </div>
</div></template>

<style lang="scss">
@import "./assets/styles/mainStyles.scss";
</style>