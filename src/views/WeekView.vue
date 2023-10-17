<script setup lang="ts">
  import { ref,onUpdated } from 'vue';
  import NextPrevButton from '../components/Buttons.vue';
  import moment from 'moment';

  // Define startOfWeek and endOfWeek as refs
  const startOfWeek = ref(moment().startOf('week'));
  const endOfWeek = ref(moment().endOf('week'));
  const date = ref(new Date());
  const days = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];

  const prevWeek = () => {
    startOfWeek.value.subtract(7, 'days');
    endOfWeek.value.subtract(7, 'days');
  };

  const nextWeek = () => {
    startOfWeek.value.add(7, 'days');
    endOfWeek.value.add(7, 'days');
  };

  const isToday = (day: number | null) => {
    if (day === null) {
      return false;
    }

    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === date.value.getMonth() &&
      today.getFullYear() === date.value.getFullYear()
    );
  };

  onUpdated(() => {
    console.log('startOfWeek.value :>> ', startOfWeek.value);
});
</script>

<template>
  <div class="week-calendar">
    <div class="title-container">
      <NextPrevButton @click="prevWeek" label="Previous" />
      <h2>{{ startOfWeek.format('YYYY-MM-DD') }} - {{ endOfWeek.format('YYYY-MM-DD') }}</h2>
      <NextPrevButton @click="nextWeek" label="Next">
        &gt;&gt;
      </NextPrevButton>
    </div>
    <div class="content">
      <div v-for="(day, index) in days" :key="day" class="day" :class="{ today: isToday(index) }">
        <span class="header">{{ day }} - {{ moment(startOfWeek).add(index, 'days').format('DD') }}</span>
      </div>
    </div>
  </div>
</template>
