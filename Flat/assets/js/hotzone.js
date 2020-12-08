$(document).on("click", ".content", function (e) {
    if ($(".text p").css("opacity") === "0") {
        $(".text p").css("opacity", 1);
        $(".white").css("width", "0%");
        $(".blue").css("width", "100%");
        $(".text").css("color", "white");
    } else {
        $(".text p").css("opacity", 0);
        $(".white").css("width", "57%");
        $(".blue").css("width", "0%");
        $(".text").css("color", "#444444");
    }
    
})