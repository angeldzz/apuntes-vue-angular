import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceEmpleados } from '../../services/ServicesEmpleados';
import { Empleado } from '../../models/Empleado';

@Component({
  selector: 'app-perfil.component',
  imports:[CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit{
  public perfil!: Empleado;
  constructor(private _service: ServiceEmpleados) {
  }
  ngOnInit(): void {
  const token = localStorage.getItem("token");
    if (token !== "" && token !== null) {
      this._service.GetPerfilEmpleado(token).subscribe(response => {
        this.perfil = response
      })
    }
  }
}
