import { Component } from '@angular/core';
import { Producto } from '../../models/Producto';
import { ProductoDetalleComponent } from '../producto-detalle.component/producto-detalle.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos.component',
  imports: [ProductoDetalleComponent, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  public productos: Array<Producto>;
  public productoSeleccionado!: Producto;
  public mensaje: string = '';

  constructor() {
    this.productos = [
      new Producto(1, 'Laptop Dell', 'Electrónica', 899.99, 15),
      new Producto(2, 'Mouse Logitech', 'Accesorios', 25.50, 50),
      new Producto(3, 'Teclado Mecánico', 'Accesorios', 75.00, 30),
      new Producto(4, 'Monitor Samsung', 'Electrónica', 299.99, 20),
      new Producto(5, 'Webcam HD', 'Accesorios', 45.00, 25),
    ];
  }

  seleccionarProducto(producto: Producto): void {
    this.productoSeleccionado = producto;
    this.mensaje = '';
  }

  recibirMensajeHijo(mensaje: string): void {
    this.mensaje = mensaje;
  }
}
