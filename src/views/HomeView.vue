<script setup lang="ts">
import { useRouter } from 'vue-router';
import { VmButton } from 'vue3-material';
const router = useRouter()

const { isLoggedIn } = defineProps([
  'isLoggedIn'
]);
const changeRoute=(route: string)=>{
  router.push(route)
}
</script>

<template>
  <main>
    <div class="text">
      <h1>
        Амжилтанд хүрсэн хүн бүрт сайн төлөвлөгөө, хүч хөдөлмөр байдаг бол харин амжилтгүй хүн бүрт хэлэх нэг шалтгаан заавал байдаг байна.
      </h1>
      <div class="buttonContainer">
        <VmButton v-if="!isLoggedIn" class="button button-grey" @click="changeRoute('login')">Нэвтрэх</VmButton>
        <VmButton v-if="!isLoggedIn" class="button" @click="changeRoute('/signup')">Бүртгүүлэх</VmButton>
      </div>
    </div>
    <div>
      <img src="../assets/bookImage.png"/>
    </div>
  </main>
</template>
