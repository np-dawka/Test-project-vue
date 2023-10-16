<template>
  <div class="week-calendar">
    <div class="title-container">
      <NextPrevButton @click="prevWeek" label="Previous" />
      <h2>{{ formattedWeek }}</h2>
      <NextPrevButton @click="nextWeek" label="Next">
        &gt;&gt;
      </NextPrevButton>
    </div>
    <div class="content">
      <div v-for="day in days" :key="day" class="day" :class="{ today: isToday(days.indexOf(day)) }">
        <span class="header">{{ day }} - {{ getDayNumber(days.indexOf(day) -1) }}</span>
        <div class="plan">Sample Plan</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import NextPrevButton from '../components/Buttons.vue';

const date = ref(new Date());
const days = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];

const formattedWeek = computed(() => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.value.toLocaleDateString('en-US', options);
});

const prevWeek = () => {
  date.value.setDate(date.value.getDate() - 7);
};

const nextWeek = () => {
  date.value.setDate(date.value.getDate() + 7);
};

const isToday = (day: number | null) => {
  if (day === null) {
    return false;
  }

  const today = new Date();
  return today.getDate() === day && today.getMonth() === date.value.getMonth() && today.getFullYear() === date.value.getFullYear();
};

const getDayNumber = (dayIndex: number) => {
  const day = new Date(date.value);
  day.setDate(day.getDate() + dayIndex);
  return day.getDate();
};
</script>
