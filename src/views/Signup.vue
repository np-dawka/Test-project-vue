<script lang="ts" setup>
import { ref } from 'vue';
import AnimatedModal from '../components/AnimatedModal.vue';
import FormInput from '../components/FormInput.vue'
import Buttons from '../components/Buttons.vue';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {auth} from '../firebase'

const { login } = defineProps([
    'isLoggedIn',
    'login'
    ]);

const password = ref("")
const email = ref("")
const username = ref("")
const errorMsg = ref("")

let showPasswordError = ref(false);
let showEmailError = ref(false);

const submit =(e: Event)=>{
    e.preventDefault();
    if (!password.value) {
        showPasswordError.value = true;
    } else {
        showPasswordError.value = false; // Clear the error message
    }

    if (!email.value) {
        showEmailError.value = true;
    } else {
        showEmailError.value = false; // Clear the error message
    }    

    if(password && email){
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((credantial)=>{
            updateProfile(auth.currentUser,{
                displayName: username.value ?? ""
            })
            console.log('credantial :>> ', credantial);
            login()
        })
        .catch((err)=>{
            console.log('err :>> ', err);
            switch(err.code){
                case 'auth/invalid-email':
                    errorMsg.value = "Алдаатай и-мэйл хаяг байна";
                    break;
                case 'auth/user-not-found':
                    errorMsg.value = "Хэрэглэгч бүртгэлгүй байна";
                    break;
                case 'auth/invalid-email':
                    errorMsg.value = "Алдаатай и-мэйл хаяг байна";
                    break;
                default:
                    errorMsg.value = 'И-мэйл болон нууц үг алдаатай байна'
            }
        })
    }
}

</script>
<template>
    <div>
        <AnimatedModal type="signup">
            <form class="form">
                <h2>Бүртгүүлэх</h2>
                <FormInput label="Хэрэглэгчийн нэр" :error="showEmailError ? 'Хэрэглэгчийн нэраа оруулна уу' : ''">
                    <input type="text" placeholder="Хэрэглэгчийн нэр" v-model="username" required="true" />
                </FormInput>

                <FormInput label="И-мэйл хаяг" :error="showEmailError ? 'И-мэйл хаягаа оруулна уу' : ''">
                    <input type="email" placeholder="И-мэйл хаяг" v-model="email" required="true" />
                </FormInput>

                <FormInput label="Нууц үг" :error="showPasswordError ? 'Нууц үгээ оруулна уу' : ''">
                    <input type="password" placeholder="Нууц үг" v-model="password" required="true" />
                </FormInput>
                <Buttons type="submit" :handler="submit">
                    Бүртгүүлэх
                </Buttons>
                <router-link to="/login" class="linkButton">
                    Нэвтрэх
                </router-link>
                <p v-if="errorMsg">{{ errorMsg }}</p>
            </form>
        </AnimatedModal>
    </div>
</template>
<style>
</style>