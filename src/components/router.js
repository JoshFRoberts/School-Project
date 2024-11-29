import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Brettspiel from './views/Brettspiel.vue'
import Osterdeko from './views/Osterdeko.vue'
import UeberUns from './views/UeberUns.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/brettspiel', component: Brettspiel },
  { path: '/osterdeko', component: Osterdeko },
  { path: '/ueber-uns', component: UeberUns },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router