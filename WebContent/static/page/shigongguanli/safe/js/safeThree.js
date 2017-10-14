$(function () {
    var hh = $("body").height();
    var h1 = $(".navbar").height();
    var h2 = $("#content>.breadcrumb").height();


    $(".container-fluid-full").height(hh - h1);
    $("#content>.row-fluid").height(hh - h1 - h2 - 17);


    $("#div1").click(function () {
        if ($("#div1").hasClass("open1")) {
            $("#div1").removeClass("open1").addClass("close1");
            $(".twoThree").html("2D");
            window.location.href ="toSafe";
        } else {
            $("#div1").removeClass("close1").addClass("open1");
            $(".twoThree").html("3D");
        }

        if ($("#div2").hasClass("open2")) {
            $("#div2").removeClass("open2").addClass("close2");
        } else {
            $("#div2").removeClass("close2").addClass("open2");
        }
    });
    $("#return").click(function () {
        window.location.href = "toSafe";
    });
    SafeThreeViewer.init("right");
    
    $(".table tbody tr").each(function(){
    	$(this).click(function(){
    		 var content = $(this).children().eq(1).text();
    		 switch (content) {
			case "7号 施工支洞":
				SafeThreeViewer.fly(-2302789.5125290914,4394545.504466071,3994804.1390350373,4.948180033446017,-0.32296400433020844,6.27981803250796);
				$("#showmsg").html("哈哈");
				$("#showmsg").css({
					"left" : "200px",
					"top" : "300px",
					"z-index" : 1
				}).show;
				break;
			case "JRXM-JCHC":
				SafeThreeViewer.fly(-2302806.194824654,4394525.992556809,3994793.2206845,5.485799808530759,-0.31219178800460123,6.2807147262061065);
				break;

			default:
				break;
			}
    	});
    });

    
});