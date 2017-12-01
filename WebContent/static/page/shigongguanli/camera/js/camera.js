$(function () {
    var h = $("#content").height();
    var h2 = $(".breadcrumb").height();
    $("#content .row-fluid").height(h - h2);

    var h1 = $("#dailog").height();
    $(".dialogContent").height(h1-284);

    $.ajax({
        url: "static/page/shigongguanli/camera/camera.json",
        type: "get",
        dataType:"json",
        success: function (data) {
            var zTreeObj;
            var setting = {
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "pId",
                        rootPId: "0"
                    }
                },
                callback : {
                	onClick:function(event, treeId, treeNode){
                		var key =treeNode.id
                		$("#detailInfo").hide();
                		switch (key) {
						case 1:
							globalviewer.camera.setView({
							    destination : globalviewer.scene.globe.ellipsoid.cartographicToCartesian(new FreeDo.Cartographic(2.053439098657361,0.6811791843221437, 10)),
							    orientation : {
							        heading :1.2567987776128948,
							        pitch : -0.3319190858811829,
							        roll : 0.003304353957359396
							    }
							});
							break;
						case 2:
							globalviewer.camera.setView({
							    destination : globalviewer.scene.globe.ellipsoid.cartographicToCartesian(new FreeDo.Cartographic(2.053456086084953,0.6811843728487439, -7)),
							    orientation : {
							        heading :3.260955832051345,
							        pitch : 0.16918822318419835,
							        roll : 6.282788427829956
							    }
							});
							break;
						case 3:
							globalviewer.camera.setView({
							    destination : globalviewer.scene.globe.ellipsoid.cartographicToCartesian(new FreeDo.Cartographic(2.0534524337193343, 0.6811844859656465, -8)),
							    orientation : {
							        heading :1.5933147377869714,
							        pitch : 0.12883743281155224,
							        roll : 0.003310086046881544
							    }
							});
							break;
						case 5:
							globalviewer.camera.setView({
							    destination : globalviewer.scene.globe.ellipsoid.cartographicToCartesian(new FreeDo.Cartographic(2.053461477036838,0.6811808031108124, -7)),
							    orientation : {
							        heading :1.2958212837675998,
							        pitch : 0.17771974998978846,
							        roll : 0.003210361782742588
							    }
							});
							break;
						case 6:
							globalviewer.camera.setView({
							    destination : globalviewer.scene.globe.ellipsoid.cartographicToCartesian(new FreeDo.Cartographic(2.0534670873600227,0.6811801630728863, -6)),
							    orientation : {
							        heading :1.812169405041602,
							        pitch : 0.14355738002814977,
							        roll : 0.0032214481282588636
							    }
							});
							break;

						default:
							break;
						}
							
                },
                
               OnRightClick:function OnRightClick(event, treeId, treeNode) {
                $("#rMenu").show().css({
                    "left" :event.pageX,
                    "top":event.pageY
                });
            }
            }
            }
            zTreeObj = $.fn.zTree.init( $("#tree"), setting, data);
        }
    });

    CameraViewer.init("earth"); // 加载球模型
    CameraViewer.initLeftClick(globalviewer,showDiv);
    CameraViewer.initLeftDown(globalviewer,hideDiv);
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
	FreeDoUtil.dig(globalviewer,userdata2,imgarray);

    var surveymanager = new SurveyManager(globalviewer,function(){});
    /**
	 *工具栏按钮点击 
	 */
	$("#appendTools i").each(function(){
		$(this).click(function(){
			if($(this).hasClass("active")){
			//设置方法为none
			surveymanager.setSurveyType(SurveyType.NONE);
			//移除原有的监听事件
			CameraViewer.removeListener();
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
		    CameraViewer.initLeftClick(globalviewer);
		    CameraViewer.initLeftDown(globalviewer,hideDiv);
		}
		});
	});
	function hideDiv(){
		$("#detailInfo").hide();
	}
    function showDiv(picked,position){
    	if(picked){
			if(picked instanceof FreeDo.FreedoPModelFeature){
				$("#detailInfo").hide();
			}else{
				if(picked.id!=undefined&&picked.id.name.indexOf("摄像头")>-1){
					$("#detailInfo").css({
						"display":"block",
						"left":position.x - 500,
						"top":position.y - 200,
					});	
				}else{
					$("#detailInfo").hide();
				}
			}
			
		}else{
			$("#detailInfo").hide();
		}
    }
});