import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Vue3Material from 'vue3-material';
import MenuIcon from 'vue-material-design-icons/Menu.vue';

const app = createApp(App);

app.use(router);
app.component('menu-icon', MenuIcon);

createApp(App)
    .use(router)
    .use(Vue3Material)
    .mount('#app');