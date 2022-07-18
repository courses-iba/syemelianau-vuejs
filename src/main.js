import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from '@/App';
import { store } from '@/store';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';

const routes = [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/:pathMatch(.*)*', component: NotFoundPage }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);

app.use(router);

app.use(store);

app.mount('#app');
