<script setup lang="ts">
import NextPrevButton from "../components/Buttons.vue";
import createCalendar from "../composables/createCalendar";
import { ref, onMounted } from "vue";

const daysOfWeek = ["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"];
const {
  monthIndex = 0,
  hasBackground,
  dateData,
} = defineProps(["monthIndex", "hasBackground", "dateData"]);

const todo = ref("")
const dateChanged = ref(dateData ?? new Date());
const { date, prevMonth, nextMonth, rows } = createCalendar(
  dateChanged.value,
  monthIndex,
  hasBackground
);

onMounted(() => {
  
});
</script>
<template>
  <div class="month-container month-view" :class="{ hasBackground: hasBackground }">
    <div class="title-container">
      <NextPrevButton :handler="prevMonth" />
      <span class="title">
        {{ date.getFullYear() }} -
        {{
          monthIndex == "Nan"
            ? 1
            : monthIndex
            ? monthIndex + 1
            : date.getMonth() + 1
        }}
        сар
      </span>
      <NextPrevButton :handler="nextMonth">
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
          <td v-for="day in row" :key="day">
            <span v-if="day !== null">{{ day }}</span>
            <input v-model="todo" style="width: 100px; display: block;"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@import "../assets/styles/componentStyles.scss";
</style>
