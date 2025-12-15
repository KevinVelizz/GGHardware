// Creamos un servidor base con Express.js
import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { createNewProduct, getAllProducts, getProductById, modifyProduct, removeProduct } from "./src/api/controllers/product.controllers.js";
const app = express();
const PORT = environments.port;

// Middlewares
app.use(cors()); // middleware básico que permite todas las solicitudes.
app.use(express.json()); // Middleware para parsear JSON en el body.


// Configuramos EJS como motor de plantillas
app.set("view engine", "ejs");

// Definimos la ruta donde estan almacenadas las plantillas .ejs, con join combinamos el directorio raiz del proyecto con src/views
app.set("views", join(__dirname, "src/views"));

// ENDPOINTS
// Get -> traer todos los productos de la base de datos.
app.get("/products", getAllProducts);

// Get product by ID -> Consultar producto por su ID.
app.get("/products/:id", getProductById);

app.post("/products", createNewProduct);

app.delete("/products/:id", removeProduct);

app.put("/products", modifyProduct);

app.use("/dashboard", viewRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})