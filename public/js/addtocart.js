window.addEventListener("load", function(){
    let addCartButton = document.getElementById('addtocart');
    addCartButton.addEventListener('click', function(){
        let cart = localStorage.getItem("cart");
        let game = {
            name : document.getElementById('gameTitle').textContent,
            image : document.getElementById('primaryImage').src,
            price: document.getElementById('price').textContent,
            discount: document.getElementById('priceWithDiscount').textContent,
        };
        if(cart == null){
          let games = [];
          games.push(game);
          localStorage.setItem("cart", JSON.stringify(games));
          console.log(JSON.stringify(games));
          console.log("Product is added for the first time");
          // Redirijo al carrito
          location.href = '/cart';
        }else{
          let newcart = JSON.parse(cart);
          const resultado = newcart.find( oldgame => oldgame.name === game.name );
          if(resultado == null){
            newcart.push(game);
            localStorage.setItem("cart", JSON.stringify(newcart));
            console.log(JSON.stringify(newcart));
            console.log("Product is added");
            // Redirijo al carrito
            location.href = '/cart';
          }else{
            alert('Ya has agregado este producto al carrito anteriormente');
          }
        }
      });
    });