import { createWebHistory, createRouter} from 'vue-router'
import LoginComponent from '@/components/LoginComponent.vue';
import HomeComponent from '@/components/HomeComponent.vue';
import PerfilComponent from '@/components/PerfilComponent.vue';
import SubordinadosComponent from '@/components/SubordinadosComponent.vue';
const myRoutes = [
    { path:"/", component:HomeComponent},
    { path:"/login", component:LoginComponent},
    { path:"/perfil", component:PerfilComponent},
    { path:"/subordinados", component:SubordinadosComponent},
]

const router = createRouter({
    history:createWebHistory(),
    routes:myRoutes
})

export default router;