<script lang="ts" setup>
import { ref } from 'vue';
import AnimatedModal from '../components/AnimatedModal.vue';
import FormInput from '../components/FormInput.vue'
import Buttons from '../components/Buttons.vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const { login } = defineProps(['login']);

const password = ref("")
const email = ref("")
let showPasswordError = ref(false);
let showEmailError = ref(false)
const errorMsg = ref("")

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
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((credantial)=>{
            login()
            localStorage.setItem("token", credantial.user?.accessToken);
        })
        .catch((err)=>{
            console.log('err :>> ', err.code);
            switch(err.code){
                case 'auth/invalid-email':
                    errorMsg.value = "Алдаатай и-мэйл хаяг байна";
                    break;
                case 'auth/user-not-found':
                    errorMsg.value = "Хэрэглэгч бүртгэлгүй байна";
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
        <AnimatedModal>
            <form class="form">
                <h2>Нэвтрэх</h2>
                <FormInput label="И-мэйл хаяг" :error="showEmailError ? 'И-мэйл хаягаа оруулна уу' : ''">
                <input type="email" placeholder="И-мэйл хаяг" v-model="email" required="true" />
                </FormInput>

                <FormInput label="Нууц үг" :error="showPasswordError ? 'Нууц үгээ оруулна уу' : ''">
                <input type="password" placeholder="Нууц үг" v-model="password" required="true" />
                </FormInput>
                <Buttons type="submit" :handler="submit">
                    Нэвтрэх
                </Buttons>
                <router-link to="/signup" class="linkButton">
                    Бүртгүүлэх
                </router-link>
                <p v-if="errorMsg" class="errorMessage">{{ errorMsg }}</p>

            </form>
        </AnimatedModal>
    </div>
</template>
<style>
</style>