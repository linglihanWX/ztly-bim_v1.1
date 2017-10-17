$(function () {
    var hh = $("body").height();
    var h1 = $(".navbar").height();
    $(".container-fluid-full").height(hh - h1);
});