<template>
  <div class="week-calendar">
    <div class="title-container">
      <NextPrevButton @click="prevWeek" label="Previous" />
      <h2>{{ formattedWeek }}</h2>
      <NextPrevButton @click="nextWeek" label="Next" />
    </div>
    <div class="content">
      <div v-for="day in days" :key="day" class="day">
        <span class="header">{{ formatDate(day) }}</span>
        <div class="plan">Sample Plan</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import NextPrevButton from '../components/NextPrevButton.vue';

const date = ref(new Date());
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const formattedWeek = computed(() => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.value.toLocaleDateString('en-US', options);
});

const formatDate = (day) => {
  const options = { weekday: 'long' };
  return new Date(day).toLocaleDateString('en-US', options);
};

const prevWeek = () => {
  date.value.setDate(date.value.getDate() - 7);
};

const nextWeek = () => {
  date.value.setDate(date.value.getDate() + 7);
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
