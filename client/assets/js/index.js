"strict"

$(document).ready(function () {
  let num=1
  const badge=$('.badge')
  
    
  $(".card-body").each(function() {
       
    let count=1
    const $btn=$(this).find('.btn')
    const $cardTitle=$(this).find('.card-title')
    const $cardText=$(this).find(".card-text")

    $btn.on("click", function () {
        sessionStorage.setItem('cartCount',`${num++}`)
        
        if(!sessionStorage.getItem($cardTitle.text())){
          sessionStorage.setItem($cardTitle.text(),$cardTitle.text())
          sessionStorage.setItem(`${$cardTitle.text()} Price`,$cardText.text())
          sessionStorage.setItem(`${$cardTitle.text()} Count`,`${count++}`)
        }
        else {
          sessionStorage.setItem(`${$cardTitle.text()} Count`,`${count++}`)
        }
          
    });
      

  });

  


  $("#contact-form").submit(function (e) { 
    e.preventDefault();
    
    const $contactEmail=$('#contact-email')
    const $contactMsg=$('#contact-message')
    localStorage.setItem('contact-email',$contactEmail.val())
    localStorage.setItem('msg',$contactMsg.val())
    $(this).trigger("reset")
  }) 



  $('#email-form').keydown(function(e){
    const $value=$('#FormControlInput1').val();
    if(e.key==="Enter")
    localStorage.setItem('email',$value)
    
  })

  
});