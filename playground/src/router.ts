import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import PageA from "./pages/PageA.vue";
import PageB from "./pages/PageB.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Home },
        { path: "/a", component: PageA },
        { path: "/b", component: PageB },
    ],
});
