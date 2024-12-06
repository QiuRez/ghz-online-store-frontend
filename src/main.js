import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import axios from 'axios';

import App from './App.vue'
import router from './router'

const app = createApp(App)

axios.defaults.baseURL = 'http://laravel.test/api/'
// axios.defaults.baseURL = 'https://server.fenero.keenetic.link/api'

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});

app.mount('#app')
