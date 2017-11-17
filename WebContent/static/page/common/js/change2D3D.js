$(function () {
    $("#div1").click(function () {
        if ($("#div1").hasClass("open1")) {
            $("#div1").removeClass("open1").addClass("close1");
            $(".twoThree").html("2D");
            $(".table").show();
            $("#tree").hide();
            $("#earth").hide();
            $(".detailInfo").hide();
            $(".row-fluid .span12").width(100 + "%");
            $(".box-header").show();
            $("#DataTables_Table_0_wrapper .row-fluid").show();
            $(".msgInfo").hide();
            $("#tableInfo").hide();
        } else {
            $("#div1").removeClass("close1").addClass("open1");
            $(".twoThree").html("3D");
            $(".table").hide();
            $("#tree").show();
            $("#earth").show();
            $(".row-fluid .span12").width(15 + "%");
            $(".box-header").hide();
            $("#DataTables_Table_0_wrapper .row-fluid").hide();
        }

        if ($("#div2").hasClass("open2")) {
            $("#div2").removeClass("open2").addClass("close2");
        } else {
            $("#div2").removeClass("close2").addClass("open2");
        }
    });
   
});