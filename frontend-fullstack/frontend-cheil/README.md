- Documentación - Instalación y Ejecución del Frontend
- Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

    -Node.js (v18 o superior recomendado)
    -npm

1. Clonar el Repositorio

git clone https://github.com/usuario/nombre-del-repo-frontend.git
cd nombre-del-repo-frontend


2. Instalar Dependencias

    npm install

3. Iniciar el Servidor de Desarrollo

    npm run dev

Esto iniciará la aplicación en:

    http://localhost:3000

4. Iniciar Sesión con el Usuario de Prueba
Dirígete a:

    http://localhost:3000/login

Usa el siguiente usuario de prueba (creado con el seed del backend):

    Email: admin@admin.com
    Contraseña: 123456

Al iniciar sesión correctamente, el token JWT se almacena en localStorage y se redirige al dashboard protegido.

5. Navegación Protegida

Una vez logueado, puedes acceder a las secciones protegidas como:

    /dashboard

    /categories

    /products

Si no hay token en localStorage, el usuario es redirigido automáticamente al login.