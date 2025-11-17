<template>
  <div class="container">
    <h2>Lista de Productos (Componente Padre)</h2>
    
    <div class="productos-grid">
      <div 
        v-for="producto in productos" 
        :key="producto.id"
        class="producto-card"
        @click="seleccionarProducto(producto)"
        :class="{ selected: productoSeleccionado && productoSeleccionado.id === producto.id }">
        <h3>{{ producto.nombre }}</h3>
        <p><strong>Categoría:</strong> {{ producto.categoria }}</p>
        <p><strong>Precio:</strong> ${{ producto.precio }}</p>
        <p><strong>Stock:</strong> {{ producto.stock }} unidades</p>
      </div>
    </div>

    <div v-if="productoSeleccionado" class="detalle-container">
      <h3>Producto Seleccionado:</h3>
      <ProductoDetalleComponent 
        :producto="productoSeleccionado"
        @evento-compra="recibirMensajeHijo">
      </ProductoDetalleComponent>
    </div>

    <div v-if="mensaje" class="mensaje-hijo">
      <strong>Mensaje del componente hijo:</strong> {{ mensaje }}
    </div>
  </div>
</template>

<script>
import ProductoDetalleComponent from './ProductoDetalleComponent.vue';

export default {
  name: "ProductosComponent",
  components: {
    ProductoDetalleComponent
  },
  data() {
    return {
      productos: [
        { id: 1, nombre: 'Laptop Dell', categoria: 'Electrónica', precio: 899.99, stock: 15 },
        { id: 2, nombre: 'Mouse Logitech', categoria: 'Accesorios', precio: 25.50, stock: 50 },
        { id: 3, nombre: 'Teclado Mecánico', categoria: 'Accesorios', precio: 75.00, stock: 30 },
        { id: 4, nombre: 'Monitor Samsung', categoria: 'Electrónica', precio: 299.99, stock: 20 },
        { id: 5, nombre: 'Webcam HD', categoria: 'Accesorios', precio: 45.00, stock: 25 },
      ],
      productoSeleccionado: null,
      mensaje: ''
    };
  },
  methods: {
    seleccionarProducto(producto) {
      this.productoSeleccionado = producto;
      this.mensaje = '';
    },
    recibirMensajeHijo(mensaje) {
      this.mensaje = mensaje;
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.productos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.producto-card {
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #fff;
}

.producto-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-color: #4CAF50;
}

.producto-card.selected {
  border-color: #2196F3;
  background-color: #e3f2fd;
}

.producto-card h3 {
  margin: 0 0 10px 0;
  color: #2196F3;
}

.producto-card p {
  margin: 5px 0;
  color: #666;
}

.detalle-container {
  margin-top: 30px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.detalle-container h3 {
  margin-top: 0;
  color: #333;
}

.mensaje-hijo {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff3cd;
  border: 2px solid #ffc107;
  border-radius: 8px;
  color: #856404;
}
</style>
