import { createApp } from 'vue';
import App from './App';
import store from '@/store/store.js';

const app = createApp(App);
app.use(store)
   .mount('#app');

app.config.globalProperties.$store = store;