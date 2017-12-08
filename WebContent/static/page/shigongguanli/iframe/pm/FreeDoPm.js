/**
 * 当方法名为xxxModel的表示对模型操作
 * xxxGroup 表示对分支操作
 * xxxNode 表示对节点操作,可能为分支也可能为模型
 */

var FreeDoEarth=FreeDoEarth||{};

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
FreeDoEarth.init=function(earthId,baseImageryProvider)
{
	this.container=this.container||{};//未来保存加载的模型的容器，便于快速访问
	this.viewer=this.viewer||{};	  //场景对象
	this.pickedModels=[];			  //保存用户所选择的模型，颜色半透
	this.clickedColor=new FreeDo.Color(0, 238, 0, 1);	//模型选中颜色
	this.unClickedColor=new FreeDo.Color(1,1,1,1);	//取消选中颜色
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
	new Compass(this.viewer);
}
FreeDoEarth.getTiandituGloble =function() {
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

/**
 * [initModels初始化场景中的模型]
 * @return {[type]} [description]
 */
FreeDoEarth.initModels=function(callback)
{
	$.ajax({
		url:"../../../../../pm/selectAll",
		dataType:"JSON",
		success:function(content){
			
			var bufferData={};//树结构数据
			var treeNode=null;
			var modelNode=null;
			var treeParentNode=null;//树中的父节点
			var modelParentNode=null;//模型缓存中的父节点
			var container=FreeDoEarth.container;
			var i=0;

			//拼凑树节点和缓存容器
			for(;i<content.length;i++){
				treeNode=content[i]; //当前节点
				
				treeParentNode=bufferData[treeNode.parentId]; //树父节点
				modelParentNode=container[treeNode.parentId]; //缓存容器父节点
				
				if(treeParentNode==undefined){ //如果在树结构数据中不存在父节点则创建一个代替者，用来临时保存遍历到的子节点
					treeParentNode=bufferData[treeNode.parentId]={children:[]};
					modelParentNode=container[treeNode.parentId]={children:[]};
				}

				//非叶子节点
				if(treeNode.leaf==0){
					modelNode=new FreeDoEarth.GroupObj(treeNode.id,treeNode.parentId,treeNode.text,treeNode.type); //创建管理节点
					
					if(bufferData[treeNode.id]==undefined) //如果自己的位置上没有代替者则增加一个未来装载子节点的容器
						treeNode.children=[];				//只有分支节点才可能存在代理节点
					else{
						treeNode.children=bufferData[treeNode.id].children;   //如果有代理者证明有子节点在自身之前被遍历，将代理者搜集的内容拷贝过来
						modelNode.children=container[treeNode.id].children;
					}
					bufferData[treeNode.id]=treeNode; //剔除代理者
					
				}else{
					var parameter=JSON.parse(treeNode.attributes.parameter);
					modelNode=new FreeDoEarth.ModelObj(treeNode.id,treeNode.parentId,treeNode.text,treeNode.type,"../../../../../static/model/"+parameter.filePath,parameter.lon,parameter.lat,parameter.height-46,parameter.course,parameter.alpha,parameter.roll,parameter.scaleX,parameter.scaleY,parameter.scaleZ);
				}
				
				container[treeNode.id]=modelNode;
				
				treeParentNode.children.push(treeNode);
				modelParentNode.children.push(modelNode.id);
				
			}
			
			callback.call(window,bufferData[-1].children);
			
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
		
		callback.call(window,picked.id);	//回调 注入模型ID
		
	})
}

/**
 * [flyToModel 单模型飞行]
 * @param  {[type]} nodeId [模型ID]
 * @return {[type]}        [description]
 */
FreeDoEarth.flyToModel=function(nodeId){
	
	if(this.container[nodeId]==undefined||this.container[nodeId].primitive==undefined)
		return ;
	
	FreeDoTool.flyToModel(this.viewer.camera,this.container[nodeId].primitive);
	
	//模型点选变色效果
	if(this.pickedModels.length!=0){
		
		for(var i=0;i<this.pickedModels.length;i++)
			this.pickedModels[i].primitive.color=this.unClickedColor;
		
		this.pickedModels=[];
	}
	
	this.pickedModels.push({primitive:this.container[nodeId].primitive});
	
	this.pickedModels[0].primitive.color=this.clickedColor;
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
	
	FreeDoTool.flyToModels(this.viewer.camera,positions,function(){});
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
		url:'../../../../pm/updatePmModel',
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
		url:"../../../../pm/updatePmModels",
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
		url:'../../../../pm/deletePms',
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
	console.log(111);
	$.ajax({
		url:"../../../../pm/addPm",
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
				FreeDoEarth.container[content.nodeId]=new FreeDoEarth.ModelObj(content.nodeId,node.parentId,node.name,node.type,"../../../models/"+parameter.filePath,parameter.lon,parameter.lat,parameter.height,parameter.course,parameter.alpha,parameter.roll,parameter.scaleX,parameter.scaleY,parameter.scaleZ);
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
		url:"../../../../pm/pastPms",
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
					modelNode=new FreeDoEarth.ModelObj(treeNode.id,treeNode.parentId,treeNode.text,treeNode.type,"../../../../../static/model/"+parameter.filePath,parameter.lon,parameter.lat,parameter.height,parameter.course,parameter.alpha,parameter.roll,parameter.scaleX,parameter.scaleY,parameter.scaleZ);
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
