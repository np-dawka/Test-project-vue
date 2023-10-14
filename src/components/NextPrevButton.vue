<script lang="ts" setup>
    import { VmButton } from 'vue3-material';
    const {handler} = defineProps(['type','handler']);

</script>

<template>
    <VmButton @click="handler" class="nextPrev-button">
        <slot>
            &lt;&lt;
        </slot>
    </VmButton>
</template>

<style lang="scss">
/* Add your styles here if needed */
</style>