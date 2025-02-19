$(document).ready(function () {
  let cartCount = 0;
  const $viewCart = $('#view-cart');
  let $cartCountSpan = $(`<span id="cart-count" class="badge bg-danger"></span>`);

  const $modelBody = $('.modal-body');

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


  $(".product > .card-body").each(function () {
    let itemCount = 0;
    const $btn = $(this).find('.btn');
    const $cardTitle = $(this).find('.card-title');
    const $cardText = $(this).find(".card-text");
    
    $btn.on("click", function () {
      cartCount++;
      itemCount++;
    
    let sessionData = [
      {
        key: $cardTitle.text(),
        value: $cardTitle.text(),
        childElem: $(`<h2 class="m-data-title fs-5"></h2>`),
      },
      {
        key: `${$cardTitle.text()} Price`,
        value: $cardText.text(),
        childElem: $(`<p class="m-data"></p>`),
      },
      {
        key: `${$cardTitle.text()} itemCount`,
        value: `${itemCount}`,
        childElem: $(`<p class="m-price"></p><hr>`),
      },
    ]
        
    
// Append to View Cart button
      sessionStorage.setItem(`cartCount`,`${cartCount}`)
      const cartVal=sessionStorage.getItem('cartCount')
      $cartCountSpan.text(cartVal)
      $viewCart.append($cartCountSpan);

      sessionData.map(i=>{
        sessionStorage.setItem(i.key,i.value)
        const sessionKey=sessionStorage.key(i.value)
        const sessionVal=sessionStorage.getItem(i.key)
        i.childElem.text(sessionVal)
        $modelBody.append(i.childElem)
      });
    })

  });

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