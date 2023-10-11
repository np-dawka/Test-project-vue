<script lang="ts" setup>
    const {handler} = defineProps(['type','handler']);


</script>

<template>
    <button @click="handler">
        <slot>
            &lt;&lt;
        </slot>
    </button>
</template>

<style lang="scss">
/* Add your styles here if needed */
</style>