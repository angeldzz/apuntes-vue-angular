<template>
  <div>
    <div v-for="empleado in subordinados" :key="empleado" class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow-lg">
                    <div class="card-header bg-primary text-white text-center">
                        <h3><i class="bi bi-person-circle"></i> Perfil de Empleado</h3>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="text-muted fw-bold">ID Empleado</label>
                            <p class="h5">{{ empleado.idEmpleado }}</p>
                        </div>
                        <div class="mb-3">
                            <label class="text-muted fw-bold">Apellido</label>
                            <p class="h5">{{ empleado.apellido }}</p>
                        </div>
                        <div class="mb-3">
                            <label class="text-muted fw-bold">Oficio</label>
                            <p class="h5">{{ empleado.oficio }}</p>
                        </div>
                        <div class="mb-3">
                            <label class="text-muted fw-bold">Salario</label>
                            <p class="h5">{{ empleado.salario }}€</p>
                        </div>
                        <div class="mb-3">
                            <label class="text-muted fw-bold">Director</label>
                            <p class="h5">{{ empleado.director }}</p>
                        </div>
                    </div>
                    <div class="card-footer text-center">
                        <button class="btn btn-secondary" @click="$router.push('/')">
                            <i class="bi bi-arrow-left"></i> Volver
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import ServiceEmpleados from '../services/ServiceEmpleados';
const service = new ServiceEmpleados()
export default {
    name:"SubordinadosComponent",
    data() {
        return {
            subordinados: []
        }
    },
    mounted () {
        const token = localStorage.getItem("token");
        if (token !== null && token !== "") {
            service.getSubordinados(token).then(response => {
                this.subordinados = response
            })
        }
    },
}
</script>

<style>

</style>