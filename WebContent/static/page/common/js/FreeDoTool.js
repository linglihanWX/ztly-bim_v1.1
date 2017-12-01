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
FreeDoTool.flyToModel=function(camera,model)
{
	var center=new FreeDo.Cartesian3();
	FreeDo.Matrix4.multiplyByPoint(model.modelMatrix, model.boundingSphere.center,center);

	var boundingSphere=new FreeDo.BoundingSphere(center,model.boundingSphere.radius);

	camera.flyToBoundingSphere(boundingSphere,
	{
		duration:1,
		offset:new FreeDo.HeadingPitchRange(camera.heading,camera.pitch)
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
FreeDoTool.flyToModels=function(camera,positions,callback)
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

	// 设置半径的最小值
	if (distance < 20 ){
		distance = 20;
		distance *= 2.0;
	}

	//计算包围球
	var boundingSphere=new FreeDo.BoundingSphere(avgCartesian3,distance);
	
	//飞
	camera.flyToBoundingSphere(boundingSphere,
	{
		duration:2,
		offset:new FreeDo.HeadingPitchRange(camera.heading,camera.pitch),
		complete: function(){
			callback();
		}
	});
};

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

};


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
/**
 * 挖坑
 * @param {*} viewer 
 * @param {*经、纬、高} LLHArray 
 * @param {*深度的二维数组} deeparray 
 */
FreeDoTool.dig = function (viewer, floorArray,imgarray) {
 viewer.scene.globe.depthTestAgainstTerrain = true;
  var dlarray = [];
  //判断数据的正确性
  for (let i = 0; i < floorArray.length; i++) {
      if(floorArray[i].length<2){
        return false;
      } 
  }
  for (let i = 0; i < floorArray.length-1; i++) {

    //每层的顶点
    var dlposition1 = floorArray[i];
    var dlposition2 = floorArray[i+1];
    for (let j = 0; j < dlposition1.length; j++) {
      dlarray[j*6]=dlposition1[j].lon;
      dlarray[j*6+1]=dlposition1[j].lat;
      dlarray[j*6+2]=dlposition1[j].height;
      dlarray[j*6+3]=dlposition2[j].lon;
      dlarray[j*6+4]=dlposition2[j].lat;
      dlarray[j*6+5]=dlposition2[j].height;  
    }
    //转换成世界坐标系
    var c3array = FreeDo.Cartesian3.fromDegreesArrayHeights(dlarray);
    //擦除地面影像
    if(i==0){
      viewer.scene.groundPrimitives.add(new Freedo.GroundErasePrimitive({
        geometryInstances: new Freedo.GeometryInstance({
            geometry: new Freedo.PolygonGeometry.fromPositions({
                positions :c3array
              }),
            extrudedHeight:0,
            height:-100,
           attributes: {
              color: Freedo.ColorGeometryInstanceAttribute.fromColor(new Freedo.Color(0.0, 0.0, 0.0, 1.0)) // 洞的颜色 (0, 0, 0)表示黑色
            } 
          }),
          classificationType: 0,
          debugShowShadowVolume: false
       }));
    }
    //绘制坑底
    if(i==floorArray.length-2){
      viewer.entities.add({
          //坑底
            polygon : {
                hierarchy : c3array,
                height:-100,
                material : new Freedo.ImageMaterialProperty({
                  image : imgarray[i],
                  repeat : new Freedo.Cartesian2(10.0, 10.0)
                }),
                shadows: FreeDo.ShadowMode.ENABLED
            }
    });
    }
    //转换成自身坐标系
    var o = c3array[0];
    var c3arrayself = []
    for (let j = 0; j < c3array.length; j++) {
      c3arrayself[j] = new FreeDo.Cartesian3(c3array[j].x-o.x,c3array[j].y-o.y,c3array[j].z-o.z);
    }
    //构建顶点位置坐标数组
    var p = []
    for (let j = 0; j < c3arrayself.length; j++) {
      p[j*3]=c3arrayself[j].x;
      p[j*3+1]=c3arrayself[j].y;
      p[j*3+2]=c3arrayself[j].z;  
    }
    //console.log(p);
    var positions = new Float64Array(p);
    //三角形索引数组
    var ind = []
    for (let j = 0; j < dlposition1.length; j++) {
      if(j!=dlposition1.length-1){
        ind[j*6]   = 2*j;
        ind[j*6+1] = 2*j+2;
        ind[j*6+2] = 2*j+3;
        ind[j*6+3] = 2*j+3;
        ind[j*6+4] = 2*j+1;
        ind[j*6+5] = 2*j;
      }else{
        ind[j*6]   = 2*j;
        ind[j*6+1] = 0;
        ind[j*6+2] = 1;
        ind[j*6+3] = 1;
        ind[j*6+4] = 2*j+1;
        ind[j*6+5] = 2*j;
      }
    }

    //console.log(ind);
    var indices = new Uint16Array(ind);
    ind = [];
  //顶点纹理坐标数组
  var t = []
  var d1 = null
  var d2 = null
  var dh = null
  var tu1 = 0.0
  var tu2 = 0.0
  var dv = null
  t.push(tu1, 0.99)
  t.push(tu2, 0)
  t[0]=tu1
  t[1]=0.99
  t[2]=tu2
  t[3]=0
  var pointnum = c3arrayself.length/2-1;
  for (let j = 0; j < pointnum; j++) {
    var halfnum = pointnum/2;
    //奇数个点
    if(pointnum%2==0){
            
      for (let k = 0; k < halfnum; k++) {
        dv = FreeDo.Cartesian3.distance(c3arrayself[2*k], c3arrayself[2*k+1]);
        d1 = FreeDo.Cartesian3.distance(c3arrayself[2 * k + 2], c3arrayself[2 * k])/dv;
        d2 = FreeDo.Cartesian3.distance(c3arrayself[2 * k + 3], c3arrayself[2 * k + 1])/dv;
        dh = (d1 + d2)/2;
        tu1 = tu1 + dh;
        tu2 = tu2 + dh;
        t[(k+1)*4]=tu1;
        t[(k+1)*4+1]=0.99;
        t[(k+1)*4+2]=tu2;
        t[(k+1)*4+3]=0;
      }
      tu1=0;
      tu2=0;
      for (let l = pointnum-1; l >= halfnum; l--) {
        dv = FreeDo.Cartesian3.distance(c3arrayself[2*l], c3arrayself[2*l+1]);
        if(l==pointnum-1){
          d1 = FreeDo.Cartesian3.distance(c3arrayself[2 * l + 2], c3arrayself[0])/dv;
          d2 = FreeDo.Cartesian3.distance(c3arrayself[2 * l + 3], c3arrayself[1])/dv;
          dh = (d1 + d2)/2;
          tu1 = tu1 + dh;
          tu2 = tu2 + dh;
          t[(l+1)*4]=tu1;
          t[(l+1)*4+1]=0.99;
          t[(l+1)*4+2]=tu2;
          t[(l+1)*4+3]=0;
        }else{
          d1 = FreeDo.Cartesian3.distance(c3arrayself[2 * l + 2], c3arrayself[2*l])/dv;
          d2 = FreeDo.Cartesian3.distance(c3arrayself[2 * l + 3], c3arrayself[2*l+1])/dv;
          dh = (d1 + d2)/2;
          tu1 = tu1 + dh;
          tu2 = tu2 + dh;
          t[(l+1)*4]=tu1;
          t[(l+1)*4+1]=0.99;
          t[(l+1)*4+2]=tu2;
          t[(l+1)*4+3]=0;
        }
      }
    }
    //偶数个点
    else{
      dv = FreeDo.Cartesian3.distance(c3arrayself[0], c3arrayself[1]);      
      for (let k = 0; k < halfnum; k++) {
        d1 = FreeDo.Cartesian3.distance(c3arrayself[2 * k + 2], c3arrayself[2 * k])/dv;
        d2 = FreeDo.Cartesian3.distance(c3arrayself[2 * k + 3], c3arrayself[2 * k + 1])/dv;
        dh = (d1 + d2)/2;
        tu1 = tu1 + dh;
        tu2 = tu2 + dh;
        t[(k+1)*4]=tu1;
        t[(k+1)*4+1]=0.99;
        t[(k+1)*4+2]=tu2;
        t[(k+1)*4+3]=0;
      }
      tu1=0;
      tu2=0;
      for (let l = pointnum-1; l >halfnum; l--) {
        if(l==pointnum-1){
          d1 = FreeDo.Cartesian3.distance(c3arrayself[2 * l + 2], c3arrayself[0])/dv;
          d2 = FreeDo.Cartesian3.distance(c3arrayself[2 * l + 3], c3arrayself[1])/dv;
          dh = (d1 + d2)/2;
          tu1 = tu1 + dh;
          tu2 = tu2 + dh;
          t[(l+1)*4]=tu1;
          t[(l+1)*4+1]=0.99;
          t[(l+1)*4+2]=tu2;
          t[(l+1)*4+3]=0;
        }else{
          d1 = FreeDo.Cartesian3.distance(c3arrayself[2 * l + 2], c3arrayself[2*l])/dv;
          d2 = FreeDo.Cartesian3.distance(c3arrayself[2 * l + 3], c3arrayself[2*l+1])/dv;
          dh = (d1 + d2)/2;
          tu1 = tu1 + dh;
          tu2 = tu2 + dh;
          t[(l+1)*4]=tu1;
          t[(l+1)*4+1]=0.99;
          t[(l+1)*4+2]=tu2;
          t[(l+1)*4+3]=0;
        }
      }
    }

  }
  // for (let j = 0; j < pointnum; j++) {
   
  //       dv = FreeDo.Cartesian3.distance(c3arrayself[2*j], c3arrayself[2*j+1]);
  //        d1 = FreeDo.Cartesian3.distance(c3arrayself[2 * j + 2], c3arrayself[2 * j])/dv;
  //        d2 = FreeDo.Cartesian3.distance(c3arrayself[2 * j + 3], c3arrayself[2 * j + 1])/dv;
  //        dh = (d1 + d2)/2;
  //       tu1 = tu1 + dh;
  //       tu2 = tu2 + dh;
  //       t.push(tu1,0.99)
  //       t.push(tu2,0)
  // }
  //console.log(t)
  var texCoords = new Float32Array(t)
  t=[];
  //
  var geometry = new FreeDo.Geometry({
    attributes: {
      position: new FreeDo.GeometryAttribute({
        componentDatatype: FreeDo.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: positions
      }),
      st: new FreeDo.GeometryAttribute({
        componentDatatype: FreeDo.ComponentDatatype.FLOAT,
        componentsPerAttribute: 2,
        values: texCoords
      })
    },
    indices: indices,
    primitiveType: FreeDo.PrimitiveType.TRIANGLES,
    boundingSphere: FreeDo.BoundingSphere.fromVertices(positions)
  })

  var instance = new FreeDo.GeometryInstance({
    geometry: geometry,
    modelMatrix: new FreeDo.Matrix4(
      1, 0, 0, o.x,
      0, 1, 0, o.y,
      0, 0, 1, o.z,
      0, 0, 0, 1
    ),
    attributes: {
      color: FreeDo.ColorGeometryInstanceAttribute.fromColor(imgarray[i])
    },
    id: 'trangle'
  });
  viewer.scene.primitives.add(new FreeDo.Primitive({
    geometryInstances: instance,
    appearance: new FreeDo.MaterialAppearance({
      material: new FreeDo.Material({
        fabric: {
          type: 'Image',
          uniforms: {
            image: imgarray[i]
          }
        }
      })

    })
  }))
  }

  // if(i==floorArray.length-2){
  //   var num = dlposition2.length-2;
  //   for (let j = 0; j < num; j++) {
  //     ind.push(1);
  //     ind.push(2*j+3);
  //     ind.push(2*j+5);
      
  //   }
  // }
}
