<script setup lang="ts">
import { ref } from 'vue';

const { type = "full", task, changeTask} = defineProps([
  'type', 'task', 'changeTask'
]);

const getType = (todoType: string) => {
    const type = ref("")
    if(todoType === 'work'){
        type.value = 'Ажил'
    } else if(todoType === 'hobby'){
        type.value = 'Хобби'
    } else if(todoType === 'chores'){
        type.value = 'Гэрийн ажил'
    } else{
        type.value = 'Бусад'
    }
    return type.value
  };

</script>

<template>
    <div class="list-item" :class="task.type,{smallContainer: type==='small'}">
        <slot name="beforeType"></slot>               
        <span class="task" :class="{textCross: task.isDone && type === 'small', textSmall: type === 'small'}" @click="changeTask(task)">{{ task.task }}</span>
        <span class="type" v-if="type === 'full'">
            {{ getType(task.type)}}
        </span>
        <slot name="afterType"></slot> 
    </div>
</template>