import Main from "../pages/Main.vue";
import {createRouter, createWebHistory} from "vue-router";
import AboutPage from "../pages/AboutPage.vue";
import PostsPage from "../pages/PostsPage.vue";
import PostIdPage from "../pages/PostIdPage.vue";
import PostPageWithStore from "../pages/PostPageWithStore.vue";
import PostPageWIthCompositionAPI from "../pages/PostPageWIthCompositionAPI.vue";

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
    {
        path: '/store',
        component: PostPageWithStore,
    },
    {
        path: '/compositionAPI',
        component: PostPageWIthCompositionAPI,
    },
]


const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router
