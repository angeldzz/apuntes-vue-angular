<template>
<div class="container">
    <div class="row justify-content-center align-items-center">
        <div class="col-md-4">
            <div class="card shadow">
                <div class="card-body p-4">
                    <h3 class="card-title text-center mb-4">Iniciar Sesión</h3>
                    <form >
                        <div class="mb-3">
                            <label for="user" class="form-label">Usuario</label>
                            <input 
                                v-model="user" 
                                type="text" 
                                class="form-control" 
                            />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Contraseña</label>
                            <input 
                                v-model="password" 
                                type="password" 
                                class="form-control" 
                            />
                        </div>
                        <div class="d-grid">
                            <button @click.prevent="Login()" class="btn btn-primary">
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                    <p class="mt-3 text-danger" v-if="error">{{ error }}</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ServiceEmpelados from '../services/ServiceEmpleados'
const service = new ServiceEmpelados()
export default {
    name:"LoginComponent",
    data() {
        return {
            user: "",
            password: "",
            error: ""
        }
    },
    methods: {
        Login() {
            service.getToken(this.user,this.password).then(response =>{
                localStorage.setItem("token",response)
                this.$router.push("/perfil")
            }).catch(() => {
                this.error = "Usuario o contraseña incorrectos"
            })
        }
    },
}
</script>

<style>

</style>