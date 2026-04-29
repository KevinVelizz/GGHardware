/*********************************
 * VARIABLES GLOBALES
 *********************************/
let products = [];
let cart = [];
let listFilterProducts = [];
document.body.style.overflow = "hidden";

/*********************************
 * ELEMENTOS DOM
 *********************************/
const listProducts = document.getElementById('list-products');
const btnOrderPrice = document.getElementById('order-price');


const badge = document.getElementById('cart-badge');
const dropdown = document.getElementById('cart-dropdown');
const itemsList = document.getElementById('cart-items');
const cartBtn = document.getElementById('cart-btn');
const btnEmptyCart = document.querySelector('.btn-empty-cart');
const btnFinishBuy = document.querySelector('.btn-finish-buy');
const total = document.querySelector('.total');

/*********************************
 * MODAL NOMBRE
 *********************************/
const modal = document.getElementById("name-modal");
const formA = document.getElementById("name-form");
const input = document.getElementById("username-input");
const errorMsg = document.getElementById("error-msg");

const userName = document.querySelector('.user-name');

const user = localStorage.getItem('username'); 

const desktopUser = document.querySelector(".nav-links .user-name");
const mobileUser = document.querySelector(".mobile-menu-links .user-name");

/*********************************
 * MODALES COMPRA
 *********************************/
const checkoutModal = document.getElementById("checkout-modal");
const successModal = document.getElementById("success-modal");

const confirmBuyBtn = document.getElementById("confirm-buy");
const cancelBuyBtn = document.getElementById("cancel-buy");
const successOkBtn = document.getElementById("success-ok");

/*********************************
 * USUARIO
 *********************************/
function renderUserName() {
    if (!user) return;

    desktopUser.textContent = user;
    mobileUser.textContent = user;
}

document.addEventListener("DOMContentLoaded", () => {
    const cartStorage = localStorage.getItem("cart");
    if (cartStorage) {
        cart = JSON.parse(cartStorage);
    }
    renderCart();
});

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

dropdown.addEventListener("click", (e) => {
    const finishBtn = e.target.closest(".btn-finish-buy");
    if (!finishBtn) return;

    if (cart.length === 0) return;

    checkoutModal.classList.remove("hidden");
    checkoutModal.classList.add("active");
    document.body.classList.add("no-scroll");
});

cancelBuyBtn.addEventListener("click", () => {
    checkoutModal.classList.add("hidden");
    document.body.classList.remove("no-scroll");
});

confirmBuyBtn.addEventListener("click", () => {
    checkoutModal.classList.add("hidden");
    successModal.classList.remove("hidden");
    successModal.classList.add('active');
    document.body.classList.remove("no-scroll");
});


successOkBtn.addEventListener("click", () => {
    // Cerrar modal éxito
    successModal.classList.add("hidden");
    successModal.classList.remove("active");

    // Reset usuario
    localStorage.removeItem("username");

    desktopUser.textContent = "";
    mobileUser.textContent = "";
    userName.textContent = "";
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    let y = 10;
    doc.setFontSize(16);

    doc.text("GGHardware-ticket de compra: ", 10, y);

    y += 10;

    doc.setFontSize(12);

    cart.forEach(product => {
        
        doc.text(`${product.name} - ${product.price}`, 10, y);

        y += 7;
    });

    doc.text(`${total.textContent}`, 10, y);

    doc.save('ticket.pdf');

    cart = [];
    dropdown.style.display = 'none';
    renderCart();

    // Reset scroll
    document.body.classList.remove("no-scroll");
    document.body.style.overflow = "hidden";

    // Reabrir modal nombre correctamente
    modal.style.display = "flex";
    modal.classList.add("active");

    input.value = "";
    input.focus();
});

// Open and closed cart 
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("close-menu");

menuBtn.addEventListener("click", () => {
    dropdown.classList.toggle('hidden');
    mobileMenu.classList.remove("hidden");
    document.body.classList.add("no-scroll");
});

closeMenu.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    dropdown.classList.toggle('hidden');
    document.body.classList.remove("no-scroll");
});


///////////////////////////
// get products////////////
//const url = "https://gghardware-production.up.railway.app/api/products"; // Guardamos en una variable la url de nuestro endpoint
const url = "http://localhost:8080/api/products";


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
        const result = await fetch('/data/products.json');
        const data = await result.json();
        products = data;
        insertProducts(products);
        listFilterProducts = [...products];
    }
}

