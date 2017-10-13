/**
 * 当方法名为xxxModel的表示对模型操作
 * xxxGroup 表示对分支操作
 * xxxNode 表示对节点操作,可能为分支也可能为模型
 */

var FreeDoEarth=FreeDoEarth||{};
var lc = null;

/**
 * [ModelObj 模型对象]
 * @param {[type]} id       [description]
 * @param {[type]} parentId [description]
 * @param {[type]} name     [description]
 * @param {[type]} type     [description]
 * @param {[type]} url      [description]
 * @param {[type]} lon      [description]
 * @param {[type]} lat      [description]
 * @param {[type]} height   [description]
 * @param {[type]} course   [description]
 * @param {[type]} alpha    [description]
 * @param {[type]} roll     [description]
 * @param {[type]} scaleX   [description]
 * @param {[type]} scaleY   [description]
 * @param {[type]} scaleZ   [description]
 */
FreeDoEarth.ModelObj=function(id,parentId,name,type,url,lon,lat,height,course,alpha,roll,scaleX,scaleY,scaleZ)
{
	this.id=id;
	this.parentId=parentId;
	this.name=name;
	this.url=url;
	this.type=type;
	this.lon=lon;
	this.lat=lat;
	this.height=height;
	this.course=course;
	this.alpha=alpha;
	this.roll=roll;
	this.scaleX=scaleX;
	this.scaleY=scaleY;
	this.scaleZ=scaleZ;
	
	
	var modelMatrix=FreeDoTool.getModelMatrix(lon,lat,height,course,alpha,roll,scaleX,scaleY,scaleZ);
	
	this.primitive = FreeDoEarth.viewer.scene.primitives.add(FreeDo.Model.fromGltf(
				{	
					id:id,
					url : url,
					show : true,                     // default
					modelMatrix : modelMatrix,
			        allowPicking : true,            // not pickable
			        debugShowBoundingVolume : false, // default
			        debugWireframe : false
				}));
}

/**
 * [GroupObj 组对象]
 * @param {[type]} id       [description]
 * @param {[type]} parentId [description]
 * @param {[type]} name     [description]
 * @param {[type]} type     [description]
 */
FreeDoEarth.GroupObj=function(id,parentId,name,type)
{

	this.id=id;
	this.parentId=parentId;
	this.name=name;
	this.type=type;
	this.children=[];
}

/**
 * [init 地球容器ID]
 * @param  {[type]} earthId [description]
 * @return {[type]}         [description]
 */
FreeDoEarth.init=function(earthId)
{
	this.container=this.container||{};//未来保存加载的模型的容器，便于快速访问
	this.viewer=this.viewer||{};	  //场景对象
	this.pickedModels=[];			  //保存用户所选择的模型，颜色半透
	this.clickedColor=new FreeDo.Color(1,3,1,0.9);	//模型选中颜色
	this.unClickedColor=new FreeDo.Color(1,1,1,1);	//取消选中颜色
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

	    }));
	    this.viewer.imageryLayers.addImageryProvider(new FreeDo.WebMapTileServiceImageryProvider({
		    url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
		    layer: "tdtAnnoLayer_biaoji",
		    style: "default",
		    format: "image/png",
		    tileMatrixSetID: "tianditu",
		    show: true
		}));
	    new Compass(this.viewer);
	    
	    lc = this.viewer;
	    $.ajax({
		url:"getAllDrillingColumnCha2",
		dataType:"json",
		success:function(content){
			var ceshi = FDDrillingMgr(lc);
			for(var i=0;i<content.length;i++){
				ceshi.add(content[i]);
				}
			ceshi.startlistening(function(){});
		}
	});
}

/**
 * [initModels初始化场景中的模型]
 * @return {[type]} [description]
 */

/**
 * [initLeftDoubleClick 双击事件注册]
 * @param  {Function} callback  参数[nodeId||undefined]
 * @return {[type]}            [void]
 */
