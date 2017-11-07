$(function () {
    let workShow = {};
    let currBtn = "zy";
    var savedata = null;
    var color1 = new FreeDo.Color(1,1,1,0.9);
	var color2 = new FreeDo.Color(2,1,1,0.9);
	var color3 = new FreeDo.Color(1,2,1,0.9);
	var color4 = new FreeDo.Color(1,1,2,0.9);
    workShow.InitTree = function (treeData) {
        // 初始化树
    	savedata = treeData[0];
    	currBtn = $('.active').attr("class");
        $("#tree").tree({
            data: treeData,
            onSelect: function (node) {
                workShow.selectedNode = node;
                if (node.type == 2){
                	$(".msgInfo").hide();
                	 currBtn = $('.active').attr("class");
                     if (currBtn.indexOf("zy") != -1) {
                    	 clickColor=color1;
                     	$(".information").html(node.text+"<br>施工许可号：13431<br>"+"施工单位：北京XX建筑有限公司");
                     }else
                     if (currBtn.indexOf("jd") != -1) {
                    	 clickColor=color2;
                     	$(".information").html(node.text+"<br>状态：良好<br>"+"监管人：李XX");
                     }else
                     if (currBtn.indexOf("aq") != -1) {
                    	 clickColor=color3;
                     	$(".information").html(node.text+"<br>开始时间：2017-10-05<br>"+"结束时间：2018-05-03");
                     }else if (currBtn.indexOf("dz") != -1) {
                    	 clickColor=color4;
                     	$(".information").html(node.text+"<br>用量：134<br>"+"成本：1000");
                     }else{
                     	$(".information").html(node.text);
                     }
                    FreeDoEarth.flyToModel(node.id,divfollow); 
                   
                }
                else {
                    let subNodes = $("#tree").tree("getChildren", node.target);
                    let nodeIds = [];
                    for (let i = 0; i < subNodes.length; i++) {
                        if (subNodes[i].type == 2)
                            nodeIds.push(subNodes[i].id);
                    }
                    currBtn = $('.active').attr("class");
                    if (currBtn.indexOf("zy") != -1) {
                   	 clickColor=color1;
                    }else
                    if (currBtn.indexOf("jd") != -1) {
                   	 clickColor=color2;
                    }else
                    if (currBtn.indexOf("aq") != -1) {
                   	 clickColor=color3;
                    }else if (currBtn.indexOf("dz") != -1) {
                   	 clickColor=color4;
                    }else{
                    }
                    $(".msgInfo").hide();
                    FreeDoEarth.flyToModels(nodeIds);
                }
                
                
            }
        });
    };


    $(".showInfo button").each(function (node) {
        $(this).click(function (node) {       	
            $(".msgInfo").hide();
            removeFollowLisener();
            currBtn = $('.active').attr("class");
            if (currBtn.indexOf("zy") != -1) {
            	$(".information").html(node.text+"<br>施工许可号：13431<br>"+"施工单位：北京XX建筑有限公司");
            }else
            if (currBtn.indexOf("jd") != -1) {
            	$(".information").html(node.text+"<br>状态：良好<br>"+"监管人：李XX");
            }else
            if (currBtn.indexOf("aq") != -1) {
            	$(".information").html(node.text+"<br>开始时间：2017-10-05<br>"+"结束时间：2018-05-03");
            }else
            if (currBtn.indexOf("dz") != -1) {
            	$(".information").html(node.text+"<br>用量：134<br>"+"成本：1000");
            }else{
            	$(".information").html(node.text);
            }
            $(this).addClass("active").siblings().removeClass("active");
        });
    });

    function clickModelSelectLeaf(data){
    	if(FreeDoEarth.pickedModels.length!=0){
    		//点击模型，对应树中的模型名称被选中。
    		var modelNode = $("#tree").tree("find",data);
    			$("#tree").tree("collapseAll");
    			$("#tree").tree("select",modelNode.target);
    			$("#tree").tree("expandTo",modelNode.target);
    			currBtn = $('.active').attr("class");
            	if (currBtn.indexOf("zy") != -1) {
            		clickColor=color1;
            		FreeDoTool.changeColor(FreeDoEarth.pickedModels[0].primitive,1,1,1,0.9);
                }
                if (currBtn.indexOf("jd") != -1) {
                	clickColor=color2;
                	FreeDoTool.changeColor(FreeDoEarth.pickedModels[0].primitive,2,1,1,0.9);
                }
                if (currBtn.indexOf("aq") != -1) {
                	clickColor=color3;
                	FreeDoTool.changeColor(FreeDoEarth.pickedModels[0].primitive,1,2,1,0.9);
                }
                if (currBtn.indexOf("dz") != -1) {
                	clickColor=color4;
                	FreeDoTool.changeColor(FreeDoEarth.pickedModels[0].primitive,1,1,2,0.9);
                }           
    	 	$(".msgInfo").click(function(e){
    	 		 e.stopPropagation();
    	 	     e.cancelable = true;
    	 	});
    		}else{
    				$(".msgInfo").hide();
    		}

    }

    $("#zy,#jd,#aq,#dz").click(function() {
    	FreeDoEarth.resetColor();
		$("#js").hide();
		$("#tree").show();
		$("#tree").tree({
			data : [savedata]
		});
	});
	$("#my").click(function() {
		FreeDoEarth.resetColor();
		$("#tree").hide();
		$("#js").show();
		$("#js").tree({
			url : "../../common/data/tree_data.json",
			onSelect : function(node) {
				workShow.selectedNode = node;
				if (node.text == "路径1") {
					var arr = new Array();
					var route1 = new FDPCameraRoute();
					route1.m_Time = 500;
					route1.m_Lon = 116; // 轨迹点对应的经度 度。
					route1.m_Lat = 38.9985; // 轨迹点对应的维度 度。
					route1.m_Heigt = 200; // 轨迹点对应的高度 米。
					route1.m_Course = 45; // 轨迹点对应的相机方位角 度。
					route1.m_Alpha = -45; // 轨迹点对应的相机俯仰角 度。
					route1.m_Roll = 0.0; // 轨迹点对应的相机滚转角 度。
					arr[0] = route1;

					var route2 = new FDPCameraRoute();
					route2.m_Time = 10500;
					route2.m_Lon = 116.015835; // 轨迹点对应的经度 度。
					route2.m_Lat = 38.9985; // 轨迹点对应的维度 度。
					route2.m_Heigt = 200; // 轨迹点对应的高度 米。
					route2.m_Course = -45; // 轨迹点对应的相机方位角 度。
					route2.m_Alpha = -45; // 轨迹点对应的相机俯仰角 度。
					route2.m_Roll = 0.0; // 轨迹点对应的相机滚转角 度。
					arr[1] = route2;
					FreeDoEarth.manyou(arr);
				} else if (node.text == "路径2") {
					var arr = new Array();
					var route1 = new FDPCameraRoute();
					route1.m_Time = 500;
					route1.m_Lon = 116.; // 轨迹点对应的经度 度。
					route1.m_Lat = 38.9986; // 轨迹点对应的维度 度。
					route1.m_Heigt = 200; // 轨迹点对应的高度 米。
					route1.m_Course = 0.0; // 轨迹点对应的相机方位角 度。
					route1.m_Alpha = -45; // 轨迹点对应的相机俯仰角 度。
					route1.m_Roll = 30; // 轨迹点对应的相机滚转角 度。
					arr[0] = route1;

					var route2 = new FDPCameraRoute();
					route2.m_Time = 10500;
					route2.m_Lon = 116.015837; // 轨迹点对应的经度 度。
					route2.m_Lat = 38.9985; // 轨迹点对应的维度 度。
					route2.m_Heigt = 200; // 轨迹点对应的高度 米。
					route2.m_Course = 0.0; // 轨迹点对应的相机方位角 度。
					route2.m_Alpha = -45; // 轨迹点对应的相机俯仰角 度。
					route2.m_Roll = -30; // 轨迹点对应的相机滚转角 度。
					arr[1] = route2;

					FreeDoEarth.manyou(arr);
				} else {
					var arr = new Array();
					var route1 = new FDPCameraRoute();
					route1.m_Time = 500;
					route1.m_Lon = 116; // 轨迹点对应的经度 度。
					route1.m_Lat = 39; // 轨迹点对应的维度 度。
					route1.m_Heigt = 100; // 轨迹点对应的高度 米。
					route1.m_Course = 90.0; // 轨迹点对应的相机方位角 度。
					route1.m_Alpha = 0; // 轨迹点对应的相机俯仰角 度。
					route1.m_Roll = 15.0; // 轨迹点对应的相机滚转角 度。
					arr[0] = route1;

					var route2 = new FDPCameraRoute();
					route2.m_Time = 10500;
					route2.m_Lon = 116.015835; // 轨迹点对应的经度 度。
					route2.m_Lat = 39.000001; // 轨迹点对应的维度 度。
					route2.m_Heigt = 100; // 轨迹点对应的高度 米。
					route2.m_Course = 90.0; // 轨迹点对应的相机方位角 度。
					route2.m_Alpha = -90; // 轨迹点对应的相机俯仰角 度。
					route2.m_Roll = -15; // 轨迹点对应的相机滚转角 度。
					arr[1] = route2;
					FreeDoEarth.manyou(arr);
				}
			}
		});
	});
    

    FreeDoEarth.init("right");                                  // 初始化模型

    FreeDoEarth.initModels(workShow.InitTree);                  // 传入回调函数获得树的初始化数据

    //workShow.rightClick();                                      // 右侧点击

   FreeDoEarth.initLeftDoubleClick(clickModelSelectLeaf);

});
var globalcartesian = null;
var flag = false;
var htmlOverlay = document.getElementById('showmsg');
var addFollowListener=function (){
	flag = globalviewer.scene.preRender.addEventListener(setScreenPostion);
}
var removeFollowLisener= function (){
	if(flag){
		globalviewer.scene.preRender.removeEventListener(setScreenPostion);
		flag = false;
		}
}
var setScreenPostion=function (){	
	var canvasPosition = globalviewer.scene.cartesianToCanvasCoordinates(globalcartesian);
	if (FreeDo.defined(canvasPosition)) {
		htmlOverlay.style.top = canvasPosition.y -120+ 'px';
		htmlOverlay.style.left = canvasPosition.x +190+ 'px';
	}
}
var divfollow = function(center){
		globalcartesian=center;
		$("#showmsg").show();
		removeFollowLisener();
		addFollowListener();
}