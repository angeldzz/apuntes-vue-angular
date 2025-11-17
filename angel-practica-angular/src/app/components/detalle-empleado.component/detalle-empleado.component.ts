import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-empleado',
  imports: [CommonModule],
  templateUrl: './detalle-empleado.component.html',
  styleUrl: './detalle-empleado.component.css',
})
export class DetalleEmpleadoComponent implements OnInit {
  public idEmpleado!: number;
  public nombre: string = '';
  public salario: number = 0;
  public departamento: string = '';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // Obtener parámetros de la ruta
    this._route.params.subscribe(params => {
      this.idEmpleado = +params['id']; // El + convierte string a number
    });

    // Obtener queryParams (parámetros opcionales en la URL)
    this._route.queryParams.subscribe(queryParams => {
      this.nombre = queryParams['nombre'] || 'No especificado';
      this.salario = +queryParams['salario'] || 0;
      this.departamento = queryParams['departamento'] || 'Sin departamento';
    });
  }

  volver(): void {
    this._router.navigate(['/']);
  }

  irConDatos(): void {
    // Ejemplo de navegación con parámetros
    this._router.navigate(['/detalle-empleado', 42], {
      queryParams: {
        nombre: 'Juan Pérez',
        salario: 3500,
        departamento: 'Desarrollo'
      }
    });
  }
}
