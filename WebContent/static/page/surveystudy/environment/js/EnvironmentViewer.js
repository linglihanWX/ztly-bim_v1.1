var EnvironmentViewer = EnvironmentViewer || {};
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
var environment = [];
var myviewer = null;
var screenSpaceEventHandler = null;
window.obj = {};
EnvironmentViewer.EbsObj = function (nodeId, fatherId, type, name, startDatePlan, endDatePlan, startDate, endDate, modelId, leaf) {
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

EnvironmentViewer.ModelObj = function (id, parentId, name, type, url, lon, lat, height, course, alpha, roll, scaleX, scaleY, scaleZ) {
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
    this.primitive = EnvironmentViewer.viewer.scene.primitives.add(FreeDo.Model.fromGltf(
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

EnvironmentViewer.GroupObj = function (id, parentId, name, type) {
    this.id = id;
    this.parentId = parentId;
    this.name = name;
    this.type = type;
    this.children = [];
}

EnvironmentViewer.getTiandituGloble =function() {
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

EnvironmentViewer.init = function (earthId,baseImageryProvider) {
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
    var chaiqian = this.viewer.entities.add({
    	name:"gaoxiaowangcenchaiquanqu",
    	show : true,
    	position : FreeDo.Cartesian3.fromDegrees( 116.03948406636098, 39.000788710438925 ),
    	    point : { //点
    	        pixelSize : 5,
    	        color : FreeDo.Color.RED,
    	        outlineColor : FreeDo.Color.WHITE,
    	        outlineWidth : 2
    	   },
	    label : { //文字标签
	        text : '高小王村拆迁区',
	        font : '14pt monospace',
	        style : FreeDo.LabelStyle.FILL_AND_OUTLINE,
	        outlineWidth : 2,
	        verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
	        pixelOffset : new FreeDo.Cartesian2( 0, -9 )   //偏移量
	    },    	
        polygon : {
            outline : true,
            outlineColor : FreeDo.Color.BLACK,
            hierarchy : {
                positions : FreeDo.Cartesian3.fromDegreesArray([
                    116.03316031472897, 39.0022221558556,
                   116.04164166920287, 39.002149218036884,
                    116.04304889433696, 38.99885273253185,
                    116.03996948835405, 38.99829446535259,
                    116.03858602258855, 38.999846838695646,
                    116.03278530435234, 39.00122102040003,                        
                ]),
            },
            material : new FreeDo.GridMaterialProperty({
                color : FreeDo.Color.ORANGE,
                lineCount : new FreeDo.Cartesian2(15, 0),
                lineThickness : new FreeDo.Cartesian2(1, 1),
                lineOffset :  new FreeDo.Cartesian2(1100.9, 1100.9)
            }),
            height : 10,
            outline : true,
            outlineColor : FreeDo.Color.ORANGE                
        }
    });

    var chaiqian1 = this.viewer.entities.add({
    	name:"zhangweizhuangtoucenchaiqianqu1",
    	show : true,
    	position : FreeDo.Cartesian3.fromDegrees( 116.06858204514421, 39.00027129930735 ),
    	    point : { //点
    	        pixelSize : 5,
    	        color : FreeDo.Color.RED,
    	        outlineColor : FreeDo.Color.WHITE,
    	        outlineWidth : 2
    	   },
	    label : { //文字标签
	        text : '张巍庄头村拆迁区1',
	        font : '14pt monospace',
	        style : FreeDo.LabelStyle.FILL_AND_OUTLINE,
	        outlineWidth : 2,
	        verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
	        pixelOffset : new FreeDo.Cartesian2( 0, -9 )   //偏移量
	    }, 
    	polygon : {
            outline : true,
            outlineColor : FreeDo.Color.BLACK,
            hierarchy : {
                positions : FreeDo.Cartesian3.fromDegreesArray([
                	116.06645349307173, 39.00128583259063,
                	116.06805890528415, 39.00137476160155,
                	116.06847203271361, 39.00096730772978,
                	116.07099855244729, 39.00068954968628,
                	116.07108370221013, 38.99965486552117,
                	116.06680094255128, 38.999430993453615,  
                	116.06634852291182, 39.001497720099685
                ]),
            },
            material : new FreeDo.GridMaterialProperty({
                color : FreeDo.Color.ORANGE,
                lineCount : new FreeDo.Cartesian2(15, 0),
                lineThickness : new FreeDo.Cartesian2(1, 1),
                lineOffset :  new FreeDo.Cartesian2(1100.9, 1100.9)
            }),
            height : 10,
            outline : true,
            outlineColor : FreeDo.Color.ORANGE                  
        }
    });
    
    var chaiqian2 = this.viewer.entities.add({
    	name:"zhangweizhuangtoucunchaiqianqu2",
    	show : true,
    	position : FreeDo.Cartesian3.fromDegrees( 116.07423862499418, 39.00019520379515 ),
    	    point : { //点
    	        pixelSize : 5,
    	        color : FreeDo.Color.RED,
    	        outlineColor : FreeDo.Color.WHITE,
    	        outlineWidth : 2
    	   },
	    label : { //文字标签
	        text : '张巍庄头村拆迁区2',
	        font : '14pt monospace',
	        style : FreeDo.LabelStyle.FILL_AND_OUTLINE,
	        outlineWidth : 2,
	        verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
	        pixelOffset : new FreeDo.Cartesian2( 0, -9 )   //偏移量
	    }, 
    	polygon : {
            outline : false,
            outlineColor : FreeDo.Color.BLACK,
            hierarchy : {
                positions : FreeDo.Cartesian3.fromDegreesArray([
                	116.0729476400768, 39.00128672511788,
                	116.07443392797242, 39.001305921069324,
                	116.07450637409187, 39.00095121045232,
                	116.07611445700955, 39.001020225635656,
                	116.07692005313103, 38.99958268244487,
                	116.07269768778842, 38.99948404432535,  
                	116.07286882540146, 39.001300425347125
                ]),
            },
            material : new FreeDo.GridMaterialProperty({
                color : FreeDo.Color.ORANGE,
                lineCount : new FreeDo.Cartesian2(15, 0),
                lineThickness : new FreeDo.Cartesian2(1, 1),
                lineOffset :  new FreeDo.Cartesian2(1100.9, 1100.9)
            }),
            height : 10,
            outline : true,
            outlineColor : FreeDo.Color.ORANGE                   
        }
    });
    
    var chaiqian3 = this.viewer.entities.add({
    	name:"xiaoyangcunchaiqianqu",
    	show : true,
    	position : FreeDo.Cartesian3.fromDegrees(115.97102931062608, 39.00109154188958),
    	    point : { //点
    	        pixelSize : 5,
    	        color : FreeDo.Color.RED,
    	        outlineColor : FreeDo.Color.WHITE,
    	        outlineWidth : 2
    	   },
	    label : { //文字标签
	        text : '小阳村村拆迁区',
	        font : '14pt monospace',
	        style : FreeDo.LabelStyle.FILL_AND_OUTLINE,
	        outlineWidth : 2,
	        verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
	        pixelOffset : new FreeDo.Cartesian2( 0, -9 )   //偏移量
	    }, 
    	polygon : {
            outline : true,
            outlineColor : FreeDo.Color.BLACK,
            hierarchy : {
                positions : FreeDo.Cartesian3.fromDegreesArray([
                	115.96824373928295, 39.00265612332528,
                	115.97494923880352, 39.00230653905432,
                	115.9736701324057, 38.99958885643518,
                	115.96909923334594, 38.99943285871234,
                	115.96740306407922, 39.00292926555422,
                ]),
            },
            material : new FreeDo.GridMaterialProperty({
                color : FreeDo.Color.ORANGE,
                lineCount : new FreeDo.Cartesian2(15, 0),
                lineThickness : new FreeDo.Cartesian2(1, 1),
                lineOffset :  new FreeDo.Cartesian2(1100.9, 1100.9)
            }),
            height : 10,
            outline : true,
            outlineColor : FreeDo.Color.ORANGE                 
        }
    });
    
    var chaiqian4 = this.viewer.entities.add({
    	name:"dayangcunchaiqianqu",
    	show : true,
    	position : FreeDo.Cartesian3.fromDegrees(115.98010448982028, 39.00048211044087),
    	    point : { //点
    	        pixelSize : 5,
    	        color : FreeDo.Color.RED,
    	        outlineColor : FreeDo.Color.WHITE,
    	        outlineWidth : 2
    	   },
	    label : { //文字标签
	        text : '大阳村村拆迁区',
	        font : '14pt monospace',
	        style : FreeDo.LabelStyle.FILL_AND_OUTLINE,
	        outlineWidth : 2,
	        verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
	        pixelOffset : new FreeDo.Cartesian2( 0, -9 )   //偏移量
	    }, 
    	polygon : {
            outline : true,
            outlineColor : FreeDo.Color.BLACK,
            hierarchy : {
                positions : FreeDo.Cartesian3.fromDegreesArray([
                	115.97916672149702, 39.0032358412733,
                	115.97462688393176, 38.99830329643379,
                	115.98415452184332, 38.997862520049175,
                	115.98121389025711, 39.00364868091295,
                ]),
            },
            material : new FreeDo.GridMaterialProperty({
                color : FreeDo.Color.ORANGE,
                lineCount : new FreeDo.Cartesian2(15, 0),
                lineThickness : new FreeDo.Cartesian2(1, 1),
                lineOffset :  new FreeDo.Cartesian2(1100.9, 1100.9)
            }),
            height : 10,
            outline : true,
            outlineColor : FreeDo.Color.ORANGE                  
        }
    });

    
    environment.push(chaiqian);
    environment.push(chaiqian1);
    environment.push(chaiqian2);
    environment.push(chaiqian3);
    environment.push(chaiqian4);
    myviewer = this.viewer;
}

EnvironmentViewer.initLeftClick = function(viewer,callback) {

	screenSpaceEventHandler = new FreeDo.ScreenSpaceEventHandler(viewer.canvas);
	
	screenSpaceEventHandler.setInputAction(function(movement){
		var picked = viewer.scene.pick(movement.position);
		if(picked==undefined){
			callback(undefined)
		}else{
		callback(picked);
		}
	}, FreeDo.ScreenSpaceEventType.LEFT_CLICK);
}
//移除原有的监听事件
EnvironmentViewer.removeListener = function(){
	screenSpaceEventHandler.removeInputAction(FreeDo.ScreenSpaceEventType.LEFT_CLICK);
}
EnvironmentViewer.initModels = function () {
    $.ajax({
        url: "pm/selectAll",
        dataType: "JSON",
        success: function (content) {
            var node = null;
            var modelNode = null;
            var modelParentNode = null;//模型缓存中的父节点
            var container = EnvironmentViewer.modelContainer;

            for (var i = 0; i < content.length; i++) {
                node = content[i];

                modelParentNode = container[node.parentId];
                if (modelParentNode == undefined) {
                    modelParentNode = container[node.parentId] = { children: [] };
                }

                //非叶子节点
                if (node.leaf == 0) {
                    modelNode = new EnvironmentViewer.GroupObj(node.id, node.parentId, node.text, node.type);

                    if (container[node.id] != undefined) {
                        modelNode.children = container[node.id].children;
                    }
                } else {
                    var parameter = JSON.parse(node.attributes.parameter);
                    modelNode = new EnvironmentViewer.ModelObj(node.id, node.parentId, node.text, node.type, "static/model/" + parameter.filePath, parameter.lon, parameter.lat, parameter.height-46, parameter.course, parameter.alpha, parameter.roll, parameter.scaleX, parameter.scaleY, parameter.scaleZ);
                }

                container[node.id] = modelNode;

                modelParentNode.children.push(modelNode.id);
               
            }
        }

    });
}