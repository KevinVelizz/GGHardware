let products = [];
let cart = [];
let listFilterProducts = [];
const listProducts = document.getElementById('list-products');
const btnOrderPrice = document.getElementById('order-price');

////////////////////////////////
// Obtener productos////////////
const url = "http://localhost:3000/api/products"; // Guardamos en una variable la url de nuestro endpoint


async function getProducts() {
    try {

        const result = await fetch(url); // Hacemos una peticion a nuestro endpoint en http://localhost:3000/api/products

        const data = await result.json();

        console.log(data); // Nuestros productos estan disponibles dentro de payload { payload: }
        
        if(data.ok) {
            products = data.payload;
            insertProducts(products);
            listFilterProducts = [...products];
        }

    }catch(error) {

        console.error(error);
    }
}

function insertProducts(list) {

    let htmlList = ""

    list.forEach(product => {

        htmlList += `
                <div class="card product" data-product-id="${product.id}">
                    <img src="http://localhost:3000/img/${product.image}" alt="imagen del producto">
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
    getProducts();
    insertProducts(listFilterProducts); 
    sortProducts({buttonId: 'order-name', key: 'name', order: 'asc'});
    sortProducts({buttonId: 'order-price', key: 'price', order: 'desc'});
}

init();