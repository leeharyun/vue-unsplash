import { createApp } from 'vue';
import App from './App';
import router from './routes/index.js';
import store from '@/store/store.js';
import "@/assets/scss/index.scss";

const app = createApp(App);
app.use(store)
   .use(router)
   .mount('#app');

app.config.globalProperties.$store = store;
