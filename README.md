# Reto Técnico – Full Stack (AWS)

## 1. Base de Datos

**Objetivo:**  
Crear una base de datos con las siguientes tablas:
- Usuario
- Producto
- Categoría

**Requisitos:**
- Usar base de datos relacional
- Respetar estándares de diseño y modelamiento de base de datos
- Aplicar buenas prácticas en:
  - Definición de tablas
  - Campos y tipos de datos
- Los campos de las tablas son de libre elección

---

## 2. Back End

**Objetivo:**  
Desarrollar APIs para gestionar las tablas con los siguientes endpoints:

1. Autenticación:
   - EndPoint de Inicio de Sesión (JWT)

2. Gestión de Productos:
   - CRUD completo (Crear, Obtener, Editar, Eliminar)
   - EndPoint de listado de Productos

3. Gestión de Categorías:
   - CRUD completo (Crear, Obtener, Editar, Eliminar)

**Requisitos técnicos:**
- Stack tecnológico:
  - Node.js
  - Prisma (ORM)
  - NestJS (Framework)

**Requisitos funcionales:**
- Validaciones:
  - Límites de caracteres
  - Tipos de datos
- Seguridad:
  - Endpoints de productos y categorías requieren token válido
- Lógica de negocio:
  - Prevenir duplicados en nombres de productos
  - Implementar paginación en listado de productos
- Calidad de código:
  - Buenas prácticas en estructura de proyecto
  - Convenciones de nomenclatura
  - Manejo controlado de errores

---

## 3. Front End

**Objetivo:**  
Desarrollar interfaces para:

1. Gestión de Categorías:
   - Formulario CRUD completo

2. Gestión de Productos:
   - Formulario CRUD completo
   - Grid/Tabla de listado con paginación

**Requisitos técnicos:**
- Stack tecnológico:
  - React.js
  - Next.js (Framework)

**Requisitos funcionales:**
- Consumo de APIs:
  - Integración con endpoints de productos
  - Integración con endpoints de categorías
- Experiencia de usuario:
  - Validaciones en formularios
  - Paginación en grid/tabla
- Calidad de código:
  - Buenas prácticas en estructura de proyecto
  - Convenciones de nomenclatura

---

## 4. Cloud (AWS)

**Objetivo:**  
Implementar la solución en infraestructura AWS

**Requisitos:**
- Servicios a utilizar:
  - EC2: Despliegue de Front End y Back End
  - RDS: Instancia para base de datos SQL

**Nota:**  
*Por temas técnicos no se pudo realizar este paso durante el desarrollo.*

---

## 5. Mejoras Opcionales

Se valorarán positivamente:
- Implementación de características adicionales
- Optimizaciones de performance
- Mejoras en la experiencia de usuario
- Cualquier otra mejora que agregue valor al proyecto

*Los candidatos tienen libertad creativa para proponer e implementar mejoras adicionales.*