import Products from "../models/product.models.js";

// Get de los productos
export const getAllProducts = async (req, res) => {

    // 1. Manejamos la lógica dentro de un try catch para evitar que rompa el programa en caso de algún error al traer los productos.
    try {

        // Al usar [rows] la desestructuración extrae directamente las filas(que es el primer elemento del resultado de la consulta), nos sirve porque hace el código más legible y explicito.
        const [rows] = await Products.selectAllProducts();

        // 2. Optimización.
        // Devolvemos el texto plano JSON con toda la información de los productos. 
        if (rows.length === 0) {
            return res.status(404).json({
                ok: false,
                payload: [],
                message: "No se encontaron productos"
            });
        }

        res.status(200).json({
            ok: true,
            payload: rows,
            // message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
            message: "Productos encontrados"
        });

    } catch (error) {
        console.error("DB Error in selectAllProducts:", error.message);
        res.status(500).json({
            ok: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}


// Get de los productos por ID.
export const getProductById = async (req, res) => {
    try {
        // Obtenemos el ID de la consulta(req).
        const { id } = req.params;

        console.log(id);
        // Obtenemos las rows desde models.
        const [rows] = await Products.selectProductFromId(id);

        if (rows.length === 0) {
            return res.status(404).json({
                ok: false,
                payload: [],
                message: "No se encontaron productos"
            });
        }

        res.status(200).json({
            ok: true,
            payload: rows,
            message: "Se encontaron productos"
        });

    } catch (error) {
        console.error("DB Error in getProductById: ", error.message);
        res.status(500).json({
            ok: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}


// Crear un nuevo producto.
export const createNewProduct = async (req, res) => {

    try {

        // Obtener las propiedades del producto por medio del cuerpo de la consulta(req.body).
        const { name, price, description, stock, active, image } = req.body;

        if (!name || price == undefined || !description || stock === undefined || active === undefined || !image) {
            return res.status(400).json({
                ok: false,
                message: "Todos los campos son obligatorios"
            });
        }

        let activeNum = parseInt(active);

        if (isNaN(stock) || isNaN(price)) {
            return res.status(400).json({
                ok: false,
                message: "Los campos stock, active y price deben ser números"
            });
        }

        const [result] = await Products.insertNewProduct(name, price, description, stock, activeNum, image);

        console.log(result);

        res.status(201).json({
            message: "Producto creado con exito",
            productoId: result.insertId
        }); // Con productId devolvemos info util del insert para deolver el ID del producto creado


    } catch (error) {
        console.error("DB Error in insertNewProduct: ", error.message);

        res.status(500).json({
            ok: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}


// Modificar producto. 
export const modifyProduct = async (req, res) => {

    try {
        const { id, name, price, description, stock, active, image } = req.body;

        if (!name || id == undefined || price == undefined || !description || stock === undefined || active === undefined || !image) {
            return res.status(400).json({
                ok: false,
                message: "Todos los campos son obligatorios"
            });
        }

        if (isNaN(stock) || isNaN(active) || isNaN(price) || isNaN(id)) {
            return res.status(400).json({
                ok: false,
                message: "Los campos stock, active, id y price deben ser números"
            });
        }

        const [result] = await Products.updateProduct(id, name, price, description, stock, active, image);

        // Si no encontró el producto
        if (result.affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                message: "Producto no encontrado"
            });
        }

        // Si lo encontró pero no hubieron cambios.
        if (result.changedRows === 0) {
            return res.status(200).json({
                ok: true,
                message: "El producto ya tenía estos valores"
            });
        }

        res.status(200).json({
            ok: true,
            message: "Producto actualizado correctamente"
        });


    } catch (error) {
        console.error("DB Error in insertNewProduct: ", error.message);

        res.status(500).json({
            ok: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}

// Eliminar producto 
export const removeProduct = async (req, res) => {

    try {
        const { id } = req.params;

        if (id === undefined) {
            return res.status(400).json({
                ok: false,
                message: "Se requiere un id para eliminar un producto"
            });
        }

        const [result] = await Products.deleteProduct(id);

        if (result.affectedRows === 0) {
            return res.status(400).json({
                ok: false,
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            ok: true,
            message: "Producto eliminado correctamente"
        });
    } catch (error) {

        console.error("DB Error in removeProduct: ", error.message);
        res.status(500).json({
            ok: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}