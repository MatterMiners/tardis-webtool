import Login from '@/components/Login.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/', component: Login
    }
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})
