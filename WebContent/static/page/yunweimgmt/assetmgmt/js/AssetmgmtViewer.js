var AssetmgmtViewer=AssetmgmtViewer||{};
var globalviewer = {};
var camera = [];
/**
 * [init 地球容器ID]
 * @param  {[type]} earthId [description]
 * @return {[type]}         [description]
 */
AssetmgmtViewer.init=function(earthId)
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
/**
 * 左键点击事件
 */
/*AssetmgmtViewer.initLeftClick = function(viewer) {
	var screenSpaceEventHandler = new FreeDo.ScreenSpaceEventHandler(viewer.canvas);
	screenSpaceEventHandler.setInputAction(function(movement){
		
		var picked = viewer.scene.pick(movement.position);
		if(picked){
			if(picked instanceof FreeDo.FreeDoPModelFeature){
				$("#detailInfo").hide();
			}else{
				$("#detailInfo").css({
					"display":"block",
					"left":movement.position.x - 456,
					"top":movement.position.y - 215,
				});	
			}
		}else{
			$("#detailInfo").hide();
		}
		
		var pick= new FreeDo.Cartesian2(movement.position.x,movement.position.y);
		var cartesian = viewer.camera.pickEllipsoid(pick, viewer.scene.globe.ellipsoid);
		var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
		var point=[cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180];
		//输出相机位置
		//console.log(viewer.camera.position.x+","+viewer.camera.position.y+","+viewer.camera.position.z+","+viewer.camera.heading+","+viewer.camera.pitch+","+viewer.camera.roll);
		//输出点击位置的经纬度
		//console.log(point);
		
	}, FreeDo.ScreenSpaceEventType.LEFT_CLICK);
	

}*/