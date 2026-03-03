# 📚 Programación III – Proyecto Full Stack con Node.js y MySQL

## 📌 Descripción

Este proyecto pertenece a la asignatura **Programación III**, donde se enseña el desarrollo completo de aplicaciones web **Full Stack**, integrando frontend, backend y base de datos relacional.

El objetivo principal es que el estudiante comprenda el flujo completo de una aplicación web moderna, desde la interfaz de usuario hasta la persistencia de datos en una base de datos.

###  Objetivos de Aprendizaje
Al finalizar la asignatura, el estudiante será capaz de:
- Desarrollar aplicaciones web Full Stack
- Implementar autenticación segura
- Diseñar y utilizar bases de datos relacionales
- Construir un CRUD completo
- Comprender la arquitectura cliente-servidor
- Preparar aplicaciones para entornos reales y deploy


## 🏗️ Arquitectura del Proyecto

El proyecto sigue el modelo **Cliente-Servidor**, aplicando el patrón MVC (Modelo - Vista - Controlador):

- **Modelo** → Conexión y consultas a la base de datos MySQL
- **Vista** → Plantillas dinámicas con EJS
- **Controlador** → Lógica de negocio y manejo de rutas

---

## 🖥️ Tecnologías Utilizadas

### 🎨 Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)


### ⚙️ Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-003B57?style=for-the-badge&logo=security&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-8BC34A?style=for-the-badge&logo=ejs&logoColor=black)


### 🎨 Desarrollo Frontend
- Estructura semántica con HTML
- Diseño y maquetado con CSS
- Manipulación del DOM con JavaScript
- Formularios y validaciones
- Renderizado dinámico con EJS
- Integración con el backend

### ⚙️ Desarrollo Backend con Node.js y Express
- Creación de servidor con Express
- Manejo de rutas (GET, POST, PUT, DELETE)
- Uso de middleware
- Arquitectura básica tipo MVC
- Manejo de formularios
- Implementación de CRUD completo
- Manejo de errores

### 🔐 Seguridad
- Registro de usuarios
- Inicio de sesión (Login)
- Hash de contraseñas con bcrypt
- Manejo de sesiones con express-session
- Protección de rutas privadas
- Uso de variables de entorno con dotenv

### 🗄️ Base de Datos
- **mysql2**
- Diseño de tablas
- Claves primarias y foráneas
- Relaciones 1:1
- Relaciones 1:N
- Consultas SQL:
    - `SELECT`
    - `INSERT`
    - `UPDATE`
    - `DELETE`
- Conexión a base de datos usando mysql2
---

## 📎 Conclusión

Programación III constituye una materia clave en la formación técnica del estudiante, ya que integra conocimientos adquiridos en asignaturas previas y los aplica en un entorno tecnológico actual, alineado con las demandas del mercado laboral.

## 🚀 Deploy del Proyecto
### Backend – Railway
El servidor desarrollado con Node.js + Express y la base de datos MySQL se despliegan en:

🔗 Railway
- Hosting del servidor backend
- Variables de entorno configuradas en la plataforma
- Conexión a base de datos MySQL en la nube
- Deploy automático desde repositorio GitHub
- Esto permite que la API esté disponible públicamente y accesible desde cualquier cliente.

### Frontend – Vercel
El frontend del proyecto se despliega en:

🔗 Vercel
- Deploy automático desde GitHub
- Hosting rápido y optimizado
- Entorno ideal para aplicaciones frontend
- Configuración sencilla de variables de entorno