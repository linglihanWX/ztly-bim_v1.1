var SafeThreeViewer = SafeThreeViewer || {};
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
var ceshistate = false;
var modelTile=null;
var myviewer = null;
var screenSpaceEventHandler = null;
window.obj = {};
var jianpiaokou1 = {};
var jianpiaokou1 = {};
var jianpiaokou1 = {};
var zhizhu = {};
var dianti = {};
var anjian = {}
var entitesarray=[];
SafeThreeViewer.EbsObj = function (nodeId, fatherId, type, name, startDatePlan, endDatePlan, startDate, endDate, modelId, leaf) {
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

SafeThreeViewer.ModelObj = function (id, parentId, name, type, url, lon, lat, height, course, alpha, roll, scaleX, scaleY, scaleZ) {
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
    this.primitive = SafeThreeViewer.viewer.scene.primitives.add(FreeDo.Model.fromGltf(
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

SafeThreeViewer.GroupObj = function (id, parentId, name, type) {
    this.id = id;
    this.parentId = parentId;
    this.name = name;
    this.type = type;
    this.children = [];
}

SafeThreeViewer.getTiandituGloble =function() {
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
SafeThreeViewer.init = function (earthId,baseImageryProvider) {
	if(!ceshistate){
		
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
		
		this.viewer.scene.globe.depthTestAgainstTerrain = true;

		modelTile = this.viewer.scene.primitives.add(new FreeDo.FreedoPModelset({
			url: "./static/model/tanggu_new"
		}));
		
	/*	modelTile = this.viewer.scene.primitives.add(new FreeDo.FreedoPModelset({
			url: 'http://gbim360.com:9999/chenchunmei/PModel/170905_GHP/GHP'
		}));*/
		jianpiaokou1 = this.viewer.entities.add( {  
		    name : '图标',  
		    position : new FreeDo.Cartesian3.fromDegrees(117.6549657186326, 39.028695707158185, -8.132962020111965),  
	        show : false,
		    label : { //文字标签  
		        text : '序号：1\nWBS名称：1号 检票口\n存在隐患：易燃物品堆放\n隐患等级：一级',  
		        font : '17px sans-serif', 
		        style : FreeDo.LabelStyle.FILL,  
		        fillColor:FreeDo.Color.BLACK,
		        verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
		        pixelOffset : new FreeDo.Cartesian2( 0, -9 ) ,  //偏移量 
				backgroundColor:FreeDo.Color.RED,
				showBackground:true
		    },
		 
		} );  
		jianpiaokou2 = this.viewer.entities.add( {  
			name : '图标',  
			position : new FreeDo.Cartesian3.fromDegrees(117.65485736335727, 39.0288385898898, -8.38655418030589),  
			show : false,
			label : { //文字标签  
				text : '序号：2\nWBS名称：2号 检票口\n存在隐患：易燃物品堆放\n隐患等级：一级',  
				font : '17px sans-serif',  
				style : FreeDo.LabelStyle.FILL,  
				fillColor:FreeDo.Color.BLACK,
				verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
				pixelOffset : new FreeDo.Cartesian2( 0, -9 ) ,  //偏移量 
				backgroundColor:FreeDo.Color.RED,
				showBackground:true
			},
			
		} );  
		jianpiaokou3 = this.viewer.entities.add( {  
			name : '图标',  
			position : new FreeDo.Cartesian3.fromDegrees(117.65457686483425, 39.02889521820999, -8.618923689085566), 
			show : false,
			label : { //文字标签  
				text : '序号：3\nWBS名称：3号 检票口\n存在隐患：易燃物品堆放\n隐患等级：一级',  
				font : '17px sans-serif', 
				style : FreeDo.LabelStyle.FILL,  
				fillColor:FreeDo.Color.BLACK,
				verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
				pixelOffset : new FreeDo.Cartesian2( 0, -9 ) ,  //偏移量 
				backgroundColor:FreeDo.Color.RED,
				showBackground:true
			},
			
		} );  
		zhizhu = this.viewer.entities.add( {  
			name : '图标',  
			position : new FreeDo.Cartesian3.fromDegrees(117.65469785633918, 39.02877723478264, -8.868876746473855),  
			show : false,
			label : { //文字标签  
				text : '序号：4\nWBS名称：1号 支柱\n存在隐患：支柱裂纹\n隐患等级：二级',  
				font : '17px sans-serif', 
				style : FreeDo.LabelStyle.FILL,  
				fillColor:FreeDo.Color.BLACK,
				verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
				pixelOffset : new FreeDo.Cartesian2( 0, -9 ) ,  //偏移量 
				backgroundColor:FreeDo.Color.ORANGE,
				showBackground:true
			},
			
		} );  
		dianti = this.viewer.entities.add( {  
			name : '图标',  
			position : new FreeDo.Cartesian3.fromDegrees(117.65492075292256, 39.028788237667136, -8.524780241824177), 
			show : false,
			label : { //文字标签  
				text : '序号：5\nWBS名称：1号 电梯\n存在隐患：电梯漏电\n隐患等级：三级',  
				font : '17px sans-serif',  
				style : FreeDo.LabelStyle.FILL,  
				fillColor:FreeDo.Color.BLACK,
				verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
				pixelOffset : new FreeDo.Cartesian2( 0, -9 ) ,  //偏移量 
				backgroundColor:FreeDo.Color.YELLOW,
				showBackground:true
			},
			
		} ); 
		anjian = this.viewer.entities.add( {  
			name : '图标',  
			position : new FreeDo.Cartesian3.fromDegrees(117.65502555728834, 39.02881290009245, -7.155497368460313), 
			show : false,
			label : { //文字标签  
				text : '序号：1\n整改编号：JRXM-JCHC\n整改情况：整改中\n整改日期：2016-09-09',  
				font : '17px sans-serif',  
				style : FreeDo.LabelStyle.FILL,  
				fillColor:FreeDo.Color.BLACK,
				verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
				pixelOffset : new FreeDo.Cartesian2( 0, -9 ) ,  //偏移量 
				backgroundColor:FreeDo.Color.BLUE,
				showBackground:true
			},
			
		} ); 
		entitesarray.push(jianpiaokou1);
		entitesarray.push(jianpiaokou2);
		entitesarray.push(jianpiaokou3);
		entitesarray.push(zhizhu);
		entitesarray.push(dianti);
		entitesarray.push(anjian);
		/*var lon = 116.61110999999998;
		var lat = 39.94217000000001;*/
		var lon = 117.6610063067;
		var lat = 39.0296251212;
		
		var  cartesian  =   new FreeDo.Cartesian3.fromDegrees(118.4799594564051, 24.663425907467902,500);


		ceshistate =true;
		//SafeThreeViewer.right(window.merightclick);
		var imageMaterial = new FreeDo.ImageMaterialProperty ({
			image : "./static/page/designcoordination/mainbuilding/img/drawing1.png",
			repeat : new FreeDo.Cartesian2(1.0, 1.0),
			transparent : true,
		});
		
/*		var imageEntity = this.viewer.entities.add({
				show:true,
			    rectangle : {
			        coordinates : FreeDo.Rectangle.fromDegrees(lon, lat, lon+0.0078, lat+0.00333),
			        outline : true,
			        outlineColor : FreeDo.Color.WHITE,
			        outlineWidth : 4,
			        height : 20,
			        rotation : FreeDo.Math.toRadians(0),
			        stRotation : FreeDo.Math.toRadians(180),
			        material : imageMaterial,
			    },
			});*/
		myviewer = this.viewer;
		modelTile.readyPromise.then(function() {
			moveModel(modelTile,-80,20,-23,15,0,0,1,1,1);
		});
		
		$("#shuchuceshi").click(function() {
			console.log(myviewer.camera);
		})
	}
}

var shuxingshuju = [
		{id:"4",componentId:"f9d881e3-914b-11e7-350c-41f03c953867",position:{x: -2194085.358357283, y: 4378020.501802686, z: 4073309.593950244,h:5.35265519096344,p:-0.957659926884252,r:6.278567474111711}},
		{id:"3",componentId:"ed72d504-914b-11e7-350c-41f03c953867",position:{x: -2195060.2573393, y: 4378576.951533875, z: 4073663.174259837,h:5.352722440967762,p:-0.9575901024379618,r:6.2785770863994745}},
		{id:"7",componentId:"ed779002-914b-11e7-350c-41f03c953867",position:{x: -2193793.6199775375, y: 4377914.767535423, z: 4073137.8297135117,h:5.630378750477897,p:-0.5528137024056186,r:6.280823088992896}},
		{id:"6",componentId:"edc8bd46-914b-11e7-350c-41f03c953867",position:{x: -2193708.6772762756, y: 4377904.534220799, z: 4073202.5056291255,h:1.994404289117547,p:-0.6097462455837199,r:0.0036707497876156125}},
		{id:"8",componentId:"f4af8dd0-914b-11e7-350c-41f03c953867",position:{x: -2193811.879911349, y: 4377879.3756989, z: 4073278.261950106,h:2.484639075410328,p:-0.7742439563807868,r:0.0028153183111001567}},
		{id:"9",componentId:"f71913d4-914b-11e7-350c-41f03c953867",position:{x: -2193752.736986991, y: 4377917.714569312, z: 4073448.8325745175,h:3.176375399572854,p:-0.8374943559959638,r:6.283014252876068}},
	];

SafeThreeViewer.changechoserow = function(row){
	if(ceshistate&&modelTile){
		for(i in shuxingshuju){
			if(shuxingshuju[i].id==row.id){
				var componentId = shuxingshuju[i].componentId;
				var redStyle = new FreeDo.FreedoPModelStyle({color: {conditions: [["${component} === \'" + componentId + "\'", "color('red')"],["true", "color('white')"]]}});
				modelTile.style=redStyle;
				this.viewer.camera.flyTo({
					destination : new FreeDo.Cartesian3(shuxingshuju[i].position.x, shuxingshuju[i].position.y, shuxingshuju[i].position.z),
					orientation: {
						heading : shuxingshuju[i].position.h,
						pitch : shuxingshuju[i].position.p,
						roll : shuxingshuju[i].position.r
					}
				});
			}
		}

	}
}
/*var catchModelTile =null;
SafeThreeViewer.right = function (callback) {
	var selectComponentEventType = FreeDo.ScreenSpaceEventType.RIGHT_CLICK;
    //var selectComponentEventType = FreeDo.ScreenSpaceEventType.LEFT_DOUBLE_CLICK;
    var that = this;
    this.screenSpaceEventHandler = new FreeDo.ScreenSpaceEventHandler(this.viewer.canvas);
    this.screenSpaceEventHandler.setInputAction(function (movement) {
    	 var picked = myviewer.scene.pick(movement.position);
         if (FreeDo.defined(picked) && picked instanceof FreeDo.FreedoPModelFeature) {
             var id = picked.getProperty('component');
             if (FreeDo.defined(id)) {
            	 var menu = document.getElementById("menu");
	            //var event = event || window.event;
	            menu.style.display = "block";
	            menu.style.left = movement.position.x+140+"px";
	            menu.style.top = movement.position.y+55+"px";
	            //catchModelTile.push(picked);
	            catchModelTile=id;
             }
         }
    }, selectComponentEventType);
}*/

SafeThreeViewer.showAllModelTile = function() {
	/*for(i in catchModelTile){
		catchModelTile[i].show=true;
	}
	catchModelTile=null;*/
}
/*$(".hideModel").click(function () {
	if(catchModelTile){
		catchModelTile.show= false;
	}
	$("#menu").hide();
});
$(".showModel").click(function () {
    console.log(2);
    $("#menu").hide();
});*/

SafeThreeViewer.changeColorById =function(uid){

	var showhide = new FreeDo.FreedoPModelStyle({
	    color: {
	      conditions:uid                        		
	    }
	  });
	modelTile.style = showhide;
}

SafeThreeViewer.fly = function(x,y,z,heading,pitch,roll,labelleft,labeltop){
	myviewer.camera.setView({
		destination :new FreeDo.Cartesian3(x,y,z),
		orientation: {
			heading : heading,
			pitch : pitch,
			roll : roll
		}/*,
		complete:function(){
			$("#showmsg").css({
				"left" : labelleft,
				"top" : labeltop,
				"z-index" : 1
			}).show();
		}*/
	})
}
SafeThreeViewer.initLeftClick = function(viewer) {
	screenSpaceEventHandler = new FreeDo.ScreenSpaceEventHandler(viewer.canvas);
	screenSpaceEventHandler.setInputAction(function(movement){
		/*var picked = viewer.scene.pick(movement.position);
		var pick = new FreeDo.Cartesian2(movement.position.x,movement.position.y);
		var cartesian = viewer.camera.pickEllipsoid(pick,viewer.scene.globe.ellipsoid);*/
        var cartesian = new FreeDo.Cartesian3(-2302786.784515869,4394540.396317855,3994816.9435913595);
		var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
		var point=[ cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180,cartographic.height];
		//var id = picked.getProperty('component');
		//console.log(point);
		//记录相机位置
		/*var x = viewer.camera.position.x
		var y = viewer.camera.position.y
		var z = viewer.camera.position.z
		var heading = viewer.camera.heading;
		var pitch = viewer.camera.pitch;
		var roll = viewer.camera.roll;
		console.log(x+","+y+","+z+","+heading+","+pitch+","+roll);*/
	}, FreeDo.ScreenSpaceEventType.LEFT_CLICK);
	

}
//移除原有的监听事件
SafeThreeViewer.removeListener = function(){
	screenSpaceEventHandler.removeInputAction(FreeDo.ScreenSpaceEventType.LEFT_CLICK);
}
SafeThreeViewer.initWheel = function(viewer) {
	screenSpaceEventHandler = new FreeDo.ScreenSpaceEventHandler(viewer.canvas);
	screenSpaceEventHandler.setInputAction(function(movement){
		
	}, FreeDo.ScreenSpaceEventType.WHEEL);
}
SafeThreeViewer.hideAll = function(){
	for ( var i in entitesarray) {
		entitesarray[i].show = false;
	}
};
	/**
	 * [initModels初始化场景中的模型]
	 * @return {[type]} [description]
	 */
SafeThreeViewer.initModels = function () {
    $.ajax({
        url: "http://182.92.7.32:9510/ProjectManage/pm/selectAll",
        dataType: "JSON",
        success: function (content) {
            var node = null;
            var modelNode = null;
            var modelParentNode = null;//模型缓存中的父节点
            var container = SafeThreeViewer.modelContainer;

            for (var i = 0; i < content.length; i++) {
                node = content[i];

                modelParentNode = container[node.parentId];
                if (modelParentNode == undefined) {
                    modelParentNode = container[node.parentId] = { children: [] };
                }

                //非叶子节点
                if (node.leaf == 0) {
                    modelNode = new SafeThreeViewer.GroupObj(node.id, node.parentId, node.text, node.type);

                    if (container[node.id] != undefined) {
                        modelNode.children = container[node.id].children;
                    }
                } else {
                    var parameter = JSON.parse(node.attributes.parameter);
                    modelNode = new SafeThreeViewer.ModelObj(node.id, node.parentId, node.text, node.type, "http://182.92.7.32:9510/ProjectManage/models/" + parameter.filePath, parameter.lon, parameter.lat, parameter.height, parameter.course, parameter.alpha, parameter.roll, parameter.scaleX, parameter.scaleY, parameter.scaleZ);
                }

                container[node.id] = modelNode;

                modelParentNode.children.push(modelNode.id);
               
            }
            console.log(container);
        }

    });
}