import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Vue3Material from 'vue3-material';

const app = createApp(App);

// app.use(Vuematerial)
app.use(router);

app.mount('#app');

createApp(App)
    .use(router)
    .use(Vue3Material)
    .mount('#app');