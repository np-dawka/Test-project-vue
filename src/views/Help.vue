<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface HelpItem {
  id: string;
  question: string;
  answer: string;
}

const data = ref<HelpItem[]>([]);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'help'));
  querySnapshot.forEach((doc) => {
    const help: HelpItem = {
      id: doc.id,
      question: doc.data().question,
      answer: doc.data().answer,
    };
    data.value.push(help);
  });
});
</script>

<template>
  <div class="help-view">
    <h1>Тусламж</h1>
    <div class="grid-container">
      <div v-for="item in data" :key="item.id" class="help-view-item">
      <div class="question view-item">
        <span>{{ item.question }} </span>
      </div>
      <div class="answer view-item">
        <span> {{ item.answer }}</span>
      </div>
    </div>
    </div>
  </div>
</template>

<style>
  @import '../assets/styles/viewsStyles.scss'
</style>
