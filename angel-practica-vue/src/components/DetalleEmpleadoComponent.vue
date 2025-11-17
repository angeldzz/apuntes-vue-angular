<template>
  <div class="container">
    <h2>Detalle del Empleado</h2>
    
    <div class="info-card">
      <div class="info-header">
        <h3>Información recibida por parámetros de ruta</h3>
      </div>
      
      <div class="info-body">
        <div class="info-row">
          <span class="label">ID (Parámetro de ruta):</span>
          <span class="value">{{ idEmpleado }}</span>
        </div>
        
        <div class="info-row">
          <span class="label">Nombre (Query Param):</span>
          <span class="value">{{ nombre }}</span>
        </div>
        
        <div class="info-row">
          <span class="label">Salario (Query Param):</span>
          <span class="value">{{ formatearMoneda(salario) }}</span>
        </div>
        
        <div class="info-row">
          <span class="label">Departamento (Query Param):</span>
          <span class="value">{{ departamento }}</span>
        </div>
      </div>
    </div>

    <div class="explicacion">
      <h4>📚 Tipos de parámetros en Vue Router:</h4>
      <ul>
        <li><strong>Route Params:</strong> /detalle-empleado/<code>:id</code> - Obligatorios, parte de la URL ($route.params)</li>
        <li><strong>Query Params:</strong> ?nombre=Juan&salario=3500 - Opcionales, después del ? ($route.query)</li>
      </ul>
    </div>

    <div class="ejemplos">
      <h4>🔗 Ejemplos de URLs:</h4>
      <div class="ejemplo-url">
        <code>/detalle-empleado/10</code>
        <p>Solo con ID (route param)</p>
      </div>
      <div class="ejemplo-url">
        <code>/detalle-empleado/25?nombre=María&salario=4200&departamento=Ventas</code>
        <p>ID + Query Params completos</p>
      </div>
    </div>

    <div class="actions">
      <button class="btn btn-secondary" @click="volver">
        ← Volver al Inicio
      </button>
      <button class="btn btn-primary" @click="irConDatos">
        Ver Ejemplo con Datos
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetalleEmpleadoComponent",
  data() {
    return {
      idEmpleado: 0,
      nombre: 'No especificado',
      salario: 0,
      departamento: 'Sin departamento'
    };
  },
  created() {
    // Obtener parámetros de la ruta
    this.idEmpleado = this.$route.params.id || 0;
    
    // Obtener query params
    this.nombre = this.$route.query.nombre || 'No especificado';
    this.salario = parseFloat(this.$route.query.salario) || 0;
    this.departamento = this.$route.query.departamento || 'Sin departamento';
  },
  watch: {
    '$route'(to) {
      // Actualizar datos cuando cambia la ruta
      this.idEmpleado = to.params.id || 0;
      this.nombre = to.query.nombre || 'No especificado';
      this.salario = parseFloat(to.query.salario) || 0;
      this.departamento = to.query.departamento || 'Sin departamento';
    }
  },
  methods: {
    formatearMoneda(valor) {
      return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
      }).format(valor);
    },
    volver() {
      this.$router.push('/');
    },
    irConDatos() {
      // Navegación programática con parámetros y query params
      this.$router.push({
        name: 'detalle-empleado',
        params: { id: 42 },
        query: {
          nombre: 'Juan Pérez',
          salario: 3500,
          departamento: 'Desarrollo'
        }
      });
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
}

h2 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  font-size: 32px;
}

.info-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 30px;
}

.info-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  text-align: center;
}

.info-header h3 {
  margin: 0;
  font-size: 20px;
}

.info-body {
  padding: 30px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-row .label {
  font-weight: 600;
  color: #555;
  font-size: 16px;
}

.info-row .value {
  font-size: 18px;
  color: #2c3e50;
  font-weight: bold;
}

.explicacion {
  background-color: #e3f2fd;
  border-left: 5px solid #2196F3;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
}

.explicacion h4 {
  margin-top: 0;
  color: #1976d2;
}

.explicacion ul {
  margin: 10px 0 0 20px;
}

.explicacion li {
  margin-bottom: 10px;
  color: #444;
  line-height: 1.6;
}

.explicacion code {
  background-color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #d63384;
}

.ejemplos {
  background-color: #fff3cd;
  border-left: 5px solid #ffc107;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.ejemplos h4 {
  margin-top: 0;
  color: #856404;
}

.ejemplo-url {
  background-color: white;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.ejemplo-url:last-child {
  margin-bottom: 0;
}

.ejemplo-url code {
  display: block;
  background-color: #f1f3f4;
  padding: 10px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #c7254e;
  margin-bottom: 8px;
  overflow-x: auto;
}

.ejemplo-url p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
}

.btn {
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
}

.btn-primary:hover {
  background-color: #45a049;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
