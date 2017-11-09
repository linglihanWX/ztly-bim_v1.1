var DownupViewer=DownupViewer||{};
var downuppoints = [];
var globalviewer = {};
var leftClickHandler = null;
var leftDownHandler = null;
/**
 * [init 地球容器ID]
 * @param  {[type]} earthId [description]
 * @return {[type]}         [description]
 */
DownupViewer.init=function(earthId,baseImageryProvider)
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
	 this.viewer._cesiumWidget._creditContainer.style.display = "none";
	 this.viewer.imageryLayers.addImageryProvider(new FreeDo.WebMapTileServiceImageryProvider({
			url : "http://{s}.tianditu.com/cia_w/wmts?service=WMTS&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet={TileMatrixSet}&TileMatrix={TileMatrix}&TileRow={TileRow}&Tilecol={TileCol}&style={style}&format=tiles",
			style:"default",
			tileMatrixSetID:"w",
			maximumLevel:17,
			subdomains : ["t7","t6","t5","t4","t3","t2","t1","t0"]
		}));
	modelTile = this.viewer.scene.primitives.add(new FreeDo.FreedoPModelset({
		url: "./static/model/tanggu_new"
	}));
	

	//3D视角
	//-2302845.900566225,4394819.795728763,3994766.603806111,0.2482012574227772,-0.781820133327709,0.001139172205375516
	this.viewer.camera.setView({
		destination :new FreeDo.Cartesian3(-2302923.868697135,4394881.466502352,3995119.1300424132),
		orientation: {
			heading : 3.4103115877496184,
			pitch : FreeDo.Math.toRadians( -90 ),//-1.5214432671817395,
			roll : 3.1249876427485663
		}
	});
	modelTile.readyPromise.then(function() {
		moveModel(modelTile,-80,20,-23,15,0,0,1,1,1);
	});
	//加载沉降点
	var downuppoint = [
		{"lon":"117.65493267761651","lat":"39.02886839380683"},
		{"lon":"117.65367088333899","lat":"39.0286955440859"},
		{"lon":"117.65369998250587","lat":"39.028783658883626"},
		{"lon":"117.65416379870284","lat":"39.02869887327398"},
		{"lon":"117.65386209988398","lat":"39.02888525363075"},
		{"lon":"117.65394149842251","lat":"39.02914251332972"},
		{"lon":"117.6543837414338","lat":"39.029044985518674"},
		{"lon":"117.65583099288868","lat":"39.02874696864712"},
		{"lon":"117.65601006053487","lat":"39.028716770649865"},
		{"lon":"117.65593015314758","lat":"39.028452384354985"},
		{"lon":"117.65555457406431","lat":"39.02847195063175"}
		];
	for ( var i in downuppoint) {
		downuppoints[i] = this.viewer.entities.add({  
			name : '沉降点'+i,  
			position : FreeDo.Cartesian3.fromDegrees(downuppoint[i].lon,downuppoint[i].lat,2),  
			 point : { //点  
			        pixelSize : 5,  
			        color : FreeDo.Color.RED,  
			        outlineColor : FreeDo.Color.WHITE,  
			        outlineWidth : 2  
			    }/*, 
			 ellipse : {  
				 	semiMinorAxis : 1,  
			        semiMajorAxis : 1,  
			        material : FreeDo.Color.RED,  
			        outline : true,  
			        outlineColor : FreeDo.Color.RED  
			    } */ 
		});
	}
    new Compass(this.viewer);
    this.viewer.screenSpaceEventHandler.setInputAction(function(){},FreeDo.ScreenSpaceEventType.LEFT_DOUBLE_CLICK );
    globalviewer = this.viewer;
}
DownupViewer.getTiandituGloble =function() {
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
DownupViewer.initLeftClick = function(viewer,callback) {
	leftClickHandler = new FreeDo.ScreenSpaceEventHandler(viewer.canvas);
	leftClickHandler.setInputAction(function(movement){
		var picked = viewer.scene.pick(movement.position);
		//console.log(picked);FreeDo.defined(picked) && picked instanceof FreeDo.FreedoPModelFeature
		callback(picked,movement.position);
		/*var pick= new FreeDo.Cartesian2(movement.position.x,movement.position.y);
		var cartesian = viewer.camera.pickEllipsoid(pick, viewer.scene.globe.ellipsoid);
		var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
		var point=[cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180];*/

		//输出相机位置
		//console.log(viewer.camera.position.x+","+viewer.camera.position.y+","+viewer.camera.position.z+","+viewer.camera.heading+","+viewer.camera.pitch+","+viewer.camera.roll);
		//输出点击位置的经纬度
		//console.log(point);
		
	}, FreeDo.ScreenSpaceEventType.LEFT_CLICK);
}
DownupViewer.initLeftDown = function(viewer,callback){
	leftDownHandler = new FreeDo.ScreenSpaceEventHandler(viewer.canvas);
	leftDownHandler.setInputAction(function(movement){
		var picked = viewer.scene.pick(movement.position);
		if(picked==null||picked instanceof FreeDo.FreedoPModelFeature){
			callback();
		}
	}, FreeDo.ScreenSpaceEventType.LEFT_DOWN);
}
//移除原有的监听事件
DownupViewer.removeListener = function(){
	leftClickHandler.removeInputAction(FreeDo.ScreenSpaceEventType.LEFT_CLICK);
	leftDownHandler.removeInputAction(FreeDo.ScreenSpaceEventType.LEFT_DOWN);
}
