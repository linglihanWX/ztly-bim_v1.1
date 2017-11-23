var FreeDoTool=FreeDoTool||{};


/**
 * [resetPositionOrientation 改变entity的位置姿态]
 * @param  {[type]} entity  [实体对象]
 * @param  {[type]} lon     [经度]
 * @param  {[type]} lat     [纬度]
 * @param  {[type]} height  [高]
 * @param  {[type]} heading [description]
 * @param  {[type]} pitch   [俯仰角]
 * @param  {[type]} roll    [旋转]
 * @return {[type]}         [void]
 */
FreeDoTool.entityResetPositionOrientation=function(entity,lon,lat,height,heading,pitch,roll)
{

	var position=FreeDo.Cartesian3.fromDegrees(lon,lat,height);

	var radHeading=FreeDo.Math.toRadians(heading);
	var radPitch=FreeDo.Math.toRadians(pitch);
	var radRoll=FreeDo.Math.toRadians(roll);

	var hpr=FreeDo.HeadingPitchRoll(radHeading,radPitch,radRoll);

	var orientation=FreeDo.Transforms.headingPitchRollQuaternion(position,hpr);

	entity.position=position;
	entity.orientation=orientation;
}

/**
 * [getModelMatrix 根据经纬高,姿态,缩放,创建对象的modelMatrix]
 * @param  {[type]} lon     [经度]
 * @param  {[type]} lat     [纬度]
 * @param  {[type]} height  [高度]
 * @param  {[type]} heading [转向角]
 * @param  {[type]} pitch   [俯仰角]
 * @param  {[type]} roll    [旋转]
 * @param  {[type]} scaleX  [X轴缩放系数 number]
 * @param  {[type]} scaleY  [Y轴缩放系数 number]
 * @param  {[type]} scaleZ  [Z轴缩放系数 number]
 * @return {[type]}         [modelMatrix]
 */
FreeDoTool.getModelMatrix=function(lon,lat,height,heading,pitch,roll,scaleX,scaleY,scaleZ)
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

/**
 * [entityResetPositionOrientationScale 重置模型的位置姿态缩放]
* @param  {[type]} lon     [经度]
 * @param  {[type]} lat     [纬度]
 * @param  {[type]} height  [高度]
 * @param  {[type]} heading [转向角]
 * @param  {[type]} pitch   [俯仰角]
 * @param  {[type]} roll    [旋转]
 * @param  {[type]} scaleX  [X轴缩放系数 number]
 * @param  {[type]} scaleY  [Y轴缩放系数 number]
 * @param  {[type]} scaleZ  [Z轴缩放系数 number]
 * @return {[type]}         [void]
 */
FreeDoTool.modelResetPositionOrientationScale=function(model,lon,lat,height,heading,pitch,roll,scaleX,scaleY,scaleZ)
{
		var matrix4=this.getModelMatrix(lon,lat,height,heading,pitch,roll,scaleX,scaleY,scaleZ);
		model.modelMatrix=matrix4;
}


/**
 * [flyToModel 使相机飞到对应的模型处]
 * @param  {[type]} camera [相机 viewer.camera]
 * @param  {[type]} model  [模型]
 * @return {[type]}        [void]
 */
FreeDoTool.flyToModel=function(camera,model,duration)
{	
//	debugger;
	var center=new FreeDo.Cartesian3();
	FreeDo.Matrix4.multiplyByPoint(model.modelMatrix, model.boundingSphere.center,center);

	var boundingSphere=new FreeDo.BoundingSphere(center,model.boundingSphere.radius);

	camera.flyToBoundingSphere(boundingSphere,
	{
		duration:duration,
		offset:new FreeDo.HeadingPitchRange(camera.heading,camera.pitch)
	});
}

/**
 * [jumpToModel 使相机跳到对应的模型处]
 * @param  {[type]} camera [相机 viewer.camera]
 * @param  {[type]} model  [模型]
 * @return {[type]}        [void]
 */
FreeDoTool.jumpToModel=function(camera,model)
{
	var center=new FreeDo.Cartesian3();
	FreeDo.Matrix4.multiplyByPoint(model.modelMatrix, model.boundingSphere.center,center);

	var boundingSphere=new FreeDo.BoundingSphere(center,model.boundingSphere.radius);

	camera.flyToBoundingSphere(boundingSphere,
	{
		duration:0.1,
		offset:new FreeDo.HeadingPitchRange(camera.heading,camera.pitch)
	});
}

/**
 * [WriteDB_Model 保存或者添加模型配置到数据库表 T_PModel]
 * @param  {[type]} Obj.id 		 [number 模型ID node_id];
 * @param  {[type]} Obj.parentId [number 父节点ID father_node_id];
 * @param  {[type]} Obj.text 	 [text   名称 name];
 * @param  {[type]} Obj.filePath 	 [text 模型文件地址 parameter.filePath];
 * @param  {[type]} Obj.lon 		 [number 模型经度 parameter.lon];
 * @param  {[type]} Obj.lat		 	 [number 模型经度 parameter.lat];
 * @param  {[type]} Obj.height		 [number 模型经度 parameter.height];
 * @param  {[type]} Obj.course 		 [number 模型经度 parameter.course];
 * @param  {[type]} Obj.alpha 		 [number 模型经度 parameter.alpha];
 * @param  {[type]} Obj.roll 		 [number 模型经度 parameter.roll];
 * @param  {[type]} Obj.scaleX 		 [number 模型经度 parameter.scaleX];
 * @param  {[type]} Obj.scaleY 		 [number 模型经度 parameter.scaleY];
 * @param  {[type]} Obj.scaleZ 		 [number 模型经度 parameter.scaleZ];
 * @return {[type]}        [void]
 */
FreeDoTool.WriteDB_Model = function(obj)
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
	/*if ( obj.type == 1 )
		paramer = "";
	else if ( obj.type == 2 )
	    paramer = JSON.stringify(paramer);
	else
		paramer = "";*/
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

/**
 * [WriteDB_Model 保存或者添加分组配置到数据库表 T_PModel]
 * @param  {[type]} 
 * @return {[type]}        [void]
 */
/*FreeDoTool.WriteDB_Group = function()
{
}

FreeDoTool.WriteDB_Model2 = function(obj)
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
    var dataobj={
 		node_id:obj.id,
 		father_node_id:obj.parentId,
 		name:obj.text,
 		parameter:paramer
} 
		if ( obj.type == 1 )
			paramer = "";
		else if ( obj.type == 2 )
		    paramer = JSON.stringify(paramer);
		else
			paramer = "";
	   
	    $.ajax
	    ({
         url: "updade.do",
         type: "POST",
         data: 
        {
     		node_id:obj.id,
     		father_node_id:obj.parentId,
     		name:obj.text,
     		parameter:paramer,
     		type:obj.type
         },
        
         success(data) {
             console.log("成功！")
             },
         error(xhr, text, ex) {
             console.log(text)
             }
        })
}*/
FreeDoTool.insmodel=function(obj){
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
	$.ajax
    ({
     url: "updade.do",
     type: "POST",
     data: 
    {
 		node_id:obj.id,
 		father_node_id:obj.parentId,
 		name:obj.text,
 		parameter:paramer,
 		type:obj.type
     },
    
     success(data) {
         console.log("成功！")
         },
     error(xhr, text, ex) {
         console.log(text)
         }
    })
}