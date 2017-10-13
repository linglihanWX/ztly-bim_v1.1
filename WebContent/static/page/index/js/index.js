$(function () {
    var h1 = $(document).height();
    var h2 = $(".navbar").height();
    var h3 = $("footer").height();
    $("#aaa").height(h1-h2-h3-20);
    $("footer").show();
});