import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
import { Empleado } from "../models/Empleado";

@Injectable()
export class ServiceEmpleados{
    constructor(private _http: HttpClient) {
    }
    Login(user: string, pass: string): Observable<any>{
        let url = environment.urlEmp + "Auth/Login"
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this._http.post(url, JSON.stringify(
            {
                userName: user,
                password: pass,
            }
        ),{headers:headers})
    }
    GetPerfilEmpleado(token: string):Observable<Empleado>{
        let url = environment.urlEmp + "api/Empleados/PerfilEmpleado"
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        });
        return this._http.get<Empleado>(url,{headers:headers})
    }
    GetSubordinados(token: string):Observable<Array<Empleado>>{
        let url = environment.urlEmp + "api/Empleados/Subordinados"
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        });
        return this._http.get<Array<Empleado>>(url,{headers:headers})
    }
}