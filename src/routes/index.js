import { createRouter, createWebHistory } from "vue-router";
import Index from '@/view/Index.vue';

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', 
            name : 'Index',
            component: Index
        },
        {
            path: '/auth', 
            name : 'Auth',
            component: () => import(/* webpackChunkName: "Auth" */ '@/components/Auth.vue')
        }
    ]
});