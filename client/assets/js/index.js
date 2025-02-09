"strict"
$(document).ready(function () {
  let num=1

    const badge=$('.badge')
    
    $(".card-body").each(function() {
       
      let count=0
      const $btn=$(this).find('.btn')
      const $cardTitle=$(this).find('.card-title')

      $btn.on("click", function () {
            count++
            console.log(count)
            localStorage.setItem('cartCount',`${num++}`)
            console.log($cardTitle.text());

            localStorage.setItem($cardTitle.text(),$cardTitle.text())
            

            badge.text(localStorage.cartCount)
        });
      

      });
});