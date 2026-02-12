// Importamos el modulo de mysql2 para conectarnos a la basde de datos. La parte /promise indica que se usará la API basada en promesas, lo que permite usar async/await para manejar consultas en lugar de callbacks.
import mysql from "mysql2/promise";
import dotenv from "dotenv"; // Importamos el modulo dotenv

dotenv.config(); // Cargamos las variables de entorno desde el archivo .env

// Importar el archivo environments. guarda las variables de configuración, como usuario, contraseña, host, nombre de la base de datos, etc. Esto sirve para no escribir los datos sensibles directamente en el código.
import environments from "../config/environments.js";

const { database } = environments;

let connection;

// Un pool es un grupo de conexiones reutilizables, en lugar de abrir y cerrar conexiones cada vez que se hace una consulta, el pool mantiene varias conexiones abiertas y listas para usar.


if (process.env.MYSQL_URL) {
  // 🚀 Producción (Railway)
  connection = mysql.createPool(process.env.MYSQL_URL);
} else {
  connection = mysql.createPool({
    host: database.host,
    user: database.user,
    password: database.password,
    database: database.name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}

export default connection;