import Login from "@/components/Login.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import DroneGrid from "@/components/DroneGrid.vue";
import { sessionStore } from "@/store/sessionStore";

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
    if (
        !sessionStore.loggedIn() &&
        to.name !== "login" &&
        to.name !== "NotFound"
    ) {
        return { name: "login" };
    }
});

export default router;
