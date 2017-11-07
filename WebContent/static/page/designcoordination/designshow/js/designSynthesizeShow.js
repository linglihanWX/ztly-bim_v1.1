$(function() {
	let designShow = {};
	// 初始化树
	var savedata = null;
	designShow.InitTree = function(treeData) {
		savedata = treeData[0];
		$("#tree").tree({
			data : treeData,
			onSelect : function(node) {
				designShow.selectedNode = node;
				if (node.type == 2) {
					$(".msgInfo").hide();
					FreeDoEarth.flyToModel(node.id,divfollow);
					$("#information").text(node.text);
				} else {
					let subNodes = $("#tree").tree("getChildren", node.target);
					let nodeIds = [];
					for (let i = 0; i < subNodes.length; i++) {
						if (subNodes[i].type == 2)
							nodeIds.push(subNodes[i].id);
					}
					$(".msgInfo").hide();
					FreeDoEarth.flyToModels(nodeIds);
				}
			}
		});
	};

	FreeDoEarth.init("right"); // 初始化球模型

	FreeDoEarth.initModels(designShow.InitTree); // 传入回调函数获得树的初始化数据

	FreeDoEarth.initLeftDoubleClick(doubleClickModelSelectLeaf); // 双击左键选择模型
	
	
	$("#cg").click(function() {
		removeFollowLisener();
		$("#js").hide();
		$("#tree").show();
		$("#tree").tree({
			data : [savedata]
		});
		$(this).addClass("active").siblings().removeClass("active");
	});
	$("#my").click(function() {
		removeFollowLisener();
		$(".msgInfo").hide();
		FreeDoEarth.resetColor();
		$("#tree").hide();
		$("#js").show();
		$(this).addClass("active").siblings().removeClass("active");
		$("#js").tree({
			url : "../../common/data/tree_data.json",
			onSelect : function(node) {
				designShow.selectedNode = node;
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

});
function doubleClickModelSelectLeaf(data) {
	if (FreeDoEarth.pickedModels.length != 0) {
		// 点击模型，对应树中的模型名称被选中。
		var modelNode = $("#tree").tree("find", data);
		$("#tree").tree("collapseAll");
		$("#tree").tree("select", modelNode.target);
		$("#tree").tree("expandTo", modelNode.target);
		
		$(".msgInfo").click(function(e) {
			e.stopPropagation();
			e.cancelable = true;
		});
	} else {
		$(".msgInfo").hide();

	}

}

/*function showlabel(mycanvas){
	let left = mycanvas.clientWidth/2 + 190;
	let top = mycanvas.clientHeight/2 - 120;
	$(".msgInfo").show().css({
		"left" : left,
		"top" : top,
		"z-index" : 1
	});

}
*/
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