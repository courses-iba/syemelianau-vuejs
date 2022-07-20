import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { PiniaLogger } from 'pinia-logger'
import { createRouter, createWebHistory } from 'vue-router'

import App from '@/App'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import CardPage from '@/pages/CardPage'
import SettingsPage from '@/pages/SettingsPage'
import { useUserStore } from '@/store/user'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/card/:id', name: 'Card', component: CardPage },
  { path: '/settings', name: 'Settings', component: SettingsPage },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
]

const loggerConfig = {
  disabled: process.env.NODE_ENV === 'production',
}

const logger = PiniaLogger(loggerConfig)
const router = createRouter({ history: createWebHistory(), routes })
const pinia = createPinia()
const app = createApp(App)

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.name === 'Settings' && userStore.role !== 'admin') {
    next({ name: 'Login' })
  } else {
    next()
  }
})

pinia.use(logger)
app.use(router)
app.use(pinia)

app.mount('#app')
