<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import NextPrevButton from '../components/Buttons.vue';
import moment from 'moment';
import { useRouter } from 'vue-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Tasks from '../components/Tasks.vue';

interface CompData{
  date: string,
  todos: []
}
  const startOfWeek = ref(moment().startOf('week'));
  const endOfWeek = ref(moment().endOf('week'));
  const dayDates = ref<any[]>([])
  const days = ['Ням', 'Дав', 'Мяг', 'Лха', 'Пүр', 'Баа', 'Бям'];
  const chosenDay =ref(0)
  const router = useRouter();
  const user = auth.currentUser; 
  const compData= ref<CompData[]>([])

  const prevWeek = () => {
    startOfWeek.value.subtract(7, 'days');
    endOfWeek.value.subtract(7, 'days');
    updateCalendar()
    FetchData()
  };

  const nextWeek = () => {
    startOfWeek.value.add(7, 'days');
    endOfWeek.value.add(7, 'days');
    updateCalendar()
    FetchData()
  };

  const formattedDate =()=>{
    return `(${startOfWeek.value.format('YYYY-MM-DD')}) - (${endOfWeek.value.format('YYYY-MM-DD')})`
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
}

const formatDate =(date: any, format?: string)=>{
  return moment(date).format(format ?? 'YYYY-MM-DD')
}

const FetchData = async()=>{
  const todoListRef = collection(db, 'todos');
  if (user) {
    const q = query(todoListRef,
      where('date', '>=', formatDate(startOfWeek.value)),
      where('date', '<=', formatDate(endOfWeek.value)),
      where('user', '==', user.uid)
    );
  
  try {
    const querySnapshot = await getDocs(q);
    compData.value = [];
  
    querySnapshot.forEach((doc) => {
      const todosArray = doc.data().todos;
      const formattedDate = formatDate(doc.data().date);
      compData.value.push({ date: formattedDate, todos: todosArray});
    });
  } catch (error) {
  }
  }
}
onMounted(() => {
  FetchData()
});

</script>
<template>
  <div class="week-calendar">
    <div class="title-container">
      <NextPrevButton @click="prevWeek" label="Previous" />
      <h2>{{ formattedDate() }}</h2>
      <NextPrevButton @click="nextWeek" label="Next">
       >>
      </NextPrevButton>
    </div>
    <div class="content">
      <div v-for="(day, index) in days" :key="day" class="day" @click="chooseday(dayDates[index])">
        <span class="header">{{ day }} - {{ dayDates[index] }}</span>
       <div class="todo-list-container taskContainer">
          <div v-for="(item, itemIndex) in compData" :key="itemIndex">
            <div v-for="task in item.todos" :key="item.date" v-if="dayDates[index] === item.date.slice(8,10)" >
                <Tasks :task="task" type="small"/>
            </div>
          </div>
       </div>
      </div>
    </div>
  </div>
</template>
z