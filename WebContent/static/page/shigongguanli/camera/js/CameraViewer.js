var CameraViewer=CameraViewer||{};
var globalviewer = {};
var camera = [];
var leftClickHandler = null;
var leftDownHandler = null;
/**
 * [init 地球容器ID]
 * @param  {[type]} earthId [description]
 * @return {[type]}         [description]
 */
CameraViewer.init=function(earthId,baseImageryProvider)
{
	this.container=this.container||{};//未来保存加载的模型的容器，便于快速访问
	this.viewer=this.viewer||{};	  //场景对象
	this.pickedModels=[];			  //保存用户所选择的模型，颜色半透
	this.viewer = this.viewer|| {};
	//初始化地球
	 this.viewer = new Freedo.Viewer(earthId,{
			animation : false,
			baseLayerPicker : false,
			fullscreenButton : false,
			geocoder : false,
			homeButton : false,
			infoBox :false,
			sceneModePicker : false,
			selectionIndicator : false,
			timeline : false,
			navigationHelpButton : false,
			navigationInstructionsInitiallyVisible : false,
			selectedImageryProviderViewModel : false,
			scene3DOnly : true,
			clock : null,
			showRenderLoopErrors : false,
			automaticallyTrackDataSourceClocks:false,
			imageryProvider : baseImageryProvider || this.getTiandituGloble()
		});
	 this.viewer.imageryLayers.addImageryProvider(new FreeDo.WebMapTileServiceImageryProvider({
			url : "http://{s}.tianditu.com/cia_w/wmts?service=WMTS&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet={TileMatrixSet}&TileMatrix={TileMatrix}&TileRow={TileRow}&Tilecol={TileCol}&style={style}&format=tiles",
			style:"default",
			tileMatrixSetID:"w",
			maximumLevel:17,
			subdomains : ["t7","t6","t5","t4","t3","t2","t1","t0"]
		}));
	 this.viewer._cesiumWidget._creditContainer.style.display = "none";
	modelTile = this.viewer.scene.primitives.add(new FreeDo.FreedoPModelset({
		url: "./static/model/tanggu_new"
	}));
	

	//3D视角
	this.viewer.camera.setView({
		destination :new FreeDo.Cartesian3(-2302826.1170741096,4394667.942996659,3994924.9447827702),
		orientation: {
			heading : 0.25211600100558673,
			pitch : -1.5707961712222063,
			roll : 0
		}
	});
	modelTile.readyPromise.then(function() {
		moveModel(modelTile,-80,20,-23,15,0,0,1,1,1);
	});
    new Compass(this.viewer);
	var camera1 = this.viewer.entities.add( {  
		name : '摄像头1',  
		position : FreeDo.Cartesian3.fromDegrees(117.65375541701634, 39.02874722501288,1),    
		label : { //文字标签  
			text : '南门1',  
			font : '14pt monospace',  
			style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
			outlineWidth : 2,  
			verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
			pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
		},  		 
		billboard : { //图标  
			image : "static/page/shigongguanli/camera/img/camera.svg",  
			width : 50,  
			height : 50  
		}
	} );
	var camera2 = this.viewer.entities.add( {  
		name : '摄像头2',  
		position : FreeDo.Cartesian3.fromDegrees(117.65429737156501, 39.02880876433644,-2),    
		label : { //文字标签  
			text : '南门2',  
			font : '14pt monospace',  
			style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
			outlineWidth : 2,  
			verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
			pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
		},  		 
		billboard : { //图标  
			image : "static/page/shigongguanli/camera/img/camera.svg",  
			width : 50,  
			height : 50  
		}
	} );
	var camera3 = this.viewer.entities.add( {  
		name : '摄像头3',  
		position : FreeDo.Cartesian3.fromDegrees(117.65447907157001, 39.028964593410294,-2),    
		label : { //文字标签  
			text : '三门',  
			font : '14pt monospace',  
			style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
			outlineWidth : 2,  
			verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
			pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
		},  		 
		billboard : { //图标  
			image : "static/page/shigongguanli/camera/img/camera.svg",  
			width : 50,  
			height : 50  
		}
	} );
	var camera4 = this.viewer.entities.add( {  
		name : '摄像头4',  
		position : FreeDo.Cartesian3.fromDegrees(117.65491829534002, 39.02880064474932,-2),    
		label : { //文字标签  
			text : '站厅扶梯口',  
			font : '14pt monospace',  
			style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
			outlineWidth : 2,  
			verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
			pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
		},  		 
		billboard : { //图标  
			image : "static/page/shigongguanli/camera/img/camera.svg",  
			width : 50,  
			height : 50  
		}
	} );
	var camera5 = this.viewer.entities.add( {  
		name : '摄像头5',  
		position : FreeDo.Cartesian3.fromDegrees(117.65520604234463, 39.028678589254206,-2),    
		label : { //文字标签  
			text : '土体口',  
			font : '14pt monospace',  
			style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
			outlineWidth : 2,  
			verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
			pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
		},  		 
		billboard : { //图标  
			image : "static/page/shigongguanli/camera/img/camera.svg",  
			width : 50,  
			height : 50  
		}
	} );
	camera.push(camera1);
	camera.push(camera2);
	camera.push(camera3);
	camera.push(camera4);
	camera.push(camera5);
    globalviewer = this.viewer;
}
CameraViewer.getTiandituGloble =function() {
	var tg = new Freedo.WebMapTileServiceImageryProvider({
		url : "http://{s}.tianditu.com/img_c/wmts?service=WMTS&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet={TileMatrixSet}&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style={style}&format=tiles",
		style:"default",
		tileMatrixSetID:"c",
		tilingScheme:new Freedo.GeographicTilingScheme(),
		tileMatrixLabels:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"],
		maximumLevel:17,
		subdomains : ["t0","t1","t2","t3","t4","t5","t6","t7"]
	});
	return tg;
}
/**
 * 左键点击事件
 */
CameraViewer.initLeftClick = function(viewer,callback) {
	leftClickHandler = new FreeDo.ScreenSpaceEventHandler(viewer.canvas);
	leftClickHandler.setInputAction(function(movement){
		
		var picked = viewer.scene.pick(movement.position);
		callback(picked,movement.position);
		
		/*var pick= new FreeDo.Cartesian2(movement.position.x,movement.position.y);
		var cartesian = viewer.camera.pickEllipsoid(pick, viewer.scene.globe.ellipsoid);
		var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
		var point=[cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180];*/
		//输出相机位置
/*		var cartesian = new FreeDo.Cartesian3(viewer.camera.position.x, viewer.camera.position.y, viewer.camera.position.z)
		var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
		console.log(cartographic.longitude +","+cartographic.latitude+","+viewer.camera.heading+","+viewer.camera.pitch+","+viewer.camera.roll);*/
		//输出点击位置的经纬度
		//console.log(point);
		
	}, FreeDo.ScreenSpaceEventType.LEFT_CLICK);
}
//移除原有的监听事件
CameraViewer.removeListener = function(){
	leftClickHandler.removeInputAction(FreeDo.ScreenSpaceEventType.LEFT_CLICK);
	leftDownHandler.removeInputAction(FreeDo.ScreenSpaceEventType.LEFT_DOWN);
}
CameraViewer.initLeftDown = function(viewer,callback){
	leftDownHandler = new FreeDo.ScreenSpaceEventHandler(viewer.canvas);
	leftDownHandler.setInputAction(function(movement){
		var picked = viewer.scene.pick(movement.position);
		if(picked==null||picked instanceof FreeDo.FreedoPModelFeature){
			callback();
		}
	}, FreeDo.ScreenSpaceEventType.LEFT_DOWN);
}