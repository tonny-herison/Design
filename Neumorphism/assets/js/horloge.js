var playing = false;
var time = 0;
var handletimer;
var num_inter = 1;

$(document).ready(function(){
    let sec = $("div.seconde");
    let min = $("div.minute");
    let hr = $("div.heure");

    $("#alarm").show();

    let is = 0, im = 0, ih = 0;
    // Clock
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

        // Timezone World Clock
        $('.country-list ul li[data-country="Tana"] .country-time').html(moment().tz("Europe/Moscow").format("HH : mm"));
        $('.country-list ul li[data-country="Paris"] .country-time').html(moment().tz("Europe/Paris").format("HH : mm"));
        $('.country-list ul li[data-country="Los Angeles"] .country-time').html(moment().tz("America/Los_Angeles").format("HH : mm"));
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

$(document).on("click", ".play-bar .play-timer", function (e) {
    if (playing) {
        $(this).children().eq(0).addClass("lni-play");
        $(this).children().eq(0).removeClass("lni-pause");
    } else {
        $(this).children().eq(0).addClass("lni-pause");
        $(this).children().eq(0).removeClass("lni-play");
    }

    playing = !playing;

    // Timer
    if (playing) {
        handletimer = setInterval(() => {
            let rot = time * 360 / 6000;
            $(".aiguille").css({ "transform" : "rotate(" + rot + "deg)" });
            let min = Math.floor((time / 6000) % 60);
            let sec = Math.floor((time / 100) % 60);
            let ms = time % 100;
            $(".timer-time").html(format(min) + ":" + format(sec) + "." + format(ms))
            time+=1;
        }, 10);
    }
    else{
        clearInterval(handletimer);
    }
    
})

$(document).on("click", ".play-bar .reset-timer", function (e) {
    time = 0;
    playing = false;
    num_inter = 1;
    
    $(".play-bar .play-timer").children().eq(0).addClass("lni-play");
    $(".play-bar .play-timer").children().eq(0).removeClass("lni-pause");

    $(".timer-time").html("00:00.00")
    if (handletimer) clearInterval(handletimer);

    $(".aiguille").css({ "transform" : "rotate(0deg)" });

    $(".timer-list ul").html("");
})

$(document).on("click", ".play-bar .save-timer", function (e) {
    let min = Math.floor((time / 6000) % 60);
    let sec = Math.floor((time / 100) % 60);
    let ms = time % 100;

    let content = '<li>' +
                    '<span class="timer-title">Itervalle ' + num_inter + '</span>' +
                    '<span class="timer-value">' + format(min) + ':' + format(sec) +'.' + format(ms) + '</span>' +
                '</li>'
    $(".timer-list ul").append(content);

    num_inter++;
})

let format = function (n) {
    if (n<10) return '0' + n;
    return n;
}