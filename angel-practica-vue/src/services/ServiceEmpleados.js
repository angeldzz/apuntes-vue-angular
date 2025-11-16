import axios from "axios";
import Global from "@/Global";

export default class ServiceEmpleados{
    getToken(user, pass){
        return new Promise(function(resolve, reject){
            let url = Global.urlEmpleados + "Auth/Login"
            let data = {
                    userName: user, 
                    password: pass
                }
            axios.post(url, data).then(response => {
                resolve(response.data.response)
            }).catch(err => reject(err))
        })
    }
    getPerfil(token){
        return new Promise(function (resolve, reject) {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }
            let url = Global.urlEmpleados + "api/Empleados/PerfilEmpleado"
            axios.get(url, config).then(response => {
                resolve(response.data)
            }).catch(err => reject(err))
        })
    }
    getSubordinados(token){
        return new Promise(function (resolve, reject) {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }
            let url = Global.urlEmpleados + "api/Empleados/Subordinados"
            axios.get(url, config).then(response => {
                resolve(response.data)
            }).catch(err => reject(err))
        })
    }
}