FreeDoEarth.initLeftDoubleClick=function(callback){
	FreeDoTool.initDoubleClick(this.viewer,function(picked){
		
		if(picked==undefined){	//如果picked为空则表示点击无模型处，使之前点变色的模型重置颜色并清空所选模型容器
			
			for(var i=0;i<FreeDoEarth.pickedModels.length;i++)
				FreeDoEarth.pickedModels[i].primitive.color=FreeDoEarth.unClickedColor;
			
			FreeDoEarth.pickedModels=[];
			
			callback.call(window,undefined);	//回调注入空值
			return ;
		}
		
		if(FreeDoEarth.pickedModels.length!=0){	//使之前点变色的模型重置颜色并清空所选模型容器
		
 			
			for(var i=0;i<FreeDoEarth.pickedModels.length;i++)
				FreeDoEarth.pickedModels[i].primitive.color=FreeDoEarth.unClickedColor;
			
			FreeDoEarth.pickedModels=[];
		}
				
		FreeDoEarth.pickedModels.push(picked);	//缓存点选模型
		
		FreeDoEarth.pickedModels[0].primitive.color=FreeDoEarth.clickedColor; //变色
		/*var center = FreeDo.Matrix4.multiplyByPoint(FreeDoEarth.pickedModels[0].primitive.modelMatrix, FreeDoEarth.pickedModels[0].primitive.boundingSphere.center, new FreeDo.Cartesian3());
		var boundingSphere=new FreeDo.BoundingSphere(center,2);
		console.log(viewer1);
		var cartographic = viewer1.scene.globe.ellipsoid.cartesianToCartographic(boundingSphere.center);
		cartographic.height=cartographic.height+2;
		var  cartesianmy = viewer1.scene.globe.ellipsoid.cartographicToCartesian(cartographic);
		var pick = FreeDo.SceneTransforms.wgs84ToWindowCoordinates(viewer1.scene, cartesianmy);*/
		
		callback.call(window,picked.id);	//回调 注入模型ID
	})
}

FreeDoEarth.initLeftClick=function(callback){
	FreeDoTool.initClick(this.viewer,function(picked){
		
		if(picked==undefined){	//如果picked为空则表示点击无模型处，使之前点变色的模型重置颜色并清空所选模型容器
			
			for(var i=0;i<FreeDoEarth.pickedModels.length;i++)
				FreeDoEarth.pickedModels[i].primitive.color=FreeDoEarth.unClickedColor;
			
			FreeDoEarth.pickedModels=[];
			
			callback.call(window,undefined);	//回调注入空值
			return ;
		}
		
		if(FreeDoEarth.pickedModels.length!=0){	//使之前点变色的模型重置颜色并清空所选模型容器
		
		
			for(var i=0;i<FreeDoEarth.pickedModels.length;i++)
				FreeDoEarth.pickedModels[i].primitive.color=FreeDoEarth.unClickedColor;
			
			FreeDoEarth.pickedModels=[];
		}
				
		FreeDoEarth.pickedModels.push(picked);	//缓存点选模型
		
		FreeDoEarth.pickedModels[0].primitive.color=FreeDoEarth.clickedColor; //变色
		
		callback.call(window,picked.id);	//回调 注入模型ID
	})
}
/**
 * [flyToModel 单模型飞行]
 * @param  {[type]} nodeId [模型ID]
 * @return {[type]}        [description]
 */
