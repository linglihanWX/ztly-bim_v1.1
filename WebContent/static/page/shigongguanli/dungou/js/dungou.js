$(function () {
    var h = $("#content").height();
    var h2 = $(".breadcrumb").height();
    $("#content .row-fluid").height(h - h2);
    DungouViewer.init("earth"); // 加载球模型
    DungouViewer.initLeftClick(globalviewer,showlabel);
    
    globalviewer.scene.groundPrimitives.add(new Freedo.GroundErasePrimitive({
        geometryInstances: new Freedo.GeometryInstance({
            geometry: new Freedo.PolygonGeometry.fromPositions({
                positions : [
                	{x: -2302665.867527339, y: 4394616.783061055, z: 3994765.936877259},
                	{x: -2302659.829393002, y: 4394544.122837692, z: 3994848.7905137558},
                	{x: -2302867.970630794, y: 4394478.837474359, z: 3994800.9499104093},
                	{x: -2302869.330504322, y: 4394503.932308779, z: 3994772.750300753},
                	{x: -2303884.0992531874, y: 4394182.039688942, z: 3994543.266333626},
                	{x: -2303888.682633036, y: 4394226.487925461, z: 3994492.072163621},
                ]
              }),
            extrudedHeight:0,
            height:-100,
           attributes: {
              color: Freedo.ColorGeometryInstanceAttribute.fromColor(new Freedo.Color(0.0, 0.0, 0.0, 1.0)) // 洞的颜色 (0, 0, 0)表示黑色
            } 
          }),
          classificationType: 0,
          debugShowShadowVolume: false
       }));

       globalviewer.entities.add({
    	   //坑壁
             wall : {
                 positions : [
                    	{x: -2302665.867527339, y: 4394616.783061055, z: 3994765.936877259},
                    	{x: -2302659.829393002, y: 4394544.122837692, z: 3994848.7905137558},
                    	{x: -2302867.970630794, y: 4394478.837474359, z: 3994800.9499104093},
                    	{x: -2302869.330504322, y: 4394503.932308779, z: 3994772.750300753},
                    	{x: -2303884.0992531874, y: 4394182.039688942, z: 3994543.266333626},
                    	{x: -2303888.682633036, y: 4394226.487925461, z: 3994492.072163621},
                    	{x: -2302665.867527339, y: 4394616.783061055, z: 3994765.936877259}
                    ],
                 material : "static/page/common/img/underground.jpg",
                 maximumHeights:[ 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01],
                 minimumHeights:[ -50, -50, -50, -50, -50, -50, -50],
                 outline : false
             },
           //坑底
             polygon : {
                 hierarchy : [
                    	{x: -2302665.867527339, y: 4394616.783061055, z: 3994765.936877259},
                    	{x: -2302659.829393002, y: 4394544.122837692, z: 3994848.7905137558},
                    	{x: -2302867.970630794, y: 4394478.837474359, z: 3994800.9499104093},
                    	{x: -2302869.330504322, y: 4394503.932308779, z: 3994772.750300753},
                    	{x: -2303884.0992531874, y: 4394182.039688942, z: 3994543.266333626},
                    	{x: -2303888.682633036, y: 4394226.487925461, z: 3994492.072163621},
                    ],
                 height:-50,
                 material : "static/page/common/img/underground.jpg",
             }
     });

       var offsetwenli = new Freedo.Cartesian2(100, 1);
       
       
       var array = calculateZB(2.0534807581666916,0.6811761975379643,-28,30);
       var guandao1 = globalviewer.scene.primitives.add(new Freedo.Primitive({
           geometryInstances : array,
           appearance: new Freedo.MaterialAppearance({
               materialSupport: Freedo.MaterialAppearance.MaterialSupport.TEXTURED,
               material: new Freedo.Material({
                 fabric: {
                  /* type: 'DiffuseMap',
                   uniforms: {
                     image: "static/page/common/img/FD.png",
                     repeat: new Freedo.Cartesian2(1, 1),
                     offset: offsetwenli//添加一个纹理坐标偏移量的uniform变量
                   },*/
                	 type : 'Color',
 			        uniforms : {
 			            color : new FreeDo.Color(1.0, 1.0, 0.0, 1.0)
 			        }
                 /*   components: {
                     //修改着色器给纹理坐标添加偏移量
                     diffuse: 'texture2D(image, fract(repeat * materialInput.st+offset)).channels'
                   } */
                 }
               })
             })
       })); 
       var guandao2 = globalviewer.scene.primitives.add(new Freedo.Primitive({
    	   geometryInstances : new Freedo.GeometryInstance({
    		   id : '2222',
    		   geometry : new Freedo.PolylineVolumeGeometry({
    			   //vertexFormat : Freedo.VertexFormat.DEFAULT,2.0534816290463516, latitude: 0.6811787630410361
    			   polylinePositions : Freedo.Cartesian3.fromRadiansArrayHeights([
    				   2.0534816290463516,  0.6811787630410361,  -28,
    				   2.053488770056539,  0.6811771826112164,  -28
    				   ]),
    				   shapePositions : computeCircle(5.0)
    		   }),
    		   attributes : {
    			   color : Freedo.ColorGeometryInstanceAttribute.fromColor(Freedo.Color.CYAN)
    		   }
    	   }),
    	   appearance: new Freedo.MaterialAppearance({
    		   materialSupport: Freedo.MaterialAppearance.MaterialSupport.TEXTURED,
    		   material: new Freedo.Material({
    			   fabric: {
    				  type: 'DiffuseMap',
    				   uniforms: {
    					   image: "static/page/common/img/FD.png",
    					   repeat: new Freedo.Cartesian2(1, 1),
    					   offset: offsetwenli//添加一个纹理坐标偏移量的uniform变量
    				   },
    				  
    				   components: {
    					   //修改着色器给纹理坐标添加偏移量
    					   diffuse: 'texture2D(image, fract(repeat * materialInput.st+offset)).channels'
    				   } 
    			   }
    		   })
    	   })
       })); 
       /*setInterval(function () {
           if (offsetwenli.x > 51) {
           	offsetwenli.x = 50;
           }
           offsetwenli.x += 0.005;
         }, 10);*/
       
});
var centerpoint = [];
/**
 * 插入管道
 * @param lon 经度
 * @param lat 纬度
 * @param height 高度
 * @param num 数量
 * @returns geometryInstances 数组
 */
