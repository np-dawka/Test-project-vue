<script lang="ts" setup>
  import NextPrevButton from "../components/NextPrevButton.vue";

  const days = ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'];
  const {
  date
} = defineProps(["date"]);

  const prevWeek =()=>{

  }

  const nextWeek =()=>{
    
  }
</script> 

<template>
  <div class="week-calendar">
    <div class="title-container">
      <NextPrevButton :handler="prevWeek" />
      <span class="title">
        сар
      </span>
      <NextPrevButton :handler="nextWeek">
        <slot> &gt;&gt; </slot>
      </NextPrevButton>
    </div>
    <div class="content">
      <div v-for="day in days" :key="day" class="day">
        <span class="header">12 ({{ day }})</span>
        <div class="plan">kkk</div>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>
