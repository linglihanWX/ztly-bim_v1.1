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
    SafeThreeViewer.init("earth");
  //挖坑
	var userdata2 =[
		[				
			{lon:117.65370327140586,lat: 39.029343874668385,height:0},
			{lon:117.6566555867564,lat: 39.02867680988919,height:0},
			{lon:117.65629167680271,lat: 39.027734051441556,height:0},
			{lon:117.65337309822137,lat: 39.028390137191195,height:0}
		],

		[
			{lon:117.65370327140586,lat: 39.029343874668385,height:-15},
			{lon:117.6566555867564,lat: 39.02867680988919,height:-13},
			{lon:117.65629167680271,lat: 39.027734051441556,height:-20},
			{lon:117.65337309822137,lat: 39.028390137191195,height:-15}
		],

		[
			{lon:117.65370327140586,lat: 39.029343874668385,height:-27},
			{lon:117.6566555867564,lat: 39.02867680988919,height:-33},
			{lon:117.65629167680271,lat: 39.027734051441556,height:-26},
			{lon:117.65337309822137,lat: 39.028390137191195,height:-22}
		],
		[
			{lon:117.65370327140586,lat: 39.029343874668385,height:-50},
			{lon:117.6566555867564,lat: 39.02867680988919,height:-50},
			{lon:117.65629167680271,lat: 39.027734051441556,height:-50},
			{lon:117.65337309822137,lat: 39.028390137191195,height:-50}
		]
]
	var imgarray = [
		"static/page/shigongguanli/dungou/img/Land001.jpg",
		"static/page/shigongguanli/dungou/img/Land002.jpg",
		"static/page/shigongguanli/dungou/img/Land004.jpg"
	];
	FreeDoUtil.dig(myviewer,userdata2,imgarray);

    myviewer.camera.setView({
		destination :new FreeDo.Cartesian3(-2302833.762201284,4394746.398731597,3994809.016901712),
		orientation: {
			heading : 0.26411536311211936,
			pitch : -0.8723260495776195,
			roll : 0.0013380152154160996
		}
	});
    SafeThreeViewer.initLeftClick(myviewer);
    SafeThreeViewer.initWheel(myviewer);
    var surveymanager = new SurveyManager(myviewer,function(){});
    $(".table tbody tr").each(function(){
    	$(this).click(function(){
    		 var content = $(this).children().eq(1).text();
    		 switch (content) {
			case "1号 检票口":
				SafeThreeViewer.hideAll();
				SafeThreeViewer.changeColorById([["${component} === \'" + "e1d4b546-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('red')"],["true","color('white')"]]);
				SafeThreeViewer.fly(-2302781.210462128,4394527.465339555,3994786.3773927097,4.9481761281998295,-0.32295882697450473,6.279817679450293);
				jianpiaokou1.show = true;
				break;
			case "2号 检票口":
				SafeThreeViewer.hideAll();
				SafeThreeViewer.changeColorById([["${component} === \'" + "e1cff9f0-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('red')"],["true","color('white')"]]);
				SafeThreeViewer.fly(-2302761.9001590554,4394525.5047848765,3994805.2561517092,2.9085377702397195,-1.0744022576651129,0.0015829053559963668);
				jianpiaokou2.show = true;
				break;
			case "3号 检票口":
				SafeThreeViewer.hideAll();
				SafeThreeViewer.changeColorById([["${component} === \'" + "e153ec20-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('red')"],["true","color('white')"]]);
				SafeThreeViewer.fly(-2302741.4530094187,4394529.079408744,3994807.0568853244,4.154261415377306,-0.4556864318007472,6.280086267404272);
				jianpiaokou3.show = true;
				break;
			case "1号 支柱":
				SafeThreeViewer.hideAll();
				SafeThreeViewer.changeColorById([["${component} === \'" + "e1de51d2-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('orange')"],["true","color('white')"]]);
				SafeThreeViewer.fly(-2302744.3035816317,4394539.631661994,3994794.7172497814,1.5327119344899538,-0.2340259547101724,0.0033731774571332807);
				zhizhu.show = true;
				break;
			case "1号 电梯":
				SafeThreeViewer.hideAll();
				SafeThreeViewer.changeColorById([["${component} === \'" + "e1990b72-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('yellow')"],["true","color('white')"]]);
				SafeThreeViewer.fly(-2302764.0824318035,4394530.02625459,3994794.7799485787,1.4083403432488222,-0.348331131411735,0.003447906856028027);
				dianti.show = true;
				break;
			case "JRXM-JCHC":
				SafeThreeViewer.hideAll();
				SafeThreeViewer.changeColorById([["${component} === \'" + "e1d4b4e0-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('blue')"],["true","color('white')"]]);
				SafeThreeViewer.fly(-2302788.2561917696,4394521.5585276205,3994801.234994364,4.809505009659519,-0.7253428677923317,6.278816722205928);
				anjian.show = true;
				break;
			default:
				break;
			}
    	});
    });
	/**
	 *工具栏按钮点击 
	 */
	$("#appendTools i").each(function(){
		$(this).click(function(){
			if($(this).hasClass("active")){
			//设置方法为none
			surveymanager.setSurveyType(SurveyType.NONE);
			//移除原有的监听事件
			SafeThreeViewer.removeListener();
			//初始化相应的监听事件
			switch ($(this).attr("id")) {
			//统计查询
			case "TJCX":
				$("#img").hide();
				surveymanager.setSurveyType(SurveyType.QUERY)
				break;
			//距离测量
			case "JLCL":
				$("#echartarea").hide();
				$("#img").hide();
				surveymanager.setSurveyType(SurveyType.LINE_DISTANCE);
				break;
			//方位测量
			case "FWCL":
				$("#echartarea").hide();
				$("#img").hide();						
				surveymanager.setSurveyType(SurveyType.Azimuth_DISTANCE);
				break;
			//面积测量
			case "MJCL":
				$("#echartarea").hide();
				$("#img").hide();					
				break;
			//地面刨切
			case "DMPQ":
				$("#echartarea").hide();					
				surveymanager.setSurveyType(SurveyType.Geology_SLICING);
				break;
			//其他
			default:
				break;
			}
		}else{
			//隐藏echarts和img窗口
			$("#echartarea").hide();
			$("#img").hide();
			//删除三维页面所有的线、标签
			
			//设置方法为none
			surveymanager.setSurveyType(SurveyType.NONE);
			//初始化原有的监听事件
			SafeThreeViewer.initLeftClick(myviewer);
		}
		});
	});
    
});