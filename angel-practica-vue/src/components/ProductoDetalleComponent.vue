<template>
  <div class="detalle-producto">
    <h4>{{ producto.nombre }}</h4>
    
    <div class="info-grid">
      <div class="info-item">
        <span class="label">ID:</span>
        <span class="value">{{ producto.id }}</span>
      </div>
      <div class="info-item">
        <span class="label">Categoría:</span>
        <span class="value">{{ producto.categoria }}</span>
      </div>
      <div class="info-item">
        <span class="label">Precio Unitario:</span>
        <span class="value">${{ producto.precio }}</span>
      </div>
      <div class="info-item">
        <span class="label">Stock Disponible:</span>
        <span class="value">{{ producto.stock }} unidades</span>
      </div>
    </div>

    <div class="cantidad-control">
      <button @click="decrementarCantidad" :disabled="cantidad <= 1">-</button>
      <span class="cantidad">{{ cantidad }}</span>
      <button @click="incrementarCantidad" :disabled="cantidad >= producto.stock">+</button>
    </div>

    <div class="total">
      <strong>Total:</strong> ${{ (producto.precio * cantidad).toFixed(2) }}
    </div>

    <button class="btn-comprar" @click="comprarProducto">
      Comprar
    </button>

    <p class="nota">Este es un componente hijo que recibe datos (props) y emite eventos ($emit) al padre</p>
  </div>
</template>

<script>
export default {
  name: "ProductoDetalleComponent",
  props: {
    producto: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cantidad: 1
    };
  },
  methods: {
    comprarProducto() {
      const mensaje = `Se compraron ${this.cantidad} unidad(es) de ${this.producto.nombre} por un total de $${(this.producto.precio * this.cantidad).toFixed(2)}`;
      this.$emit('evento-compra', mensaje);
    },
    incrementarCantidad() {
      if (this.cantidad < this.producto.stock) {
        this.cantidad++;
      }
    },
    decrementarCantidad() {
      if (this.cantidad > 1) {
        this.cantidad--;
      }
    }
  },
  watch: {
    producto() {
      this.cantidad = 1;
    }
  }
}
</script>

<style scoped>
.detalle-producto {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.detalle-producto h4 {
  margin: 0 0 20px 0;
  color: #2196F3;
  font-size: 24px;
  text-align: center;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.info-item .label {
  font-weight: bold;
  color: #666;
  font-size: 12px;
  margin-bottom: 5px;
}

.info-item .value {
  color: #333;
  font-size: 16px;
}

.cantidad-control {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 20px 0;
}

.cantidad-control button {
  width: 40px;
  height: 40px;
  border: 2px solid #4CAF50;
  background-color: white;
  color: #4CAF50;
  font-size: 20px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cantidad-control button:hover:not(:disabled) {
  background-color: #4CAF50;
  color: white;
}

.cantidad-control button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.cantidad {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  min-width: 50px;
  text-align: center;
}

.total {
  text-align: center;
  font-size: 20px;
  margin: 15px 0;
  color: #333;
}

.btn-comprar {
  width: 100%;
  padding: 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-comprar:hover {
  background-color: #45a049;
}

.nota {
  margin-top: 15px;
  padding: 10px;
  background-color: #e3f2fd;
  border-left: 4px solid #2196F3;
  font-size: 12px;
  color: #666;
  font-style: italic;
}
</style>
