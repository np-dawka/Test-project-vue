<script setup lang="ts">
import NextPrevButton from "../components/Buttons.vue";
import createCalendar from "../composables/createCalendar";
import { ref, onMounted } from "vue";
import moment from 'moment';
import { useRouter } from "vue-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import Tasks from "../components/Tasks.vue";

interface TodoItem {
  task: string;
  type: string;
}

interface MonthItem {
  date: string;
  todos: TodoItem[]; // Use TodoItem type for todos
}

const daysOfWeek = ["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"];
const {
  monthIndex = 0,
  hasBackground,
  dateData,
} = defineProps(["monthIndex", "hasBackground", "dateData"]);

const router = useRouter();

function formatDate(date: Date, day:number) {
  return moment(date).format('YYYY-MM') + `-${day}`;
}

const data = ref<MonthItem[]>([]);

const chosenDay = ref(0);
const dateChanged = ref(dateData ?? new Date());
const { date, prevMonth, nextMonth, rows } = createCalendar(
  dateChanged.value,
  monthIndex,
  hasBackground
);

const chooseday = (day: number) => {
  chosenDay.value = day;
  let dateToDay = "";

  if (monthIndex) {
    dateToDay = moment(date.value).format('YYYY') + `-${monthIndex}-${day}`;
  } else {
    dateToDay = moment(date.value).format('YYYY-MM') + `-${day}`;
  }
  router.push({ name: 'day', query: { dateToDay } });
};

onMounted(async () => {
  const startOfMonth = moment(date.value).startOf('month');
  const endOfMonth = moment(date.value).endOf('month');
  const todoListRef = collection(db, 'todos');
  const user = auth.currentUser; 

  if(user){
    const q = query(todoListRef,
    where('user', '==', user.uid),
    where('date', '>=', startOfMonth.format('YYYY-MM-DD')),
    where('date', '<=', endOfMonth.format('YYYY-MM-DD'))
  );

  const querySnapshot = await getDocs(q);
  data.value = [];

  querySnapshot.forEach((doc) => {
    const todosArray = doc.data().todos;
    const formattedDate = moment(doc.data().date).format('YYYY-MM-DD');
    data.value.push({ date: formattedDate, todos: todosArray.slice(0,2)});
  });
  }
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
          <td v-for="day in row" :key="day" @click="chooseday(day)">
            <span v-if="day !== null">{{ day }}</span>
            <div class="todos">
              <div v-for="item in data" :key="item.date">
                <div v-if="item.date === formatDate(date, day)" class="todo-list-container">
                  <div v-for="todo in item.todos" :key="todo.task">
                    <Tasks :task="todo" type="small"/>
                  </div>
                  more...
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@import "../assets/styles/componentStyles.scss";
</style>
