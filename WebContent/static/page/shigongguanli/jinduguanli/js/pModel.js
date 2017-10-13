$(function () {
    var hh = $(document).height();
    var h = $(".container-fluid-full").height();
    var h1 = $("#content .breadcrumb").height();
    var h2 = $(".navbar").height();
    $("#sidebar-left").height(hh - h2);
    $(".row-fluid").height(h - h1 - 15);
});