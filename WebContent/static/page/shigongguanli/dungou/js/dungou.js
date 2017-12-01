$(function () {
    var h = $("#content").height();
    var h2 = $(".breadcrumb").height();
    $("#content .row-fluid").height(h - h2);
    DungouViewer.init("earth"); // 加载球模型
    DungouViewer.initLeftClick(globalviewer,function(){});
    var surveymanager = new SurveyManager(globalviewer,function(){});
    initPipingPit();

	/**
	 *工具栏按钮点击 
	 */
	$("#appendTools i").each(function(){
		$(this).click(function(){
			$(".detailInfo").hide();
			if($(this).hasClass("active")){
			//设置方法为none
			surveymanager.setSurveyType(SurveyType.NONE);
			//移除原有的监听事件
			DungouViewer.removeListener();
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
			DungouViewer.initLeftClick(globalviewer,function(){});
		}
		});
	});
});
var centerpoint = [];
/**
 * 通过计算插入管道（管道无ID）
 * @param lon 经度
 * @param lat 纬度
 * @param height 高度
 * @param gdlength 管道长度
 * @param num 数量
 * @returns geometryInstances 数组
 */
function calculateZB1(longitude,latitude,height,gdlength,num){
	//地理坐标
	var cartographic1  = {longitude:2.0534816290463516,  latitude:0.6811787630410361,height:height};
	var cartographic2  = {longitude:2.053488770056539,  latitude:0.6811771826112164,height:height};
	//经度差值
	var amplitude1 = (cartographic1.longitude-cartographic2.longitude);
	//纬度差值
	var amplitude2 = (cartographic1.latitude-cartographic2.latitude);
	//地理坐标转世界坐标
	var cartesian1 = globalviewer.scene.globe.ellipsoid.cartographicToCartesian (cartographic1);
	var cartesian2 = globalviewer.scene.globe.ellipsoid.cartographicToCartesian (cartographic2);
	//两点距离的平方
	var dsquare = FreeDo.Cartesian3.distanceSquared(cartesian1,cartesian2);
	//gblength所对应的经度差值与纬度差值
	var proportion = Math.pow(gdlength,2)/dsquare;
	var gbamplitude1 = amplitude1*Math.sqrt(proportion);
	var gbamplitude2 = amplitude2*Math.sqrt(proportion);
	//geometryInstances
	var DTWL = [];
	//临时起始点
	var tempZB1 = {longitude:longitude,  latitude:latitude}
	//临时终止点
	var tempZB2 = {longitude:0,  latitude:0}
	for (var i = 1; i <=num; i++) {
		tempZB2.longitude = tempZB1.longitude-gbamplitude1;
		tempZB2.latitude = tempZB1.latitude-gbamplitude2;
		//centerpoint.push({lon:tempZB1.lon-d1/2,lat:tempZB1.lat-d2/2,height:height});
	       var obj = new Freedo.GeometryInstance({
	    	   geometry : new Freedo.PolylineVolumeGeometry({
	    		   //vertexFormat : Freedo.VertexFormat.DEFAULT,2.0534816290463516, latitude: 0.6811787630410361
	    		   polylinePositions : Freedo.Cartesian3.fromRadiansArrayHeights([
	    			   tempZB1.longitude,  tempZB1.latitude,  height,
	    			   tempZB2.longitude,  tempZB2.latitude,  height
	    			   ]),
	    			   shapePositions : computeCircle(5.0)
	    	   }),
	    	   attributes : {
	    		   color : Freedo.ColorGeometryInstanceAttribute.fromColor(Freedo.Color.DARKGRAY)
	    	   }
	       });
	     tempZB1.longitude=tempZB2.longitude;
	     tempZB1.latitude=tempZB2.latitude;
	     //console.log(tempZB1.longitude+","+tempZB1.latitude);
	     DTWL.push(obj);
	}
	return DTWL;
}
/**
 * 通过计算插入管道
 * @param lon 经度
 * @param lat 纬度
 * @param height 高度
 * @param gdlength 管道长度
 * @param num 数量
 * @returns geometryInstances 数组
 */
