var MainBuildingViewer = MainBuildingViewer || {};
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
var tuceng =[];
var imageEntity1 = {};
var imageEntity2 = {};
var imageEntity3 = {};
var downuppoints = [];
window.obj = {};
MainBuildingViewer.EbsObj = function (nodeId, fatherId, type, name, startDatePlan, endDatePlan, startDate, endDate, modelId, leaf) {
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

MainBuildingViewer.ModelObj = function (id, parentId, name, type, url, lon, lat, height, course, alpha, roll, scaleX, scaleY, scaleZ) {
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
    this.primitive = MainBuildingViewer.viewer.scene.primitives.add(FreeDo.Model.fromGltf(
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

MainBuildingViewer.GroupObj = function (id, parentId, name, type) {
    this.id = id;
    this.parentId = parentId;
    this.name = name;
    this.type = type;
    this.children = [];
}

MainBuildingViewer.init = function (earthId,baseImageryProvider) {
	if(!ceshistate){
		
		this.modelContainer = this.modelContainer || {};//未来保存加载的模型的容器，便于快速访问
		this.ebsContainer = this.ebsContainer || {};
		this.timeArray = this.timeArray || [];//保存了按时间排序的Ebs叶子节点
		this.timeIndex = 0;
		this.showEbsContainer = this.showEbsContainer || {};//保存了当前时间点中显示出来的Ebs节点对应的模型
		this.viewer = this.viewer || {};
		
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
		ceshistate =true;
		MainBuildingViewer.right(window.merightclick);
		var imageMaterial1 = new FreeDo.ImageMaterialProperty ({
			image : "./static/page/designcoordination/mainbuilding/img/tuzhi/jiegoupingmiantu1.png",
			repeat : new FreeDo.Cartesian2(1.0, 1.0),
			transparent : true,
		});
		var imageMaterial2 = new FreeDo.ImageMaterialProperty ({
			image : "./static/page/designcoordination/mainbuilding/img/tuzhi/shebeipingmiantu1.png",
			repeat : new FreeDo.Cartesian2(1.0, 1.0),
			transparent : true,
		});
		var imageMaterial3 = new FreeDo.ImageMaterialProperty ({
			image : "./static/page/designcoordination/mainbuilding/img/tuzhi/zhantingpingmiantu1.png",
			repeat : new FreeDo.Cartesian2(1.0, 1.0),
			transparent : true,
		});
		var lon1 = 117.65387630669996;
		var lat1 = 39.02828312119988;
		imageEntity1 = this.viewer.entities.add({
				show:true,
			    rectangle : {
			        coordinates : FreeDo.Rectangle.fromDegrees(lon1, lat1, lon1+0.0020, lat1+0.0009),
			        outline : true,
			        outlineColor : FreeDo.Color.WHITE,
			        outlineWidth : 4,
			        height : 20,
			        rotation : FreeDo.Math.toRadians(168),
			        stRotation : FreeDo.Math.toRadians(168+180),
			        material : imageMaterial1,
			    },
			});
		var lon2 = 117.65387630669996;
		var lat2 = 39.02828312119988;
		imageEntity2 = this.viewer.entities.add({
			show:true,
			rectangle : {
				coordinates : FreeDo.Rectangle.fromDegrees(lon2, lat2, lon2+0.0020, lat2+0.0009),
				outline : true,
				outlineColor : FreeDo.Color.WHITE,
				outlineWidth : 4,
				height : 20,
				rotation : FreeDo.Math.toRadians(168),
				stRotation : FreeDo.Math.toRadians(168+180),
				material : imageMaterial2,
			},
		});
		var lon3 = 117.65357630669989;
		var lat3 = 39.028213121199855;
		imageEntity3 = this.viewer.entities.add({
			show:true,
			rectangle : {
				coordinates : FreeDo.Rectangle.fromDegrees(lon3, lat3, lon3+0.0025, lat3+0.0012),
				outline : true,
				outlineColor : FreeDo.Color.WHITE,
				outlineWidth : 4,
				height : 20,
				rotation : FreeDo.Math.toRadians(168),
				stRotation : FreeDo.Math.toRadians(168+180),
				material : imageMaterial3,
			},
		});
		
		var hospital1 = this.viewer.entities.add( {  
		    name : '医院1',  
		    position : FreeDo.Cartesian3.fromDegrees( 117.65406261508599,39.0299073545233,15 ),  
		    point : { //点  
		        pixelSize : 5,  
		        color : FreeDo.Color.RED,  
		        outlineColor : FreeDo.Color.WHITE,  
		        outlineWidth : 2  
		    },  
		    label : { //文字标签  
		        text : '天津医科大学总医院',  
		        font : '14pt monospace',  
		        style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
		        outlineWidth : 2,  
		        verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
		        pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
		    },  
		    billboard : { //图标  
		        image : "static/page/designcoordination/mainbuilding/img/tuceng/hispital.svg",  
		        width : 50,  
		        height : 50  
		    },  
		} );
		var hospital2 = this.viewer.entities.add( {  
			name : '医院2',  
			position : FreeDo.Cartesian3.fromDegrees( 117.6524968652495,39.02839132165448,15 ),  
			point : { //点  
				pixelSize : 5,  
				color : FreeDo.Color.RED,  
				outlineColor : FreeDo.Color.WHITE,  
				outlineWidth : 2  
			},  
			label : { //文字标签  
				text : '天津海河医院',  
				font : '14pt monospace',  
				style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
				outlineWidth : 2,  
				verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
				pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
			},  
			billboard : { //图标  
				image : "static/page/designcoordination/mainbuilding/img/tuceng/hispital.svg",  
				width : 50,  
				height : 50  
			},  
		} );
		var police1 = this.viewer.entities.add( {  
			name : '警察局1',  
			position : FreeDo.Cartesian3.fromDegrees( 117.65575555770128, 39.03009236445744,15 ),  
			point : { //点  
				pixelSize : 5,  
				color : FreeDo.Color.RED,  
				outlineColor : FreeDo.Color.WHITE,  
				outlineWidth : 2  
			},  
			label : { //文字标签  
				text : '天津西车站派出所',  
				font : '14pt monospace',  
				style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
				outlineWidth : 2,  
				verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
				pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
			},  
			billboard : { //图标  
				image : "static/page/designcoordination/mainbuilding/img/tuceng/police.svg",  
				width : 50,  
				height : 50  
			},  
		} );
		var police2 = this.viewer.entities.add( {  
			name : '警察局2',  
			position : FreeDo.Cartesian3.fromDegrees( 117.65346121985428, 39.02767696856126,15 ),  
			point : { //点  
				pixelSize : 5,  
				color : FreeDo.Color.RED,  
				outlineColor : FreeDo.Color.WHITE,  
				outlineWidth : 2  
			},  
			label : { //文字标签  
				text : '天津下瓦房派出所',  
				font : '14pt monospace',  
				style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
				outlineWidth : 2,  
				verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
				pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
			},  
			billboard : { //图标  
				image : "static/page/designcoordination/mainbuilding/img/tuceng/police.svg",  
				width : 50,  
				height : 50  
			},  
		} );
		var fire1 = this.viewer.entities.add( {  
			name : '消防局1',  
			position : FreeDo.Cartesian3.fromDegrees(117.65530601763803, 39.02779377137312,15 ),  
			point : { //点  
				pixelSize : 5,  
				color : FreeDo.Color.RED,  
				outlineColor : FreeDo.Color.WHITE,  
				outlineWidth : 2  
			},  
			label : { //文字标签  
				text : '天津市公安消防局',  
				font : '14pt monospace',  
				style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
				outlineWidth : 2,  
				verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
				pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
			},  
			billboard : { //图标  
				image : "static/page/designcoordination/mainbuilding/img/tuceng/firecontrol.svg",  
				width : 50,  
				height : 50  
			},  
		} );
		var fire2 = this.viewer.entities.add( {  
			name : '消防局2',  
			position : FreeDo.Cartesian3.fromDegrees(117.65808325960933, 39.030095945865426,15 ),  
			point : { //点  
				pixelSize : 5,  
				color : FreeDo.Color.RED,  
				outlineColor : FreeDo.Color.WHITE,  
				outlineWidth : 2  
			},  
			label : { //文字标签  
				text : '天津市保税区公安消防支队',  
				font : '14pt monospace',  
				style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
				outlineWidth : 2,  
				verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
				pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
			},  
			billboard : { //图标  
				image : "static/page/designcoordination/mainbuilding/img/tuceng/firecontrol.svg",  
				width : 50,  
				height : 50  
			},  
		} );
		var road1 = this.viewer.entities.add( {  
			name : '道路1',  
			position : FreeDo.Cartesian3.fromDegrees(117.6601106774757, 39.0278397440452,1 ),  
			point : { //点  
				pixelSize : 5,  
				color : FreeDo.Color.RED,  
				outlineColor : FreeDo.Color.WHITE,  
				outlineWidth : 2  
			},  
			label : { //文字标签  
				text : '解放北路东方华尔街',  
				font : '14pt monospace',  
				style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
				outlineWidth : 2,  
				verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
				pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
			},
			polygon : {  
		        hierarchy : FreeDo.Cartesian3.fromDegreesArray([
		        	117.63658156506864, 39.03320978417418,  
		        	117.63663657280595, 39.03337380796097,  
		        	117.6720856828493, 39.02536903471689,  
		        	117.6720403445534, 39.02521646994533
		        	]),  
		        //material : 	FreeDo.Color.BLANCHEDALMOND.withAlpha(0.8)
		            material : new FreeDo.GridMaterialProperty({
		                color : FreeDo.Color.BLANCHEDALMOND,
		                lineCount : new FreeDo.Cartesian2(450, 0),
		                lineThickness : new FreeDo.Cartesian2(1, 1),
		                lineOffset :  new FreeDo.Cartesian2(1100.9, 1100.9)
		            }),
		            height : 1,
		            outline : true,
		            outlineColor : FreeDo.Color.BLANCHEDALMOND
		    }
			/*billboard : { //图标  
				image : "static/page/designcoordination/mainbuilding/img/tuceng/road.svg",  
				width : 50,  
				height : 50  
			},*/  
		} );
		var road2 = this.viewer.entities.add( {  
			name : '道路2',  
			position : FreeDo.Cartesian3.fromDegrees(117.65717660285547, 39.029622371574646,1 ),  
			point : { //点  
				pixelSize : 5,  
				color : FreeDo.Color.RED,  
				outlineColor : FreeDo.Color.WHITE,  
				outlineWidth : 2  
			},  
			label : { //文字标签  
				text : '估衣街',  
				font : '14pt monospace',  
				style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
				outlineWidth : 2,  
				verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
				pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
			}, 
			polygon : {  
		        hierarchy : FreeDo.Cartesian3.fromDegreesArray([117.65974723500142,39.0371200384198,  
		        	117.66011027202251,39.0370471463995,  
		        	117.65481825563658,39.022534013171935,  
		        	117.6543818169068,39.02263156515081]),  
		        //material : 	FreeDo.Color.BLANCHEDALMOND.withAlpha(0.8)
		            material : new FreeDo.GridMaterialProperty({
		                color : FreeDo.Color.BLANCHEDALMOND,
		                lineCount : new FreeDo.Cartesian2(75, 0),
		                lineThickness : new FreeDo.Cartesian2(1, 1),
		                lineOffset :  new FreeDo.Cartesian2(1100.9, 1100.9)
		            }),
		            height : 1,
		            outline : true,
		            outlineColor : FreeDo.Color.BLANCHEDALMOND
		    }
			/*billboard : { //图标  
				image : "static/page/designcoordination/mainbuilding/img/tuceng/road.svg",  
				width : 50,  
				height : 50  
			},*/  
		} );
		var village1 = this.viewer.entities.add( {  
			name : '村庄1',  
			position : FreeDo.Cartesian3.fromDegrees(117.67026677659791, 39.032003373898725,1 ),  
			point : { //点  
				pixelSize : 5,  
				color : FreeDo.Color.RED,  
				outlineColor : FreeDo.Color.WHITE,  
				outlineWidth : 2  
			},  
			label : { //文字标签  
				text : '西井峪村',  
				font : '14pt monospace',  
				style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
				outlineWidth : 2,  
				verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
				pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
			}, 
			polygon : {  
		        hierarchy : FreeDo.Cartesian3.fromDegreesArray([117.66034681966288, 39.03696093054726,  
		        	117.67636015797348, 39.037001994608055,  
		        	117.683610430754, 39.0348536651218,  
		        	117.67875832785094, 39.023853904183326,
		        	117.6572953921832, 39.02884930425908]),  
		       // material : 	FreeDo.Color.AQUAMARINE.withAlpha(0.8)
		            material : new FreeDo.GridMaterialProperty({
		                color : FreeDo.Color.AQUAMARINE,
		                lineCount : new FreeDo.Cartesian2(75, 0),
		                lineThickness : new FreeDo.Cartesian2(1, 1),
		                lineOffset :  new FreeDo.Cartesian2(1100.9, 1100.9)
		            }),
		            height : 1,
		            outline : true,
		            outlineColor : FreeDo.Color.AQUAMARINE
		    }  
			/*billboard : { //图标  
				image : "static/page/designcoordination/mainbuilding/img/tuceng/village.svg",  
				width : 50,  
				height : 50  
			}, */ 
		} );
		var village2 = this.viewer.entities.add( {  
			name : '村庄2',  
			position : FreeDo.Cartesian3.fromDegrees(117.64511517639922, 39.037866096987834,1),  
			point : { //点  
				pixelSize : 5,  
				color : FreeDo.Color.RED,  
				outlineColor : FreeDo.Color.WHITE,  
				outlineWidth : 2  
			},  
			label : { //文字标签  
				text : '崔庄村',  
				font : '14pt monospace',  
				style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
				outlineWidth : 2,  
				verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
				pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
			},  
			polygon : {  
		        hierarchy : FreeDo.Cartesian3.fromDegreesArray([117.65993478164839, 39.03817311220826,
		        	117.65850840699085, 39.04107067581256,
		        	117.64055101073738, 39.04503444119745,
		        	117.63106129257102, 39.04540355836992,
		        	117.62705854783655, 39.04096019521865,
		        	117.62673707271034, 39.03587500050924,
		        	117.65659980243063, 39.02900451182315]),  
		        //material : 	FreeDo.Color.AQUAMARINE.withAlpha(0.8)
		        	 material : new FreeDo.GridMaterialProperty({
			                color : FreeDo.Color.AQUAMARINE,
			                lineCount : new FreeDo.Cartesian2(75, 0),
			                lineThickness : new FreeDo.Cartesian2(1, 1),
			                lineOffset :  new FreeDo.Cartesian2(1100.9, 1100.9)
			            }),
			            height : 1,
			            outline : true,
			            outlineColor : FreeDo.Color.AQUAMARINE
		    }
			 
			/*billboard : { //图标  
				image : "static/page/designcoordination/mainbuilding/img/tuceng/village.svg",  
				width : 50,  
				height : 50  
			}*/
		} );
		var river1 = this.viewer.entities.add( {  
			name : '水系1',  
			position : FreeDo.Cartesian3.fromDegrees(117.65443147101222, 39.02762212630358,1 ),  
			point : { //点  
				pixelSize : 5,  
				color : FreeDo.Color.RED,  
				outlineColor : FreeDo.Color.WHITE,  
				outlineWidth : 2  
			},  
			label : { //文字标签  
				text : '北运河',  
				font : '14pt monospace',  
				style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
				outlineWidth : 2,  
				verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
				pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
			},  
			polygon : {  
		        hierarchy : FreeDo.Cartesian3.fromDegreesArray([
		        	117.653982677402, 39.028091097756,
		        	117.65503969067898, 39.02781802125717,
		        	117.6548674943786, 39.027403095513776,
		        	117.65381412585376, 39.02761683748278]),  
		        //material : 	FreeDo.Color.DEEPSKYBLUE.withAlpha(0.8)
		        	 material : new FreeDo.GridMaterialProperty({
			                color : FreeDo.Color.DEEPSKYBLUE,
			                lineCount : new FreeDo.Cartesian2(25, 0),
			                lineThickness : new FreeDo.Cartesian2(1, 1),
			                lineOffset :  new FreeDo.Cartesian2(1100.9, 1100.9)
			            }),
			            height : 1,
			            outline : true,
			            outlineColor : FreeDo.Color.DEEPSKYBLUE
		    }
			/*billboard : { //图标  
				image : "static/page/designcoordination/mainbuilding/img/tuceng/river.svg",  
				width : 50,  
				height : 50  
			}, */ 
		} );
		var river2 = this.viewer.entities.add( {  
			name : '水系2',  
			position : FreeDo.Cartesian3.fromDegrees(117.65066204707234, 39.02692651335879,1 ),  
			point : { //点  
				pixelSize : 5,  
				color : FreeDo.Color.RED,  
				outlineColor : FreeDo.Color.WHITE,  
				outlineWidth : 2  
			},  
			label : { //文字标签  
				text : '海河',  
				font : '14pt monospace',  
				style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
				outlineWidth : 2,  
				verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
				pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
			},  
			polygon : {  
		        hierarchy : FreeDo.Cartesian3.fromDegreesArray([117.65066927457492, 39.02795259702767,
		        	117.65147178875964, 39.02776766347203,
		        	117.6505447513961, 39.025518921564206,
		        	117.64983000414954, 39.025622293822636,
		        	117.6496401353364, 39.02545125718353,
		        	117.64809849977627, 39.02572863893886,
		        	117.64835503758722, 39.02636789492214,
		        	117.64976244099792, 39.025852710459255]),  
		       // material : 	FreeDo.Color.DEEPSKYBLUE.withAlpha(0.8)
		        	 material : new FreeDo.GridMaterialProperty({
			                color : FreeDo.Color.DEEPSKYBLUE,
			                lineCount : new FreeDo.Cartesian2(50, 0),
			                lineThickness : new FreeDo.Cartesian2(1, 1),
			                lineOffset :  new FreeDo.Cartesian2(1100.9, 1100.9)
			            }),
			            height : 1,
			            outline : true,
			            outlineColor : FreeDo.Color.DEEPSKYBLUE
		    }
/*			billboard : { //图标  
				image : "static/page/designcoordination/mainbuilding/img/tuceng/river.svg",  
				width : 50,  
				height : 50  
			},*/  
		} );
		tuceng.push(hospital1);
		tuceng.push(hospital2);
		tuceng.push(police1);
		tuceng.push(police2);
		tuceng.push(fire1);
		tuceng.push(fire2);
		tuceng.push(road1);
		tuceng.push(road2);
		tuceng.push(river1);
		tuceng.push(river2);
		tuceng.push(village1);
		tuceng.push(village2);
		myviewer = this.viewer;
		modelTile.readyPromise.then(function() {
			moveModel(modelTile,-80,20,-23,15,0,0,1,1,1);
		});
		
		$("#zongduanmian").click(function() {
			lon+=0.001;
			imageEntity.rectangle.coordinates = FreeDo.Rectangle.fromDegrees(lon, lat, lon+0.0078, lat+0.00333);
		});
		$("#zhixianceliang").click(function() {
			lat+=0.001;
			imageEntity.rectangle.coordinates = FreeDo.Rectangle.fromDegrees(lon, lat, lon+0.0078, lat+0.00333);
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

MainBuildingViewer.changechoserow = function(row){
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
var catchModelTile =null;
MainBuildingViewer.right = function (callback) {
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
	            //catchModelTile.push(picked);1
	            catchModelTile=id;
             }
         }
    }, selectComponentEventType);
}

MainBuildingViewer.showHideModelsById =function(uid){

	var showhide = new FreeDo.FreedoPModelStyle({
	    show: {
	      conditions:uid                        		
	
	    }
	  });
	modelTile.style = showhide;
}
//左键点击事件
MainBuildingViewer.initLeftClick = function(viewer) {
	var screenSpaceEventHandler = new FreeDo.ScreenSpaceEventHandler(viewer.canvas);
	screenSpaceEventHandler.setInputAction(function(movement){
		var picked = viewer.scene.pick(movement.position);
		var pick= new FreeDo.Cartesian2(movement.position.x,movement.position.y);
		var cartesian = viewer.camera.pickEllipsoid(pick, viewer.scene.globe.ellipsoid);
		var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
		var point=[ cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180];
		console.log(point);
		var x = viewer.camera.position.x
		var y = viewer.camera.position.y
		var z = viewer.camera.position.z
		var heading = viewer.camera.heading;
		var pitch = viewer.camera.pitch;
		var roll = viewer.camera.roll;
		//console.log(x+","+y+","+z+","+heading+","+pitch+","+roll);
	}, FreeDo.ScreenSpaceEventType.LEFT_CLICK);
	

}
//右键点击事件
MainBuildingViewer.initRightClick = function(viewer) {
	var screenSpaceEventHandler = new FreeDo.ScreenSpaceEventHandler(viewer.canvas);
	screenSpaceEventHandler.setInputAction(function(movement){
		$("#menu").hide();
		var picked = viewer.scene.pick(movement.position);
		if(picked){
			if(picked instanceof FreeDo.FreedoPModelFeature){
				console.log(picked);
				$("#menu").css({
					left:movement.position.x+130,
					top:movement.position.y+110
				}).show();
			}else{
				$("#menu").hide();
			}
		}else{
			$("#menu").hide();
		}
	}, FreeDo.ScreenSpaceEventType.RIGHT_CLICK);	
}
/**
 * [initModels初始化场景中的模型]
 * @return {[type]} [description]
 */
MainBuildingViewer.initModels = function () {
    $.ajax({
        url: "http://182.92.7.32:9510/ProjectManage/pm/selectAll",
        dataType: "JSON",
        success: function (content) {
            var node = null;
            var modelNode = null;
            var modelParentNode = null;//模型缓存中的父节点
            var container = MainBuildingViewer.modelContainer;

            for (var i = 0; i < content.length; i++) {
                node = content[i];

                modelParentNode = container[node.parentId];
                if (modelParentNode == undefined) {
                    modelParentNode = container[node.parentId] = { children: [] };
                }

                //非叶子节点
                if (node.leaf == 0) {
                    modelNode = new MainBuildingViewer.GroupObj(node.id, node.parentId, node.text, node.type);

                    if (container[node.id] != undefined) {
                        modelNode.children = container[node.id].children;
                    }
                } else {
                    var parameter = JSON.parse(node.attributes.parameter);
                    modelNode = new MainBuildingViewer.ModelObj(node.id, node.parentId, node.text, node.type, "http://182.92.7.32:9510/ProjectManage/models/" + parameter.filePath, parameter.lon, parameter.lat, parameter.height, parameter.course, parameter.alpha, parameter.roll, parameter.scaleX, parameter.scaleY, parameter.scaleZ);
                }

                container[node.id] = modelNode;

                modelParentNode.children.push(modelNode.id);
               
            }
            console.log(container);
        }

    });
}
MainBuildingViewer.getTiandituGloble =function() {
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
MainBuildingViewer.manyou=function(arr){
//	三维基础环境。
	m_Viewer = null;
	
	//	上一帧画面对应的系统时间（毫秒）。
	m_LastTime = 0;
	
	//	总的运行时间。
	m_Time = 0;
	
	//	场景管理器。
//	m_Scene = new FDPScene;

	//	脚本。（匀速持续播放）。测试
	m_Script = new FDPScript;

	//	鼠标事件响应函数队列。
	m_MouseMoveEventList = new Array();
	

		//	创建三维环境。
		m_Viewer = this.viewer;
		
		//	屏蔽左下角图标。
		m_Viewer._cesiumWidget._creditContainer.style.display="none";  
		
		if ( m_Viewer == null )
			return false;   
		
		//	初始化项目资源。
		
		
		//	注册渲染循环响应函数。
		//	帧循环事件。
		OnPreRender = function()
		{
			var myDate = new Date();
			var time = myDate.getTime();
			var dt = time - m_LastTime;
			m_LastTime = time;
			m_Time = m_Time+dt;
			
			//	脚本运行。
			m_Script.Run( dt );
		}
		m_Viewer.scene.preRender.addEventListener( OnPreRender ); //?
		
		//	注册鼠标、键盘事件响应。
		//	鼠标移动事件。测试。
		OnMouseMove = function( movement )
		{
			//	按队列顺序执行时间相应函数。
			
			//	获取鼠标移动 距离 dx, dy
			
			//	循环调用鼠标移动响应函数。
			for ( var i = 0; i < m_MouseMoveEventList.length; i++ )
			{
				if ( m_MouseMoveEventList[i](dx, dy) == true )
					break;	//	返回 true 不在继续后续响应。
			}
		}	//	鼠标移动事件。测试。
		OnMouseMove = function( movement )
		{
			//	按队列顺序执行时间相应函数。
			
			//	获取鼠标移动 距离 dx, dy
			
			//	循环调用鼠标移动响应函数。
			for ( var i = 0; i < m_MouseMoveEventList.length; i++ )
			{
				if ( m_MouseMoveEventList[i](dx, dy) == true )
					break;	//	返回 true 不在继续后续响应。
			}
		}
		var handler = new FreeDo.ScreenSpaceEventHandler(m_Viewer.scene.canvas);
		handler.setInputAction( OnMouseMove, FreeDo.ScreenSpaceEventType.MOUSE_MOVE ); //注册鼠标移动事件。		
		//	注册其它鼠标事件。


		//	测试脚本事件。
		var CameraRoute = new FDPAction_Camera_2( m_Viewer.camera, arr);
		
		//	事件加入到脚本。
	
		m_Script.AddAction( CameraRoute );
		m_Script.Start();
		 
		var myDate = new Date();
		m_LastTime = myDate.getTime();
		m_Time = 0;
	

	AddMouseMoveEventFuc = function( eventFunc, Type )
	{	
		//	添加鼠标移动响应函数接口。接口形式为  function( dx, dy ), dx, dy 分别对应该次鼠标移动事件中鼠标移动的x轴和y轴方向上的距离。
		if ( Type == 0 )
			m_MouseMoveEventList.unshift( eventFunc );
		else
			m_MouseMoveEventList( eventFunc );
	}
	
	RemoveMouseMoveEventFuc = function( eventFunc )
	{

	}
	return m_Script;
	
}

MainBuildingViewer.pause = function(script){
	script.Pause();
}
MainBuildingViewer.resume = function(script){
	script.Resume();
}