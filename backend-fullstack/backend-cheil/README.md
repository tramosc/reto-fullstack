- Documentación - Instalación y Ejecución del Backend
- Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:

. Node.js (v18 o superior recomendado)
. npm
. MySQL u otro motor de base de datos compatible
. Opcionalmente: Postman o Insomnia para probar la API



1. Clonar el Repositorio

    git clone https://github.com/usuario/nombre-del-repo-backend.git
    cd nombre-del-repo-backend


2. Configurar Variables de Entorno

-Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

    PORT=3000
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_de_tu_base_de_datos
    JWT_SECRET=alguna_clave_secreta_segura



3. Instalar Dependencias

    npm install


4. Configurar la Base de Datos
Crea la base de datos si no existe:

    CREATE DATABASE nombre_de_tu_base_de_datos;

Luego, si usas ORM (como Sequelize), asegúrate de que las migraciones o modelos generen las tablas. Esto puede suceder automáticamente al iniciar el servidor, o podrías tener un script como:

    npm run migrate


5. Insertar Usuario de Prueba con Seed

Ejecuta el siguiente script para insertar un usuario administrador de prueba:

    npm run seed

Este script crea un usuario como:

    {
    "email": "admin@admin.com",
    "password": "123456"
    }

Este usuario podrás usarlo para iniciar sesión desde el frontend.



6. Iniciar el Servidor

    npm run dev

- El servidor quedará corriendo en:

    http://localhost:3000

7. Probar el Login

Haz una petición POST a /login para autenticarte:

POST http://localhost:3000/login

- Body (JSON):

    {
    "email": "admin@admin.com",
    "password": "123456"
    }

Si es exitoso, recibirás un token JWT.

8. Probar el API Protegido
Para acceder a rutas privadas (como /categories, /products, etc.), añade el token en los headers:

    Authorization: Bearer TU_TOKEN


