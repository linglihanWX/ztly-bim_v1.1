var GeologyViewer = GeologyViewer || {};
var index = 0;
var indexReal = 0;
var arr = [];
var arrReal = [];
var newObj = {};
var newObjReal = {};
var currArr = [];
var currArrReal = [];
var first = true;
var firstReal = true;
var globalviewer = null;
var pickedModels = [];
var unClickedColor = new FreeDo.Color(1,1,1,1);
var clickedColor = new FreeDo.Color(1,3,1,0.9);
var screenSpaceEventHandler = null;
window.obj = {};
GeologyViewer.EbsObj = function (nodeId, fatherId, type, name, startDatePlan, endDatePlan, startDate, endDate, modelId, leaf) {
    this.nodeId = nodeId;
    this.fatherId = fatherId;
    this.type = type;
    this.name = name;
    this.startDatePlan = startDatePlan;
    this.endDatePlan = endDatePlan;
    this.startDate = startDate;
    this.endDate = endDate;
    this.modelId = modelId;
    this.leaf = leaf;
    this.children = [];
}

GeologyViewer.ModelObj = function (id, parentId, name, type, url, lon, lat, height, course, alpha, roll, scaleX, scaleY, scaleZ) {
    this.id = id;
    this.parentId = parentId;
    this.name = name;
    this.url = url;
    this.type = type;
    this.lon = lon;
    this.lat = lat;
    this.height = height;
    this.course = course;
    this.alpha = alpha;
    this.roll = roll;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.scaleZ = scaleZ;
    var modelMatrix = FreeDoTool.getModelMatrix(lon, lat, height, course, alpha, roll, scaleX, scaleY, scaleZ);
    this.primitive = GeologyViewer.viewer.scene.primitives.add(FreeDo.Model.fromGltf(
        {
            id: id,
            url: url,
            show: true,                     // default
            modelMatrix: modelMatrix,
            allowPicking: false,            // not pickable
            debugShowBoundingVolume: false, // default
            debugWireframe: false
        }));
}

GeologyViewer.GroupObj = function (id, parentId, name, type) {
    this.id = id;
    this.parentId = parentId;
    this.name = name;
    this.type = type;
    this.children = [];
}

GeologyViewer.init = function (earthId,baseImageryProvider) {
    this.modelContainer = this.modelContainer || {};//未来保存加载的模型的容器，便于快速访问
    this.ebsContainer = this.ebsContainer || {};
    this.timeArray = this.timeArray || [];//保存了按时间排序的Ebs叶子节点
    this.timeIndex = 0;
    this.showEbsContainer = this.showEbsContainer || {};//保存了当前时间点中显示出来的Ebs节点对应的模型
    this.viewer = this.viewer || {};
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
    this.viewer.scene.globe.depthTestAgainstTerrain = true;
    this.viewer.imageryLayers.addImageryProvider(new FreeDo.WebMapTileServiceImageryProvider({
		url : "http://{s}.tianditu.com/cia_w/wmts?service=WMTS&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet={TileMatrixSet}&TileMatrix={TileMatrix}&TileRow={TileRow}&Tilecol={TileCol}&style={style}&format=tiles",
		style:"default",
		tileMatrixSetID:"w",
		maximumLevel:17,
		subdomains : ["t7","t6","t5","t4","t3","t2","t1","t0"]
	}));

    // cx 添加
    this.flag = true;
    this.selectModels = [];
    this.lastModelId = -2;
    this.cam = [116.00013, 38.998999999999999999999999, 80.75962432438108];
    new Compass(this.viewer);
    
    globalviewer =this.viewer;
    $.ajax({
		url:"./drillingColumnCha/getAllDrillingColumnCha2",
		dataType:"json",
		success:function(content){
				var drillingMgr = FDDrillingMgr(globalviewer);
				for(var i=0;i<content.length;i++){
					drillingMgr.add(content[i]);
					}
				drillingMgr.startlistening(function(){});
			
		}
			
	})
}
GeologyViewer.getTiandituGloble =function() {
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
GeologyViewer.initLeftClick = function(viewer,callback){
	screenSpaceEventHandler = new FreeDo.ScreenSpaceEventHandler(viewer.canvas);
	screenSpaceEventHandler.setInputAction(function(movement){
		var picked = viewer.scene.pick(movement.position);
		GeologyViewer.changeColor(picked);
			if(picked==undefined||picked.primitive.boundingSphere == undefined){
				callback(undefined);
			}else{
				callback(picked);
			}
		
	}, FreeDo.ScreenSpaceEventType.LEFT_CLICK);
}
//移除原有的监听事件
GeologyViewer.removeListener = function(){
	screenSpaceEventHandler.removeInputAction(FreeDo.ScreenSpaceEventType.LEFT_CLICK);
}
GeologyViewer.fly=function(viewer,lon,lat,height){
	var camera = viewer.camera;
	 camera.flyTo({  
	        destination : FreeDo.Cartesian3.fromDegrees( lon, lat-0.0014,height ),  
	        orientation : {  
	            heading : FreeDo.Math.toRadians( 0 ),  
	            pitch : FreeDo.Math.toRadians( -15 ),  
	            roll : FreeDo.Math.toRadians( 0 )  
	        },  
	        duration : 1,//动画持续时间
	 });
	 
}
GeologyViewer.changeColor=function(picked){
	if(picked==undefined){	//如果picked为空则表示点击无模型处，使之前点变色的模型重置颜色并清空所选模型容器
		
		for(var i=0;i<pickedModels.length;i++)
			pickedModels[i].primitive.color=unClickedColor;
		
		pickedModels=[];
		
		return ;
	}
	
	if(pickedModels.length!=0){	//使之前点变色的模型重置颜色并清空所选模型容器
	
	
		for(var i=0;i<pickedModels.length;i++)
			pickedModels[i].primitive.color=unClickedColor;
		
		pickedModels=[];
	}
			
	pickedModels.push(picked);	//缓存点选模型
	
	pickedModels[0].primitive.color=clickedColor; //变色
	
	 
}
GeologyViewer.initModels = function () {
    $.ajax({
        url: "pm/selectAll",
        dataType: "JSON",
        success: function (content) {
            var node = null;
            var modelNode = null;
            var modelParentNode = null;//模型缓存中的父节点
            var container = GeologyViewer.modelContainer;

            for (var i = 0; i < content.length; i++) {
                node = content[i];

                modelParentNode = container[node.parentId];
                if (modelParentNode == undefined) {
                    modelParentNode = container[node.parentId] = { children: [] };
                }

                //非叶子节点
                if (node.leaf == 0) {
                    modelNode = new GeologyViewer.GroupObj(node.id, node.parentId, node.text, node.type);

                    if (container[node.id] != undefined) {
                        modelNode.children = container[node.id].children;
                    }
                } else {
                    var parameter = JSON.parse(node.attributes.parameter);
                    modelNode = new GeologyViewer.ModelObj(node.id, node.parentId, node.text, node.type, "static/model/" + parameter.filePath, parameter.lon, parameter.lat, parameter.height-46, parameter.course, parameter.alpha, parameter.roll, parameter.scaleX, parameter.scaleY, parameter.scaleZ);
                }

                container[node.id] = modelNode;

                modelParentNode.children.push(modelNode.id);
               
            }
        }

    });
}