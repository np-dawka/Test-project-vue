<script setup lang="ts">
import NextPrevButton from "../components/NextPrevButton.vue";
import createCalendar from "../composables/createCalendar";
import { watch, ref, onMounted } from "vue";

const daysOfWeek = ["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"];
const {
  monthIndex = 0,
  hasBackground,
  dateData,
} = defineProps(["monthIndex", "hasBackground", "dateData"]);

const dateChanged = ref(dateData ?? new Date());
const { date, prevMonth, nextMonth, rows } = createCalendar(
  dateChanged.value,
  monthIndex,
  hasBackground
);

// watch(dateData, (newValue) => {
//   dateChanged.value = newValue ?? new Date();
//   console.log('dateData :>> ', dateData);
// });
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
        <slot> &gt;&gt; </slot>
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
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@import "../assets/styles/componentStyles.scss";
</style>
