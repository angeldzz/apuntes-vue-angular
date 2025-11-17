import { Component, OnInit } from '@angular/core';
import { ServiceEmpleados } from '../../services/ServicesEmpleados';
import { Empleado } from '../../models/Empleado';

@Component({
  selector: 'app-subordinados.component',
  imports: [],
  providers: [ServiceEmpleados],
  templateUrl: './subordinados.component.html',
  styleUrl: './subordinados.component.css',
})
export class SubordinadosComponent implements OnInit{
    public subordinados!: Array<Empleado>
  constructor(
    private _service: ServiceEmpleados
  ) {}
  ngOnInit(): void {
  const token = localStorage.getItem("token")
  if(token !== null && token !== ""){
    this._service.GetSubordinados(token).subscribe(response => {
      this.subordinados = response
    })
  }
  }
}
