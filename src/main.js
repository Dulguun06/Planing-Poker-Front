import './assets/main.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {createApp} from 'vue';
import App from './App.vue';
import Home from './views/Home.vue';
import Tasks from './views/Tasks.vue';
import About from './views/About.vue';
import Room from './views/Room.vue';
import {createRouter, createWebHistory} from 'vue-router';


const routes = [
    {path: '/', component: Home},
    {path: '/about', component: About},
    {path: '/tasks', component: Tasks},
    {path: `/room`, component: Room}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

createApp(App).use(router).mount('#app');