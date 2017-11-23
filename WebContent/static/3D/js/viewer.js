var FD_Viewer = FD_Viewer||{};
var tilesetshuidianzhan=[];

FD_Viewer.Init = function(ces)
{
	this.container={};

	this.viewer = new FreeDo.Viewer(ces, {
		imageryProvider:new FreeDo.WebMapTileServiceImageryProvider({
	        url: "http://{s}.tianditu.com/img_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
	        layer: "img",
	        style: "default",
	        format: "tiles",
	        tileMatrixSetID: "c",
	        credit: new FreeDo.Credit("天地图全球影像服务"),
	        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
	        tilingScheme: new FreeDo.GeographicTilingScheme(),
	        tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
	        tileDiscardPolicy: new FreeDo.DiscardMissingTileImagePolicy({
	            missingImageUrl: "http://t0.tianditu.com/img_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=c&TileMatrix=19&TileRow=0&TileCol=0&style=default&format=tiles",
	            pixelsToCheck: [new FreeDo.Cartesian2(0, 0), new FreeDo.Cartesian2(120, 140), new FreeDo.Cartesian2(130, 160), new FreeDo.Cartesian2(200, 50), new FreeDo.Cartesian2(200, 200)],
	            disableCheckIfAllPixelsAreTransparent: true
	        })
	    }),
		
		animation : false,
		baseLayerPicker : false,
		fullscreenButton : false,
		geocoder : false,
		homeButton : false,
		infoBox:false,
		sceneModePicker : false,
		timeline : false,
		navigationHelpButton : false,
		navigationInstructionsInitiallyVisible : false,
		scene3DOnly : true,
		selectedImageryProviderViewModel : true,
		/*terrainProvider:new FreedoTerrainProvider({
			"url":"http://182.92.7.32:9090/zdj108.5.33.5/"
		})*/
	});
	
	//获取相机
	var camera = this.viewer.scene.camera;
	var layers = this.viewer.imageryLayers;
	
/*	// 天地图全球影像服务
	var freedoImageryProvider =  new FreeDo.WebMapTileServiceImageryProvider({
        url: "http://{s}.tianditu.com/img_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
        layer: "img",
        style: "default",
        format: "tiles",
        tileMatrixSetID: "c",
        credit: new FreeDo.Credit("天地图全球影像服务"),
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
        maximumLevel: 18,
        tilingScheme: new FreeDo.GeographicTilingScheme(),
        tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
        tileDiscardPolicy: new FreeDo.DiscardMissingTileImagePolicy({
            missingImageUrl: "http://t0.tianditu.com/img_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=c&TileMatrix=19&TileRow=0&TileCol=0&style=default&format=tiles",
            pixelsToCheck: [new FreeDo.Cartesian2(0, 0), new FreeDo.Cartesian2(120, 140), new FreeDo.Cartesian2(130, 160), new FreeDo.Cartesian2(200, 50), new FreeDo.Cartesian2(200, 200)],
            disableCheckIfAllPixelsAreTransparent: true
        }),
		terrainProvider:new FreedoTerrainProvider({
			"url":"http://182.92.7.32:9090/107.108.5.36.7.37.8/"}),
	});*/
//	var freeDoLayer = layers.addImageryProvider(freedoImageryProvider);
	
	// 全球影像中文注记服务（叠加图层）
		this.viewer.imageryLayers.addImageryProvider(new FreeDo.WebMapTileServiceImageryProvider({
	    url: "http://{s}.tianditu.com/cia_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
	    layer: "cia",
	    style: "default",
	    format: "tiles",
	    tileMatrixSetID: "c",
	    maximumLevel: 18,
	    credit: new FreeDo.Credit("全球影像中文注记服务"),
	    subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
	    tilingScheme: new FreeDo.GeographicTilingScheme(),
	    tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19']
	}));
		//this.viewer.globe.depthTestAgainstTerrain  = true; 
	//加载水电站模型
	FD_Viewer.AddShuiDianZhanTile();	
	//加载大桥模型
	FD_Viewer.AddDaQiaoTile();
	
	FD_Viewer.selectComponent();
	
	//FD_Viewer.PinchSelectComponent();
	
	FD_Viewer.CreateToolBox();
	 
}