function insertProducts(list) {

    let htmlList = ""

    list.forEach(product => {

        let overlayHTML = "";
        let buttonHTML = "";

        // Producto desactivado
        if (!product.active) {
            overlayHTML = `<div class="overlay">NO DISPONIBLE</div>`;
        }
        // Producto sin stock
        else if (product.stock <= 0) {
            overlayHTML = `<div class="overlay">SIN STOCK</div>`;
        }
        // Producto disponible
        else {
            buttonHTML = `
                <button class="btn">
                    <ion-icon class="icon-add-cart" name="cart-outline"></ion-icon>
                    Agregar al carrito
                </button>`;
        }

        htmlList += `
            <li class="card product" data-product-id="${product.id}">
                
                <div class="image-container">
                    <img src="../img/${product.image}" alt="imagen del producto">
                    ${overlayHTML}
                </div>

                <p class="card-name">${product.name}</p>
                <p class="card-description">${product.description}</p>
                <p class="card-price">$${product.price}</p>
                ${buttonHTML}

            </li>`;
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
    
    addToCart(productSelect);
});


function addToCart(product) {
    const item = cart.find(p => p.id === product.id);

    if (item) {
        if (item.quantity < product.stock) {
        item.quantity++;
        }
    } else {
        cart.push({
        ...product,
        quantity: 1
        });
    }

    saveCart();
    renderCart();
    console.log(cart);
}

function decreaseProduct(productId) {
    const item = cart.find(p => p.id === productId);
    if (!item) return;

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(p => p.id !== productId);
    }
    saveCart();
    renderCart();
}

function renderCart() {
    itemsList.innerHTML = '';

    if (cart.length === 0) {
        itemsList.innerHTML = `
        <li class="empty-cart">Carrito vacío</li>
        `;
        badge.textContent = 0;
        btnEmptyCart.style.display = 'none';
        btnFinishBuy.style.display = 'none';
        total.style.display = 'none';
        itemsList.style.paddingRight = "0";
        return;
    }

    btnEmptyCart.style.display = 'flex';
    btnFinishBuy.style.display = 'flex';
    itemsList.style.paddingRight = "2rem";
    
    // badge = total de unidades
    badge.textContent = cart.reduce((acc, p) => acc + p.quantity, 0);
    badge.style.display = 'flex';

    cart.forEach(p => {
        const li = document.createElement('li');
        li.classList.add('cart-item');

        console.log(typeof(p.price));

        li.innerHTML = `
            <img src="../img/${p.image}" alt="${p.name}">
            <span class="cart-name">${p.name}</span>
            <span class="cart-price">$${p.price}</span>
        
            <div class="cart-controls">
                <button class="btn-decrease">−</button>
                <span class="cart-qty">${p.quantity}</span>
                <button class="btn-increase">+</button>
            </div>
        `;

        li.querySelector('.btn-increase').addEventListener('click', () => {
        addToCart(p);
        });

   
        li.querySelector('.btn-decrease').addEventListener('click', () => {
        decreaseProduct(p.id);
        });

        itemsList.appendChild(li);
    });

    const totalAmount = cart.reduce((acc, p) => {
        return acc + (p.price * p.quantity);
    }, 0);

    total.style.display = 'block';
    total.textContent = `Total: $${totalAmount}`;
    console.log(total.textContent);
}

function decreaseProduct(productId) {
    const item = cart.find(p => p.id === productId);
    if (!item) return;

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(p => p.id !== productId);
    }
    saveCart(); 
    renderCart();
}


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


////////////////////////////////////////
//////////// empty cart ////////////////

btnEmptyCart.addEventListener('click', () => {

    cart = [];
    saveCart();
    renderCart();
    btnEmptyCart.style.display = 'none';

});


cartBtn.addEventListener('click', (e) => {
  e.preventDefault();
  dropdown.classList.toggle('hidden');
});

///////////////////////////////////
//////////// modal ////////////////

function openModal() {
    modal.style.display = "flex";
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    input.focus();
}


// Mostrar modal si no hay nombre
function modalName() {
    let savedName = localStorage.getItem("username");

    if (!savedName) {
        openModal();
    } else {
        
        userName.textContent = localStorage.getItem("username");
        closeModal(true);
    }
}

// Cerrar modal con animación
function closeModal(skipAnimation = false) {
    if (skipAnimation) {
        modal.style.display = "none";
    } else {
        modal.classList.remove("active");
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
    document.body.style.overflow = "auto";
}

// Submit accesible
formA.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = input.value.trim();

    if (name === "") {
        errorMsg.classList.remove("hidden");
        input.focus();
        return;
    }

    localStorage.setItem("username", name);
    userName.textContent = name;
    closeModal();
});


function init() {
    getProducts();
    insertProducts(listFilterProducts); 
    renderCart();
    sortProducts({buttonId: 'order-name', key: 'name', order: 'asc'});
    sortProducts({buttonId: 'order-price', key: 'price', order: 'desc'});
    renderUserName();
    modalName();
}

init();