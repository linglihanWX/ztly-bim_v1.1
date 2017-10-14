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
    SafeThreeViewer.initLeftDown(myviewer);
    SafeThreeViewer.initWheel(myviewer);
    $(".table tbody tr").each(function(){
    	$(this).click(function(){
    		 var content = $(this).children().eq(1).text();
    		 switch (content) {
			case "1号 检票口":
				SafeThreeViewer.hideAll();
				SafeThreeViewer.changeColorById([["${component} === \'" + "e1d4b546-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('red')"],["true","color('white')"]]);
				SafeThreeViewer.fly(-2302789.5125290914,4394545.504466071,3994804.1390350373,4.948180033446017,-0.32296400433020844,6.27981803250796);
				jianpiaokou1.show = true;
				break;
			case "2号 检票口":
				SafeThreeViewer.hideAll();
				SafeThreeViewer.changeColorById([["${component} === \'" + "e1cff9f0-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('red')"],["true","color('white')"]]);
				SafeThreeViewer.fly(-2302769.571507075,4394541.6335323,3994820.4549086066,2.7325935449172385,-0.44994223257041366,0.0014480323945722517);
				jianpiaokou2.show = true;
				break;
			case "3号 检票口":
				SafeThreeViewer.hideAll();
				SafeThreeViewer.changeColorById([["${component} === \'" + "e153ec20-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('red')"],["true","color('white')"]]);
				SafeThreeViewer.fly(-2302746.334969072,4394555.294376735,3994816.9482023166,0.677822324281653,-0.1332029020133727,0.0020781647901007005);
				jianpiaokou3.show = true;
				break;
			case "1号 支柱":
				SafeThreeViewer.hideAll();
				SafeThreeViewer.changeColorById([["${component} === \'" + "e1de51d2-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('orange')"],["true","color('white')"]]);
				SafeThreeViewer.fly(-2302754.4870578162,4394559.580377195,3994808.9178669956,1.0719633773482053,-0.2340351046514384,0.0029652499379491104);
				zhizhu.show = true;
				break;
			case "1号 电梯":
				SafeThreeViewer.hideAll();
				SafeThreeViewer.changeColorById([["${component} === \'" + "e1990b72-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('yellow')"],["true","color('white')"]]);
				SafeThreeViewer.fly(-2302775.4746501697,4394546.0243341895,3994812.1967581892,1.633125012044049,-0.39237765636638855,0.0035463027934925506);
				dianti.show = true;
				break;
			case "JRXM-JCHC":
				SafeThreeViewer.hideAll();
				SafeThreeViewer.changeColorById([["${component} === \'" + "e1d4b4e0-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('blue')"],["true","color('white')"]]);
				SafeThreeViewer.fly(-2302779.1769825863,4394541.303830458,3994816.530717693,1.5971906583171167,-0.44188025377956475,0.0036297696296898607);
				anjian.show = true;
				break;
			default:
				break;
			}
    	});
    });

    
});