//查询模型属性数据
FD_Viewer.queryModelInfo = function(id){
	$.ajax(
	{
		url:"ModelInfo",
		type:"GET",
		data: 
        {
			uid: id
        },
		success:function(content)
		{
			//var contentJson = JSON.parse(content);
			alertBox({
                title: '部件查询',
                titleShow: true,
                content: '<ul><li><span>ID: '+id+'</span></li><li>Name: '+content.Name+'</li><li>position:</li><li>station:</li><li>material:</li><li>volumn:  0</li><li>Quantity:  0</li></ul>',
                spaceHide: true
            });
		  }
	  })	  
}

var selectedComponent = undefined;
FD_Viewer.selectComponent = function () {
	var selectComponentEventType = FreeDo.ScreenSpaceEventType.LEFT_CLICK;
    //var selectComponentEventType = FreeDo.ScreenSpaceEventType.LEFT_DOUBLE_CLICK;
    var that = this;
    this.screenSpaceEventHandler = new FreeDo.ScreenSpaceEventHandler(this.viewer.canvas);
    this.screenSpaceEventHandler.setInputAction(function (movement) {
    	 clearSelected();
    	 var picked = FD_Viewer.viewer.scene.pick(movement.position);
         if (FreeDo.defined(picked) && picked instanceof FreeDo.FreeDoPModelFeature) {
             var id = picked.getProperty('component');
             if (FreeDo.defined(id)) {
                 setSelected(id);
                 console.log(picked);
                 console.log(id);
                 FD_Viewer.queryModelInfo(id);
             }
         }
    }, selectComponentEventType);
}

function clearSelected() {
    if (!FreeDo.defined(selectedComponent))
        return;
    selectedComponent = undefined;
    for (var i = 0; i < tilesetshuidianzhan.length; i++) {
    	tilesetshuidianzhan[i].style = new FreeDo.FreeDoPModelStyle();
    }
}

function setSelected(id) {
    if (id === selectedComponent)
        return;
    selectedComponent = id;
    for (var i = 0; i < tilesetshuidianzhan.length; i++) {
    	tilesetshuidianzhan[i].style = new FreeDo.FreeDoPModelStyle({
            color: {
                conditions: [
                    ["${component} === \'" + selectedComponent + "\'", "color('red')"],
                    ["true", "color('white')"]
                ]
            }
        });
    }
}

function setSelectedStyle(id, tileset) {
	  tileset.style = new Cesium.Cesium3DTileStyle({
	    color: {
	      conditions: [
	        ["${component} === \'" + id + "\'", "color('red')"],
	        ["true", "color('white')"]
	      ]
	    }
	  });
	}

FD_Viewer.CreateToolBox = function(){
	// 初始化工具栏
    var toolButtonMetadatas = [
        {
            tooltip: '场景树管理',
            activeTooltip: '场景树管理',
            toggleActive: true,
            exclusiveActive: true,
            onActive: function () {
            	$("#left").toggle(1000); 
            },
            onInactive: function () {
            	$("#left").toggle(1000);
            },
            onAction: function() {}
        },
        {
            tooltip: '定位到水电站模型',
            activeTooltip: '定位到水电站模型',
            toggleActive: false,
            exclusiveActive: false,
            onActive: function () {
            	
            },
            onInactive: function () {},
            onAction: function() {
            	FD_Viewer.FlyToShuiDianZhan();
            	//FD_Viewer.AddFlyRoute();
            }
        },
        {
            tooltip: '定位到大桥',
            activeTooltip: '定位到大桥',
            toggleActive: true,
            exclusiveActive: true,
            onActive: function () {
            	//FD_Viewer.AddFlyRoute();
            	//FD_Viewer.FlyTowode();
            	FD_Viewer.FlyToDaQiao();
                /*checkComponent.inactivate();
                surveyManager.setSurveyType(SurveyType.LINE_DISTANCE);*/
            },
            onInactive: function () {
               /* surveyManager.setSurveyType(SurveyType.NONE);
                checkComponent.activate();*/
            },
            onAction: function() {}
        },
        {
            tooltip: '视角漫游',
            activeTooltip: '视角漫游',
            toggleActive: true,
            exclusiveActive: true,
            onActive: function () {
            	FD_Viewer.LoopFlyGivenPoint();
            },
            onInactive: function () {
            	FD_Viewer.LoopFlyGivenPoint();
            },
            onAction: function() {}
        },
    ];
    var toolbar = new ToolBar("toolBox", toolButtonMetadatas, {
        globalClearFunc: function(){}
    });
}

