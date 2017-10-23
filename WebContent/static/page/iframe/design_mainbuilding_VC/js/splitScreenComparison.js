function initViewer (freedocontainer) {
	 var viewer = new FreeDo.Viewer(freedocontainer, {
         animation:false, //动画控制，默认true
         baseLayerPicker:false,//地图切换控件(底图以及地形图)是否显示,默认显示true
         fullscreenButton:false,//全屏按钮,默认显示true
         geocoder:false,//地名查找,默认true
         timeline:false,//时间线,默认true
         vrButton:false,//双屏模式,默认不显示false
         homeButton:false,//主页按钮，默认true
         infoBox:false,//点击要素之后显示的信息,默认true
         selectionIndicator:false,//选中元素显示,默认true
         imageryProvider : FreeDo.createTileMapServiceImageryProvider({
             url : FreeDo.buildModuleUrl('Assets/Textures/NaturalEarthII')
         }),
         imageryProvider:new FreeDo.WebMapTileServiceImageryProvider({
 	        url: "http://{s}.tianditu.com/img_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
 	        credit: new FreeDo.Credit("天地图全球影像服务"),
 	        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
 	        tilingScheme: new FreeDo.GeographicTilingScheme(),
 	        tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
 	    }),
	 });
	 viewer._cesiumWidget._creditContainer.style.display = "none";
	 viewer.scene.globe.depthTestAgainstTerrain = true;
	/* viewer.imageryLayers.addImageryProvider(new FreeDo.WebMapTileServiceImageryProvider({
	   	 url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
		        layer: "tdtBasicLayer_yingxiang",
		        style: "default",
		        format: "image/jpeg",
		        tileMatrixSetID: "tianditu",
		        minimumLevel: 0,
				maximumLevel: 17,
	   }));
	 viewer.imageryLayers.addImageryProvider(new FreeDo.WebMapTileServiceImageryProvider({
	   	url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
		    layer: "tdtAnnoLayer_biaoji",
		    style: "default",
		    format: "image/png",
		    tileMatrixSetID: "tianditu",
		}));*/
	 window.modelTile = viewer.scene.primitives.add(new FreeDo.FreedoPModelset({
			url: "../../../../../static/model/tanggu_new"
		}));
	 viewer.camera.setView({
			destination :new FreeDo.Cartesian3(-2302727.6410077475,4394555.373412278,3994829.517802942),
			orientation: {
				heading : 2.207607620221795,
				pitch : 0.005409650478886308,
				roll : 0.0026399525242846167
			}
		});
	return viewer;
}