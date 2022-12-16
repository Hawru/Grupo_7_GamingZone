// Carrito de Compras

// Sirve para obtener
localStorage.getItem("clave");

// Sirve para elimnar elemento
localStorage.removeItem("clave");

window.addEventListener("load", function(){
    if(localStorage.length == 0){
        document.getElementById('emptyCart').innerHTML = "<h4>No hay productos en el carrito</h4>"
    }
    let addCartButton = document.getElementById('addtocart');
    addCartButton.addEventListener('click', function(){
        let game = {
            name : document.getElementById('gameTitle').textContent,
            image : document.getElementById('primaryImage').src,
            price: document.getElementById('price').textContent,
            discount: document.getElementById('priceWithDiscount').textContent,
        };
        // Guardo el Producto
        localStorage.setItem("cartItem", JSON.stringify(game));
        alert('Producto agregado al carrito');
        console.log(localStorage);
        console.log(game);
    });
});