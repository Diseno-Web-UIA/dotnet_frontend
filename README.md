# Proyecto Diseño Web I - Frontend

Aplicación web React moderna para gestión integral de clientes con interfaz intuitiva y funcionalidades avanzadas.

## Características Principales

- ✅ **Sistema de Gestión de Clientes** completo con registro unificado
- ✅ **Interfaz moderna** construida con Ant Design y React 18
- ✅ **Navegación intuitiva** con React Router y componentes reutilizables
- ✅ **Calculadora integrada** con funcionalidades matemáticas avanzadas
- ✅ **Exportación de datos** en formatos XML y JSON
- ✅ **Lectura de archivos** XML y JSON con visualización en tablas
- ✅ **Integración con API** backend mediante servicios HTTP
- ✅ **Diseño responsivo** para dispositivos móviles y de escritorio
- ✅ **Tema personalizado** con estilos CSS modernos y transiciones

## Tecnologías Utilizadas

- **React 18.3.0** - Biblioteca principal para la interfaz de usuario
- **Ant Design 5.26.7** - Sistema de componentes UI profesional
- **React Router DOM 7.7.1** - Enrutamiento y navegación
- **Axios 1.11.0** - Cliente HTTP para comunicación con API
- **Math.js 14.6.0** - Biblioteca para operaciones matemáticas
- **Day.js 1.11.13** - Manipulación de fechas ligera
- **React Icons 5.5.0** - Iconografía completa para React
- **SweetAlert2 11.22.4** - Alertas y notificaciones elegantes
- **React Transition Group 4.4.5** - Animaciones y transiciones
- **Node.js 22** - Entorno de ejecución (Docker)

## Funcionalidades del Sistema

### Páginas Principales

- **Home**: Página principal con acceso a todas las funcionalidades
- **Registro Unificado**: Formulario completo para registro de clientes
- **Lista de Clientes**: Visualización y gestión de clientes registrados
- **Exportar Datos**: Exportación en formatos XML y JSON
- **Leer Archivos**: Importación y visualización de archivos XML/JSON

### Componentes Especializados

- **Calculadora**: Herramienta matemática integrada con operaciones avanzadas
- **Navbar**: Navegación principal con menú responsivo
- **TablaPopover**: Componente para mostrar datos en tablas interactivas

### Características Técnicas

- **Gestión de Estado**: Hooks de React para estado local
- **Validación de Formularios**: Validaciones en tiempo real
- **Manejo de Errores**: Gestión elegante de errores de API
- **Responsive Design**: Adaptación automática a diferentes dispositivos
- **Animaciones**: Transiciones suaves y efectos visuales

## Instalación y Configuración

### Prerrequisitos

- Node.js 18+ o Docker
- npm o yarn
- Acceso a la API backend

### Instalación Local

```bash
# Clonar el repositorio
git clone <repository-url>
cd project_sis15/dotnet_frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
# Crear archivo .env con las siguientes variables:
REACT_APP_MODE=0
REACT_APP_SB_URL_API=http://localhost:5138
REACT_APP_PROD_URL_API=https://api.server.asralabs.com

# Ejecutar en modo desarrollo
npm start
```

### Variables de Entorno

```env
# Modo de ejecución (0 = desarrollo, 1 = producción)
REACT_APP_MODE=0

# URL de la API en desarrollo
REACT_APP_SB_URL_API=http://localhost:5138

# URL de la API en producción
REACT_APP_PROD_URL_API=https://api.server.asralabs.com
```

### Ejecución con Docker

```bash
# Construir imagen
docker build -t frontend-sis15 .

# Ejecutar contenedor
docker run -p 3002:3002 frontend-sis15
```

## Estructura del Proyecto

```
dotnet_frontend/
├── public/                 # Archivos públicos y estáticos
│   ├── bg.jpg             # Imagen de fondo
│   ├── favicon.ico        # Icono de la aplicación
│   └── index.html         # Plantilla HTML principal
├── src/                    # Código fuente de la aplicación
│   ├── componentes/        # Componentes reutilizables
│   │   ├── calculadora/    # Calculadora integrada
│   │   │   ├── calculadora.js
│   │   │   └── calculadora.css
│   │   ├── Navbar/         # Barra de navegación
│   │   │   ├── Navbar.js
│   │   │   └── Navbar.css
│   │   └── TablaPopover.js # Tabla con popover
│   ├── Paginas/            # Páginas principales de la aplicación
│   │   ├── Home.js         # Página principal
│   │   ├── RegistroUnificado.js # Registro de clientes
│   │   ├── ListaClientes.js     # Lista de clientes
│   │   ├── ExportarDatos.js     # Exportación de datos
│   │   ├── LeerArchivos.js      # Lectura de archivos
│   │   └── RegistrarPersona.js  # Registro individual
│   ├── Utils/              # Utilidades y helpers
│   │   ├── Api.js          # Cliente HTTP para API
│   │   ├── env.js          # Gestión de variables de entorno
│   │   ├── xmlParser.js    # Parser de archivos XML
│   │   └── ReadFile.js     # Utilidades para lectura de archivos
│   ├── services/            # Servicios de la aplicación
│   ├── App.js              # Componente principal
│   ├── App.css             # Estilos principales
│   ├── index.js            # Punto de entrada
│   └── index.css           # Estilos globales
├── package.json            # Dependencias y scripts
├── Dockerfile              # Configuración de Docker
└── README.md               # Este archivo
```

