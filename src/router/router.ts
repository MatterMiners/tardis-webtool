import Login from '@/components/Login.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import NotFound from '@/views/NotFound.vue'

const routes = [
    { path: '/:anything(.*)*', component: NotFound },
    { path: '/', component: Login }
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})
