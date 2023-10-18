<script lang="ts" setup>
import { onMounted } from 'vue';

    const { prevFunc, nextFunc, text, showButton = 'true' } = defineProps([
  'prevFunc',
  'nextFunc',
  'text',
  'showButton',
  'fromYear'
]);
onMounted(()=>{
    console.log('text :>> ', text);
})
</script>

<template>
    <div class="title-container padding-small">
      <NextPrevButton :handler="prevFunc" v-if="showButton"  />
      <span class="title">
      {{ text }}
    </span>
      <NextPrevButton :handler="nextFunc" v-if="showButton" >
          &gt;&gt;
      </NextPrevButton>
    </div>
</template>