## Scripts Disponibles

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm start

# Ejecutar pruebas
npm test

# Construir para producción
npm run build
```

### Producción

```bash
# Construir aplicación optimizada
npm run build

# Servir archivos estáticos (requiere serve)
npx serve -s build -l 3002
```

## Funcionalidades Detalladas

### Calculadora Integrada

- **Operaciones básicas**: Suma, resta, multiplicación, división
- **Operaciones avanzadas**: Potenciación y operaciones complejas
- **Validaciones**: Prevención de división por cero y operaciones inválidas
- **Interfaz flotante**: Accesible desde cualquier página
- **Animaciones**: Transiciones suaves de entrada y salida

### Sistema de Registro

- **Formulario unificado**: Captura de datos personales, contactos y direcciones
- **Validaciones**: Verificación en tiempo real de campos obligatorios
- **Integración con API**: Comunicación directa con el backend
- **Manejo de errores**: Notificaciones elegantes para el usuario

### Gestión de Clientes

- **Lista completa**: Visualización de todos los clientes registrados
- **Búsqueda y filtros**: Funcionalidades de búsqueda avanzada
- **Acciones en lote**: Operaciones múltiples sobre clientes
- **Exportación**: Generación de reportes en múltiples formatos

### Importación y Exportación

- **Formato XML**: Lectura y escritura de archivos XML
- **Formato JSON**: Procesamiento de datos JSON
- **Validación de archivos**: Verificación de estructura y contenido
- **Visualización en tablas**: Presentación ordenada de datos importados

## Configuración de Desarrollo

### Puertos por Defecto

- **Desarrollo**: 3000
- **Docker**: 3002

### Navegadores Soportados

- Chrome (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)

### Herramientas de Desarrollo

- **React Developer Tools**: Extensión del navegador
- **Redux DevTools**: Para debugging de estado (si se implementa)
- **ESLint**: Linting de código JavaScript
- **Prettier**: Formateo automático de código

## Integración con Backend

### Configuración de API

La aplicación se conecta al backend mediante el servicio `Api.js` que:

- Maneja diferentes entornos (desarrollo/producción)
- Implementa timeout y manejo de errores
- Proporciona logging detallado para debugging
- Gestiona headers y tipos de contenido automáticamente

### Endpoints Utilizados

- **Personas**: `/api/persona` (CRUD completo)
- **Usuarios**: `/api/usuario` (Gestión de cuentas)
- **Emails**: `/api/email` (Contactos electrónicos)
- **Teléfonos**: `/api/telefono` (Números de contacto)
- **Direcciones**: `/api/direccion` (Ubicaciones físicas)

## Despliegue

### Local

```bash
npm run build
npx serve -s build -l 3002
```

### Docker

```bash
docker build -t frontend-sis15 .
docker run -d -p 3002:3002 frontend-sis15
```

### Servicios de Hosting

- **Netlify**: Despliegue automático desde Git
- **Vercel**: Plataforma optimizada para React
- **AWS S3 + CloudFront**: Almacenamiento estático con CDN
- **Azure Static Web Apps**: Hosting gestionado de Microsoft

## Notas de Desarrollo

- La aplicación utiliza **Create React App** como base
- **Ant Design** proporciona componentes UI profesionales
- **React Router** maneja la navegación entre páginas
- **Axios** se utiliza para todas las comunicaciones HTTP
- **CSS Modules** y **CSS-in-JS** para estilos modulares
- **Responsive Design** implementado con CSS Grid y Flexbox

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto es parte del curso de Diseño Web I (SIS-15) de la Universidad Internacional de Las Américas.

## Soporte

Para soporte técnico o preguntas sobre el proyecto, contacta al equipo de desarrollo del curso.

---

**Desarrollado con �� por el Grupo 1**
