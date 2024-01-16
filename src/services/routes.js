import Vue from 'vue'
import { createRouter } from 'vue-router';
import Tasks from "@/views/Tasks.vue";
import About from "@/views/About.vue";


const routes = [
    {
        path: '/',
        name: 'Tasks',
        component: Tasks,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
];

const router =  VueRouter.createRouter(
    routes
);

export default router;