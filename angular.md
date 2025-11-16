# Apuntes de Angular

## Tabla de Contenidos

- [1. Instalación](#1-instalación)
- [2. Componentes y Módulos](#2-componentes-y-módulos)
- [3. Directivas](#3-directivas)
- [4. Ciclo de Vida](#4-ciclo-de-vida)
- [5. Formularios](#5-formularios)
- [6. Routing](#6-routing)
- [7. Modelos](#7-modelos)
- [8. Comunicación entre Componentes](#8-comunicación-entre-componentes)
- [9. Servicios](#9-servicios)
- [10. Peticiones API](#10-peticiones-api)
- [11. Autenticación](#11-autenticación)
- [12. Tópicos Avanzados](#12-tópicos-avanzados)

---

## 1. Instalación

### Comandos Esenciales

**Instalar Angular CLI:**

```bash
npm install -g @angular/cli@latest
```

**Crear un nuevo proyecto:**

```bash
ng new nombre-del-proyecto
```

**Lanzar el servidor de desarrollo:**

```bash
ng serve
```

**Generar un componente:**

```bash
ng g component carpeta/nombre-componente
```

---

## ## 2. Componentes y Módulos

### Componentes

Los componentes son la base de cualquier aplicación de Angular. A diferencia de otros frameworks, Angular separa un componente en **tres ficheros**:

- **`.ts` (TypeScript)**: Contiene la lógica y el código
- **`.html` (Plantilla)**: Contiene el diseño y la estructura visual
- **`.css` (Estilos)**: Contiene los estilos del componente

#### Decorador @Component

El decorador `@Component` define las propiedades del componente:

- **`selector`**: El nombre de la etiqueta HTML para usar el componente (ej: `'app-root'`)
- **`templateUrl`**: La ruta al fichero HTML
- **`styleUrls`**: Un array de rutas a los ficheros CSS



> **Nota**: Se puede usar `template` en lugar de `templateUrl` para escribir HTML directamente en el fichero `.ts` (inline).

**Interpolación de variables:**

Para mostrar variables de la clase en la plantilla, se utiliza la sintaxis de doble llave:

```html
{{ variable }}
```

### Módulos (app-module.ts)

El módulo (usualmente `app-module.ts`) actúa como el "jefe" de la aplicación. Es la clase donde se debe declarar todo lo que se vaya a utilizar:

- **`declarations`**: Array para registrar componentes, directivas y pipes
- **`imports`**: Array para importar otros módulos (como `BrowserModule`, `FormsModule` o routing)
- **`providers`**: Array para registrar servicios que estarán disponibles para inyección de dependencias

---

## 3. Directivas
Las directivas permiten añadir código lógico dentro del HTML.

Sintaxis Clásica (*)
*ngIf: Muestra un elemento condicionalmente.

HTML

<div *ngIf="condicion">...</div>



*ngFor: Itera sobre una colección.

HTML

<ul>
  <li *ngFor="let deporte of sports; let i = index">
    Index: {{i}}, Deporte: {{deporte}}
  </li>
</ul>



ng-template (para else): Para añadir una condición else a *ngIf, se usa ng-template.

HTML

<div *ngIf="condicion; else templateFalse">...</div>
<ng-template #templateFalse>
  <h1>FALSE</h1>
</ng-template>




### Sintaxis Moderna (@)

Angular ha introducido una nueva sintaxis de "control flow" que no requiere importar directivas en componentes standalone.

#### @if

```html
@if (condicion1) {
  <h1>Soy Verdad</h1>
} @else if (condicion2) {
  <h2>Soy el número 2</h2>
} @else {
  <h2>Soy el ELSE</h2>
}
```

#### @for

```html
<ul>
  @for (sport of sports; track sport; let i = $index) {
    <li>Index {{i}}, {{sport}}</li>
  } @empty {
    <li>Sin elementos</li>
  }
</ul>
```

### Directivas de Estilo

#### Binding de Estilo

```html
<h2 [style.color]="condicion ? 'green' : 'red'">Mensaje</h2>
```

#### Binding de Clase

```html
<li [class.par]="num % 2 == 0" [class.impar]="num % 2 == 1">
  {{ num }}
</li>
```

#### ngClass

```html
<h1 [ngClass]="{ 'estilo1': condicion1, 'estilo2': condicion2 }">...</h1>
```

---

## ## 4. Ciclo de Vida (Hooks)

Los Hooks permiten ejecutar código en momentos específicos del ciclo de vida de un componente.

| Hook | Descripción |
|------|-------------|
| **`ngOnInit`** | Se ejecuta después del constructor. Es el lugar ideal para inicializar lógica, cargar datos, etc. Se debe implementar `OnInit` en la clase. |
| **`ngDoCheck`** | Se ejecuta cada vez que el componente se redibuja (Render). |
| **`ngOnDestroy`** | Se ejecuta justo antes de que el componente sea destruido. |

### Eventos

El binding de eventos se realiza con paréntesis `()`:

```html
<button (click)="miMetodo()">Pulsar</button>
```

---

## ## 5. Formularios

Para usar formularios, primero se debe importar `FormsModule` en `app-module.ts`. Existen dos formas principales de trabajar con ellos:

### 1. Model Binding (Binding Bidireccional)

Sincroniza un modelo de datos (en el `.ts`) con los controles del formulario (en el `.html`) en ambas direcciones.

**Sintaxis**: `[(ngModel)]="user.nombre"`

**Requisitos del HTML:**

- El tag `<form>` necesita un ID de Angular: `#userForm="ngForm"`
- Los `<input>` deben tener un atributo `name` y un ID de `ngModel`: `#cajanombre="ngModel"`

```html
<form #userForm="ngForm" (ngSubmit)="recibirDatos()">
  <label>Nombre</label>
  <input type="text" name="cajanombre" 
         #cajanombre="ngModel" [(ngModel)]="user.nombre"/>
  <button>Enviar</button>
</form>
```

### ### 2. Formularios por Referencia

Se accede al valor de los controles del formulario utilizando referencias locales, similar a React.

**Importaciones**: `ViewChild` y `ElementRef`

**HTML**: Se añade un ID de Angular al control: `#cajanumero1`

**TypeScript**:

- Se decora una propiedad con `@ViewChild` apuntando al ID
- Se usa `!` para "saltar" la inicialización en el constructor
- Se accede al valor con: `this.cajaNumero1Ref.nativeElement.value`

```typescript
// sumarnumeros.component.ts
export class SumarNumerosComponent {
  @ViewChild("cajanumero1") cajaNumero1Ref!: ElementRef;
  @ViewChild("cajanumero2") cajaNumero2Ref!: ElementRef;
  public suma: number = 0;

  sumarNumeros(): void {
    let num1 = this.cajaNumero1Ref.nativeElement.value;
    let num2 = this.cajaNumero2Ref.nativeElement.value;
    this.suma = parseInt(num1) + parseInt(num2);
  }
}
```

---

## ## 6. Routing (Navegación)

Angular incluye un potente sistema de enrutamiento integrado.

### Configuración (app.routing.ts)

1. Crear el fichero: `app.routing.ts`
2. Definir Rutas: Se crea un array de tipo `Routes`
   - Las rutas no llevan barra `/` al inicio
   - La ruta 404 (`**`) debe ser la última

```typescript
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from "./components/home.component/home.component";
import { CineComponent } from "./components/cine.component/cine.component";
import { NotfoundComponent } from "./components/notfound.component/notfound.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },        // Ruta raíz
  { path: "cine", component: CineComponent },
  { path: "**", component: NotfoundComponent }   // Ruta 404
];

export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
```

3. **Importar en app-module.ts:**
   - Importar `routing` en el array `imports`
   - Importar `appRoutingProvider` en el array `providers`

### Uso en Componentes

- **`<router-outlet>`**: Marcador de posición donde Angular dibujará el componente de la ruta activa
- **`[routerLink]`**: Directiva para crear enlaces de navegación

```html
<a [routerLink]="['/cine']">Cine</a>
```

### Rutas con Parámetros

#### Configuración de Ruta

Se definen parámetros con dos puntos `:param`:

```typescript
// app.routing.ts
{ path: "numerodoble/:numero", component: NumeroDobleComponent }
```

#### Enviar Parámetro (Link)

```html
<a [routerLink]="['/details/' + dept.numero]">...</a>
<a [routerLink]="['/numerodoble/77']">Doble 77</a>
<a [routerLink]="['/details', dept.numero, dept.nombre]">...</a>
```

#### Recibir Parámetros (Componente)

Se usa la Inyección de Dependencias (DI):

1. Inyectar `ActivatedRoute` en el constructor
2. Subscribirse en `ngOnInit` (los parámetros se reciben en `ngOnInit`, no en el constructor)

```typescript
import { ActivatedRoute, Params } from '@angular/router';

export class NumeroDobleComponent implements OnInit {
  constructor(private _activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Nos subscribimos a la escucha de parámetros
    this._activeRoute.params.subscribe((parametros: Params) => {
      if (parametros['numero'] != null) {
        let num = parseInt(parametros['numero']);
        // ... lógica ...
      }
    });
  }
}
```

### Navegación Programática (Redirección)

Para navegar desde el código `.ts` (ej: después de un login o un POST):

```typescript
import { Router } from '@angular/router';

constructor(private _router: Router) {}

// Navegar a una ruta
this._router.navigate(["/"]);

// Navegar con parámetros
this._router.navigate(["/numerodoble", 44]);
```

---

## ## 7. Modelos

Un Modelo es una clase (`.ts`) que define la estructura de un objeto, asegurando un tipado fuerte. Se suelen crear en una carpeta `src/app/models`.

### Sintaxis Larga

```typescript
export class Producto {
  public nombre: string;
  public imagen: string;
  
  constructor(name: string, image: string) {
    this.nombre = name;
    this.imagen = image;
  }
}
```

### Sintaxis Corta (Recomendada)

Las propiedades se declaran directamente en el constructor:

```typescript
export class Producto {
  constructor(
    public nombre: string,
    public imagen: string,
    public precio: number
  ) {}
}
```

---

## ## 8. Comunicación entre Componentes

### Padre a Hijo (@Input)

Se usa para pasar datos hacia abajo, de un componente padre a uno hijo.

#### Componente Hijo

```typescript
// hijo-coche.component.ts
import { Component, Input } from '@angular/core';
import { Coche } from '../../models/coche';

export class HijoCocheComponent {
  @Input() car!: Coche; // Recibe el coche del padre
  ...
}
```

1. Importar `Input`
2. Decorar una propiedad con `@Input()` (el nombre de la propiedad será el nombre del atributo en el HTML)

#### Componente Padre

```html
<!-- padre-coches.component.html -->
@for (coche of cochesArray; track coche) {
  <app-hijo-coche [car]="coche"></app-hijo-coche>
}
```

Usar property binding (corchetes `[]`) para pasar el objeto.

### ### Hijo a Padre (@Output)

Se usa para enviar información hacia arriba, desde un hijo al padre, usando eventos.

#### Componente Hijo

```typescript
// hijo-deporte.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

export class HijoDeporteComponent {
  @Input() sport!: string;
  @Output() seleccionarFavoritoPadre: EventEmitter<string> = new EventEmitter();

  seleccionarFavoritoHijo(): void {
    // Emitimos el evento con el dato (this.sport)
    this.seleccionarFavoritoPadre.emit(this.sport);
  }
}
```

1. Importar `Output` y `EventEmitter`
2. Declarar un `@Output` con un `EventEmitter`
3. Crear un método que llame a `.emit()` para enviar los datos

#### Componente Padre (HTML)

```html
<!-- padre-deportes.component.html -->
@for (deporte of deportes; track deporte) {
  <li>
    <app-hijo-deporte 
      [sport]="deporte" 
      (seleccionarFavoritoPadre)="seleccionarFavoritoPadre($event)">
    </app-hijo-deporte>
  </li>
}
```

- Escuchar el evento (con paréntesis `()`) y vincularlo a un método en el padre
- `$event` contiene el dato emitido

#### Componente Padre (TypeScript)

```typescript
// padre-deportes.component.ts
export class PadreDeportesComponent {
  public mensaje: string = "";

  seleccionarFavoritoPadre(event: string): void {
    this.mensaje = "Deporte favorito: " + event;
  }
}
```

---

## ## 9. Servicios (@Injectable)

Los servicios son clases diseñadas para encapsular lógica de negocio, peticiones API, o datos compartidos.

- **Creación**: Se decoran con `@Injectable()`
- **Inyección (IoC)**:
  - **Proveedor**: Se debe registrar el servicio en la sección `providers` del `app-module.ts` (o en el `providers` de un componente si es standalone)
  - **Consumo**: Se inyecta en el constructor del componente que lo necesita
- **Uso**: Se debe usar en `ngOnInit()`, no en el constructor

### Ejemplo Completo

#### 1. Servicio

```typescript
// service.comics.ts
import { Injectable } from "@angular/core";
import { Comic } from "../models/comic";

@Injectable()
export class ServiceComics {
  getComics(): Array<Comic> {
    // ...devuelve un array de comics
  }
}
```

#### 2. Módulo

```typescript
// app.module.ts
import { ServiceComics } from './services/service.comics';

@NgModule({
  ...
  providers: [ServiceComics],
  ...
})
export class AppModule { }
```

#### 3. Componente

```typescript
// libreria.component.ts
import { ServiceComics } from '../../services/service.comics';

export class LibreriaComponent implements OnInit {
  public comics!: Array<Comic>;

  // Inyección en constructor
  constructor(private _service: ServiceComics) {}

  // Uso en ngOnInit
  ngOnInit(): void {
    this.comics = this._service.getComics();
  }
}
```

---

## ## 10. Peticiones API (HttpClient)

Angular utiliza `HttpClient` para realizar peticiones API, devolviendo `Observables`.

### Configuración

1. **Importar provideHttpClient**: Añadir `provideHttpClient()` al array `providers` en `app-module.ts`

2. **Variables de Entorno** (Opcional pero recomendado):
   - Generar ficheros: `ng g environments`
   - Añadir URLs en `src/environments/environment.development.ts` y `src/environments/environment.ts`

### Peticiones GET

#### Servicio

```typescript
// service.personas.ts
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";

@Injectable()
export class ServicePersonas {
  constructor(private _http: HttpClient) {}

  getPersonas(): Observable<any> {
    let urlApi = environment.urlApiPersonas;
    let request = "api/personas";
    return this._http.get(urlApi + request);
  }
}
```

1. Inyectar `HttpClient` en el constructor
2. Crear un método que devuelva un `Observable`
3. Usar `this._http.get()` (se puede tipar la respuesta, ej: `<Array<Persona>>`)

#### Componente

```typescript
// personasapi.component.ts
export class PersonasApiComponent implements OnInit {
  public personas!: Array<Persona>;
  
  constructor(private _service: ServicePersonas) {}

  ngOnInit(): void {
    this._service.getPersonas().subscribe(response => {
      this.personas = response;
    });
  }
}
```

1. Inyectar el servicio
2. Llamar al método en `ngOnInit` y subscribirse (`.subscribe()`) para recibir la respuesta

### ### Peticiones POST / PUT

Para peticiones que envían datos (POST, PUT), se deben configurar cabeceras (`HttpHeaders`).

```typescript
// service.departamentos.ts
import { HttpClient, HttpHeaders } from "@angular/common/http";

createDepartamento(departamento: Departamento): Observable<any> {
  // 1. Convertir el objeto a JSON
  let json = JSON.stringify(departamento);
  
  // 2. Crear cabeceras
  let header = new HttpHeaders().set("Content-type", "application/json");
  
  let request = "api/departamentos";
  let url = environment.urlApiDepartamentos + request;
  
  // 3. Enviar la petición POST con url, body (json) y headers
  return this._http.post(url, json, { headers: header });
}

updateDepartamento(departamento: Departamento): Observable<any> {
  let json = JSON.stringify(departamento);
  let header = new HttpHeaders().set("Content-type", "application/json");
  let url = environment.urlApiDepartamentos + "api/departamentos";
  
  return this._http.put(url, json, { headers: header });
}
```

### ### Petición DELETE

La petición DELETE solo requiere la URL (a veces con un ID).

```typescript
// service.departamentos.ts
deleteDepartamento(idDepartamento: number): Observable<any> {
  let request = "api/departamentos/" + idDepartamento;
  let url = environment.urlApiDepartamentos + request;
  return this._http.delete(url);
}
```

---

## ## 11. Autenticación (Token)

Un flujo común de autenticación JWT (Token) en Angular es:

### Flujo de Autenticación

#### 1. Login Component

- El usuario introduce credenciales (`userName`, `password`)
- Se llama a un servicio (ej: `service.loginEmpleado(user)`) que hace POST a un endpoint (ej: `/Auth/Login`)

#### 2. Servicio de Empleados (Auth)

```typescript
// service.empleados.ts
public token: string = "";

loginEmpleado(user: Login): Observable<any> {
  ...
  return this._http.post(url, json, {headers: header});
  // En el componente, al subscribirse:
  // this._service.token = response.response;
}
```

- El servicio recibe el token en la respuesta
- El servicio almacena el token (en una variable de clase, `localStorage`, etc.)

#### 3. Peticiones Autenticadas

Para todas las peticiones a endpoints protegidos, se debe incluir el token en la cabecera `Authorization` con el prefijo `bearer`:

```typescript
// service.empleados.ts
getPerfilEmpleado(): Observable<any> {
  let request = "api/empleados/perfilempleado";
  let url = environment.apiUrlEmpleados + request;
  
  // Crear cabecera con el token guardado
  let header = new HttpHeaders().set("Authorization", "bearer " + this.token);
  
  return this._http.get(url, { headers: header });
}
```

---

## ## 12. Tópicos Avanzados

### Componentes Standalone

**Definición**: Componentes que no necesitan ser declarados en un `NgModule`.

**Sintaxis**: `@Component({ standalone: true, ... })`

**Dependencias**:

- Si se usan directivas clásicas (`*ngIf`, `*ngFor`), deben importarse en el decorador: `imports: [NgFor, NgIf]` (no es necesario si se usa la sintaxis `@if`/`@for`)
- Los servicios se deben proveer localmente: `providers: [ServicePersonas]`

### Subida de Ficheros (File Upload)

Para enviar ficheros a una API que espera un `fileName` y un `fileContent` (en base64):

#### HTML

```html
<input type="file" #cajafile>
```

#### Componente

```typescript
subirFichero(): void {
  var file = this.cajaFileRef.nativeElement.files[0];
  var reader = new FileReader();
  reader.readAsArrayBuffer(file);

  reader.onloadend = () => {
    var buffer: ArrayBuffer = reader.result as ArrayBuffer;
    
    // btoa convierte bytes a base64
    var base64 = btoa(
      new Uint8Array(buffer)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    var ficheroNombre = file.name;
    var newFileModel = new FileModel(ficheroNombre, base64);
    this._service.postFile(newFileModel).subscribe(...);
  }
}
```

**Pasos**:

1. Usar `@ViewChild` para obtener la referencia al input
2. Usar `FileReader` para leer el fichero
3. Convertir el fichero a `ArrayBuffer` y luego a base64 usando `btoa()`
4. Crear el modelo (ej: `FileModel`) con el nombre y el string base64
5. Llamar al servicio para hacer POST del modelo

### Múltiples Peticiones Simultáneas (forkJoin)

Para ejecutar varias peticiones `Observable` en paralelo y esperar a que todas terminen.

**Caso de Uso**: Cargar la página de un "Equipo" y sus "Jugadores" (dos peticiones separadas) y mostrarlos a la vez.

**Sintaxis**: `forkJoin` recibe un objeto donde cada propiedad es un `Observable`. Devuelve un `Observable` que emite un objeto con los resultados cuando todos han completado.

```typescript
// En el servicio
import { Observable, forkJoin } from "rxjs";

getData(): Observable<ServerResponse> {
  const allOperations = forkJoin({
    requestOne: this.getClientData(),   // ej: this.service.findEquipo(id)
    requestTwo: this.getOtherData()     // ej: this.service.getJugadoresEquipo(id)
  });
  
  // ... (lógica para mapear la respuesta a un modelo combinado)
}
```

---

## Recursos Adicionales

- [Documentación Oficial de Angular](https://angular.io/docs)
- [Angular CLI Documentation](https://angular.io/cli)
- [RxJS Documentation](https://rxjs.dev/)

---

**Última actualización**: Noviembre 2025