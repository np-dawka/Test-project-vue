<script lang="ts" setup>
import { ref } from 'vue';
import AnimatedModal from '../components/AnimatedModal.vue';
import FormInput from '../components/FormInput.vue'
import Buttons from '../components/Buttons.vue';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase'

const { login } = defineProps([
    'isLoggedIn',
    'login'
    ]);
const password = ref("")
const email = ref("")
const errorMsg = ref("")

let showPasswordError = ref(false);
let showEmailError = ref(false);

const submit =(e: Event)=>{
    e.preventDefault();  

    if(password.value && email.value){
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(()=>{
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
    } else{
        errorMsg.value = 'И-мэйл болон нууц үгээ оруулна уу'
    }
}

</script>
<template>
    <div>
        <AnimatedModal>
            <form class="form">
                <h2>Бүртгүүлэх</h2>
                <FormInput label="И-мэйл хаяг" :error="showEmailError ? 'И-мэйл хаягаа оруулна уу' : ''">
                    <input type="email" placeholder="И-мэйл хаяг" v-model="email" required="true" />
                </FormInput>

                <FormInput label="Нууц үг" :error="showPasswordError ? 'Нууц үгээ оруулна уу' : ''">
                    <input type="password" placeholder="Нууц үг" v-model="password" required="true" />
                </FormInput>

                <div class="buttonContainer">
                    <Buttons type="submit" :handler="submit">
                        Бүртгүүлэх
                    </Buttons>
                </div>
                <router-link to="/login" class="linkButton">
                    Нэвтрэх
                </router-link>
                <p v-if="errorMsg" class="errorMessage">{{ errorMsg }}</p>
            </form>
        </AnimatedModal>
    </div>
</template>
<style>
</style>