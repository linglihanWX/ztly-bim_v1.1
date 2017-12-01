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
FreeDoUtil.dig = function (viewer, floorArray, imgarray) {
	  viewer.scene.globe.depthTestAgainstTerrain = true
	  var dlarray = []
	  // 判断数据的正确性
	  for (let i = 0; i < floorArray.length; i++) {
	    if (floorArray[i].length < 2) {
	      return false
	    }
	  }

	  for (let i = 0; i < floorArray.length - 1; i++) {

	    // 每层的顶点
	    var dlposition1 = floorArray[i]
	    var dlposition2 = floorArray[i + 1]
	    for (let j = 0; j < dlposition1.length; j++) {
	      dlarray[j * 6] = dlposition1[j].lon
	      dlarray[j * 6 + 1] = dlposition1[j].lat
	      dlarray[j * 6 + 2] = dlposition1[j].height
	      dlarray[j * 6 + 3] = dlposition2[j].lon
	      dlarray[j * 6 + 4] = dlposition2[j].lat
	      dlarray[j * 6 + 5] = dlposition2[j].height
	    }
	    // 转换成世界坐标系
	    var c3array = FreeDo.Cartesian3.fromDegreesArrayHeights(dlarray)
	    // 擦除地面影像
	    if (i == 0) {
	      viewer.scene.groundPrimitives.add(new Freedo.GroundErasePrimitive({
	        geometryInstances: new Freedo.GeometryInstance({
	          geometry: new Freedo.PolygonGeometry.fromPositions({
	            positions: c3array
	          }),
	          extrudedHeight: 0,
	          height: -100,
	          attributes: {
	            color: Freedo.ColorGeometryInstanceAttribute.fromColor(new Freedo.Color(0.0, 0.0, 0.0, 1.0)) // 洞的颜色 (0, 0, 0)表示黑色
	          }
	        }),
	        classificationType: 0,
	        debugShowShadowVolume: false
	      }))
	    }

	    // 转换成自身坐标系
	    var o = c3array[0]
	    var c3arrayself = []
	    for (let j = 0; j < c3array.length; j++) {
	      c3arrayself[j] = new FreeDo.Cartesian3(c3array[j].x - o.x, c3array[j].y - o.y, c3array[j].z - o.z)
	    }
	    // 构建顶点位置坐标数组
	    var p = []
	    for (let j = 0; j < c3arrayself.length; j++) {
	      p[j * 3] = c3arrayself[j].x
	      p[j * 3 + 1] = c3arrayself[j].y
	      p[j * 3 + 2] = c3arrayself[j].z
	    }
	    // console.log(p)
	    var positions = new Float64Array(p)
	    // 三角形索引数组
	    var ind = []
	    for (let j = 0; j < dlposition1.length; j++) {
	      if (j != dlposition1.length - 1) {
	        ind[j * 6] = 2 * j
	        ind[j * 6 + 1] = 2 * j + 2
	        ind[j * 6 + 2] = 2 * j + 3
	        ind[j * 6 + 3] = 2 * j + 3
	        ind[j * 6 + 4] = 2 * j + 1
	        ind[j * 6 + 5] = 2 * j
	      }else {
	        ind[j * 6] = 2 * j
	        ind[j * 6 + 1] = 0
	        ind[j * 6 + 2] = 1
	        ind[j * 6 + 3] = 1
	        ind[j * 6 + 4] = 2 * j + 1
	        ind[j * 6 + 5] = 2 * j
	      }
	    }

	    // console.log(ind)
	    var indices = new Uint16Array(ind)
	    ind = []
	    // 顶点纹理坐标数组
	    var t = []
	    var d1 = null
	    var d2 = null
	    var dh = null
	    var tu1 = 0.0
	    var tu2 = 0.0
	    var dv = null
	    t.push(tu1, 0.99)
	    t.push(tu2, 0)
	    t[0] = tu1
	    t[1] = 0.99
	    t[2] = tu2
	    t[3] = 0
	    var pointnum = c3arrayself.length / 2 - 1
	    for (let j = 0; j < pointnum; j++) {
	      var halfnum = pointnum / 2
	      // 奇数个点
	      if (pointnum % 2 == 0) {
	        for (let k = 0; k < halfnum; k++) {
	          dv = FreeDo.Cartesian3.distance(c3arrayself[2 * k], c3arrayself[2 * k + 1])
	          d1 = FreeDo.Cartesian3.distance(c3arrayself[2 * k + 2], c3arrayself[2 * k]) / dv
	          d2 = FreeDo.Cartesian3.distance(c3arrayself[2 * k + 3], c3arrayself[2 * k + 1]) / dv
	          dh = (d1 + d2) / 10
	          tu1 = tu1 + dh
	          tu2 = tu2 + dh
	          t[(k + 1) * 4] = tu1
	          t[(k + 1) * 4 + 1] = 0.99
	          t[(k + 1) * 4 + 2] = tu2
	          t[(k + 1) * 4 + 3] = 0
	        }
	        tu1 = 0
	        tu2 = 0
	        for (let l = pointnum - 1; l >= halfnum; l--) {
	          dv = FreeDo.Cartesian3.distance(c3arrayself[2 * l], c3arrayself[2 * l + 1])
	          if (l == pointnum - 1) {
	            d1 = FreeDo.Cartesian3.distance(c3arrayself[2 * l + 2], c3arrayself[0]) / dv
	            d2 = FreeDo.Cartesian3.distance(c3arrayself[2 * l + 3], c3arrayself[1]) / dv
	            dh = (d1 + d2) / 10
	            tu1 = tu1 + dh
	            tu2 = tu2 + dh
	            t[(l + 1) * 4] = tu1
	            t[(l + 1) * 4 + 1] = 0.99
	            t[(l + 1) * 4 + 2] = tu2
	            t[(l + 1) * 4 + 3] = 0
	          }else {
	            d1 = FreeDo.Cartesian3.distance(c3arrayself[2 * l + 2], c3arrayself[2 * l]) / dv
	            d2 = FreeDo.Cartesian3.distance(c3arrayself[2 * l + 3], c3arrayself[2 * l + 1]) / dv
	            dh = (d1 + d2) / 10
	            tu1 = tu1 + dh
	            tu2 = tu2 + dh
	            t[(l + 1) * 4] = tu1
	            t[(l + 1) * 4 + 1] = 0.99
	            t[(l + 1) * 4 + 2] = tu2
	            t[(l + 1) * 4 + 3] = 0
	          }
	        }
	      }
	      // 偶数个点
	      else {
	        dv = FreeDo.Cartesian3.distance(c3arrayself[0], c3arrayself[1])
	        for (let k = 0; k < halfnum; k++) {
	          d1 = FreeDo.Cartesian3.distance(c3arrayself[2 * k + 2], c3arrayself[2 * k]) / dv
	          d2 = FreeDo.Cartesian3.distance(c3arrayself[2 * k + 3], c3arrayself[2 * k + 1]) / dv
	          dh = (d1 + d2) / 10
	          tu1 = tu1 + dh
	          tu2 = tu2 + dh
	          t[(k + 1) * 4] = tu1
	          t[(k + 1) * 4 + 1] = 0.99
	          t[(k + 1) * 4 + 2] = tu2
	          t[(k + 1) * 4 + 3] = 0
	        }
	        tu1 = 0
	        tu2 = 0
	        for (let l = pointnum - 1; l > halfnum; l--) {
	          if (l == pointnum - 1) {
	            d1 = FreeDo.Cartesian3.distance(c3arrayself[2 * l + 2], c3arrayself[0]) / dv
	            d2 = FreeDo.Cartesian3.distance(c3arrayself[2 * l + 3], c3arrayself[1]) / dv
	            dh = (d1 + d2) / 10
	            tu1 = tu1 + dh
	            tu2 = tu2 + dh
	            t[(l + 1) * 4] = tu1
	            t[(l + 1) * 4 + 1] = 0.99
	            t[(l + 1) * 4 + 2] = tu2
	            t[(l + 1) * 4 + 3] = 0
	          }else {
	            d1 = FreeDo.Cartesian3.distance(c3arrayself[2 * l + 2], c3arrayself[2 * l]) / dv
	            d2 = FreeDo.Cartesian3.distance(c3arrayself[2 * l + 3], c3arrayself[2 * l + 1]) / dv
	            dh = (d1 + d2) / 10
	            tu1 = tu1 + dh
	            tu2 = tu2 + dh
	            t[(l + 1) * 4] = tu1
	            t[(l + 1) * 4 + 1] = 0.99
	            t[(l + 1) * 4 + 2] = tu2
	            t[(l + 1) * 4 + 3] = 0
	          }
	        }
	      }
	    }
	    // for (let j = 0; j < pointnum; j++) {

	    //       dv = FreeDo.Cartesian3.distance(c3arrayself[2*j], c3arrayself[2*j+1])
	    //        d1 = FreeDo.Cartesian3.distance(c3arrayself[2 * j + 2], c3arrayself[2 * j])/dv
	    //        d2 = FreeDo.Cartesian3.distance(c3arrayself[2 * j + 3], c3arrayself[2 * j + 1])/dv
	    //        dh = (d1 + d2)/2
	    //       tu1 = tu1 + dh
	    //       tu2 = tu2 + dh
	    //       t.push(tu1,0.99)
	    //       t.push(tu2,0)
	    // }
	    // console.log(t)
	    var texCoords = new Float32Array(t)
	    t = []
	    //
	    
	    // //绘制坑底
	    // if(i==floorArray.length-2){
	    //   viewer.entities.add({
	    //       //坑底
	    //         polygon : {
	    //             hierarchy : c3array,
	    //             height:-100,
	    //             material : new Freedo.ImageMaterialProperty({
	    //               image : imgarray[i],
	    //               repeat : new Freedo.Cartesian2(10.0, 10.0)
	    //             }),
	    //             shadows: FreeDo.ShadowMode.ENABLED
	    //         }
	    // })
	    // }
	    // 绘制坑底
	    if (i == floorArray.length - 2) {
	      // 顶点位置坐标数组
	      var ddwz = []
	      for (let j = 0; j < c3arrayself.length; j++) {
	        if (j % 2 == 1) {
	          ddwz.push(c3arrayself[j].x)
	          ddwz.push(c3arrayself[j].y)
	          ddwz.push(c3arrayself[j].z)
	        }
	      }
	      var kdpos = new Float64Array(ddwz)
	      //console.log(ddwz)
	      // 顶点纹理坐标数组
	      var buttomarray = floorArray[i]
	      var lonarray = []
	      var latarray = []
	      var ddwl = []
	      for (let j = 0; j < buttomarray.length; j++) {
	        lonarray[j] = floorArray[i][j].lon
	        latarray[j] = floorArray[i][j].lat
	      }
	      var minlon = Math.min.apply(Math, lonarray)
	      var minlat = Math.min.apply(Math, latarray)
	      for (let j = 0; j < buttomarray.length; j++) {
	        ddwl.push((buttomarray[j].lon - minlon)*600)
	        ddwl.push((buttomarray[j].lat - minlat)*600)
	      }
	      var kdwl = new Float32Array(ddwl)
	      // 三角形索引数组
	      var sjsy = []
	      var sjnum = c3arrayself.length / 2-2
	      for (let j = 0; j < sjnum; j++) {
	        sjsy.push(0)
	        sjsy.push(1 + j)
	        sjsy.push(2 + j)
	      }
	      var kdind = new Uint16Array(sjsy)
	      var geometrykd = new FreeDo.Geometry({
	        attributes: {
	          position: new FreeDo.GeometryAttribute({
	            componentDatatype: FreeDo.ComponentDatatype.DOUBLE,
	            componentsPerAttribute: 3,
	            values: kdpos
	          }),
	          st: new FreeDo.GeometryAttribute({
	            componentDatatype: FreeDo.ComponentDatatype.FLOAT,
	            componentsPerAttribute: 2,
	            values: kdwl
	          })
	        },
	        indices: kdind,
	        primitiveType: FreeDo.PrimitiveType.TRIANGLES,
	        boundingSphere: FreeDo.BoundingSphere.fromVertices(kdpos)
	      })
	      var instancekd = new FreeDo.GeometryInstance({
	        geometry: geometrykd,
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
	      })
	      viewer.scene.primitives.add(new FreeDo.Primitive({
	        geometryInstances: instancekd,
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
	    //加坑壁
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
	    })
	   
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
	}
