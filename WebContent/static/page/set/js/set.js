$(function () {
    $(".breadcrumb li").eq(0).click(function () {
        // window.history.back();
        if(document.referrer == ""){
            window.location.href = "index.html";
        }else{
            window.history.go(-1);

        }
    });
});