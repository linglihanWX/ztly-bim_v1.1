var FreeDoUtil = FreeDoUtil||{};
//挖坑（矩形）
FreeDoUtil.digpit =function(viewer) {   
    var scene = viewer.scene;
    scene.globe.depthTestAgainstTerrain = true;
    var polygon = Freedo.PolygonGeometry.fromPositions({
          positions : Freedo.Cartesian3.fromDegreesArray([
        	    117.65370556450351, 39.02934248798539,
        	    117.6561772024772, 39.02878028399167,
        	    117.65596001336337, 39.02817757877439,
        	    117.65346223972034, 39.028704935406395
        	])
        });
    
    var gp = new Freedo.GroundErasePrimitive({
        geometryInstances: new Freedo.GeometryInstance({
          geometry: polygon,
          extrudedHeight:0,
          height:-100,
         attributes: {
            color: Freedo.ColorGeometryInstanceAttribute.fromColor(new Freedo.Color(0.0, 0.0, 0.0, 1.0)) // 洞的颜色 (0, 0, 0)表示黑色
          } 
        }),
        classificationType: 0,
        debugShowShadowVolume: false
     });
   scene.groundPrimitives.add(gp);
   
    //坑壁
  viewer.entities.add({
        wall : {
            positions : Freedo.Cartesian3.fromDegreesArray([
                117.65370556450351, 39.02934248798539,
                117.6561772024772, 39.02878028399167,
                117.65596001336337, 39.02817757877439,
                117.65346223972034, 39.028704935406395,
                117.65370556450351, 39.02934248798539
            ]),
            material : "static/page/common/img/underground.jpg",
            maximumHeights:[ 0.01, 	0.01,0.01, 0.01, 0.01],
            minimumHeights:[-50,-50,-50,-50, -50],
            outline : false
        }
    });
   
    //坑底
   viewer.entities.add({
        polygon : {
            hierarchy : Freedo.Cartesian3.fromDegreesArrayHeights([
        	    117.65370556450351, 39.02934248798539,50,
        	    117.6561772024772, 39.02878028399167,50,
        	    117.65596001336337, 39.02817757877439,50,
        	    117.65346223972034, 39.028704935406395,50
        	]),
            height:-50,
            material : "static/page/common/img/underground.jpg",
        }
    });
}