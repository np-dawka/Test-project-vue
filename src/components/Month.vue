<script setup lang="ts">
import NextPrevButton from './Buttons.vue';
import createCalendar from '../composables/createCalendar';
import { ref } from 'vue';
import moment from 'moment';
import { useRouter } from 'vue-router';

const router = useRouter();

const daysOfWeek = ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'];
const { showButton, monthIndex = 0, hasBackground = false, dateData,fromYear } = defineProps([
  'showButton',
  'monthIndex',
  'hasBackground',
  'dateData',
  'fromYear'
]);

const chosenDay =ref(0)
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

const chooseday = (day: number)=>{
  chosenDay.value = day
  if(monthIndex){
    const dateToDay = moment(date.value).format('YYYY') + `-${monthIndex}-${day}`
    router.push({ name: 'day', query: { dateToDay } });
    setTimeout(() => {
      window.location.reload()
    }, 0);
   
  } else{
    const dateToDay = moment(date.value).format('YYYY-MM') + `-${day}`
    router.push({ name: 'day', query: { dateToDay } });
    setTimeout(() => {
      window.location.reload()
    }, 0);
  }
}
</script>

<template>
  <div class="month-container" :class="{ hasBackground: hasBackground }">
    <div class="title-container padding-small">
      <NextPrevButton :handler="prevMonth" v-if="showButton"  />
      <span class="title">
      {{ date.getFullYear() }} - {{ monthIndex ? monthIndex : date.getMonth() +1 }} сар
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
          <td v-for="day in row" :key="day" :class="{ today: isToday(day) && !fromYear}" @click="chooseday(day)">
            <span v-if="day !== null">{{ day }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showButton" class="buttons">
    </div>
  </div>
</template>