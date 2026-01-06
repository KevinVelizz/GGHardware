let products = [
    {id: 1, name: "placa de video", price: 500, description: "Nvidia GTX 1660 TI", image: "./img/logo.png"},
    {id: 2, name: "procesador", price: 200, description: "Intel Core i7 9300", image: "./img/logo.png"},
    {id: 3, name: "monitor", price: 100, description: "24 pulgadas", image: "./img/logo.png"},
    {id: 4, name: "memoria ram", price: 1500, description: "corsair 3200mhz 16gb", image: "./img/logo.png"},
    {id: 5, name: "teclado", price: 5300, description: "teclado 9z mecanico", image: "./img/logo.png"},
    {id: 6, name: "mouse", price: 400, description: "mouse logitech inalambrico", image: "./img/logo.png"},
    {id: 7, name: "parlante", price: 8800, description: "genius", image: "./img/logo.png"},
    {id: 8, name: "mouse pad", price: 4300, description: "mouse pad 1m x 1m", image: "./img/logo.png"},
]

let cart = [];
let listFilterProducts = [...products];
const listProducts = document.getElementById('list-products');
const btnOrderPrice = document.getElementById('order-price');

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

    // console.log(typeof(productId));

    const productSelect = products.find(p => p.id == productId);

    // console.log(productSelect);

    cart.push(productSelect);

    console.log(cart);
});


////////////////////////////////////////
//////////// SEARCH ////////////////////

const form = document.getElementById('form');
const inputSearch = document.getElementById('search');

form.addEventListener('submit', (e)=> {
    e.preventDefault();
});

inputSearch.addEventListener('input', filterProducts);


function filterProducts() {
    
    let valueSearch = inputSearch.value.toLocaleLowerCase();

    listFilterProducts = products.filter(product => product.name.toLocaleLowerCase().includes(valueSearch) || product.description.toLocaleLowerCase().includes(valueSearch));

    insertProducts(listFilterProducts);
}


////////////////////////////////////////
//////////// ORDER /////////////////////

function sortProducts({ buttonId, key, order = 'asc' }) {

    const btnOrderName = document.getElementById(buttonId);

    btnOrderName.addEventListener('click', () => {

        const list = [...listFilterProducts].sort((a, b) => {

            if(typeof(a[key]) === 'string') {
                return order === 'asc' 
                ? a[key].localeCompare(b[key]) 
                : b[key].localeCompare(a[key]);
            }

            if(typeof(a[key]) === 'number') {
                return order === 'asc' 
                ? a[key] - b[key]
                : b[key] - a[key];
            }
            // a.name.localeCompare(b.name)
            
            // fallback de seguridad.
            return 0;
        });
        insertProducts(list);
    });
}

function init() {
    insertProducts(listFilterProducts); 
    sortProducts({buttonId: 'order-name', key: 'name', order: 'asc'});
    sortProducts({buttonId: 'order-price', key: 'price', order: 'desc'});
}

init();