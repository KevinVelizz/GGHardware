// Importamos express.Router
import { Router } from "express";
import { viewCreateProduct, viewDeleteProduct, viewGetProductById, viewProductList, viewUpdateProduct } from "../controllers/views.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";

const router = Router();

// Ruta de vista listado productos
router.get("/", requireLogin, viewProductList);


// Ruta de vista consultar producto por id
router.get("/read", requireLogin, viewGetProductById);


// Ruta de vista crear producto
router.get("/create", requireLogin, viewCreateProduct);


// Ruta de vista modificar producto
router.get("/update", requireLogin, viewUpdateProduct);


// Ruta de vista eliminar producto
router.get("/delete", requireLogin, viewDeleteProduct);

// Exportamos las rutas de las vistas
export default router;