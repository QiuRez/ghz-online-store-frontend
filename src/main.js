import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Aura from '@primevue/themes/aura';
import axios from 'axios';

import App from './App.vue'
import router from './router'

const app = createApp(App)

axios.defaults.baseURL = import.meta.env.VITE_API_URL

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});

const toastOptions = {
  position: "top-right",
  timeout: 4000,
  pauseOnHover: false,
  draggable: true,
  pauseOnFocusLoss: false,
  hideProgressBar: false,
}

app.use(Toast, toastOptions)

app.mount('#app')
