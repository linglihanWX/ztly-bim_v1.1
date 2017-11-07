var FreeDoTool=FreeDoTool||{};

///////////////////////////数学计算函数
/**
 * [lonLatHeightMinMax 计算经纬高中对应的最大最小值]
 * @param  {[{lon:1,lat:1,height:1}]} positions [经纬高对象数组]
 * @return {[type]}           [结果对象]
 */
FreeDoTool.lonLatHeightMinMax=function(positions){
	//计算最大最小值
	var min={},max={};
	var minLon=minLat=minHeight=Number.MAX_VALUE;
	var maxLon=maxLat=maxHeight=Number.MIN_VALUE;
    var position=null;

		for(var i=0;i<positions.length;i++){
			position=positions[i];

			if(position.lon<minLon)
				minLon=position.lon;
			if(position.lat<minLat)
				minLat=position.lat;
			if(position.height<minHeight)
				minHeight=position.height;

			if(position.lon>maxLon)
				maxLon=position.lon;
			if(position.lat>maxLat)
				maxLat=position.lat;
			if(position.height>maxHeight)
				maxHeight=position.height;
		}

	return minMax= {
			minLon:minLon,
			minLat:minLat,
			minHeight:minHeight,
			maxLon:maxLon,
			maxLat:maxLat,
			maxHeight:maxHeight
		}
}

/**
 * [doublecartesian3Distance 计算两点距离]
 * @param  {[type]} cartesian3A [点A]
 * @param  {[type]} cartesian3B [点B]
 * @return {[type]}             [距离]
 */
FreeDoTool.doubleCartesian3Distance=function(cartesian3A,cartesian3B){
	return Math.sqrt(Math.pow(cartesian3A.x-cartesian3B.x,2)+Math.pow(cartesian3A.y-cartesian3B.y,2)+Math.pow(cartesian3A.z-cartesian3B.z,2));
}


/**
 * [getXYByAddDegree 获得二维坐标系中转换角度后的新x,y]
 * @param  {[type]} x           [x坐标]
 * @param  {[type]} y           [y坐标]
 * @param  {[type]} delatDegree [角度增量，角度制]
 * @return {[type]}             [description]
 */
FreeDoTool.getXYByAddDegree=function(x,y,delatDegree){
	 var oldRadians;
	 if(x==0&&y>0)
	 	oldRadians=FreeDo.Math.toRadians(90);
	 else if(x==0&&y<0)
	 	oldRadians=FreeDo.Math.toRadians(-90);
	 else if(y==0&&x>0)
	 	oldRadians=FreeDo.Math.toRadians(0);
	 else if(y==0&&x<0)
	 	oldRadians=FreeDo.Math.toRadians(180);
	 else
	 	oldRadians=Math.atan(x/y);

	 var length=Math.sqrt(x*x+y*y);

	 var newRadians=oldRadians+FreeDo.Math.toRadians(delatDegree);

	 var newX=Math.sin(newRadians)*length;
	 var newY=Math.cos(newRadians)*length;

	 return {
	 	x:newX,
	 	y:newY
	 }
}



///////////////////////////位置姿态缩放变换函数
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
 * @param   {[primitive]} model [模型对象]
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
FreeDoTool.primitiveResetPositionOrientationScale=function(model,lon,lat,height,heading,pitch,roll,scaleX,scaleY,scaleZ)
{
		var matrix4=this.getModelMatrix(lon,lat,height,heading,pitch,roll,scaleX,scaleY,scaleZ);
		model.modelMatrix=matrix4;
}


/**
 * [modelsChangePosition 计算多模型旋转后的位置和方向角]
 * @param  {[{lon:1,lat,1,height:1,heading:1}]}  positionHeadings [代表模型经纬高方向角的数组]
 * @param  {[type]} dHeading         [方向角的变更值]
 * @return {[{lon:1,lat,1,height:1}]}                  [模型新的位置方向角的数组]
 */
FreeDoTool.modelsChangePosition=function(positionHeadings,dHeading){
	//计算几何中心点
	var minMax=this.lonLatHeightMinMax(positionHeadings);
	var avgPosition={
		lon:(minMax.minLon+minMax.maxLon)/2,
		lat:(minMax.minLat+minMax.maxLat)/2,
		height:(minMax.minHeight+minMax.maxHeight)/2
	};

	//计算中心点处经纬放心比例
	var cartesian3A=FreeDo.Cartesian3.fromDegrees(avgPosition.lon-0.5,avgPosition.lat,avgPosition.height);
	var cartesian3B=FreeDo.Cartesian3.fromDegrees(avgPosition.lon+0.5,avgPosition.lat,avgPosition.height);
		//单位经度对应米
	var lengthLon=this.doubleCartesian3Distance(cartesian3A,cartesian3B);

		cartesian3A=FreeDo.Cartesian3.fromDegrees(avgPosition.lon,avgPosition.lat-0.5,avgPosition.height);
		cartesian3B=FreeDo.Cartesian3.fromDegrees(avgPosition.lon,avgPosition.lat+0.5,avgPosition.height);
		//单位纬度对应米
	var lengthLat=this.doubleCartesian3Distance(cartesian3A,cartesian3B);

	//计算新坐标系下的经纬值对应的x,y值并根据dHeading计算出新的x,y和对应的三维坐标
	var changePositionsHeadings=[];

	for(var i=0;i<positionHeadings.length;i++){
		var oldPosition=positionHeadings[i];//代表原经纬高
		var newPosition={};//代表二维坐标系内的x,y
		var changePosition;//代表二维坐标系内角度转换后的x,y

		newPosition.x=(oldPosition.lon-avgPosition.lon)*lengthLon;
		newPosition.y=(oldPosition.lat-avgPosition.lat)*lengthLat;
		newPosition.z=oldPosition.height-avgPosition.height;

		changePosition=this.getXYByAddDegree(newPosition.x,newPosition.y,dHeading);
		changePosition.height=newPosition.z;

		changePosition.lon=changePosition.x/lengthLon+avgPosition.lon;
		changePosition.lat=changePosition.y/lengthLat+avgPosition.lat;


		changePositionsHeadings.push(changePosition);
	}

	return changePositionsHeadings
}



