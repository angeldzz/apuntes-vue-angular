# 📚 Apuntes de Vue.js

## 🚀 Instalación y Configuración Inicial

### Instalación de Vue CLI
```bash
npm install -g @vue/cli
```

### Crear un Nuevo Proyecto
```bash
vue create nombreproyecto
```

### Iniciar el Servidor de Desarrollo
```bash
npm run serve
```

### Instalar Librerías Esenciales
```bash
npm install vue-router@next axios --save
```

---

## 📁 Estructura del Proyecto

### Organización de Carpetas
- **`src/Global.js`**: Archivo para guardar URLs y configuraciones globales
- **`src/services/`**: Servicios para llamadas a APIs
- **`src/models/`**: Modelos de datos
- **`src/components/`**: Componentes de Vue

---

## 🛣️ Vue Router - Configuración de Rutas

### 1. Crear el archivo `Router.js`

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import DepartamentosComponent from './components/DepartamentosComponent.vue';
import CreateDepartamento from './components/CreateDepartamento.vue';
import DetailsDepartamento from './components/DetailsDepartamento.vue';
import UpdateComponent from './components/UpdateComponent.vue';

const myRoutes = [
    { path: "/", component: DepartamentosComponent },
    { path: "/createdepartamento", component: CreateDepartamento },
    { path: "/details/:id/:nombre/:localidad", component: DetailsDepartamento },
    { path: "/update/:id", component: UpdateComponent },
];

const router = createRouter({
    history: createWebHistory(),
    routes: myRoutes
});

export default router;
```

### 2. Configurar Router en `main.js`

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import router from './Router';

createApp(App).use(router).mount('#app');
```

### 3. Añadir Router View en el Template

```html
<template>
  <div id="app">
    <MenuNavbar />
    <router-view></router-view>
  </div>
</template>
```

---

## 🎯 Directivas y Binding Esenciales

### Prevenir Recarga de Formularios
```html
<form @submit.prevent="submitForm()">
  <button @click.prevent="handleClick()">Click</button>
</form>
```

### Two-Way Data Binding con v-model
```html
<input v-model="nombreVariable" type="text" />
<textarea v-model="descripcion"></textarea>
<select v-model="opcionSeleccionada">
  <option value="1">Opción 1</option>
</select>
```

### Bucles con v-for
```html
<div v-for="empleado in empleados" :key="empleado.idEmpleado">
  {{ empleado.nombre }}
</div>
```

### Navegación Programática
```javascript
// Navegar a una ruta
this.$router.push("/login");

// Navegar con parámetros
this.$router.push({ 
  path: `/details/${id}/${nombre}/${localidad}` 
});

// Volver atrás
this.$router.go(-1);
```

---

## 💡 Trucos y Tips Útiles de Vue

### 1. Condicionales - v-if vs v-show
```html
<!-- v-if: Destruye/crea el elemento del DOM -->
<div v-if="isVisible">Se muestra</div>

<!-- v-show: Solo oculta con CSS (mejor para toggles frecuentes) -->
<div v-show="isVisible">Se muestra</div>
```

### 2. Methods
```javascript
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  methods: {
    // Se ejecuta siempre que se llama
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
}
```

### 3. Watchers para Reaccionar a Cambios
```javascript
export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  watch: {
    searchQuery(newValue, oldValue) {
      console.log(`Cambió de ${oldValue} a ${newValue}`);
      this.buscarDatos(newValue);
    }
  }
}
```

### 4. Lifecycle Hooks Importantes
```javascript
export default {
  created() {
    // Se ejecuta cuando se crea la instancia
    // Perfecto para cargar datos
    this.loadData();
  },
  mounted() {
    // Se ejecuta cuando el componente está en el DOM
    // Perfecto para manipular el DOM o librerías externas
    this.initializeLibrary();
  },
  beforeUnmount() {
    // Se ejecuta antes de destruir el componente
    // Perfecto para limpiar timers, listeners, etc.
    clearInterval(this.timer);
  }
}
```

### 5. Props y Comunicación Entre Componentes
```javascript
// Componente Padre
<template>
  <ChildComponent 
    :mensaje="mensaje" 
    @evento-hijo="handleEvento" />
</template>

// Componente Hijo
export default {
  props: {
    mensaje: {
      type: String,
      required: true,
      default: 'Mensaje por defecto'
    }
  },
  methods: {
    enviarDatos() {
      this.$emit('evento-hijo', this.datos);
    }
  }
}
```

### 6. Slots para Contenido Dinámico
```html
<!-- Componente Card.vue -->
<template>
  <div class="card">
    <slot name="header"></slot>
    <slot></slot> <!-- Slot por defecto -->
    <slot name="footer"></slot>
  </div>
</template>

<!-- Uso -->
<Card>
  <template #header>
    <h2>Título</h2>
  </template>
  <p>Contenido principal</p>
  <template #footer>
    <button>Acción</button>
  </template>
</Card>
```

### 7. Modificadores de Eventos Útiles
```html
<!-- Prevenir propagación -->
<button @click.stop="handleClick">Click</button>

<!-- Solo una vez -->
<button @click.once="handleClick">Click</button>

<!-- Teclas específicas -->
<input @keyup.enter="submit" />
<input @keyup.esc="cancel" />

<!-- Combinaciones -->
<button @click.ctrl="handleCtrlClick">Ctrl+Click</button>
```

### 8. Clases y Estilos Dinámicos
```html
<!-- Clases condicionales -->
<div :class="{ active: isActive, error: hasError }">
<div :class="[isActive ? 'active' : '', errorClass]">

<!-- Estilos inline dinámicos -->
<div :style="{ color: textColor, fontSize: fontSize + 'px' }">
```

### 9. Template Refs para Acceder al DOM
```javascript
export default {
  mounted() {
    this.$refs.inputElement.focus();
  }
}
```
```html
<template>
  <input ref="inputElement" type="text" />
</template>
```

### 10. Filtros Globales y Métodos de Utilidad
```javascript
// Global.js
export default {
  url: "https://api.ejemplo.com",
  
  formatDate(date) {
    return new Date(date).toLocaleDateString('es-ES');
  },
  
  formatCurrency(value) {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  }
}
```

### 11. Axios - Interceptors
```javascript
// services/AxiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.ejemplo.com'
});

// Interceptor de peticiones
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

// Interceptor de respuestas
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirigir al login
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

### 12. Manejo de Async/Await
```javascript
export default {
  methods: {
    async loadData() {
      try {
        this.loading = true;
        const response = await axios.get('/api/data');
        this.data = response.data;
      } catch (error) {
        console.error('Error:', error);
        this.error = 'Error al cargar datos';
      } finally {
        this.loading = false;
      }
    }
  }
}
```

---

## 📖 Recursos Adicionales

- **Comunicación entre componentes**: Ver proyecto `vuecomunicacioncomponents`
- **Documentación oficial**: [https://vuejs.org](https://vuejs.org)
- **Vue Router**: [https://router.vuejs.org](https://router.vuejs.org)
- **Axios**: [https://axios-http.com](https://axios-http.com)

---

## 📝 Notas Importantes

- Siempre usar `:key` único en `v-for` para optimizar el renderizado
- Preferir `computed` sobre `methods` para cálculos que dependen de datos reactivos
- Limpiar listeners y timers en `beforeUnmount` para evitar memory leaks
- Usar `@click.prevent` en formularios para evitar recargas de página
