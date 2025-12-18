// Importamos express.Router
import { Router } from "express";
import { viewCreateProduct, viewDeleteProduct, viewGetProductById, viewProductList, viewUpdateProduct } from "../controllers/views.controllers.js";

const router = Router();

// Ruta de vista listado productos
router.get("/", viewProductList);


// Ruta de vista consultar producto por id
router.get("/read", viewGetProductById);


// Ruta de vista crear producto
router.get("/create", viewCreateProduct);


// Ruta de vista modificar producto
router.get("/update", viewUpdateProduct);


// Ruta de vista eliminar producto
router.get("/delete", viewDeleteProduct);

// Exportamos las rutas de las vistas
export default router;