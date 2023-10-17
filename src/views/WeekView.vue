<script setup lang="ts">
import { ref,onUpdated, onMounted } from 'vue';
import NextPrevButton from '../components/Buttons.vue';
import moment from 'moment';
import { useRouter } from 'vue-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
interface TodoItem {
  task: string;
  type: string;
  isDone: boolean;
}

interface CompData{
  date: string,
  todos: []
}
  const startOfWeek = ref(moment().startOf('week'));
  const endOfWeek = ref(moment().endOf('week'));
  const date = ref(new Date());
  const dayDates = ref<any[]>([])
  const days = ['Ням', 'Дав', 'Мяг', 'Лха', 'Пүр', 'Баа', 'Бям'];
  const chosenDay =ref(0)
  const router = useRouter();
  const user = auth.currentUser; 
  const CompData= ref<CompData[]>([])

  const prevWeek = () => {
    startOfWeek.value.subtract(7, 'days');
    endOfWeek.value.subtract(7, 'days');
    updateCalendar()
  };

  const nextWeek = () => {
    startOfWeek.value.add(7, 'days');
    endOfWeek.value.add(7, 'days');
    updateCalendar()
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

  const formattedDate =()=>{
    return `${startOfWeek.value.format('YYYY-MM-DD')} - ${endOfWeek.value.format('YYYY-MM-DD')}`
  }

const updateCalendar = () => {
  formattedDate()
  dayDates.value =[]
  for (let i = 1; i <= 7; i++) {
      dayDates.value.push(moment(startOfWeek.value).add(i -1, 'days').format('DD'));
    }
  };

  updateCalendar();

  const chooseday = (day: number)=>{
    chosenDay.value = day
    const dateToDay =formatDate(startOfWeek.value, 'YYYY-MM') + `-${day}`
    router.push({ name: 'day', query: { dateToDay } });
    setTimeout(() => {
      window.location.reload()
    }, 0);
}

const formatDate =(date: any, format?: string)=>{
  return moment(date).format(format ?? 'YYYY-MM-DD')
}

onMounted(async () => {
  const todoListRef = collection(db, 'todos');
  if(user){
    const q = query(todoListRef,
     where('date', '>=', formatDate(startOfWeek.value)), 
     where('date', '>=', formatDate(endOfWeek.value)), 
     where('user', '==', user.uid));

  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  
  querySnapshot.forEach((doc) => {
    // const todosArray = doc.data().todos; 

    // todosArray.forEach((todoItem: TodoItem) => {
    //   const todo: TodoItem = {
    //     task: todoItem.task,
    //     type: todoItem.type,
    //     isDone: todoItem.isDone
    //   };
    //   todoList.value.push(todo);
    // });
  });
  }
});
</script>

<template>
  <div class="week-calendar">
    <div class="title-container">
      <NextPrevButton @click="prevWeek" label="Previous" />
      <h2>{{ formattedDate() }}</h2>
      <NextPrevButton @click="nextWeek" label="Next">
        &gt;&gt;
      </NextPrevButton>
    </div>
    <div class="content">
      <div v-for="(day, index) in days" :key="day" class="day" :class="{ today: isToday(index) }" @click="chooseday(dayDates[index])">
        <span class="header">{{ day }} - {{ dayDates[index] }}</span>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>
