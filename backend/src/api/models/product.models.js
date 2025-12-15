import connection from "../database/db.js"; // Importamos la conexion a la BBDD


//////////////////////////////////////
// Seleccionar todos los productos //
const selectAllProducts = async () => {

    const sql = `SELECT * FROM products`;
    return await connection.query(sql);
}


////////////////////////////////////
// Seleccionar producto por su ID //
const selectProductFromId = async (id) => {

    const sql = `SELECT * FROM products WHERE id = ?`;
    return await connection.query(sql, [id]);
}


/////////////////////////////
// Crear un nuevo producto //
const insertNewProduct = async (name, price, description, stock, active, image) => {
    const sql = `INSERT INTO products (name, price, description, stock, active, image) VALUES (?, ?, ?, ?, ?, ?)`;

    return await connection.query(sql, [name, price, description, stock, active, image]);
}


//////////////////////////////////
// Actualizar un nuevo producto //
const updateProduct = async (id, name, price, description, stock, active, image) => {

    const sql = `UPDATE products SET name = ?, price = ?, description = ?, stock = ?, active = ?, image = ? WHERE id = ?`;

    return await connection.query(sql, [name, price, description, stock, active, image, id]);
}


////////////////////////
// Eliminar producto //
const deleteProduct = async (id) => {
    let sql = `DELETE FROM products WHERE id = ?`;

    return await connection.query(sql, [id]);
}

export default {
    selectAllProducts,
    selectProductFromId,
    insertNewProduct,
    updateProduct,
    deleteProduct
}