import { createWebHistory, createRouter} from 'vue-router'
import LoginComponent from '@/components/LoginComponent.vue';
import HomeComponent from '@/components/HomeComponent.vue';
import PerfilComponent from '@/components/PerfilComponent.vue';
import SubordinadosComponent from '@/components/SubordinadosComponent.vue';
import ProductosComponent from '@/components/ProductosComponent.vue';
import DetalleEmpleadoComponent from '@/components/DetalleEmpleadoComponent.vue';

const myRoutes = [
    { path:"/", component:HomeComponent},
    { path:"/login", component:LoginComponent},
    { path:"/perfil", component:PerfilComponent},
    { path:"/subordinados", component:SubordinadosComponent},
    { path:"/productos", component:ProductosComponent},
    { path:"/detalle-empleado/:id", name: "detalle-empleado", component:DetalleEmpleadoComponent},
]

const router = createRouter({
    history:createWebHistory(),
    routes:myRoutes
})

export default router;