function calculateZB(lon,lat,height,num){
	var coordinate1 = {lon:2.0534816290463516,  lat:0.6811787630410361};
	var coordinate2 = {lon:2.053488770056539,  lat:0.6811771826112164};
	var d1 = (coordinate1.lon-coordinate2.lon);
	var d2 = (coordinate1.lat-coordinate2.lat);
	var DTWL = [];
	var tempZB1 = {lon:lon,  lat:lat}
	var tempZB2 = {lon:0,  lat:0}
	for (var i = 0; i < num; i++) {
		tempZB2.lon=tempZB1.lon-d1;
		tempZB2.lat=tempZB1.lat-d2;
		centerpoint.push({lon:tempZB1.lon-d1/2,lat:tempZB1.lat-d2/2,height:height});
	       var obj = new Freedo.GeometryInstance({
	    	   id : "管道"+i,
	    	   geometry : new Freedo.PolylineVolumeGeometry({
	    		   //vertexFormat : Freedo.VertexFormat.DEFAULT,2.0534816290463516, latitude: 0.6811787630410361
	    		   polylinePositions : Freedo.Cartesian3.fromRadiansArrayHeights([
	    			   tempZB1.lon,  tempZB1.lat,  height,
	    			   tempZB2.lon,  tempZB2.lat,  height
	    			   ]),
	    			   shapePositions : computeCircle(5.0)
	    	   }),
	    	   attributes : {
	    		   color : Freedo.ColorGeometryInstanceAttribute.fromColor(Freedo.Color.CYAN)
	    	   }
	       });
	     tempZB1.lon=tempZB2.lon;
	     tempZB1.lat=tempZB2.lat;
	     
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
//显示标牌
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
}
