const url = "https://gghardware-production.up.railway.app/api/products";

let getId_list = document.getElementById("getId-list");
let getProduct_form = document.getElementById("getProduct-form");
let updateForm_container = document.getElementById("updateForm-container");

getProduct_form.addEventListener("submit", async (event) => {

    event.preventDefault(); // Evitamos el envio por defecto del formulario



    try {

        // LIMPIAMOS ESTADO ANTERIOR
        getId_list.innerHTML = "";
        updateForm_container.innerHTML = "";

        // Optimizacion 1: Mostramos un estado de carga
        getId_list.innerHTML = "<p>Cargando producto...</p>";

        // Como obtenemos y almacenamos en JavaScript la informacion de un formulario?
        let formData = new FormData(event.target);
        console.log(formData);

        // Aca transformamos el objeto FormData en un objeto JS normal
        let data = Object.fromEntries(formData.entries());
        console.log(data); // id: "2"

        // Ahora si, almacenamos el valor numerico del formulario para pasarselo a la peticion fetch
        let id = data.id.trim(); // Optimizacion 2: Sacamos posibles espacios
        console.log(id); // 2


        // Optimizacion 3: Validacion basica
        if (!id) {
            throw new Error("Por favor ingresa un id de producto valido");
        }

        let response = await fetch(`${url}/${id}`);

        // Optimizacion 4: Manejamos el error en una posible respuesta no exitosa
        if (!response.ok) {
            throw new Error("Por favor, ingresa un id de producto valido");
        }

        let datos = await response.json();
        console.log(datos);


        // Optimizacion 5: Verificamos si  hay productos en la respuesta
        if (!datos.payload || datos.payload.length === 0) {
            throw new Error("No se encontro el producto solicitado");
        }


        let producto = datos.payload[0]; // El primer resultado es el que contiene el producto que nos devolvio la consulta


        showProducts(producto);

    } catch (error) {
        console.error("Error al obtener el producto: ", error);
        getId_list.innerHTML = `<p>${error.message}</p>`
    }
})

function showProducts(producto) {
    console.log(producto);

    let htmlProductos = `
    <li class="products">
        <div class="product">
            <img src="/img/${producto.image}" alt="${producto.nombre}" class="img-listados">
            <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: $${producto.price}</strong></p>
        </div>
        <div class="btnUpdate">
            <input class="listados_boton" id="updateProduct_button" type="button" value="Actualizar producto">
        </div>
    </li>
    `;

    getId_list.innerHTML = htmlProductos;

    let updateProduct_button = document.getElementById("updateProduct_button");

    updateProduct_button.addEventListener("click", function (event) {
        formPut(event, producto);
    })
}


function formPut(event, producto) {

    event.stopPropagation();

    console.table(producto);

    let updateProduct = `
        <div id="updateProducts-container" class="crudForm-container">
            <h2>Actualizar producto</h2>
            <form id="updateProducts-form" autocomplete="off">

                <label form="idProd">Id</label>
                <input type="number" name="id" id="idProd" value=${producto.id} readonly>
            
                <label for="categoryProd">Categoria</label>
                <select name="category" id="categoryProd" required>
                    <option value="placas">placa de video</option>
                    <option value="memoria">memoria</option>
                </select>

                <label for="image">Imagen</label>
                <input type="text" name="image" id="image" value="${producto.image}" required>

                <label for="name">Nombre</label>
                <input type="text" name="name" id="name" value="${producto.name}" required>

                <label for="description">Description</label>
                <input type="text" name="description" id="description" value="${producto.description}" required>

                <label for="price">Precio</label>
                <input type="number" name="price" id="price" value="${producto.price}" required>

                <label for="stock">Stock</label>
                <input type="number" name="stock" id="stock" value="${producto.stock}" required>

                <select name="active" id="active" required>
                    <option value="1">Activado</option>
                    <option value="0">Desactivado</option>
                </select>

                <input type="submit" value="Actualizar producto">
            </form>
        </div>
    `;

    updateForm_container.innerHTML = updateProduct;

    let updateProducts_form = document.getElementById("updateProducts-form");

    updateProducts_form.addEventListener("submit", function (event) {
        actualizarProducto(event)
    });
}

async function actualizarProducto(event) {

    event.preventDefault(); // Evitamos el envio por defecto del formulario


    try {
        let formData = new FormData(event.target);

        let data = Object.fromEntries(formData.entries());

        if (!data.name || !data.image || !data.price) {
            alert("Todos los campos son obligatorios");
            return;
        }
        let response = await fetch(`${url}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log(response);
            let result = await response.json();
            console.log(result.message);
            alert(result.message);

            // Vaciamos si existiera la lista y el formulario de actualizacion de producto
            getId_list.innerHTML = "";
            updateForm_container.innerHTML = "";

        } else {
            let error = await response.json();
            console.log("Error:", error.message);
        }

    } catch (error) {
        console.log("Error al enviar los datos", error);
        alert("Error al procesar la solicitud");
    }
}