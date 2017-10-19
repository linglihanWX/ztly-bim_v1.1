var planRouteViewer=planRouteViewer||{};
var globalviewer = {};
var camera = [];
/**
 * [init 地球容器ID]
 * @param  {[type]} earthId [description]
 * @return {[type]}         [description]
 */
planRouteViewer.init=function(earthId,baseImageryProvider)
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
	modelTile = this.viewer.scene.primitives.add(new FreeDo.FreedoPModelset({
		url: "http://192.168.137.1:9999/1013/tanggu_new"
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
		moveModel(modelTile,-80,20,4,15,0,0,1,1,1);
	});
    new Compass(this.viewer);
    globalviewer = this.viewer;
}
planRouteViewer.getTiandituGloble =function() {
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