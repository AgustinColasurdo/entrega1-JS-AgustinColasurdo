// Array para almacenar los productos seleccionados  
let cartItems = [];

// Función para agregar al carrito  
function addToCart(product) {  
    cartItems.push(product);  
    updateCart();  
    Swal.fire({
        title: '¡Producto agregado!',
        text: `${product.nombre} ha sido añadido al carrito.`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

// local storage  
function updateCart() {  
    const totalPrice = cartItems.reduce((total, item) => total + item.precio, 0);  
    localStorage.setItem('cartItems', JSON.stringify(cartItems));  
    localStorage.setItem('totalPrice', totalPrice);  
    displayCart();  
}

//  Mostrar el carrito en el HTML  
function displayCart() {  
    const cartItemsContainer = document.getElementById('cart-items');  
    const cartTotal = document.getElementById('cart-total');  
    cartItemsContainer.innerHTML = '';  
    
    cartItems.forEach(item => {  
        const itemElement = document.createElement('div');  
        itemElement.innerText = `- ${item.nombre}: USD ${item.precio}`;  
        cartItemsContainer.appendChild(itemElement);  
    });  

    cartTotal.innerText = `Total: USD ${localStorage.getItem('totalPrice')}`;  
}  

// Botón para vaciar carrito
function clearCart() {  
    cartItems = [];  
    localStorage.removeItem('cartItems');  
    localStorage.removeItem('totalPrice');  
    displayCart();  
    Swal.fire({
        title: 'Carrito vacío',
        text: 'Tu carrito de compras ha sido borrado.',
        icon: 'info',
        confirmButtonText: 'Aceptar'
    });
}  

// Cargar productos desde el archivo JSON y mostrarlos en el DOM
function loadProducts() {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            const productosContainer = document.getElementById('productos-container');
            data.forEach(producto => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('tarjeta');

                tarjeta.innerHTML = `
                    <h3>${producto.nombre}</h3>
                    <div class="img-container">
                        <img class="img-tienda" src="${producto.imagen}" alt="${producto.nombre}">
                    </div>
                    <p class="precio-tienda">USD ${producto.precio}</p>
                    <button class="carrito-tienda" data-id="${producto.id}">
                        <img src="/img/carritotienda.png" alt="carrito">
                    </button>
                `;

                productosContainer.appendChild(tarjeta);
            });

            // Agregar event listeners a los nuevos botones
            document.querySelectorAll('.carrito-tienda').forEach(button => {  
                button.addEventListener('click', () => {  
                    const productId = button.getAttribute('data-id');
                    const product = data.find(p => p.id == productId);
                    addToCart(product);
                });  
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar los productos. Por favor, intenta nuevamente más tarde.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        });
}

// Inicializar carrito desde localStorage si existe
function initializeCart() {
    const storedCart = localStorage.getItem('cartItems');
    const storedTotal = localStorage.getItem('totalPrice');

    if (storedCart) {
        cartItems = JSON.parse(storedCart);
    }

    displayCart();
}

// Event listener para borrar carrito
document.getElementById('clear-cart').addEventListener('click', clearCart);  

// Cargar productos al inicio
document.addEventListener('DOMContentLoaded', () => {
    initializeCart();
    loadProducts();
});