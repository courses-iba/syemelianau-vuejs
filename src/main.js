import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { PiniaLogger } from 'pinia-logger'
import { createRouter, createWebHistory } from 'vue-router'

import App from '@/App'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import CardPage from '@/pages/CardPage'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/card/:id', name: 'Card', component: CardPage },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
]

const loggerConfig = {
  disabled: process.env.NODE_ENV === 'production',
}

const logger = PiniaLogger(loggerConfig)
const router = createRouter({ history: createWebHistory(), routes })
const pinia = createPinia()
const app = createApp(App)

pinia.use(logger)
app.use(router)
app.use(pinia)

app.mount('#app')
