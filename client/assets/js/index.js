$(document).ready(function () {
  const httpRequest = async function (method, endPoint, storageData) {
    $.ajax({
      url: endPoint,
      type: method,
      data: storageData,
      dataType: "dataType",
      success: function (response) {
        console.log(response);
      },
      error: function (xhr, status, error) {
        console.error(status, error);
      }
    });
  };

  const $viewCart = $('#view-cart');
  const $modelBody = $('.modal-body');

  let cartCount = parseInt(sessionStorage.getItem('cartCount')) || 0;
  let $cartCountSpan = $(`<span id="cart-count" class="badge bg-danger"></span>`);
  $cartCountSpan.text(cartCount);
  if (cartCount > 0) {
    $viewCart.append($cartCountSpan);
  }

  const products = [
    { title: "Individual Yoga", price: 175, img: "assets/img/Client2_IndividualYoga.png", category: "SESSIONS" },
    { title: "Group Yoga", price: 75, img: "assets/img/Client2_GroupYoga.png", category: "SESSIONS" },
    { title: "Individual Pilates", price: 175, img: "assets/img/Client2_IndividualPilates.png", category: "SESSIONS" },
    { title: "Group Pilates", price: 75, img: "assets/img/Client2_GroupPilates.png", category: "SESSIONS" },
    { title: "Individual Kickboxing", price: 180, img: "assets/img/Client2_IndividualKickboxing.png", category: "SESSIONS" },
    { title: "Group Kickboxing", price: 80, img: "assets/img/Client2_GroupKickboxing.png", category: "SESSIONS" },
    { title: "T-Shirt", price: 15, img: "assets/img/Client2_TeeShirt.png", category: "ABC MERCHANDISE" },
    { title: "Water Bottle", price: 5, img: "assets/img/Client2_WaterBottle.png", category: "ABC MERCHANDISE" },
    { title: "Yoga Mat", price: 35, img: "assets/img/Client2_YogaMat.png", category: "ABC MERCHANDISE" }
  ];

  products.forEach(function (prod) {
    const gallery = prod.category === "SESSIONS" ? "#sessions" : "#abc-merch";
    const $section = $(gallery);
    const $productDiv = $("<div>").addClass("col-12 col-sm-6 col-md-4");
    const $cardDiv = $("<div>").addClass("product card");
    const $img = $("<img>").addClass("card-img-top").attr("src", prod.img).attr("alt", prod.title);
    const $cardBodyDiv = $("<div>").addClass("card-body");
    const $title = $("<h5>").addClass("text-nowrap card-title").text(prod.title);
    const $price = $("<p>").addClass("card-text").text("$" + prod.price);
    const $button = $("<button>").addClass("btn btn-primary").html('<i class="fas fa-shopping-cart"></i> Add to Cart');
    $cardBodyDiv.append($title, $price, $button);
    $cardDiv.append($img, $cardBodyDiv);
    $productDiv.append($cardDiv);
    $section.append($productDiv);

    $button.click(function () {
      cartCount++;
      sessionStorage.setItem('cartCount', cartCount);
      $cartCountSpan.text(cartCount);
      $viewCart.append($cartCountSpan);

      let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || {};
      if (cartItems[prod.title]) {
        cartItems[prod.title].count++;
      } else {
        cartItems[prod.title] = { product: prod, count: 1 };
      }
      sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateCartModal($modelBody);
    });
  });

  function updateCartModal($modalBody) {
    $modalBody.empty();
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || {};

    for (const itemName in cartItems) {
      const item = cartItems[itemName];
      const product = item.product;
      const itemDiv = $("<div>").addClass("cart-item");
      const imgElm = $("<img>").attr("src", product.img).attr("alt", product.title).addClass("cart-item-image");
      const titleElm = $("<h2>").addClass("m-data-title fs-5").text(product.title);
      const priceElm = $("<p>").addClass("m-data").text("$" + product.price);
      const itemsElm = $("<p>").addClass("m-price").text("x" + item.count);
      const removeButton = $("<button>").addClass("btn btn-danger btn-sm remove-item").text("Remove");

      removeButton.click(function () {
        removeItemFromCart(product.title);
      });

      itemDiv.append(imgElm, titleElm, priceElm, itemsElm, removeButton);
      $modalBody.append(itemDiv);
    }
  }

  function removeItemFromCart(itemName) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || {};
    if (cartItems[itemName]) {
      delete cartItems[itemName];
      sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateCartModal($modelBody);

      let cartCount = 0;
      for (const item in cartItems) {
        cartCount += cartItems[item].count;
      }
      sessionStorage.setItem('cartCount', cartCount);
      $cartCountSpan.text(cartCount);
      if (cartCount === 0) {
        $cartCountSpan.remove();
      }
    }
  }

  $('#clear').click(function (e) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || {};
    if (Object.keys(cartItems).length === 0) {
      alert("Your cart is empty. There are no items to clear.");
    } else {
      sessionStorage.removeItem('cartItems');
      sessionStorage.removeItem('cartCount');
      $cartCountSpan.remove();
      $modelBody.empty();
      cartCount = 0;
      alert("Your cart has been cleared.");
    }
  });

  $('#process').click(function (e) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || {};
    if (Object.keys(cartItems).length === 0) {
      alert("Your cart is empty. There are no items to process.");
    } else {
      sessionStorage.removeItem('cartItems');
      sessionStorage.removeItem('cartCount');
      $cartCountSpan.remove();
      $modelBody.empty();
      cartCount = 0;
      alert("Thank you for your order!");
    }
  });

  $("#contact-form").submit(function (e) {
    e.preventDefault();
    const $contactEmail = $('#contact-email');
    const $contactMsg = $('#contact-message');
    if ($contactEmail.val().trim() === "" || $contactMsg.val().trim() === "") {
      alert("Please fill in all fields.");
    } else {
      localStorage.setItem('contact-email', $contactEmail.val());
      localStorage.setItem('msg', $contactMsg.val());
      $(this).trigger("reset");
      alert("Your message has been sent!");
    }
  });

  $('#email-form').keydown(function (e) {
    const $value = $('#FormControlInput1').val();
    if (e.key === "Enter") {
      if ($value.trim() === "") {
        alert("Please enter an email address.");
      } else {
        localStorage.setItem('email', $value);
        alert("Thank you for subscribing with " + $value + "!");
        $('#FormControlInput1').val("");
      }
    }
  });

  updateCartModal($modelBody); // Call on page load
});