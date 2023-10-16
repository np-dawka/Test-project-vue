<script setup lang="ts">
import NextPrevButton from './Buttons.vue';
import createCalendar from '../composables/createCalendar';
import { ref } from 'vue';

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

const isToday = (day: number | null) => {
  if (day === null) {
    return false;
  }

  const today = new Date();
  return today.getDate() === day && today.getMonth() === date.value.getMonth() && today.getFullYear() === date.value.getFullYear();
};

</script>

<template>
  <div class="month-container" :class="{ hasBackground: hasBackground }">
    <div class="title-container padding-small">
      <NextPrevButton :handler="prevMonth" v-if="showButton"  />
      <span class="title">
      {{ date.getFullYear() }} - {{ hasBackground && monthIndex === 0 ? 1 : monthIndex ? monthIndex + 1 : date.getMonth() + 1 }} сар
    </span>
    <NextPrevButton :handler="nextMonth" v-if="showButton" >
          &gt;&gt;
      </NextPrevButton>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row">
          <td v-for="day in row" :key="day" :class="{ today: isToday(day) }">
            <span v-if="day !== null">{{ day }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showButton" class="buttons">
    </div>
  </div>
</template>

<style scoped>
@import "../assets/styles/componentStyles.scss";
</style>