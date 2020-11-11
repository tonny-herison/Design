$(document).ready(function(){
    let sec = $("div.seconde");
    let min = $("div.minute");
    let hr = $("div.heure");

    $("#alarm").show();

    let is = 0, im = 0, ih = 0;
    setInterval(() => {
        let d = new Date();
        let h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
        
        let rs = s*6 + (is*360) - 90, 
            rm = (m + (s / 60))* 6 + (im*360) - 90, 
            rh = (h + (m / 60)) * 30 + (ih * 360) - 90;
        sec.css({"transform" : "rotate(" + rs + "deg)"})
        min.css({"transform" : "rotate(" + rm + "deg)"})
        hr.css({"transform" : "rotate(" + rh + "deg)"})
        
        if (h == 23) {
            if (m == 59){
                if (s == 59){
                    is++;
                    im++;
                    ih++;
                }
            }
        } else if (m == 59) {
            if (s == 59){
                is++;
                im++;
            }
        } else if (s == 59) is++;
    }, 1000);

})

$(document).on("click", ".alarm-switch", function () { $(this).toggleClass("active"); })

$(document).on("click", ".tab-item a", function (e) {
    e.preventDefault();
    let targ = $(this).attr("data-target");

    for (let i = 0; i < $(".tab-item").length; i++) 
        $(".tab-item").eq(i).children().removeClass("active");

    $(this).addClass("active");

    $(".tab-content").hide();
    $("#" + targ).show();
})