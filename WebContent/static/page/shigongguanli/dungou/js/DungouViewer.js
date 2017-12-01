var DungouViewer=DungouViewer||{};
var globalviewer = {};
var camera = [];
var pickedModels = [];
var unClickedColor = new FreeDo.Color(1,1,1,1);
var clickedColor = new FreeDo.Color(1,3,1,1);
/**
 * [init 地球容器ID]
 * @param  {[type]} earthId [description]
 * @return {[type]}         [description]
 */
DungouViewer.init=function(earthId,baseImageryProvider)
{
	this.container=this.container||{};//未来保存加载的模型的容器，便于快速访问
	this.viewer=this.viewer||{};	  //场景对象
	this.pickedModels=[];			  //保存用户所选择的模型，颜色半透
	this.viewer = this.viewer|| {};
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
	this.viewer.scene.globe.depthTestAgainstTerrain = true;
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
	this.viewer.camera.setView({
		destination :new FreeDo.Cartesian3(-2303476.178543401,4395768.068424268,3995789.5541884513),
		orientation: {
			heading : 0.2521512971723556,
			pitch : -1.57079565293941,
			roll : 0
		}
	});
	modelTile.readyPromise.then(function() {
		moveModel(modelTile,-80,20,-23,15,0,0,1,1,1);
	});
    new Compass(this.viewer);
    globalviewer = this.viewer;
}
DungouViewer.getTiandituGloble =function() {
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
//存放变色后的实例
var attributearray = [];
DungouViewer.initLeftClick = function(viewer,callback) {
	screenSpaceEventHandler = new FreeDo.ScreenSpaceEventHandler(viewer.canvas);
	screenSpaceEventHandler.setInputAction(function(movement){
/*		var pick= new FreeDo.Cartesian2(movement.position.x,movement.position.y);
		var cartesian = globalviewer.scene.globe.pick(globalviewer.camera.getPickRay(pick), globalviewer.scene);
		console.log(cartesian);*/
		var picked = viewer.scene.pick(movement.position);
		var pick= new FreeDo.Cartesian2(movement.position.x,movement.position.y);
		var cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(pick), viewer.scene);
		var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
		var point=[ cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180];
		console.log(point);
		if(picked!==undefined&&picked.id!==undefined&&typeof picked.id == "string"){
			var pickedid = picked.id;
			var id = parseInt(pickedid.slice(1,pickedid.length-1));
			DungouViewer.changeColor(pickedid);
			fanxuanTree(id);
			$(".detailInfo ul").html("<li><span>名称</span><input type='text' value='"+pickedid+"'/></li><li><span>推力（N）</span><input type='text' value='"+(id+5)*3+"'/></li> <li><span>刀盘转速（rpm）</span><input type='text' value='"+parseInt((id+3.7)*100)+"'/></li><li><span>旋转方向</span><input type='text'value='顺时针'/></li>");
			$(".detailInfo").show();
		}else{
			$(".detailInfo").hide();
		}
	}, FreeDo.ScreenSpaceEventType.LEFT_CLICK);
}
//移除原有的监听事件
DungouViewer.removeListener = function(){
	screenSpaceEventHandler.removeInputAction(FreeDo.ScreenSpaceEventType.LEFT_CLICK);
}
DungouViewer.changeColor=function(pickedid){
	if(attributearray.length>0){
		for (var i = 0; i < attributearray.length; i++) {
			attributearray[i].color = FreeDo.ColorGeometryInstanceAttribute.toValue(FreeDo.Color.DARKGRAY);
		}
		attributearray = [];
	}
	 var attributes = guandao2.getGeometryInstanceAttributes(pickedid);//获取某个实例的属性集  
	 //FreeDoTool.flyToModel(globalviewer.camera,attributes)
	 attributes.color = FreeDo.ColorGeometryInstanceAttribute.toValue(FreeDo.Color.FIREBRICK);
	 attributearray.push(attributes);
	 globalviewer.camera.viewBoundingSphere(attributes.boundingSphere, new Freedo.HeadingPitchRange(Freedo.Math.toRadians(23) , 0, 30))

}

