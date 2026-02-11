import Products from "../models/product.models.js";

export const viewProductList = async (req, res) => {

    try {
        const respuestaProductos = await Products.selectAllProducts();

        res.render("index", {
            title: "Listado de productos",
            products: respuestaProductos[0]
        });

    } catch (error) {
        console.error(error);
    }
}

export const viewGetProductById = (req, res) => {
    res.render("read", {
        title: "Consultar productos por id"
    });
}

export const viewCreateProduct = (req, res) => {
    res.render("create", {
        title: "Crear productos"
    });
}

export const viewUpdateProduct = (req, res) => {
    res.render("update", {
        title: "Modificar productos"
    });
}

export const viewDeleteProduct = (req, res) => {
    res.render("delete", {
        title: "Eliminar productos"
    });
}