FreeDoEarth.flyToModel=function(nodeId,callback){
	
	if(this.container[nodeId]==undefined||this.container[nodeId].primitive==undefined)
		return ;
	
	FreeDoTool.flyToModel(this.viewer.canvas,this.viewer.camera,this.container[nodeId].primitive,callback);
	
	//模型点选变色效果
	if(this.pickedModels.length!=0){
		
		for(var i=0;i<this.pickedModels.length;i++)
			this.pickedModels[i].primitive.color=this.unClickedColor;
		
		this.pickedModels=[];
	}
	
	this.pickedModels.push({primitive:this.container[nodeId].primitive});
	
	this.pickedModels[0].primitive.color=this.clickedColor;
	
}
FreeDoEarth.flyToLabel=function(viewer,lon,lat,height,callback){
	var camera = viewer.camera;
	 camera.flyTo({  
	        destination : FreeDo.Cartesian3.fromDegrees( lon, lat-0.0014,height ),  
	        orientation : {  
	            heading : FreeDo.Math.toRadians( 0 ),  
	            pitch : FreeDo.Math.toRadians( -15 ),  
	            roll : FreeDo.Math.toRadians( 0 )  
	        },  
	        duration : 1,//动画持续时间
	        complete : function(){
	        	callback(viewer.canvas);
	        }
	 });
	 
}
/**
 * [flyToModels 多模型飞行]
 * @param  {[type]} nodeIds [多模型ID数组]
 * @return {[type]}         [void]
 */
FreeDoEarth.flyToModels=function(nodeIds){
	
	if(nodeIds.length==0)
		return;
	
	var positions=[];
	
	var node=null;
	
	if(this.pickedModels.length!=0){	//清空存储所选模型的容器
		
		for(var i=0;i<this.pickedModels.length;i++)
			this.pickedModels[i].primitive.color=this.unClickedColor;
		
		this.pickedModels=[];
	}
	
	
	for(var i=0;i<nodeIds.length;i++){	//设置多模型颜色
		
		node=this.container[nodeIds[i]];
		
		positions.push({lon:node.lon,lat:node.lat,height:node.height});
		
		//设置模型颜色
		this.pickedModels.push({primitive:node.primitive});
		node.primitive.color=this.clickedColor;
	}
	
	FreeDoTool.flyToModels(this.viewer.camera,positions);
}



/**
 * [updatePmModelAttr  修改单一模型的经纬高俯仰角缩放]
 * @param  {[type]} id    [模型ID]
 * @param  {[type]} attr  [属性名]
 * @param  {[type]} value [属性值]
 * @return {[type]}       [void]
 */
FreeDoEarth.updatePmModelAttr=function(id,attr,value){
	var modelObj=this.container[id];
	modelObj[attr]=value;
	FreeDoTool.primitiveResetPositionOrientationScale(modelObj.primitive,modelObj.lon,modelObj.lat,modelObj.height,modelObj.course,modelObj.alpha,modelObj.roll,modelObj.scaleX,modelObj.scaleY,modelObj.scaleZ);
}

/**
 * [updatePmModelsAttrByDelat 通过属性名和delat值修改模型经纬高俯仰角缩放]
 * @param  {[type]} ids   [多模型ID数组]
 * @param  {[type]} attr  [属性名]
 * @param  {[type]} delat [变化值]
 * @return {[type]}       [void]
 */
FreeDoEarth.updatePmModelsAttrByDelat=function(ids,attr,delat){
	var node=null;
	for(var i=0;i<ids.length;i++){
		node=this.container[ids[i]];
		node[attr]=node[attr]+delat;
		
		if(attr=="lon")
			node[attr]=node[attr]>180?-180:(node[attr]<-180?180:node[attr]);
		if(attr=="lat")	
			node[attr]=node[attr]>90?-90:(node[attr]<-90?90:node[attr]);
		if(attr=="height")
			node[attr]=node[attr]<0?0:node[attr];
		if(attr=="heading")
			node[attr]=node[attr]<0?360:(node[attr]>360?0:node[attr]);
				
		FreeDoTool.primitiveResetPositionOrientationScale(node.primitive,node.lon,node.lat,node.height,node.course,node.alpha,node.roll,node.scaleX,node.scaleY,node.scaleZ);
	}
}


/**
 * [updatePmModel 根据parameter修改模型多个属性]
 * @param  {[type]} id        [模型ID]
 * @param  {[type]} name      [模型名称]
 * @param  {[type]} parameter [属性对象{lon:1,lat:1,height:1,course:1,pitch:1,roll:1,scaleX:1,scaleY:1,scaleZ:1}]
 * @return {[type]}           [void]
 */
