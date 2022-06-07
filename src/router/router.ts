import {
    createRouter,
    createWebHashHistory,
    type RouteLocationNormalized,
    type RouteRecordRaw,
} from 'vue-router';
import Login from '@/components/LoginWidget.vue';
import NotFound from '@/views/NotFound.vue';
import DroneGrid from '@/components/DroneGrid.vue';
import { useUsers } from '@/store/userStore';
import LandingPage from '@/views/LandingPage.vue';
import TableView from '@/components/TableView.vue';
import { getScope } from '@/constants';
import Forbidden from '@/views/ForbiddenView.vue';

const protectedPrefix = '/protected';

function isProtectedResource(to: RouteLocationNormalized): boolean {
    const metaProtectedIsTrue = to.meta.protected == true;
    return metaProtectedIsTrue;
}

function prefixRoutes(
    prefix: string,
    routes: RouteRecordRaw[]
): RouteRecordRaw[] {
    return routes.map((route) => {
        route.path = `${prefix}/${route.path}`;
        return route;
    });
}

// all routes that need authentication should be in under the prefix /protected.
// If another alias is needed, please specify an ADDITIONAL alias
function protectedRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
    routes = routes.map((route) => {
        route.meta = { ...route.meta, protected: true };
        return route;
    });
    return prefixRoutes(protectedPrefix, routes);
}

const routes = [
    { path: '/:unreachable(.*)*', name: 'NotFound', component: NotFound },
    { path: '/forbidden', name: 'forbidden', component: Forbidden },
    { path: '/login', name: 'login', component: Login },
    { path: '/', name: 'landingpage', component: LandingPage },
    ...protectedRoutes([
        {
            path: 'dashboard',
            name: 'dashboard',
            component: DroneGrid,
            meta: { scopes: [getScope] },
        },
        {
            path: 'dronetable',
            name: 'dronetable',
            component: TableView,
            meta: { scopes: [getScope] },
        },
    ]),
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// check authentication
router.beforeEach((to, from) => {
    const userStore = useUsers();

    const destIsntLogin = to.name !== 'login';
    const destIsnt404 = to.name !== 'NotFound';
    const isLoggedIn = userStore.loggedIn;

    // if unathenticated user want's to access an existing resource that isn't the login screen
    if (
        !isLoggedIn &&
        destIsntLogin &&
        destIsnt404 &&
        isProtectedResource(to)
    ) {
        return { name: 'login' };
    }

    const destIsntForbidden = to.name !== 'forbidden';
    const userIsntAuthorized =
        to.meta.scopes && !userStore.hasScopes(to.meta.scopes as string[]);
    if (destIsntForbidden && userIsntAuthorized) {
        return { name: 'forbidden' };
    }

    const isntRedirected = !to.redirectedFrom;
    // if not redirected to forbidden make inaccessible
    if (!destIsntForbidden && isntRedirected) {
        return { name: 'NotFound' };
    }
});

export default router;
