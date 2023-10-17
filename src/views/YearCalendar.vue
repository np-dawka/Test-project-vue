<script setup lang="ts">
import Month from "../components/Month.vue";
import NextPrevButton from "../components/Buttons.vue";
import { ref } from "vue";

const date = ref(new Date());

const prevYear = () => {
  date.value = new Date(date.value.getFullYear() - 1, date.value.getMonth(), 1);
};

const nextYear = () => {
  date.value = new Date(date.value.getFullYear() + 1, date.value.getMonth(), 1);
};

const computeMonths = () => {
  return [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
};

</script>

<template>
  <div class="content-container-view year">
    <div class="title-container">
      <NextPrevButton :handler="prevYear" />
      <h2>{{ date.getFullYear() }} оны хуанли</h2>
      <NextPrevButton :handler="nextYear"> 
        &gt;&gt;
      </NextPrevButton>
    </div>
    <div class="year-container">
      <div v-for="month in computeMonths()" :key="`${date}-${month}`">
        <Month
          :fromYear = true
          :showButton="false"
          :monthIndex="month"
          :hasBackground="true"
          :dateData="date"
        />
      </div>
    </div>
  </div>
</template>

<style>
@import "../assets/styles/viewsStyles.scss";
</style>