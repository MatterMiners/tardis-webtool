import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')

export interface DroneData {
    remote_resource_uuid: string,
    state: string
    drone_uuid: string,
    site_name: string,
    machine_type: string,
    created: string,
    updated: string
}