import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Tasks from '../views/Tasks.vue';
import Room from '../views/Room.vue';
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: '/', component: Home},
    {path: '/about', component: About},
    {path: '/tasks', component: Tasks},
    {path: '/room/:id', component: Room, name: 'Room'},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;