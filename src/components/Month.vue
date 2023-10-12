<script setup lang="ts">
import NextPrevButton from './NextPrevButton.vue';
import createCalendar from '../composables/createCalendar';
import { ref, watch } from 'vue';

const daysOfWeek = ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'];
const { showButton, monthIndex = 0, hasBackground = false, dateData } = defineProps([
  'showButton',
  'monthIndex',
  'hasBackground',
  'dateData'
]);

const dateChanged = ref(dateData ?? new Date());
const {
  date,
  prevMonth,
  nextMonth,
  rows,
} = createCalendar(
  dateChanged.value,
  monthIndex,
  hasBackground
);

watch(dateData, (newValue) => {
  dateChanged.value = newValue ?? new Date();
  console.log('dateData :>> ', dateData);
});
</script>

<template>
  <div class="month-container" :class="{ hasBackground: hasBackground }">
    <span class="title">
      {{ date.getFullYear() }} - {{ monthIndex == "Nan" ? 1 : monthIndex ? monthIndex + 1 : date.getMonth() + 1 }} сар
    </span>
    <table>
      <thead>
        <tr>
          <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row">
          <td v-for="day in row" :key="day">
            <span v-if="day !== null">{{ day }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showButton" class="buttons">
      <NextPrevButton :handler="prevMonth" />
      <NextPrevButton :handler="nextMonth">
        <slot>
          &gt;&gt;
        </slot>
      </NextPrevButton>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/styles/componentStyles.scss";
</style>
