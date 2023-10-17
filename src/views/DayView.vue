<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Month from '../components/Month.vue';
import Buttons from '../components/Buttons.vue';
import Plus from 'vue-material-design-icons/Plus.vue';
import Delete from 'vue-material-design-icons/Delete.vue';
import FormInput from '../components/FormInput.vue';
import moment from 'moment';
import { getDocs, query, where, addDoc, updateDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Tasks from '../components/Tasks.vue';

interface TodoItem {
  task: string;
  type: string;
  isDone: boolean;
}

const { dateToDay } = defineProps(['dateToDay']);

const date = dateToDay ?? ref(moment(new Date()));
const formattedDate = moment(date).format('YYYY-MM-DD');
const todo = ref("");
const todoType = ref("");
const isDone = ref(false);
const showInput = ref(false);
const isChanging = ref(false);
const todoList = ref<TodoItem[]>([]);

const user = auth.currentUser; 
// Get the current user
const toggleInputs = () => {
  showInput.value = !showInput.value;
};

const checkAndSaveTodoList = async () => {
  if (user) {
    const todoListRef = collection(db, 'todos');
    const q = query(todoListRef, where('date', '==', formattedDate), where('user', '==', user.uid));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(todoListRef, { date: formattedDate, user: user.uid, todos: todoList.value });
    } else {
      const doc = querySnapshot.docs[0];
      await updateDoc(doc.ref, { todos: todoList.value });
    }
  }
};


const submit = () => {
  const newTodo = { task: todo.value, type: todoType.value, isDone: isDone.value };
  todoList.value.push(newTodo);
  todo.value = "";
  todoType.value = "";
  isDone.value = false;
  checkAndSaveTodoList(); 
  showInput.value = false
};

const updateCheckbox = (task: TodoItem) => {
  const taskToUpdate = todoList.value.indexOf(task);
  if (taskToUpdate !== -1) {
    todoList.value[taskToUpdate].isDone = !todoList.value[taskToUpdate].isDone
    checkAndSaveTodoList();
  }
};

const deleteTodo =(task: TodoItem) =>{
  const filteredData = todoList.value.filter(el => el.task !== task.task)
  todoList.value =  filteredData
  checkAndSaveTodoList();
}

// const changeData =(task: TodoItem)=>{
//   const taskToUpdate = todoList.value.indexOf(task);
//   todo.value = task.task
//   todoType.value = task.type
//   if (taskToUpdate) {
//     todoList.value[taskToUpdate].isDone = isDone.value
//     todoList.value[taskToUpdate].task = task.task
//     todoList.value[taskToUpdate].type = task.type 
//     checkAndSaveTodoList();
//   }
//   showInput.value = true
//   isChanging.value = true
// }

onMounted(async () => {
  const todoListRef = collection(db, 'todos');
  if(user){
    const q = query(todoListRef, where('date', '==', formattedDate), where('user', '==', user.uid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const todosArray = doc.data().todos; 

    todosArray.forEach((todoItem: TodoItem) => {
      const todo: TodoItem = {
        task: todoItem.task,
        type: todoItem.type,
        isDone: todoItem.isDone
      };
      todoList.value.push(todo);
    });
  });
  }
  
});
</script>

<template>
    <div class="day-plan">
        <div class="todo-list section-item">
          <div class="title-container padding-small">
            <h3 class="title">
            {{ formattedDate}} сар
            </h3>
            </div>
          <div class="todo-list-container"> 
              <div v-if="todoList.length" v-for="task in todoList" :key="task.task"  >
              <!-- @click="changeData(task)"  -->
                <Tasks :task="task">
                  <template #beforeType>
                    <input
                      type="checkbox"
                      :checked="task.isDone"
                      @change="updateCheckbox(task)"
                    />   
                </template>
                <template #afterType>
                  <Delete @click="deleteTodo(task)"/>   
                </template>       
                </Tasks>
              </div>
              <h3 v-else>Одоогоор жагсаалт гаргаагүй байна</h3>
          </div>
         <div class="buttonContainer">
          <Buttons @click="toggleInputs">
            <Plus/>
          </Buttons>
         </div>
          <form v-if="showInput" > 
            <div class="todo-container">
                <div class="text-input">
                  <FormInput label="Хийх зүйл">
                    <input v-model="todo" placeholder="Хийх зүйл оруулах" :required="true"/>
                  </FormInput>
                </div>
                <FormInput label="Төрөл">
                    <select v-model="todoType">
                      <optgroup label="Төрлүүд" class="optionBox">
                        <option value="work">Ажил</option>
                        <option value="hobby">Хобби</option>
                        <option value="chores">Гэрийн ажил</option>
                        <option value="other">Бусад</option>
                      </optgroup>
                    </select>
                </FormInput>
                <Buttons @click="submit">{{!isChanging ? "Нэмэх" : "Засах"}}</Buttons>
            <div>
              </div>
            
          </div>
         
          </form>
        </div>
        <div class="additional-section">
          <div class="calendar">
           <Month
             :showButton="true"
             :hasBackground="true"
           />
          </div>
          <div class="aphorism section-item">
            Нэг өнөөдөр 2 маргаашийн үнэтэй.
          </div>
          <!-- <div class="finance section-item">
            finance
          </div> -->
        </div>
    </div>
  </template>
  