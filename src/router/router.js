import Main from "../pages/Main.vue";
import {createRouter, createWebHistory} from "vue-router";
import AboutPage from "../pages/AboutPage.vue";
import PostsPage from "../pages/PostsPage.vue";
import PostIdPage from "../pages/PostIdPage.vue";

const routes = [
    {
        path: '/',
        component: Main,
    },
    {
        path: '/posts',
        component: PostsPage,
    },
    {
        path: '/about',
        component: AboutPage,
    },
    {
        path: '/posts/:id',
        component: PostIdPage,
    },
]


const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router