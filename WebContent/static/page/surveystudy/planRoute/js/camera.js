$(function () {
    var h = $("#content").height();
    var h2 = $(".breadcrumb").height();
    $("#content .row-fluid").height(h - h2);

    var h1 = $("#dailog").height();
    $(".dialogContent").height(h1-284);

    CameraViewer.init("init"); // 加载球模型
    CameraViewer.initLeftClick(globalviewer);
});