FreeDoEarth.updatePmModel=function(id,name,parameter){
	var modelObj=this.container[id];
	
	for(var attr in parameter){
		if(attr=="filePath")
			continue;
		
		modelObj[attr]=parameter[attr];
	}
	
	FreeDoTool.primitiveResetPositionOrientationScale(modelObj.primitive,modelObj.lon,modelObj.lat,modelObj.height,modelObj.course,modelObj.alpha,modelObj.roll,modelObj.scaleX,modelObj.scaleY,modelObj.scaleZ);
}


/**
 * [deletePmNodes 根据传入的节点ID数组从内容中删除对应的模型]
 * @param  {[type]} queue [节点ID数组，]
 * @return {[type]}       [description]
 */
FreeDoEarth.deletePmNodes=function(queue){
	var node=null;
	var nodeId=null;
	var parentId=null;
	while(queue.length>0){
		nodeId=queue.pop();

		node=this.container[nodeId];
		if(node instanceof this.ModelObj){
			this.viewer.scene.primitives.remove(this.container[nodeId].primitive);
		}
		
		parentId=this.container[nodeId].parentId;
		
		delete this.container[nodeId];
		
		var parentNode=this.container[parentId];
		
		if(parentNode==undefined)
			return ;
		
		for(var i=0;i<parentNode.children.length;i++){
			if(parentNode.children[i]==nodeId)
				break;
		}
		parentNode.children.splice(i,1);
		
	}
}

//////数据库操作

/**
 * [updatePmModelToDB 修改模型属性到数据库]
 * @param  {[type]} nodeId    [模型ID]
 * @param  {[type]} name      [模型名称]
 * @param  {[type]} parameter [属性对象序列化字符串]
 * @return {[type]}           [description]
 */
FreeDoEarth.updatePmModelToDB=function(nodeId,name,parameter){
	$.ajax({
		url:'pm/updatePmModel',
		type:'POST',
		data:{'nodeId':nodeId,'name':name,'parameter':parameter},
		success:function(content){
			FreeDoEarth.container[nodeId].name=name;
		},
		error:function(xhr,text,ex){
			alert(text);
		},
		beforeSend:function(){
			$("#ajaxModal").show();
		},
		complete:function(){
			$("#ajaxModal").hide();
		}
	})
}
/**
 * [updatePmModelsToDB 多模型属性修改]
 * @param  {[type]} nodes [ [{nodeId:1,parameter:"{'lon':1,'lat':1,'height':1,'course':1,'pitch':1,'roll':1,'scaleX':1,'scaleY':1,'scaleZ':1}"}] ]
 * @return {[type]}       [void]
 */
FreeDoEarth.updatePmModelsToDB=function(nodes){
	$.ajax({
		url:"pm/updatePmModels",
		type:"POST",
		data:{'nodes':JSON.stringify(nodes)},
		beforeSend:function(){
			$("#ajaxModal").show();
		},
		success:function(content){
			
		},
		error:function(xhr,text,ex){
			alert(text);
		},
		complete:function(){
			$("#ajaxModal").hide();
		}
	})
}

/**
 * [deleteNodesFromDB 从数据库删除节点]
 * @param  {[type]} nodeIds [节点ID数组]
 * @return {[type]}         [void]
 */
FreeDoEarth.deleteNodesFromDB=function(nodeIds){
	$.ajax({
		url:'pm/deletePms',
		type:'POST',
		data:{'nodeIds':nodeIds},
		success:function(content){
			FreeDoEarth.deletePmNodes(nodeIds);
		},
		error:function(xhr,text,ex){
			alert(text);
		},
		beforeSend:function(){
			$("#ajaxModal").show();
		},
		complete:function(){
			$("#ajaxModal").hide();
		}
	});
}
/**
 * [addPm 增加节点]
 * @param {[type]} node     [node:{parentId:1,name:"node",type:1,parameter:"",leaf:0}]
 * @param {[type]} callBack [description]
 */
