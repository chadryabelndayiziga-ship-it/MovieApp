import { createRouter, createWebHistory } from 'vue-router'
import Movie from './components/Movie.vue'
import Watch from './components/Watch.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', 
      component: Movie },
    { path: '/watch/:id',
      component: Watch }
  ]
})

export default router