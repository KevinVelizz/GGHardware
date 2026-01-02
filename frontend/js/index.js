let products = [
    {id: 1, name: "placa de video", price: 500, description: "Nvidia GTX 1660 TI", image: "./img/logo.png"},
    {id: 2, name: "placa de video", price: 500, description: "Nvidia GTX 1660 TI", image: "./img/logo.png"},
    {id: 3, name: "placa de video", price: 500, description: "Nvidia GTX 1660 TI", image: "./img/logo.png"},
    {id: 4, name: "placa de video", price: 500, description: "Nvidia GTX 1660 TI", image: "./img/logo.png"},
    {id: 5, name: "placa de video", price: 500, description: "Nvidia GTX 1660 TI", image: "./img/logo.png"},
    {id: 6, name: "placa de video", price: 500, description: "Nvidia GTX 1660 TI", image: "./img/logo.png"},
    {id: 7, name: "placa de video", price: 500, description: "Nvidia GTX 1660 TI", image: "./img/logo.png"},
    {id: 8, name: "placa de video", price: 500, description: "Nvidia GTX 1660 TI", image: "./img/logo.png"},

]

let cart = [];

const listProducts = document.getElementById('list-products');


function insertProducts(list) {

    let htmlList = ""

    list.forEach(product => {

        htmlList += `
                <div class="card">
                    <img src="${product.image}" alt="imagen del producto">
                    <p class="card-name">${product.name}</p>
                    <p class="card-price">$${product.price}</p>
                    <button id="${product.id}" class="btn"><ion-icon name="cart-outline"></ion-icon>Agregar al carrito</button>
                </div>`;
    });

    listProducts.innerHTML = htmlList;
}

insertProducts(products);

const btn = document.getElementsByClassName('btn');

for(const boton of btn) {
    boton.addEventListener('click', addCart);
}


function addCart(event) {
    console.log(event.target.id);

    const prod = products.find(p => p.id == event.target.id);

    cart.push(prod);

    console.log(cart);
}


