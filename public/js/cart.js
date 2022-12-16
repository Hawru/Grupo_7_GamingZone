window.addEventListener("load", function(){
    let cart = localStorage.getItem("cart");
  if(cart == null){
      document.getElementById('emptyCart').innerHTML = "<h4>No hay productos en el carrito</h4>";
  }else{
      let totalPrice = [];
      let originalPrice = [];
    for(let i = 0; i <= cart.length; i++){
      let games = localStorage.getItem("cart");
      let games2 = JSON.parse(games);
      totalPrice.push(parseInt(games2[i].discount, 10));
      originalPrice.push(parseInt(games2[i].price, 10));
      let cartItemHtml =
      '<div class="cart-item mb-3 bg-primary-dark rounded p-3">' +
          '<div class="row">' +
            '<div class="col-12 col-md-8 d-flex align-items-center cart-item-details">' +  
              '<img src="' + games2[i].image + '" class="rounded d-inline-block me-3 cart-item-image">' +
                '<div class="cart-item-title">' + 
                  '<h4>' + games2[i].name + '</h4>' +
                  '<small class="text-muted">Version Standard</small>' +
                '</div>' +
            '</div>' +
            '<div class="col-12 col-md-4 cart-item-price d-flex align-items-center justify-content-between justify-content-md-end mt-3 mt-md-0">' +
              '<div class="cart-item-price-detail d-flex flex-row flex-md-column align-items-center text-start text-md-end">' +
                '<small class="text-muted text-decoration-line-through me-2 me-md-0"><span class="price">' + games2[i].price + '</span> USD</small>' +
                '<p class="fw-bold fs-4 mb-0"><span class="discount">' + games2[i].discount + '</span> USD</p>' +
              '</div>' + 
              '<i class="fa-solid fa-trash-can fa-2xl fs-2 mx-0 mx-md-4"></i>' +
            '</div>' + 
          '</div>' +
        '</div>';
      document.getElementById('cart-items').insertAdjacentHTML("afterbegin", cartItemHtml);
      // Calculo del total
      let total = totalPrice.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
      document.getElementById('cartTotal').innerHTML = total;
      // Calculo del subtotal
      let subtotal = originalPrice.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
      document.getElementById('cartSubtotal').innerHTML = subtotal;
      // Calculo de la suma descontada
      let cartDiscount = subtotal - total;
      document.getElementById('cartDiscount').innerHTML = cartDiscount;
    }
  }
});