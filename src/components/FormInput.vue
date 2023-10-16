<script setup lang="ts">
const { label, error = 'Заавал бөглөнө үү' } = defineProps([
  'label',
  'error'
]);
</script>

<template>
  <div class="input-container">
    <label>{{ label }}</label>
    <slot>
        
    </slot>
    <span class="errorMessage" v-if="error">
      {{ error }}
    </span>
  </div>
</template>