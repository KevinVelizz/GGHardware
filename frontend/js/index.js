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
                <div class="card product" data-product-id="${product.id}">
                    <img src="${product.image}" alt="imagen del producto">
                    <p class="card-name">${product.name}</p>
                    <p class="card-price">$${product.price}</p>
                    <button class="btn"><ion-icon name="cart-outline"></ion-icon>Agregar al carrito</button>
                </div>`;
    });

    listProducts.innerHTML = htmlList;
}

insertProducts(products);

const productsCart = document.querySelectorAll('.product');


// Opción 1. evento en el button.

// for(const prod of productsCart) {

//     const prodId = prod.dataset.productId;

//     const button = prod.getElementsByClassName("btn").item(0);

//     button.addEventListener('click', ()=> {

//         console.log(prodId);
//     });
// }

// Opción 2. Delegación de eventos. 

listProducts.addEventListener('click', (e) => {

    console.log(e.target);

    const button = e.target.closest('.btn');
    if (!button) return;

    const product = button.closest('.product');
    const productId = product.dataset.productId;

    console.log(productId);
});