//var flyRoute1=[];

FD_Viewer.AddFlyRoute = function(){
	var longht=this.viewer.camera.positionCartographic.longitude*FreeDo.Math.DEGREES_PER_RADIAN ;
	var latitude=this.viewer.camera.positionCartographic.latitude*FreeDo.Math.DEGREES_PER_RADIAN ;
	var data = {
		lon : longht,
		lat: latitude,
		alt: this.viewer.camera.positionCartographic.height,
		heading: this.viewer.camera.heading,
		pitch:this.viewer.camera.pitch,
		roll:this.viewer.camera.roll
	};
	//flyRoute1.push(data);
	console.log(data);
}

/*FD_Viewer.FlyTowode = function(){
	this.viewer.camera.flyTo({
        destination : FreeDo.Cartesian3.fromDegrees(flyRoute1[0].lon, flyRoute1[0].lat, flyRoute1[0].height),
        orientation: {
            heading : flyRoute1[0].heading,
            pitch : flyRoute1[0].pitch,
            roll : flyRoute1[0].roll
        }
    });
}*/

function loadReady() {
	var bodyH = demoIframe.contents().find("body").get(0).scrollHeight,
	htmlH = demoIframe.contents().find("html").get(0).scrollHeight,
	maxH = Math.max(bodyH, htmlH), minH = Math.min(bodyH, htmlH),
	h = demoIframe.height() >= maxH ? minH:maxH ;
	if (h < 530) h = 530;
	demoIframe.height(h);
}

//加载水电站模型
FD_Viewer.AddShuiDianZhanTile =	function () {	
	var shuidianzhanTile=['http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-jianzhu-dixiabiandianzhan',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-jianzhu-dixiafadian',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-jinjie-1_xiehongpaishadong',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-jinjie-2_xiehongpaishadong',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-jinjie-dixiafadian',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-jinjie-weishuisuidong',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-jinjie-yihongdao',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-jinjie-yinshuisuidong',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-shigong-shigonglinshitongdao',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-shigong-weiyan',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-shuigong-1_xiehongpaishadong',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-shuigong-2_xiehongpaishadong',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-shuigong-dixiabiandianzhan',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-shuigong-dixiafadian',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-shuigong-fushudongshi',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-shuigong-kaiguanzhan',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-shuigong-lanshaba',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-shuigong-shangkumianbanba',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-shuigong-shangkupen',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-shuigong-weishuiliang',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-shuigong-weishuisuidong',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-shuigong-xiakubushuixitong',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-shuigong-xiakumianbanba',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-shuigong-yihongdao',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-shuigong-yinshuisuidong',
		'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-C-zch-shuiji-dixiabiandianzha'];
	var tileset1 = this.viewer.scene.primitives.add(new FreeDo.FreeDoPModelset({
		 id:"ZAN-00-000-000-3KW-000-C11",
		 url:'http://182.92.7.32:9999/xibeiyuan_3dtiles/ZAN-00-000-000-3KW-000-C11'
	 }));
	for(var i=0;i<shuidianzhanTile.length;i++)
		{
			 var tileset1 = this.viewer.scene.primitives.add(new FreeDo.FreeDoPModelset({
				 id:i,
				 url:shuidianzhanTile[i]
			 }));
			 tilesetshuidianzhan.push(tileset1);
		}	 
}

