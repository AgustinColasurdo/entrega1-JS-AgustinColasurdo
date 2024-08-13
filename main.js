function compra() {  
    const carrito = [];  
    let contador = 0;  // Variable para contar los productos  

    while (true) {  
        let productos = prompt("Escriba los productos que desea llevar (o deje vacío para finalizar): ");  

        if (productos) {  
            carrito.push(productos);  
            contador++;  // Incrementar el contador por cada producto agregado  

            // Verificar si ya se han agregado 5 productos  
            if (contador === 5) {  
                alert("¡Felicidades! Ha obtenido un 10% de descuento.");  
            }  
        } else {  
            if (confirm("¿Desea volver a elegir productos?")) {  
                continue;  
            } else {  
                break;   
            }  
        }  
    }  

    console.log("Productos en el carrito:", carrito);  
}  

compra();  