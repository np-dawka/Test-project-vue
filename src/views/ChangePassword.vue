<script lang="ts" setup>
import { ref } from 'vue';
import AnimatedModal from '../components/AnimatedModal.vue';
import FormInput from '../components/FormInput.vue'
import Buttons from '../components/Buttons.vue';

const showPasswordError = ref("")
const showPasswordError1 = ref("")

const password = ref("")
const password1 = ref("")
const errorMsg = ref("")

const submit =()=>{

}


</script>
<template>
    <div>
        <AnimatedModal :hasGoogleButton="false">
            <form class="form">
                <h2>Нууц үг солих</h2>
                <FormInput label="Нууц үг" :error="showPasswordError ? 'Нууц үгээ оруулна уу' : ''">
                    <input type="password" placeholder="Нууц үг" v-model="password" required="true" />
                </FormInput>
                <FormInput label="Дахин оруулна уу" :error="showPasswordError1 ? 'Нууц үгээ дахин оруулна уу' : ''">
                    <input type="password" placeholder="Дахин оруулна уу" v-model="password1" required="true" />
                </FormInput>
                <Buttons type="submit" :handler="submit">
                    Нууц үг солих
                </Buttons>
                <p v-if="errorMsg" class="errorMessage">{{ errorMsg }}</p>

            </form>
        </AnimatedModal>
    </div>
</template>
<style>
</style>