//定位到水电站
FD_Viewer.FlyToShuiDianZhan	=	function () {
	this.viewer.camera.flyTo({
        destination : FreeDo.Cartesian3.fromDegrees(108.646050845925,33.52350312289316,5550),
        orientation: {
            heading : FreeDo.Math.toRadians(0),
            pitch : FreeDo.Math.toRadians(-80.11731850303525),
            roll : 0
        }
    });
}

//加载大桥模型
FD_Viewer.AddDaQiaoTile =	function () {	
	  var tilesetl55 = this.viewer.scene.primitives.add(new FreeDo.FreeDoPModelset({
			 url:'http://freedoonline.com:9999/txf/170626/osgdata69_out'
		 }));
	  tilesetshuidianzhan.push(tilesetl55);
}

//定位到大桥
FD_Viewer.FlyToDaQiao =	function () {
	this.viewer.camera.flyTo({
        destination : FreeDo.Cartesian3.fromDegrees(127.58489821977504, 50.16887844893175, 3110.8503541241002),
        orientation: {
            heading : FreeDo.Math.toRadians(19.231438986554082),
            pitch : FreeDo.Math.toRadians( -42.59496656495594),
            roll : 0
        }
    });
}

//飞行计数
var flyCount=0;
//飞行路径
var flyRoute=[
	{lon:108.6564152056641, lat:33.515511666450685,alt:6247.097433256064,heading:0.000008806105612713111,pitch:-1.398293123854026,roll:6.283183171304749},
	{lon:108.70670708402933, lat:33.52348677622851,alt:3774.315361903379,heading:4.727115019657544,pitch:-0.49379884748435376,roll:6.279678118758195},
	{lon:108.67403362989917, lat:33.520516855096105,alt:1600.500870732104,heading:4.726777604685748,pitch:-0.4935554229305952,roll:6.279740225394994},
	{lon:108.6730018005463, lat:33.522830188796576,alt:1492.7123347506229,heading:5.080793871655668,pitch:-0.1170655356618624,roll:6.2802838520088},
	{lon:108.66786896252724, lat:33.52298307255296,alt:1499.9625484971994,heading:5.18132618082016,pitch:-0.15326704693948456,roll:6.28039697553799},
	{lon:108.66471901333686, lat:33.52370299420056,alt:1500.2091611008293,heading:5.18132618538279,pitch:-0.1532670319758298,roll:6.280396945651962},
	{lon:108.6620501471274, lat:33.52512394564561,alt:1500.6959226501558,heading:5.181326194387534,pitch:-0.15326700244376434,roll:6.280396886669303},
	{lon:108.65967797361502, lat:33.52597068436955,alt:1500.9859866584172,heading:5.181326199752924,pitch:-0.15326698484736379,roll:6.280396851525044},
	{lon:108.65759540486675, lat:33.526210649084874,alt:1505.8444050886465,heading:5.189189905205364,pitch:-0.203944650439136,roll:6.28038259222118},
	{lon:108.65857126469263, lat:33.526647972299195,alt:1582.6713016211975,heading:4.789172183655787,pitch:-0.7035251386888435,roll:6.279146142596737},
	{lon:108.64689265522082, lat:33.527412212601696,alt:3189.194028057696,heading:3.9711549093251772,pitch:-1.064972572835302,roll:6.278496218436835},
	{lon:108.62979300717541, lat:33.513244075574846,alt:1812.9793720977575,heading:0.9221219427773129,pitch:0.021230996346830455,roll:0.00246124466669162},
	{lon:108.64584518978431, lat:33.521171897092856,alt:1519.5910241005959,heading:0.9222809425554654,pitch:0.02150949445260264,roll:0.002429548405533666},
	{lon:108.65535159977509, lat:33.521817914908624,alt:1512.9219593779144,heading:5.7380640619676,pitch:-0.195634333265291,roll:6.281539511123739},
	{lon:108.66618678225714, lat:33.51687994987282,alt:1511.2305375233523,heading:5.738064038624128,pitch:-0.19563452751544497,roll:6.281539631210167},
	{lon:108.66530255062843, lat:33.52050944243294,alt:1461.4339741807062,heading:5.923212984621975,pitch:-0.050827445250036574,roll:6.282095875615818},
	{lon:108.66913774004061, lat:33.51649205525314,alt:1480.383235840979,heading:0.08796739646713636,pitch:-0.10874653884662222,roll:0.0002730102105443777},
]