FreeDoEarth.addPm=function(node,callBack){
	$.ajax({
		url:"pm/addPm",
		type:"post",
		data:{
			'fatherNodeId':node.parentId,
			'name':node.name,
			'type':node.type,
			'parameter':node.parameter,
			'leaf':node.leaf
		},
		dataType:"JSON",
		success:function(content){
			callBack.call(window,content.nodeId);
			
			if(node.type==1)
				FreeDoEarth.container[content.nodeId]=new FreeDoEarth.GroupObj(content.nodeId,node.parentId,node.name,node.type);
			else{
				var parameter=JSON.parse(node.parameter);
				FreeDoEarth.container[content.nodeId]=new FreeDoEarth.ModelObj(content.nodeId,node.parentId,node.name,node.type,"static/model/"+parameter.filePath,parameter.lon,parameter.lat,parameter.height,parameter.course,parameter.alpha,parameter.roll,parameter.scaleX,parameter.scaleY,parameter.scaleZ);
			}
			
			FreeDoEarth.container[node.parentId].children.push(content.nodeId);
		},
		error:function(xhr,text,ex){
			alert(text);
		},
		beforeSend:function(){
			$("#ajaxModal").show();
		},
		complete:function(){
			$("#ajaxModal").hide();
		}
	})
}

/**
 * [pastPmsToDB 粘贴节点]
 * @param  {[type]}   targetId [目标节点ID]
 * @param  {[type]}   nodes    [待粘贴的节点对象数组]
 * @param  {Function} callback [回调函数 注入easyui children对象]
 * @return {[type]}            [description]
 */
FreeDoEarth.pastPmsToDB=function(targetId,nodes,callback){
	$.ajax({
		url:"pm/pastPms",
		type:"post",
		data:{"nodes":JSON.stringify(nodes),"targetId":targetId},
		dataType:"JSON",
		success:function(content){
			
			var bufferData={};//树结构数据
			var treeNode=null;
			var modelNode=null;
			var treeParentNode=null;//树中的父节点
			var modelParentNode=null;//模型缓存中的父节点
			var container=FreeDoEarth.container;
			var i=0;

			for(;i<content.length;i++){
				treeNode=content[i];
				
				treeParentNode=bufferData[treeNode.parentId];
				modelParentNode=container[treeNode.parentId];
				
				if(treeParentNode==undefined){ //如果在树结构数据中不存在父节点则创建一个
					treeParentNode=bufferData[treeNode.parentId]={children:[]};
				}
				if(modelParentNode==undefined){
					modelParentNode=container[treeNode.parentId]={children:[]};
				}
				
				//非叶子节点
				if(treeNode.leaf==0){
					modelNode=new FreeDoEarth.GroupObj(treeNode.id,treeNode.parentId,treeNode.text,treeNode.type);
					
					if(bufferData[treeNode.id]==undefined)
						treeNode.children=[];
					else{
						treeNode.children=bufferData[node.id].children;
						modelNode.children=container[treeNode.id].children;
					}
					bufferData[treeNode.id]=treeNode;
					
				}else{
					var parameter=JSON.parse(treeNode.attributes.parameter);
					modelNode=new FreeDoEarth.ModelObj(treeNode.id,treeNode.parentId,treeNode.text,treeNode.type,"static/model/"+parameter.filePath,parameter.lon,parameter.lat,parameter.height,parameter.course,parameter.alpha,parameter.roll,parameter.scaleX,parameter.scaleY,parameter.scaleZ);
				}
				
				container[treeNode.id]=modelNode;
				
				treeParentNode.children.push(treeNode);
				modelParentNode.children.push(modelNode.id);
				
			}
			
			callback.call(window,bufferData[targetId].children);
			
		},
		error:function(xhr,text,ex){
			alert(text);
		},
		beforeSend:function(){
			$("#ajaxModal").show();
		},
		complete:function(){
			$("#ajaxModal").hide();
		}
	})
}
FreeDoEarth.manyou=function(arr){
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
	
}


