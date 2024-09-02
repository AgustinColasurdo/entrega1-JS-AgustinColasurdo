// Array para almacenar los productos seleccionados  
let cartItems = [];  

// Función para agregar al carrito  
function addToCart(product) {  
    cartItems.push(product);  
    updateCart();  
}  

// local storage  
function updateCart() {  
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);  
    localStorage.setItem('cartItems', JSON.stringify(cartItems));  
    localStorage.setItem('totalPrice', totalPrice);  
    displayCart();  
}  

//  mostrar el carrito en el HTML  
function displayCart() {  
    const cartItemsContainer = document.getElementById('cart-items');  
    const cartTotal = document.getElementById('cart-total');  
    cartItemsContainer.innerHTML = '';  
    
    // Aca necesite ayuda con este funcion flecha (a repasar)
    cartItems.forEach(item => {  
        const itemElement = document.createElement('div');  
        itemElement.innerText = `- ${item.name}: USD ${item.price}`;  
        cartItemsContainer.appendChild(itemElement);  
    });  

    cartTotal.innerText = `Total: USD ${localStorage.getItem('totalPrice')}`;  
}  

// Boton para vaciar carrito
function clearCart() {  
    cartItems = [];  
    localStorage.removeItem('cartItems');  
    localStorage.removeItem('totalPrice');  
    displayCart();  
}  

// Event listener para los botones de la tienda
document.querySelectorAll('.carrito-tienda').forEach((button, index) => {  
    button.addEventListener('click', () => {  
        const product = {  
            name: document.querySelectorAll('.tarjeta h3')[index].innerText,  // Nombre del producto  
            price: parseFloat(document.querySelectorAll('.precio-tienda')[index].innerText.replace('USD ', '')) // Precio  
        };  
        addToCart(product);  
    });  
});  

// Event listener para borrar carrito
document.getElementById('clear-cart').addEventListener('click', clearCart);  