//视角定位到指定路径
FD_Viewer.FlyToGivenPoint = function(data){
	this.viewer.camera.flyTo({
        destination : FreeDo.Cartesian3.fromDegrees(data.lon, data.lat, data.alt),
        orientation: {
            heading : data.heading,
            pitch : data.pitch,
            roll : data.roll
        }
    });
}



FD_Viewer.LoopFlyGivenPoint = function(){
	if(flyCount>=flyRoute.length){
		flyCount=0;
	}
	FD_Viewer.FlyToGivenPoint(flyRoute[flyCount]);
	flyCount++;
}

//视角切换到指定模型包围盒
FD_Viewer.ZoomToTerrain=function(tilesetTerrain){
	 if (tilesetTerrain.ready) {
	        var boundingSphere = tilesetTerrain.boundingSphere;
	        this.viewer.camera.viewBoundingSphere(boundingSphere, new FreeDo.HeadingPitchRange(0, -2.0, 0));
	        this.viewer.camera.lookAtTransform(FreeDo.Matrix4.IDENTITY);        
	    }
}



//加载模型
FD_Viewer.InitPmodel = function(id,url,height,lon,lat,course,alpha,roll,scaleX,scaleY,scaleZ)
{	
	var modelMatrix = FreeDoTool.getModelMatrix(lon,lat, height, course,alpha,roll,scaleX,scaleY,scaleZ);
	var model = this.viewer.scene.primitives.add(FreeDo.Model.fromGltf(
	{
		url : url,
		show : true,                     // default
		modelMatrix : modelMatrix,
		 // minimumPixelSize : 128,          // never smaller than 128 pixels
         // maximumScale: 20000,             // never larger than 20000 * model size (overrides minimumPixelSize)
        allowPicking : false,            // not pickable
        debugShowBoundingVolume : false, // default
        debugWireframe : false
	}));

	this.container[id]=model;
	
}
//修改模型
FD_Viewer.UpdatePmodelAll=function(obj)
{
	//	通过id获取model，判断有效性
	 var model = this.container[obj.id];
	 FreeDoTool.modelResetPositionOrientationScale(model,obj.lon,obj.lat,obj.height,obj.course,obj.alpha,obj.roll,obj.scaleX,obj.scaleY,obj.scaleZ);
}

//修改数据库模型
FD_Viewer.UpdateDB_Model = function(obj)
{
	var paramer = 
	   {
	        "filePath": obj.filePath,
	        "lon": obj.lon,
	        "lat": obj.lat,
	        "height": obj.height,
	        "course": obj.course,
	        "alpha": obj.alpha,
	        "roll":obj.roll,
	        "scaleX": obj.scaleX,
	        "scaleY": obj.scaleY,
	        "scaleZ": obj.scaleZ
	    };
	if ( obj.type == 1 )
		paramer = "";
	else if ( obj.type == 2 )
	    paramer = JSON.stringify(paramer);
	else
		paramer = "";
	paramer = JSON.stringify(paramer);
	    $.ajax
	    ({
            url: "pm/updateModel",
            type: "POST",
            data: 
           {
        		nodeId:obj.id,
        		fatherNodeId:obj.parentId,
        		name:obj.text,
        		type:obj.type,
        		parameter:paramer,
        		//type:obj.type
            },
           
            success(data) {
                console.log("成功！")
                },
            error(xhr, text, ex) {
                console.log(text)
                }
        })
}

//删除模型
FD_Viewer.removePmodel=function(id)
{
	 this.viewer.entities.removeByid(id);
}
//飞行定位
FD_Viewer.flyToModel=function(id)
{
	var model = this.container[id];
	if ( !model )
		return;
	FreeDoTool.flyToModel(this.viewer.camera,model,1);
}
//添加模型
FD_Viewer.InsterPmodelAll=function()
{
	//FreeDoTool.copy();
}
