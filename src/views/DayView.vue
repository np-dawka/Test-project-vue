<script lang="ts" setup>
import { ref } from 'vue';
import Month from '../components/Month.vue';

  const date = ref(new Date());
</script>
<template>
    <div class="day-plan">
        <div class="todo-list section-item">
          <div>
            todos
          </div>
          <div> 
            add button
          </div>
        </div>
        <div class="additional-section">
          <!-- <div class="aphorism section-item">
            Нэг өнөөдөр 2 маргаашийн үнэтэй.
          </div> -->
         <div class="calendar">
          <Month
            :showButton="true"
            :hasBackground="true"
          />
         </div>
          <div class="finance section-item">
            finance
          </div>
        </div>
    </div>
  </template>
  