<script lang="ts" setup>
    import { VmButton } from 'vue3-material';
    const {handler, type = "button", } = defineProps(['type','handler']);

</script>

<template>
    <VmButton @click="handler" class="nextPrev-button" :type="type" :class="{hasBigPadding: type === 'submit'}">
        <slot>
            &lt;&lt;
        </slot>
    </VmButton>
</template>

<style lang="scss">
/* Add your styles here if needed */
</style>