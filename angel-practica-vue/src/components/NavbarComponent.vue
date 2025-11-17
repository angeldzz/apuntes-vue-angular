<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">CRUD VUE</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/perfil">Perfil</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/subordinados">Subordinados</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/productos">Productos</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'detalle-empleado', params: { id: 123 }, query: { nombre: 'Ana García', salario: 3000, departamento: 'IT' }}">Empleado (Params)</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/login">Login</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name:"NavbarComponent",
}
</script>

<style>

</style>