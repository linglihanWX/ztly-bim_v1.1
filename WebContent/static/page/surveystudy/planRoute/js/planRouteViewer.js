var planRouteViewer=planRouteViewer||{};
var globalviewer = {};
var camera = [];
/**
 * [init 地球容器ID]
 * @param  {[type]} earthId [description]
 * @return {[type]}         [description]
 */
planRouteViewer.init=function(earthId)
{
	this.container=this.container||{};//未来保存加载的模型的容器，便于快速访问
	this.viewer=this.viewer||{};	  //场景对象
	this.pickedModels=[];			  //保存用户所选择的模型，颜色半透
	this.viewer = this.viewer|| {};
	//初始化地球
	 var freedocontainer = document.getElementById(earthId);
	 var project = Freedo.FdApp.createProject(freedocontainer);
	 this.project = project;
	this.viewer = this.project.getViewer();
	this.viewer.imageryLayers.addImageryProvider(new FreeDo.WebMapTileServiceImageryProvider({
		 url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
	        layer: "tdtBasicLayer_yingxiang",
	        style: "default",
	        format: "image/jpeg",
	        tileMatrixSetID: "tianditu",
	        minimumLevel: 0,
			maximumLevel: 17,
	        show: true
        })

    );
    this.viewer.imageryLayers.addImageryProvider(new FreeDo.WebMapTileServiceImageryProvider({
    	url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
	    layer: "tdtAnnoLayer_biaoji",
	    style: "default",
	    format: "image/png",
	    tileMatrixSetID: "tianditu",
	    show: true
	}));
	modelTile = this.viewer.scene.primitives.add(new FreeDo.FreeDoPModelset({
		url: "http://192.168.137.1:9999/1013/tanggu_new"
	}));
	

	//3D视角
	this.viewer.camera.setView({
		destination :new FreeDo.Cartesian3(-2303546.6925839605,4396043.075254788,3996183.4180388763),
		orientation: {
			heading : 0.2521160009959136,
			pitch : -1.5707951443335326,
			roll : 0
		}
	});
	modelTile.readyPromise.then(function() {
		moveModel(modelTile,-80,20,4,15,0,0,1,1,1);
	});
    new Compass(this.viewer);
    globalviewer = this.viewer;
}
