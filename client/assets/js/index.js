"strict"
$(document).ready(function () {
  let num=1

    const badge=$('.badge')
    
    $(".card-body").each(function() {
       
      let count=1
      const $btn=$(this).find('.btn')
      const $cardTitle=$(this).find('.card-title')

      $btn.on("click", function () {
        sessionStorage.setItem('cartCount',`${num++}`)
        
        if(!sessionStorage.getItem($cardTitle.text())){

          console.log('nothing')
          sessionStorage.setItem($cardTitle.text(),$cardTitle.text())
          sessionStorage.setItem(`${$cardTitle.text()} Count`,`${count++}`)
        }
        else {
          sessionStorage.setItem(`${$cardTitle.text()} Count`,`${count++}`)
        }
          badge.text(sessionStorage.cartCount)
        });
      

      });
});