///////////////////////////飞行函数
/**
 * [flyToModel 使相机飞到对应的模型处]
 * @param  {[type]} camera [相机 scene.camera]
 * @param  {[type]} model  [模型]
 * @return {[type]}        [void]
 */
FreeDoTool.flyToModel=function(canvas,camera,model,callback)
{
	var center=new FreeDo.Cartesian3();
	FreeDo.Matrix4.multiplyByPoint(model.modelMatrix, model.boundingSphere.center,center);

	var boundingSphere=new FreeDo.BoundingSphere(center,model.boundingSphere.radius);
	camera.flyToBoundingSphere(boundingSphere,
	{
		duration:1,
		offset:new FreeDo.HeadingPitchRange(camera.heading,camera.pitch),
		complete:function(){
			callback(center);
		}
	});
}

/**
 * [flyToModels 多模型飞行]
 * 1.根据传入的模型数组计算出lon(min/max),lat(min/max),height(min/max)
 * 2.由三个最大最小值计算出对应的几何平均值avgLon=(lonMin+lonMax)/2,avgLat=(latMin+latMax)/2,avgHeight=(heightMin+heightMax)/2
 * 3.将中心点坐标系和最大经纬高组成的点坐标转换成直角坐标系中的向量
 * 4.计算出由步奏3得出的两点的距离r=sqrt(pow((x1-x2),2)+pow((y1-y2),2)+pow((z1-z2),2));
 * 5.根据r和几何中心点算出一个包围球，飞到这个包围球
 * @param  {[type]} camera [description]
 * @param  {[type]} positions [经纬高数组：[{lon:1,lat:1,height:1},{lon:2,lat:2,height:2}]]
 * @return {[type]}        [description]
 */
FreeDoTool.flyToModels=function(camera,positions)
{
	
	var minMax=this.lonLatHeightMinMax(positions);
	//得到几何平均值
	var avgPosition={
		lon:(minMax.minLon+minMax.maxLon)/2,
		lat:(minMax.minLat+minMax.maxLat)/2,
		height:(minMax.minHeight+minMax.maxHeight)/2
	}

	//转换成对应的向量
	var maxCartesian3=FreeDo.Cartesian3.fromDegrees(minMax.maxLon,minMax.maxLat,minMax.maxHeight);
	var avgCartesian3=FreeDo.Cartesian3.fromDegrees(avgPosition.lon,avgPosition.lat,avgPosition.height);

	//计算向量距离
	var distance=this.doubleCartesian3Distance(maxCartesian3,avgCartesian3);

	//计算包围球
	var boundingSphere=new FreeDo.BoundingSphere(avgCartesian3,distance);

	//飞
	camera.flyToBoundingSphere(boundingSphere,
	{
		duration:1,
		offset:new FreeDo.HeadingPitchRange(camera.heading,camera.pitch)
	});
}

/**
 * [jumpToModel 使相机跳到对应的模型处]
 * @param  {[type]} camera [相机 scene.camera]
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
};


///////////////////////////鼠标事件函数
/**
 * [initDoubleClick 初始化页面双击事件]
 * @param  {[type]}   viewer   [页面场景]
 * @param  {Function} callback [点击事件回调函数,注入所点击的object对象或者为undefined]
 * @return {[type]}            [void]
 */
FreeDoTool.initDoubleClick=function(viewer,callback)
{
	var screenSpaceEventHandler = new FreeDo.ScreenSpaceEventHandler(viewer.canvas);

	screenSpaceEventHandler.setInputAction(function(movement){
		var picked = viewer.scene.pick(movement.position);
		callback.call(window,picked);
	}, FreeDo.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

}
FreeDoTool.initClick=function(viewer,callback)
{
	var screenSpaceEventHandler = new FreeDo.ScreenSpaceEventHandler(viewer.canvas);
	
	screenSpaceEventHandler.setInputAction(function(movement){
		var picked = viewer.scene.pick(movement.position);
		callback.call(window,picked);
	}, FreeDo.ScreenSpaceEventType.LEFT_CLICK);
	
}


///////////////////////////模型外观函数
/**
 * [showModel 显示模型]
 * @param  {[type]} primitive [primitive对象]
 * @return {[type]}           [description]
 */
FreeDoTool.showModel=function(primitive){
	primitive.show=true;
};
/**
 * [hideModel 隐藏模型]
 * @param  {[type]} primitive [primitive对象]
 * @return {[type]}           [description]
 */
FreeDoTool.hideModel=function(primitive){
	primitive.show=false;
};
/**
 * [toggleModel 切换显示隐藏状态]
 * @param  {[type]} primitive [description]
 * @return {[type]}           [description]
 */
FreeDoTool.toggleModel=function(primitive){
	primitive.show=!primitive.show;
}
/**
 * [changeColor 修改模型颜色]
 * @param  {[type]} primitive [description]
 * @param  {[type]} red       [description]
 * @param  {[type]} green     [description]
 * @param  {[type]} blue      [description]
 * @param  {[type]} alpha     [description]
 * @return {[type]}           [description]
 */
FreeDoTool.changeColor=function(primitive,red,green,blue,alpha){
	primitive.color=new FreeDo.Color(red,green,blue,alpha);
}