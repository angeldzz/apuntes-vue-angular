import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component/home.component';
import { LoginComponent } from './components/login.component/login.component';
import { PerfilComponent } from './components/perfil.component/perfil.component';
import { SubordinadosComponent } from './components/subordinados.component/subordinados.component';
import { ProductosComponent } from './components/productos.component/productos.component';
import { DetalleEmpleadoComponent } from './components/detalle-empleado.component/detalle-empleado.component';

export const routes: Routes = [
    {path:"", component:HomeComponent},
    {path:"login", component:LoginComponent},
    {path:"perfil", component:PerfilComponent},
    {path:"subordinados", component:SubordinadosComponent},
    {path:"productos", component:ProductosComponent},
    {path:"detalle-empleado/:id", component:DetalleEmpleadoComponent},
];
