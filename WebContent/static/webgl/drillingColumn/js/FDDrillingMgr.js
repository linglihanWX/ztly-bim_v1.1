/**
 * wx
 */
var FDDrillingMgr = function (viewer) {
	var version = "0.0.1";
	var dsc = "用于钻井柱管理";
	var scene = viewer.scene;
	var drillingData = [];
	var playModel = null ;
	var pickedModels = [];
	var clickedColor = new FreeDo.Color(1,3,1,1);
	var unClickedColor =new FreeDo.Color(1,1,1,1);

	function cameraSetView(nowLocation) {
		scene.camera.setView( {  
		    position : FreeDo.Cartesian3.fromDegrees( nowLocation.lon, nowLocation.lat, nowLocation.alt ),//北京100000公里上空  
		    heading : FreeDo.Math.toRadians( nowLocation.heading ),  
		    pitch : FreeDo.Math.toRadians( nowLocation.pitch ),  
		} );  
	}
	
	//添加钻井柱
	function addDrilling(id,  url, lon, lat, height, course, alpha, roll, scaleX, scaleY, scaleZ) {
		    this.id = id;
		    this.url = url;
		    this.lon = lon;
		    this.lat = lat;
		    this.height = height;
		    this.course = course;
		    this.alpha = alpha;
		    this.roll = roll;
		    this.scaleX = scaleX;
		    this.scaleY = scaleY;
		    this.scaleZ = scaleZ;
		    var modelMatrix = getModelMatrix(lon, lat, height, course, alpha, roll, scaleX, scaleY, scaleZ);
		    var primitive = viewer.scene.primitives.add(FreeDo.Model.fromGltf(
		        {
		            id: id,
		            url: url,
		            show: true,                     // default
		            modelMatrix: modelMatrix,
		            allowPicking: true,            // not pickable
		            debugShowBoundingVolume: false, // default
		            debugWireframe: false
		        }));
		  /* flyToModelByModel(lon,lat);*/
		    return primitive;
	}
	
	//定位到模型
	function flyToModelByModel(lon,lat) {
		var camera = viewer.camera;
		 camera.flyTo({  
		        destination : FreeDo.Cartesian3.fromDegrees( lon, lat-0.0014,70 ),  
		        orientation : {  
		            heading : FreeDo.Math.toRadians( 0 ),  
		            pitch : FreeDo.Math.toRadians( -15 ),  
		            roll : FreeDo.Math.toRadians( 0 )  
		        },  
		        duration : 3,//动画持续时间  
		 });
	}
	
	//添加钻井柱描述信息
	function addDsc(id,lon,lat) {
		var citizensBankPark = viewer.entities.add( {  
			id : id,
			name : id,  
			position : FreeDo.Cartesian3.fromDegrees( lon, lat ),  
			label : { //文字标签  
				text : id,  
				font : '14pt monospace',  
				style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
				outlineWidth : 2,  
				verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
				pixelOffset : new FreeDo.Cartesian2( 0, -19 )   //偏移量  
			} , 
			billboard : { 
				image : "static/webgl/drillingColumn/images/1.png",  
				width : 30,  
				height : 30  
			},  
		} );  
	}
	
	var sceneCameraAnimationRenderFunction = function (e,t) {
		if(playModel){
			for(var i =0;i<playModel.model.length;i++){
				if(playModel.model[i].ready){
					// Center in WGS84 coordinates
					var center1 = FreeDo.Matrix4.multiplyByPoint(playModel.model[i].modelMatrix, playModel.model[i].boundingSphere.center, new FreeDo.Cartesian3());
					var cartographic = scene.globe.ellipsoid.cartesianToCartographic(center1);
					if(i==0&&playModel.cacheNowHeight[i]>5){
						scene.preRender.removeEventListener(sceneCameraAnimationRenderFunction);
					}
					var lon = cartographic.longitude / Math.PI * 180;
					var lat = cartographic.latitude / Math.PI * 180;
					var nowScaleZ = playModel.drilling[i].height/10;
					playModel.cacheNowHeight[i] += 2;
					var modelMatrix = getModelMatrix(lon, lat, playModel.cacheNowHeight[i], playModel.position.heading, playModel.position.pitch, playModel.position.roll, playModel.position.scaleR, playModel.position.scaleR, nowScaleZ);
					playModel.model[i].modelMatrix = modelMatrix;
				}
			}
		}
	}
	
	//左键双击事件
	 function leftDoubleClickEvent(callback) {
		var ent= viewer.selectedEntity ;
		var selectComponentEventType = FreeDo.ScreenSpaceEventType.LEFT_DOUBLE_CLICK;
		viewer.screenSpaceEventHandler = new FreeDo.ScreenSpaceEventHandler(viewer.canvas);
		viewer.screenSpaceEventHandler.setInputAction(function (movement) {
			var po = movement.position;
			var pick= new FreeDo.Cartesian2(po.x,po.y);
			
			var cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(pick), viewer.scene);
			
			var cartographic = FreeDo.Cartographic.fromCartesian(cartesian);
			var point=[ cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180];
			
	    	 var picked = viewer.scene.pick(movement.position);
	    	 //console.log(picked);
	    	 if(FreeDo.defined(picked)&&isString(picked.id)){
	    		 var arr = picked.id.split("_");
	    		 callback(arr[0],arr[1]);
	    		 return;
	    	 }
	    	 if(FreeDo.defined(picked)){
	    		 for(var i =0;i<drillingData.length;i++){
	    			 if(picked.id.name==drillingData[i].id){
	    				 playModel=drillingData[i];
	    				 if(playModel.cacheNowHeight.length>0&&playModel.cacheNowHeight[0]>4) return;
	    				 scene.preRender.addEventListener(sceneCameraAnimationRenderFunction);
	    				 if(typeof callback == "function"){
	    					 callback(drillingData[i].id,null);
	    				 }
	    			 }
	    		 }
	    	 }
	    	
	         
	    }, selectComponentEventType);
	}
	//左键点击事件
	 function leftClickEvent(callback){
			var selectComponentEventType = FreeDo.ScreenSpaceEventType.LEFT_CLICK;
			viewer.screenSpaceEventHandler = new FreeDo.ScreenSpaceEventHandler(viewer.canvas);
			viewer.screenSpaceEventHandler.setInputAction(function (movement){
				/*var picked = viewer.scene.pick(movement.position);
			    
			    	if(picked==undefined){
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
					
					pickedModels[0].primitive.color=clickedColor */
			    		
				
			},selectComponentEventType)
	 } 
	 function isString(obj){ //判断对象是否是字符串  
		  return Object.prototype.toString.call(obj) === "[object String]";  
		}  
	 
	 function getModelMatrix(lon,lat,height,heading,pitch,roll,scaleX,scaleY,scaleZ)
	 {
	 		var scaleCartesian3=new FreeDo.Cartesian3(scaleX,scaleY,scaleZ); //获得三元素，直接通过数字获得
	 		var scaleMatrix=FreeDo.Matrix4.fromScale(scaleCartesian3);//获得缩放矩阵
	 		var position = FreeDo.Cartesian3.fromDegrees(lon,lat,height);//根据经纬高获得位置三元素
	 		var heading=FreeDo.Math.toRadians(heading);
	 		var pitch=FreeDo.Math.toRadians(pitch);
	 		var roll=FreeDo.Math.toRadians(roll);
	 		var hpr=new FreeDo.HeadingPitchRoll(heading,pitch,roll);
	 		var transform=FreeDo.Transforms.headingPitchRollToFixedFrame(position,hpr);//获得姿态矩阵
	 		var matrix4=new FreeDo.Matrix4();
	 		FreeDo.Matrix4.multiply(transform,scaleMatrix,matrix4);
	 		return matrix4;
	 }
	 
	return {
		//开始监听
		startlistening : function(callback) {
			leftClickEvent(callback);
			leftDoubleClickEvent(callback);
		},
		//添加钻井柱数据
    	add : function(parameter){
    		for(var i =0;i<drillingData.length;i++){
    			if(drillingData[i].id==parameter.id) return false;
    		}
    		parameter.model=[];
    		parameter.cacheNowHeight=[];
    		addDsc(parameter.id,parameter.position.lon, parameter.position.lat);
    		var nowHeight = parameter.position.height;
    		for(var i=0;i<parameter.drilling.length;i++){
    			var nowScaleZ = parameter.drilling[i].height/10;
    			if(i==0){
    				//nowHeight = nowHeight + parameter.drilling[i].height/2;
    				nowHeight = nowHeight ;   //建模如果以模型中心点为基准则采用上一句
    				var model = addDrilling(parameter.id+"_"+i,parameter.drilling[i].filePath, parameter.position.lon, parameter.position.lat, nowHeight, parameter.position.heading, parameter.position.pitch, parameter.position.roll, parameter.position.scaleR, parameter.position.scaleR, nowScaleZ);
    				parameter.model.push(model);
    				parameter.cacheNowHeight.push(nowHeight);
    			}else{
    				//nowHeight = nowHeight + parameter.drilling[i].height/2 + parameter.drilling[i-1].height/2;  
    				nowHeight = nowHeight + parameter.drilling[i-1].height;   //建模如果以模型中心点为基准则采用上一句
    				var model = addDrilling(parameter.id+"_"+i,parameter.drilling[i].filePath, parameter.position.lon, parameter.position.lat, nowHeight, parameter.position.heading, parameter.position.pitch, parameter.position.roll, parameter.position.scaleR, parameter.position.scaleR, nowScaleZ);
    				parameter.model.push(model);
    				parameter.cacheNowHeight.push(nowHeight);
    			}
    		}
    		drillingData.push(parameter);
    	},
    	//移除钻井柱数据
    	removeByID : function(id) {
    		for(var i=0;i<drillingData.length;i++){
				if(id==drillingData[i].id){
					var entity = viewer.entities.getById(id);
					if(entity){
						viewer.entities.remove(entity);
					}
					for(var j=0;j<drillingData[i].model.length;j++){
						scene.primitives.remove(drillingData[i].model[j]);
					}
					drillingData.splice(i,1);
					if(playModel.id==id){
						playModel=null;
					}
				}
			}
		},
		//清空
    	clean : function() {
			for(var i=0;i<drillingData.length;i++){
				var entity = viewer.entities.getById(drillingData[i].id);
				if(entity){
					viewer.entities.remove(entity);
				}
				for(var j=0;j<drillingData[i].model.length;j++){
					scene.primitives.remove(drillingData[i].model[j]);
				}
			}
			drillingData=[];
			playModel=null;
		}
	};
}