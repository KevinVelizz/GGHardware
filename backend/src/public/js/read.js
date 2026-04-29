// Selección de elementos del DOM.
let contenedorProductos = document.getElementById('section-products');
let getProduct = document.getElementById('getProduct');
//const url = "https://gghardware-production.up.railway.app/api/products";
const url = "http://localhost:8080/api/products";

getProduct.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenimos el envio por defecto del formulario.

    try {
        // Tenemos que obtener los datos del formulario, por lo tanto, vamos a crear un objeto FormData a partir de los datos del formulario.
        let formData = new FormData(event.target); //Creamos un nuevo objeto FormData a partir de los datos del formulario

        console.log(formData); // FormData { id → "2" }

        // Transformamos a objetos JS los valores de FormData
        let data = Object.fromEntries(formData.entries());
        console.log(data); // { id: '2' }

        let id = data.id; // Ahora ya tenemos guardado en una variable el valor del campo del formulario
        console.log(id);

        console.log(`Realizando una peticion GET a la url ${url}${id}`);

        // Enviamos en una peticion GET el id pegado a la url
        let response = await fetch(`${url}/${id}`);

        let datos = await response.json();

        if (response.ok) {
            // Extraemos de la respuesta payload, el primer resultado que contiene el objeto que consultamos
            let producto = datos.payload[0];
            console.log(producto);

            showProducts(producto);

        } else {
            console.log(datos.message);
            showError(datos.message);
        }
    } catch (error) {
        console.error("Error al obtener el producto: ", error);
    }
});

function showProducts(producto) {
    let htmlProducto = `
                    <li class="product">
                        <img src="/img/${producto.image}" alt="${producto.name}">
                        <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: ${producto.price}</strong></p>
                    </li>
                `;

    contenedorProductos.innerHTML = htmlProducto;
}

function showError(message) {
    contenedorProductos.innerHTML = `
                <div class="mensaje-error">
                    <p>
                        <span>${message}.</span>
                    </p>
                </div>
            `;
}