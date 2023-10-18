<script setup lang="ts">
import NextPrevButton from './Buttons.vue';
import createCalendar from '../composables/createCalendar';
import { ref } from 'vue';
import moment from 'moment';
import { useRouter } from 'vue-router';

const router = useRouter();

const daysOfWeek = ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'];
const { showButton, monthIndex = 0, hasBackground = false, dateData,changeDayValue } = defineProps([
  'showButton',
  'monthIndex',
  'hasBackground',
  'dateData',
  'changeDayValue'
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

const chooseday = (day: number)=>{

  if(day){
    let dateToDay = null
      if(monthIndex){
        dateToDay = moment(date.value).format('YYYY') + `-${monthIndex}-${day}`
      } else{
         if(day<10){
          dateToDay = moment(date.value).format('YYYY-MM') + `-0${day}`
         } else{
          dateToDay = moment(date.value).format('YYYY-MM') + `-${day}`
         }
        }
        router.push({ name: 'day', query: { dateToDay } });
        changeDayValue()
  }
}
</script>

<template>
  <div class="month-container" :class="{ hasBackground: hasBackground }">
    <div class="title-container padding-small">
      <NextPrevButton :handler="prevMonth" v-if="showButton && hasBackground"  />
      <span class="title">
      {{ date.getFullYear() }} - {{ monthIndex ? monthIndex : date.getMonth() +1 }} сар
    </span>
      <NextPrevButton :handler="nextMonth" v-if="showButton && hasBackground" >
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
        <tr v-for="row in rows" :key="row" >
          <td v-for="day in row" :key="day"  @click="hasBackground ?chooseday(day) : null">
            <span v-if="day !== null">{{ day }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showButton" class="buttons">
    </div>
  </div>
</template>