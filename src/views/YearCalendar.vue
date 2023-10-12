<script setup lang="ts">
import Month from '../components/Month.vue';
import NextPrevButton from '../components/NextPrevButton.vue';
import { onMounted, onUpdated, ref } from 'vue';


const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const date = ref(new Date());

const prevYear = () => {
    date.value = new Date(date.value.getFullYear() - 1, date.value.getMonth(), 1);
    // console.log('date.value :>> ', date.value);
};

const nextYear = () => {
    date.value = new Date(date.value.getFullYear() + 1, date.value.getMonth(), 1);
};

onUpdated(() => {
  
}),(() => {
  console.log('dateData :>> ', date);
});
</script>

<template>
<div class="content-container-view year">
    <div class="title-container">
        <NextPrevButton :handler="prevYear" />
        <h2>{{ date.getFullYear() }} оны хуанли</h2>
        <NextPrevButton :handler="nextYear">
          <slot>
            &gt;&gt;
          </slot>
        </NextPrevButton>
    </div>
   <div class="year-container">
    <div v-for="month in months" >
            <Month :showButton="false" :monthIndex="month" :hasBackground="true" :dateData="date"  />
    </div>
   </div>
</div>
</template>
<style>
@import '../assets/styles/viewsStyles.scss'
</style>
