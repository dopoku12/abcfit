$(document).ready(function () {
  const $viewCart = $('#view-cart');
  const $modelBody = $('.modal-body');

  let cartCount = 0;
  let $cartCountSpan = $(`<span id="cart-count" class="badge bg-danger"></span>`);

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


  const products = [
    {
        title: "Individual Yoga",
        price: 175,
        img:"assets/img/Client2_IndividualYoga.png",
        category: "SESSIONS"
    },
    {
        title: "Group Yoga",
        price: 75,
        img:"assets/img/Client2_GroupYoga.png",
        category: "SESSIONS"
    },
    {
        title: "Individual Pilates",
        price: 175,
        img:"assets/img/Client2_IndividualPilates.png" ,
        category: "SESSIONS"
    },
    {
        title: "Group Pilates",
        price: 75,
        img:"assets/img/Client2_GroupPilates.png" ,
        category: "SESSIONS"
    },
    {
        title: "Individual Kickboxing",
        price: 180,
        img:"assets/img/Client2_IndividualKickboxing.png",
        category: "SESSIONS"
    },
    {
        title: "Group Kickboxing",
        price: 80,
        img:"assets/img/Client2_GroupKickboxing.png",
        category: "SESSIONS"
    },
    {
        title: "T-Shirt",
        price: 15,
        img:"assets/img/Client2_TeeShirt.png",
        category: "ABC MERCHANDISE"
    },
    {
        title: "Water Bottle",
        price: 5,
        img:"assets/img/Client2_WaterBottle.png",
        category: "ABC MERCHANDISE"
    },
    {
        title: "Yoga Mat",
        price: 35,
        img:"assets/img/Client2_YogaMat.png" ,
        category: "ABC MERCHANDISE"
    }
]

//Appends products to their section
products.forEach(function (prod) { 
  let itemCount = 0;
  
  //  determines what elm to append to based on category
  const gallery = prod.category === "SESSIONS" ? "#sessions" : "#abc-merch";
  const $section = $(gallery);

  const $productDiv = $("<div>").addClass("col-12 col-sm-6 col-md-4");
  const $cardDiv = $("<div>").addClass("product card");
  const $img = $("<img>").addClass("card-img-top").attr("src", prod.img).attr("alt", prod.title);
  const $cardBodyDiv = $("<div>").addClass("card-body");
  const $title = $("<h5>").addClass("text-nowrap card-title").text(prod.title);
  const $price = $("<p>").addClass("card-text").text("$" + prod.price);
  const $button = $("<button>").addClass("btn btn-primary").html('<i class="fas fa-shopping-cart"></i> Add to Cart'); // Use .html() for icon

  $cardBodyDiv.append($title, $price, $button);
  $cardDiv.append($img, $cardBodyDiv);
  $productDiv.append($cardDiv);
  $section.append($productDiv);

  $button.click(function () { 
  cartCount++;
  // Append to View Cart button
    sessionStorage.setItem(`cartCount`,`${cartCount}`)
    const cartVal=sessionStorage.getItem('cartCount')
    $cartCountSpan.text(cartVal)
    $viewCart.append($cartCountSpan);
    
    //set storage
      itemCount++;
      
      sessionStorage.setItem(prod.title,prod.title)
      sessionStorage.setItem(`${prod.title} Price`,JSON.stringify(prod.price))
      sessionStorage.setItem(`${prod.title} itemCount`,JSON.stringify(itemCount))
      
      // Append stored items to model
      const title=sessionStorage.getItem(prod.title);
      const price=sessionStorage.getItem(`${prod.title} Price`);
      const items=sessionStorage.getItem(`${prod.title} itemCount`);
      
      if(title){
        $modelBody.append(`<h2 class="m-data-title fs-5">${title}</h2>`)
        $modelBody.append(`<p class="m-data">${price}</p>`)
        $modelBody.append(`<p class="m-price">x${items}</p><hr>`)
      }
  });



});
  
//   $(".product > .card-body").each(function () {
//     const $btn = $(this).find('.btn');
//     const $cardTitle = $(this).find('.card-title');
//     const $cardText = $(this).find(".card-text");
    
//     $btn.on("click", function () {
    
//       let sessionData = [
//         {
//           key: $cardTitle.text(),
//           value: $cardTitle.text(),
//           childElem: function(){ return $(`<h2 class="m-data-title fs-5">${this.value}</h2>`)},
//         },
//         {
//           key: `${$cardTitle.text()} Price`,
//           value: $cardText.text(),
//           childElem:function () {return $(`<p class="m-data">${this.value}</p>`)},
//         },
//         {
//           key: `${$cardTitle.text()} itemCount`,
//           value:`${itemCount}`,
//           childElem:function (){ return $(`<p class="m-price">x${this.value}</p><hr>`)},
//         },
//       ]
        
// // Append to View Cart button
//       sessionStorage.setItem(`cartCount`,`${cartCount}`)
//       const cartVal=sessionStorage.getItem('cartCount')
//       $cartCountSpan.text(cartVal)
//       $viewCart.append($cartCountSpan);
     
// // Append to Model Window 
//       sessionData.map(i=>{
//         const sessionKey=sessionStorage.key(i.value);
//         const sessionVal=sessionStorage.getItem(i.key);
//         console.log(sessionVal)
//         console.log(i.value)

//         sessionStorage.setItem(i.key,i.value)
//         if($modelBody.children().length<=0){
//             console.log('here')
//             $modelBody.append(i.childElem())
//           }
          
//       });
//     })

//   });

  $("#contact-form").submit(function (e) {
    e.preventDefault();
    const $contactEmail = $('#contact-email');
    const $contactMsg = $('#contact-message');
    localStorage.setItem('contact-email', $contactEmail.val());
    localStorage.setItem('msg', $contactMsg.val());
    $(this).trigger("reset");
  });

  $('#email-form').keydown(function (e) {
    const $value = $('#FormControlInput1').val();
    if (e.key === "Enter") {
      localStorage.setItem('email', $value);
    }
  });
});