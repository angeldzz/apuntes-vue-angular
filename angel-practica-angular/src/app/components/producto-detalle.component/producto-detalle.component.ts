import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../models/Producto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto-detalle',
  imports: [CommonModule],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css',
})
export class ProductoDetalleComponent {
  @Input() producto!: Producto;
  @Output() eventoCompra = new EventEmitter<string>();

  public cantidad: number = 1;

  comprarProducto(): void {
    const mensaje = `Se compraron ${this.cantidad} unidad(es) de ${this.producto.nombre} por un total de $${(this.producto.precio * this.cantidad).toFixed(2)}`;
    this.eventoCompra.emit(mensaje);
  }

  incrementarCantidad(): void {
    if (this.cantidad < this.producto.stock) {
      this.cantidad++;
    }
  }

  decrementarCantidad(): void {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }
}
