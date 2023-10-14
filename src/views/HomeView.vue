<script setup lang="ts">
import { useRouter } from 'vue-router';
import { VmButton } from 'vue3-material';
const router = useRouter()

const changeRoute=(route: string)=>{
  router.push(route)
}
</script>

<template>
  <main>
    <div class="text">
      <h1>
        Амжилтанд хүрсэн хүн бүрт сайн төлөвлөгөө, хүч хөдөлмөр байдаг бол амжилтгүй хүн бүрт хэлэх нэг шалтгаан заавал байдаг байна.
      </h1>
      <div class="buttonContainer">
        <VmButton class="button button-grey" @click="changeRoute('login')">Нэвтрэх</VmButton>
        <VmButton class="button" @click="changeRoute('/signup')">Бүртгүүлэх</VmButton>
      </div>
    </div>
    <div>
      <!-- <picture>
      <source media="(min-width:650px)" srcset="../assets/bookImage.png">
      <source media="(min-width:465px)" srcset="img_white_flower.jpg">
      <img src="img_orange_flowers.jpg" alt="Flowers" style="width:auto;">
    </picture> -->
      <img src="../assets/bookImage.png"/>
    </div>
  </main>
</template>
