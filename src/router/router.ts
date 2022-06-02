import Login from "@/components/Login.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import { authStore } from "@/store/authStore";
import DroneGrid from "@/components/DroneGrid.vue";

const routes = [
    { path: "/:unreachable(.*)*", name: "NotFound", component: NotFound },
    { path: "/login", name: "login", component: Login },
    { path: "/dashboard", name: "dashboard", component: DroneGrid }, // precede this with /protected
    // { path: "/", name: "landingpage" },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// check authentication
router.beforeEach((to, from) => {
    if (!authStore.loggedIn && to.name !== "login" && to.name !== "NotFound") {
        return { name: "login" };
    }
});

export default router;
