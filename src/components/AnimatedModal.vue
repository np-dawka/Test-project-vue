<script lang="ts" setup>
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import Google from 'vue-material-design-icons/Google.vue';

   const {  hasGoogleButton = 'true', login} = defineProps([
    'hasGoogleButton', 'login'
    ]);


    const signinWithGoogle =()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(()=>{
       login()
    })
}
</script>
<template>
   <div class="animated-modal">
    <div class="box">
       <div class="box-inset">
            <slot>
                loin, sign up
            </slot>
            <button v-if="hasGoogleButton!=false" @click="signinWithGoogle" class="google-account-button">
               <Google/>
               Google account
            </button>
       </div>
    </div>
   </div>
</template>
