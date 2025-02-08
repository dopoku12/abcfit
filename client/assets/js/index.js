"strict"
$(document).ready(function () {
    let num=0
    const cardTitle=$('.card-title').text()
    const badge=$('.badge')

    $(".btn").on("click", function () {
        num++
        console.log(num)
      console.log(badge.text(num))
    });
});