// Creamos un servidor base con Express.js

// Importamos Express
// const express = require('express');

// Creamos una instancia de aplicación de express
// const app = express();

// Definimos la ruta principal.
// app.get('/', (req, res) => {
//     res.send('Hola mundo desde express');
// });


// Escuchamos desde el puerto 3000
// const puerto = 3000;

// app.listen(puerto, () => {
//     console.log(`Servidor Express corriendo en el puerto ${puerto}`);
// });

import express from "express";
import connection from "./src/database/db.js";
import environments from "./src/api/config/environments.js";
import cors from "cors";
const app = express();
const PORT = environments.port;

// Middlewares
app.use(cors()); // middleware básico que permite todas las solicitudes.
app.use(express.json()); // Middleware para parsear JSON en el body.


// ENDPOINTS
// Get -> traer todos los productos de la base de datos.
app.get("/products", async (req, res) => {

    try {
        const sql = `SELECT * FROM products`;
        const [rows] = await connection.query(sql);
        console.log(rows);

        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });

    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

// Get product by ID -> Consultar producto por su ID.
app.get("/products/:id", async (req, res) => {

    try {
        let { id } = req.params; // Esto nos permite obtener el valor númerico después de products.

        let sql = `SELECT * FROM products WHERE id = ?`;
        const [rows] = await connection.query(sql, [id]);

        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontró el producto seleccionado" : "Producto encontrado correctamente."
        });

    } catch (error) {
        console.error("Error obteniendo el producto por ID", error.message);

        res.status(500).json({
            error: "Error interno al obtener un producto por id"
        });
    }
});

app.post("/products", async (req, res) => {
    try {
        const { name, image, category, price } = req.body;
        // Aca imprimimos lo que enviamos desde el form que previamente se parseo gracias al middleware -> express.json()
        console.log(req.body);

        // Optimizacion 1: Validacion datos de entrada
        if (!name || !image || !category || !price) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos del formulario"
            });
            // return hace que el endpoint termine aca y el usuario solo reciba esta respuesta
        }

        // Los placeholders ?, evitan inyecciones SQL para evitar ataques de este tipo
        let sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";

        // Le enviamos estos valores a la BBDD
        let [rows] = await connection.query(sql, [name, image, category, price]);
        console.log(rows);

        // Devolvemos una respuesta 201 "Created"
        res.status(201).json({
            message: "Producto creado con exito",
            productId: rows.insertId
        });


    } catch (error) {
        console.error("Error interno del servidor");

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
});

app.delete("/products/:id", async (req, res) => {
    try {
        let { id } = req.params;

        // Opcion 1: Borrado normal
        let sql = "DELETE FROM products WHERE id = ?";

        // Opcion 2: Baja logica
        // let sql2 = "UPDATE products set active = 0 WHERE id = ?";

        let [result] = await connection.query(sql, [id]);
        console.log(result);
        // affectedRows: 1 -> Nos indica que hubo una fila que fue afectada

        // Optimizacion 1 -> Ya hacemos la validacion del Id a traves del middleware

        // Optimizacion 2 -> Comprobar si realmente eliminamos un producto
        if (result.affectedRows === 0) { // Quiere decir que no afectamos ninguna fila
            return res.status(404).json({
                message: `No se encontro un producto con id ${id}`
            });
        }


        return res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });


    } catch (error) {
        console.log(`Error al eliminar un producto con id ${id}: `, error);

        res.status(500).json({
            message: `Error al eliminar un producto con id ${id}`,
            error: error.message
        })
    }
});

app.put("/products", async (req, res) => {
    try {
        /*
        "id": 4,
        "name": "hamburguesa pollo a la parrilla",
        "image": "https://burgernj.com/wp-content/uploads/2021/05/Grilled-Chicken-Burger_.jpg",
        "category": "food",
        "price": "1500.00",
        "active": 1
        */

        let { id, name, image, category, price, active } = req.body;

        // Optimizacion 1: Validacion basica de datos
        if (!id || !name || !category || !price || !active) {
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }

        let sql = `
            UPDATE products
            SET name = ?, image = ?, price = ?, category = ?
            WHERE id = ?
        `;

        let [result] = await connection.query(sql, [name, image, price, category, id]);
        console.log(result);

        // Optimizacion 2: Testeamos que se actualizara este producto
        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "No se actualizo el producto"
            });
        }

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });


    } catch (error) {
        console.error("Error al actualizar el producto: ", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})