function calculateZB2(longitude,latitude,height,gdlength,num){
	//地理坐标
	var cartographic1  = {longitude:2.0534816290463516,  latitude:0.6811787630410361,height:height};
	var cartographic2  = {longitude:2.053488770056539,  latitude:0.6811771826112164,height:height};
	//经度差值
	var amplitude1 = (cartographic1.longitude-cartographic2.longitude);
	//纬度差值
	var amplitude2 = (cartographic1.latitude-cartographic2.latitude);
	//地理坐标转世界坐标
	var cartesian1 = globalviewer.scene.globe.ellipsoid.cartographicToCartesian (cartographic1);
	var cartesian2 = globalviewer.scene.globe.ellipsoid.cartographicToCartesian (cartographic2);
	//两点距离的平方
	var dsquare = FreeDo.Cartesian3.distanceSquared(cartesian1,cartesian2);
	//gblength所对应的经度差值与纬度差值
	var proportion = Math.pow(gdlength,2)/dsquare;
	var gbamplitude1 = amplitude1*Math.sqrt(proportion);
	var gbamplitude2 = amplitude2*Math.sqrt(proportion);
	//geometryInstances
	var DTWL = [];
	//临时起始点
	var tempZB1 = {longitude:longitude,  latitude:latitude}
	//临时终止点
	var tempZB2 = {longitude:0,  latitude:0}
	for (var i = 1; i <=num; i++) {
		tempZB2.longitude = tempZB1.longitude-gbamplitude1;
		tempZB2.latitude = tempZB1.latitude-gbamplitude2;
		//centerpoint.push({lon:tempZB1.lon-d1/2,lat:tempZB1.lat-d2/2,height:height});
		var obj = new Freedo.GeometryInstance({
			id : "第"+i+"环",
			geometry : new Freedo.PolylineVolumeGeometry({
				//vertexFormat : Freedo.VertexFormat.DEFAULT,2.0534816290463516, latitude: 0.6811787630410361
				polylinePositions : Freedo.Cartesian3.fromRadiansArrayHeights([
					tempZB1.longitude,  tempZB1.latitude,  height,
					tempZB2.longitude,  tempZB2.latitude,  height
					]),
					shapePositions : computeCircle(5.0)
			}),
			attributes : {
				color : Freedo.ColorGeometryInstanceAttribute.fromColor(Freedo.Color.DARKGRAY)
			}
		});
		tempZB1.longitude=tempZB2.longitude;
		tempZB1.latitude=tempZB2.latitude;
		DTWL.push(obj);
	}
	return DTWL;
}
function computeCircle(radius) {
    var positions = [];
    for (var i = 0; i < 360; i++) {
        var radians = Freedo.Math.toRadians(i);
        positions.push(new Freedo.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)));
    }
    return positions;
}
/*//显示标牌
function showlabel(id,position){
	$(".msgInfo").hide();
	var pick= new FreeDo.Cartesian2(position.x,position.y);
	cartesian = globalviewer.scene.globe.pick(globalviewer.camera.getPickRay(pick), globalviewer.scene);
	if(id!=undefined&&id.indexOf("管道")>-1){
		removeFollowLisener();
		addFollowListener();
		$(".msgInfo").html(id).show();
	}
}
//标牌跟随移动
var cartesian= null;
var flag = false;
var htmlOverlay = document.getElementById('showmsg');
var addFollowListener=function(){
	flag = globalviewer.scene.preRender.addEventListener(setScreenPostion);
}
var removeFollowLisener= function(){
	if(flag==true){
		globalviewer.scene.preRender.removeEventListener(setScreenPostion);
		flag = false;
	}
}
var setScreenPostion=function (){	
	var canvasPosition = globalviewer.scene.cartesianToCanvasCoordinates(cartesian);
	    if (FreeDo.defined(canvasPosition)) {
	        htmlOverlay.style.top = canvasPosition.y -150+ 'px';
	        htmlOverlay.style.left = canvasPosition.x +220+ 'px';
	    }
}*/
//加载坑和管道
var guandao2 = null;
function initPipingPit(){
	var userdata2 =[
		[				
			{lon:117.65370310938958,lat: 39.02934846731648,height:0},
			{lon:117.65616588189279,lat: 39.02878641322159,height:0},
			{lon:117.65606451946124,lat: 39.028480607240965,height:0},
			{lon:117.66036385771528,lat: 39.02753995829354,height:0},
			{lon:117.66010911739728,lat: 39.02689057245006,height:0},
			{lon:117.6533791730346,lat:  39.02839160339337,height:0}
		],

		[
			{lon:117.65370310938958,lat: 39.02934846731648,height:-15},
			{lon:117.65616588189279,lat: 39.02878641322159,height:-13},
			{lon:117.65606451946124,lat: 39.028480607240965,height:-20},
			{lon:117.66036385771528,lat: 39.02753995829354,height:-15},
			{lon:117.66010911739728,lat: 39.02689057245006,height:-22},
			{lon:117.6533791730346,lat:  39.02839160339337,height:-11}
		],

		[
			{lon:117.65370310938958,lat: 39.02934846731648,height:-27},
			{lon:117.65616588189279,lat: 39.02878641322159,height:-33},
			{lon:117.65606451946124,lat: 39.028480607240965,height:-26},
			{lon:117.66036385771528,lat: 39.02753995829354,height:-22},
			{lon:117.66010911739728,lat: 39.02689057245006,height:-32},
			{lon:117.6533791730346,lat:  39.02839160339337,height:-24}
		],
		[
			{lon:117.65370310938958,lat: 39.02934846731648,height:-50},
			{lon:117.65616588189279,lat: 39.02878641322159,height:-50},
			{lon:117.65606451946124,lat: 39.028480607240965,height:-50},
			{lon:117.66036385771528,lat: 39.02753995829354,height:-50},
			{lon:117.66010911739728,lat: 39.02689057245006,height:-50},
			{lon:117.6533791730346,lat:  39.02839160339337,height:-50}
		]
]
	var imgarray = [
		"static/page/shigongguanli/dungou/img/Land001.jpg",
		"static/page/shigongguanli/dungou/img/Land002.jpg",
		"static/page/shigongguanli/dungou/img/Land004.jpg"
	];
	FreeDoUtil.dig(globalviewer,userdata2,imgarray);
    var pitch = 0;
    var matrix = null;
    //盾构机旋转
    globalviewer.scene.preRender.addEventListener(function(){
    	if(pitch>360)pitch=0;
    	pitch = pitch+1;
    	primitive.modelMatrix = getModelMatrix(180*2.0534865154587263/Math.PI,180*0.6811776815929453/Math.PI,-23,287,pitch,0,1.2,1.2,1.2);
    	
    });
	var primitive = globalviewer.scene.primitives.add(FreeDo.Model.fromGltf(
        {
            id: "盾构机",
            url: "static/page/shigongguanli/dungou/gltf/dun_gou_dao_tou.gltf",
            show: true,                     // default
            modelMatrix:getModelMatrix(180*2.0534865154587263/Math.PI,180*0.6811776815929453/Math.PI,-23,287,0,0,1.2,1.2,1.2),
            allowPicking: true,            // not pickable
            debugShowBoundingVolume: false, // default
            debugWireframe: false
        }));
    	console.log(primitive);
       
       var offsetwenli = new Freedo.Cartesian2(100, 1);
       
       
       var array1 = calculateZB1(2.0534816290463516,0.6811787630410361,-28,1.2,20);
       var array2 = calculateZB2(2.0534807581666916,0.6811761975379643,-28,1.2,344);
       var guandao1 = globalviewer.scene.primitives.add(new Freedo.Primitive({
    	   geometryInstances : array1,
    	   appearance: new FreeDo.PerInstanceColorAppearance( {  
    		   flat : true,
    		   translucent : false
    	   })  
       })); 
       guandao2 = globalviewer.scene.primitives.add(new Freedo.Primitive({
           geometryInstances : array2,
           appearance: new FreeDo.PerInstanceColorAppearance( {  
        		flat : true,
        		translucent : false
           })  
       })); 
       /*setInterval(function () {
           if (offsetwenli.x > 51) {
           	offsetwenli.x = 50;
           }
           offsetwenli.x += 0.005;
         }, 10);*/
}
function fanxuanTree(id){
 	var treeObj = $.fn.zTree.getZTreeObj("tree");
	var nodes = treeObj.getNodes()[0].children;
	if (nodes.length>0) {
		treeObj.selectNode(nodes[id-1]);
}
}
function getModelMatrix(lon,lat,height,heading,pitch,roll,scaleX,scaleY,scaleZ)
{
		var scaleCartesian3=new FreeDo.Cartesian3(scaleX,scaleY,scaleZ); //获得三元素，直接通过数字获得
		var scaleMatrix=FreeDo.Matrix4.fromScale(scaleCartesian3);//获得缩放矩阵
		var position = FreeDo.Cartesian3.fromDegrees(lon,lat,height);//根据经纬高获得位置三元素
 		var heading=FreeDo.Math.toRadians(heading);
 		var pitch=FreeDo.Math.toRadians(pitch);
 		var roll=FreeDo.Math.toRadians(roll);
		var hpr=new FreeDo.HeadingPitchRoll(heading,pitch,roll);
		var transform=FreeDo.Transforms.headingPitchRollToFixedFrame(position,hpr);//获得姿态矩阵
		var matrix4=new FreeDo.Matrix4();
		FreeDo.Matrix4.multiply(transform,scaleMatrix,matrix4);
		return matrix4;
}
