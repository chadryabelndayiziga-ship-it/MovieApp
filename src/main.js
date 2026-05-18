import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Set the base URL for axios
axios.defaults.baseURL = 'http://localhost:8080/api'

axios.interceptors.request.use((config) => {
  // Add any necessary request interception logic here
  return config;
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
});

const app = createApp(App)
app.use(router)
app.mount('#app')
