
var SurveyType = {
    NONE: 0,
    LINE_DISTANCE: 1,
    SEGMENTS_DISTANCE: 2,
    POINT_POSITION:3,
    Azimuth_DISTANCE:4,
};

function SurveyManager(viewer, mobile) {
    
    var scene = viewer.scene;
    var camera = viewer.camera;
    var screenSpaceEventHandler = new FreeDo.ScreenSpaceEventHandler(viewer.canvas);
    var surveyType = SurveyType.NONE;
    var surveyTool = null;

    var PositionType = {
        NONE: 0,
        ON_MODEL: 1,
        ON_TERRAIN: 2,
        ON_ELLIPSOID: 3
    };

    this.setSurveyType = function(type) {
        if (type === surveyType) return;

        if (surveyType !== SurveyType.NONE) {
            surveyTool.destroy();
            surveyTool = null;
        }

        surveyType = type;
        surveyTool = createSurveyTool(type);
    };

    function createSurveyTool(type) {
        switch (type) {
            case SurveyType.LINE_DISTANCE:
                return new SurveyToolLineDistance();
            case SurveyType.SEGMENTS_DISTANCE:
                return new SurveyToolSegmentsDistance();
            case SurveyType.POINT_POSITION:
            	return new SurveyToolPointDistance();
            case SurveyType.Azimuth_DISTANCE:
            	return new SurveyToolAzimuthDistance();
        }
    }

    function pickPosition(windowPosition) {
        var cartesian,
            type = PositionType.NONE;

        var pickedObjects, entity;
        if (scene.pickPositionSupported) {
            var pickedObjects = scene.drillPick(windowPosition);
            if (FreeDo.defined(pickedObjects) && pickedObjects.length > 0) {
                for (var i = 0; i < pickedObjects.length; ++i) {
                    if (pickedObjects[i] instanceof FreeDo.FreedoPModelFeature) {
                        cartesian = scene.pickPosition(windowPosition);
                        if (FreeDo.defined(cartesian)) {
                            type = PositionType.ON_MODEL;
                        }                        
                    }
                }
            }
        }

        //TODO: 尝试在地形上拾取点?

        if (type === PositionType.NONE) {
            cartesian = camera.pickEllipsoid(windowPosition, scene.globe.ellipsoid);
            if (FreeDo.defined(cartesian))
                type = PositionType.ON_ELLIPSOID;
        }

        return {
            type: type,
            position: cartesian
        };
    }

    function calculateLength(positions) {
        var length = 0;
        for (var i = 1; i < positions.length; ++i) {
            length += FreeDo.Cartesian3.distance(positions[i-1], positions[i]);
        }
        return length;
    }
    function getLengthText(length) {
        return length > 1000 ? (length/1000).toFixed(2) + "千米" : length.toFixed(2) + "米"
    }
    function getCenter(p1, p2) {
        var p = new FreeDo.Cartesian3();
        FreeDo.Cartesian3.add(p1, p2, p);
        FreeDo.Cartesian3.multiplyByScalar(p, 0.5, p);
        return p;
    }

    function SurveyToolSegmentsDistance() {

        var results = [];
        var currentResult;
        var lastPositionIsTemp = false;

        function newResult() {
            var positions = [];
            var labelEntity = viewer.entities.add({
                label : {
                    show : false,
                    showBackground : true,
                    backgroundColor: new FreeDo.Color(0.165, 0.165, 0.165, 1),
                    font : '14px monospace',
                    horizontalOrigin : FreeDo.HorizontalOrigin.LEFT,
                    verticalOrigin : FreeDo.VerticalOrigin.TOP,
                    pixelOffset : new FreeDo.Cartesian2(15, 0),
                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                }
            });
            var polylineEntity = viewer.entities.add({
                polyline: {
                    positions: positions,
                    show: false,
                    width: 1,
                    followSurface: false,
                    material: FreeDo.Color.RED
                }
            });
            return {
                labelEntity: labelEntity,
                polylineEntity: polylineEntity,
                positions: positions,
                length: 0
            };
        }

        function saveResult(result) {
            results.push({
                labelEntity: result.labelEntity,
                polylineEntity: result.polylineEntity,
                length: result.length
            });
        }

        function finishCurrent() {
            saveResult(currentResult);
            currentResult = null;
            lastPositionIsTemp = false;
        }

        function cancelCurrent() {
            viewer.entities.remove(currentResult.labelEntity);
            viewer.entities.remove(currentResult.polylineEntity);
            currentResult = null;
            lastPositionIsTemp = false;
        }

        function clearResults() {
            for (var i = 0; i < results.length; ++i) {
                viewer.entities.remove(results[i].labelEntity);
                viewer.entities.remove(results[i].polylineEntity);
            }
            results = [];
        }

        function pickAPoint(windowPosition) {
            var pickResult = pickPosition(windowPosition);
            if (pickResult.type !== PositionType.NONE) {
                if (!currentResult) {
                    currentResult = newResult();
                }

                if (lastPositionIsTemp) {
                    currentResult.positions.pop();
                }
                currentResult.positions.push(pickResult.position);
                lastPositionIsTemp = false;
            }
        }

        function updateTmpPoint(windowPosition) {
            var pickResult = pickPosition(windowPosition);
            if (pickResult.type !== PositionType.NONE) {
                if (!lastPositionIsTemp) {
                    currentResult.positions.push(pickResult.position);
                    lastPositionIsTemp = true;
                } else {
                    currentResult.positions[currentResult.positions.length-1] = pickResult.position;
                }
                if (currentResult.positions.length > 1) {
                    currentResult.polylineEntity.polyline.show = true;
                    currentResult.labelEntity.position = pickResult.position;
                    currentResult.labelEntity.label.show = true;
                    currentResult.labelEntity.label.text = calculateLength(currentResult.positions);
                }
            }
        }

        function handleLeftClick(movement) {
            pickAPoint(movement.position);
        };

        function handleMouseMove(movement) {
            if (currentResult) {
                updateTmpPoint(movement.endPosition);
            }
        }

        function handleLeftDblClick(movement) {
            if (currentResult) {
                updateTmpPoint(movement.position);
                finishCurrent();
            }
        }

        function handleRightClick(movement) {
            if (currentResult) {
                cancelCurrent();
            }
        }

        screenSpaceEventHandler.setInputAction(handleLeftClick, FreeDo.ScreenSpaceEventType.LEFT_CLICK);
        screenSpaceEventHandler.setInputAction(handleRightClick, FreeDo.ScreenSpaceEventType.RIGHT_CLICK);
        screenSpaceEventHandler.setInputAction(handleMouseMove, FreeDo.ScreenSpaceEventType.MOUSE_MOVE);
        screenSpaceEventHandler.setInputAction(handleLeftDblClick, FreeDo.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

        this.destroy = function() {
            screenSpaceEventHandler.removeInputAction(FreeDo.ScreenSpaceEventType.LEFT_CLICK);
            screenSpaceEventHandler.removeInputAction(FreeDo.ScreenSpaceEventType.RIGHT_CLICK);
            screenSpaceEventHandler.removeInputAction(FreeDo.ScreenSpaceEventType.MOUSE_MOVE);
            screenSpaceEventHandler.removeInputAction(FreeDo.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            clearResults();
        };
    }

    function SurveyToolLineDistance() {

        var ResultType = {
            StraightLine: 1,
            HorizontalAndVertical: 2
        };

        var results = [];
        var startPoint = undefined;

        var polylineCollection = new FreeDo.PolylineCollection();
        viewer.scene.primitives.add(polylineCollection);

        var tempLine;
        var tempPointEntities = [null, null];

        function updateTmpLine(windowPosition) {
            var pickResult = pickPosition(windowPosition);
            if (pickResult.type !== PositionType.NONE) {
                if (tempLine) {
                    //polylineCollection.remove(tempLine);
                	viewer.entities.remove(tempLine);
                    tempLine = undefined;
                }
                /*tempLine = polylineCollection.add({
                    positions: [startPoint.position, pickResult.position],
                    width: 1,
                    show: true,
                    loop: false,
                    material: new FreeDo.Material({
                        fabric : {
                            type : 'Color',
                            uniforms : {
                                color: FreeDo.Color.RED
                            }
                        }
                    })
                });*/
                tempLine = viewer.entities.add({  
                    name : 'Red corridor on surface with rounded corners and outline',  
                    corridor : {  
                        positions : [startPoint.position, pickResult.position],
                        width : 10.0,  
                        material : FreeDo.Color.RED.withAlpha(0.5),  
                        outline : true,  
                        outlineColor : FreeDo.Color.RED  
                    }  
                });
                if (!tempPointEntities[1]) {
                    tempPointEntities[1] = viewer.entities.add({
                        position: pickResult.position,
                        point: {
                            pixelSize: 3,
                            color: FreeDo.Color.WHITE,
                            outlineColor: FreeDo.Color.BLACK,
                            outlineWidth: 1
                        }
                    });
                } else {
                    tempPointEntities[1].position = pickResult.position;                    
                }
            }
        }
        function removeTmpLine() {
            if (tempLine) {
                //polylineCollection.remove(tempLine);
            	viewer.entities.remove(tempLine);
                tempLine = undefined;
            }
            for (var i = 0; i < tempPointEntities.length; i++) {
                if (!!tempPointEntities[i]) {
                    viewer.entities.remove(tempPointEntities[i]);
                    tempPointEntities[i] = null;
                }
            }
        }
        
        function addResult(endPoint) {
            var resultType = startPoint.type === PositionType.ON_MODEL ? ResultType.HorizontalAndVertical : 
                    (endPoint.type === PositionType.ON_MODEL ? ResultType.HorizontalAndVertical : ResultType.StraightLine);

            if (resultType === ResultType.StraightLine) {
                var positions = [startPoint.position, endPoint.position];
                /*var line = polylineCollection.add({
                    positions: positions,
                    width: 1,
                    show: true,
                    loop: false,
                    material: new FreeDo.Material({
                        fabric : {
                            type : 'Color',
                            uniforms : {
                                color: FreeDo.Color.RED
                            }
                        }
                    })
                });*/
                var line = viewer.entities.add({  
                    name : 'Red corridor on surface with rounded corners and outline',  
                    corridor : {  
                        positions : positions,
                        width : 10.0, 
                        material : FreeDo.Color.RED.withAlpha(0.5),  
                        outline : true,  
                        outlineColor : FreeDo.Color.RED  
                    }  
                });
                var labelEntity = viewer.entities.add({
                    position: getCenter(startPoint.position, endPoint.position),
                    label: {
                        text: getLengthText(calculateLength(positions)),
                        show: true,
                        showBackground: true,
                        backgroundColor: new FreeDo.Color(0.165, 0.165, 0.165, 1),
                        font: '14px monospace',
                        horizontalOrigin : FreeDo.HorizontalOrigin.CENTER,
                        verticalOrigin : FreeDo.VerticalOrigin.BOTTOM,
                        pixelOffset : new FreeDo.Cartesian2(1, 1),
                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                    }
                });
                var startPointEntity = viewer.entities.add({
                    position: startPoint.position,
                    point: {
                        pixelSize: 3,
                        color: FreeDo.Color.WHITE,
                        outlineColor: FreeDo.Color.BLACK,
                        //disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        outlineWidth: 1
                    }
                });
                var endPointEntity = viewer.entities.add({
                    position: endPoint.position,
                    point: {
                        pixelSize: 3,
                        color: FreeDo.Color.WHITE,
                        outlineColor: FreeDo.Color.BLACK,
                        //disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        outlineWidth: 1
                    }
                });
                results.push({
                    type: resultType,
                    labelEntity: labelEntity,
                    line: line,
                    startPointEntity: startPointEntity,
                    endPointEntity: endPointEntity
                });
            
            } else if (resultType === ResultType.HorizontalAndVertical) {

                var startPointCartographic = FreeDo.Cartographic.fromCartesian(startPoint.position);
                var endPointCartographic = FreeDo.Cartographic.fromCartesian(endPoint.position);
                var lowPoint, highPoint, verticalOffset, horizontalOffset;
                if (startPointCartographic.height > endPointCartographic.height) {
                    highPoint = startPoint.position;
                    lowPoint = endPoint.position;
                    verticalOffset = startPointCartographic.height - endPointCartographic.height;
                } else {
                    highPoint = endPoint.position;
                    lowPoint = startPoint.position;
                    verticalOffset = endPointCartographic.height - startPointCartographic.height;
                }

                var up = new FreeDo.Cartesian3();
                FreeDo.Cartesian3.normalize(lowPoint, up);
                FreeDo.Cartesian3.multiplyByScalar(up, verticalOffset, up);
                var crossPoint = new FreeDo.Cartesian3();
                FreeDo.Cartesian3.add(lowPoint, up, crossPoint);

                horizontalOffset = FreeDo.Cartesian3.distance(crossPoint, highPoint);

               /* var line = polylineCollection.add({
                    positions: [highPoint, lowPoint],
                    width: 1,
                    show: true,
                    loop: false,
                    material: new FreeDo.Material({
                        fabric : {
                            type : 'Color',
                            uniforms : {
                                color: FreeDo.Color.RED
                            }
                        }
                    })
                });
                var verticalLine = polylineCollection.add({
                    positions: [lowPoint, crossPoint],
                    width: 1,
                    show: true,
                    loop: false,
                    material: new FreeDo.Material({
                        fabric : {
                            type : 'Color',
                            uniforms : {
                                color: FreeDo.Color.BLUE
                            }
                        }
                    })
                });
                var horizontalLine = polylineCollection.add({
                    positions: [highPoint, crossPoint],
                    width: 1,
                    show: true,
                    loop: false,
                    material: new FreeDo.Material({
                        fabric : {
                            type : 'Color',
                            uniforms : {
                                color: FreeDo.Color.GREEN
                            }
                        }
                    })
                });*/
                var line = viewer.entities.add({  
                    name : 'Red corridor on surface with rounded corners and outline',  
                    corridor : {  
                        positions : [highPoint, lowPoint], 
                        width : 10.0,  
                        material : FreeDo.Color.RED.withAlpha(0.5),  
                        outline : true,  
                        outlineColor : FreeDo.Color.RED  
                    }
                });  
                   
                var verticalLine = viewer.entities.add({  
                    name : 'Green corridor at height with mitered corners',  
                    corridor : {  
                        positions : [lowPoint, crossPoint],
                       // height: 100000.0,  
                        width : 10.0,  
                        cornerType: FreeDo.CornerType.MITERED,  
                        material : FreeDo.Color.GREEN  
                    }  
                });  
                   
                var horizontalLine = viewer.entities.add({  
                    name : 'Blue extruded corridor with beveled corners and outline',  
                    corridor : {  
                        positions : [highPoint, crossPoint],
                        //height : 200000.0,  
                        //extrudedHeight : 100000.0,  
                        width : 10.0,  
                        cornerType: FreeDo.CornerType.BEVELED,  
                        material : FreeDo.Color.BLUE.withAlpha(0.5),  
                        outline : true,  
                        outlineColor : FreeDo.Color.BLUE  
                    }  
                });  

                var lineLabelEntity = viewer.entities.add({
                    position: getCenter(highPoint, lowPoint),
                    label: {
                        text: getLengthText(calculateLength([highPoint, lowPoint])),
                        show: true,
                        showBackground: true,
                        backgroundColor: new FreeDo.Color(0.165, 0.165, 0.165, 1),
                        font: '14px monospace',
                        horizontalOrigin : FreeDo.HorizontalOrigin.CENTER,
                        verticalOrigin : FreeDo.VerticalOrigin.BOTTOM,
                        pixelOffset : new FreeDo.Cartesian2(0, 3),
                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                    }
                });
                var verticalLineLabelEntity = viewer.entities.add({
                    position: getCenter(lowPoint, crossPoint),
                    label: {
                        text: getLengthText(verticalOffset),
                        show: true,
                        showBackground: true,
                        backgroundColor: new FreeDo.Color(0.165, 0.165, 0.165, 1),
                        font: '14px monospace',
                        horizontalOrigin : FreeDo.HorizontalOrigin.CENTER,
                        verticalOrigin : FreeDo.VerticalOrigin.BOTTOM,
                        pixelOffset : new FreeDo.Cartesian2(0, 3),
                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                    }
                });
                var horizontalLineLabelEntity = viewer.entities.add({
                    position: getCenter(highPoint, crossPoint),
                    label: {
                        text: getLengthText(horizontalOffset),
                        show: true,
                        showBackground: true,
                        backgroundColor: new FreeDo.Color(0.165, 0.165, 0.165, 1),
                        font: '14px monospace',
                        horizontalOrigin : FreeDo.HorizontalOrigin.CENTER,
                        verticalOrigin : FreeDo.VerticalOrigin.BOTTOM,
                        pixelOffset : new FreeDo.Cartesian2(0, 3),
                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                    }
                });
                var startPointEntity = viewer.entities.add({
                    position: startPoint.position,
                    point: {
                        pixelSize: 3,
                        color: FreeDo.Color.WHITE,
                        outlineColor: FreeDo.Color.BLACK,
                        //disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        outlineWidth: 1
                    }
                });
                var endPointEntity = viewer.entities.add({
                    position: endPoint.position,
                    point: {
                        pixelSize: 3,
                        color: FreeDo.Color.WHITE,
                        outlineColor: FreeDo.Color.BLACK,
                        //disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        outlineWidth: 1
                    }
                });
                results.push({
                    type: resultType,
                    line: line,
                    verticalLine: verticalLine,
                    horizontalLine: horizontalLine,
                    lineLabelEntity: lineLabelEntity,
                    verticalLineLabelEntity: verticalLineLabelEntity,
                    horizontalLineLabelEntity: horizontalLineLabelEntity,
                    startPointEntity: startPointEntity,
                    endPointEntity: endPointEntity
                });
            }

            startPoint = undefined;
            endPoint = undefined;
        }

        function clearResults() {
            removeTmpLine();

            for (var i = 0; i < results.length; ++i) {
                if (results[i].type === ResultType.StraightLine) {
                    //polylineCollection.remove(results[i].line);
                	viewer.entities.remove(results[i].line);
                    viewer.entities.remove(results[i].labelEntity);
                    viewer.entities.remove(results[i].startPointEntity);
                    viewer.entities.remove(results[i].endPointEntity);
                } else if (results[i].type === ResultType.HorizontalAndVertical) {
                   /* polylineCollection.remove(results[i].line);
                    polylineCollection.remove(results[i].verticalLine);
                    polylineCollection.remove(results[i].horizontalLine);*/
                	viewer.entities.remove(results[i].line);
                	viewer.entities.remove(results[i].verticalLine);
                	viewer.entities.remove(results[i].horizontalLine);
                    viewer.entities.remove(results[i].lineLabelEntity);
                    viewer.entities.remove(results[i].verticalLineLabelEntity);
                    viewer.entities.remove(results[i].horizontalLineLabelEntity);
                    viewer.entities.remove(results[i].startPointEntity);
                    viewer.entities.remove(results[i].endPointEntity);
                }
            }
            results = [];
        }

        function pickStartPoint(windowPosition) {
            var pickResult = pickPosition(windowPosition);
            if (pickResult.type !== PositionType.NONE) {
                startPoint = pickResult;
                tempPointEntities[0] = viewer.entities.add({
                    position: startPoint.position,
                    point: {
                        pixelSize: 3,
                        color: FreeDo.Color.WHITE,
                        outlineColor: FreeDo.Color.BLACK,
                        //disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        outlineWidth: 1
                    }
                });
            }
        }

        function pickEndPoint(windowPosition) {
            var pickResult = pickPosition(windowPosition);
            if (pickResult.type !== PositionType.NONE) {
                removeTmpLine();

                addResult(pickResult);
            }
        }

        function handleLeftClick(movement) {
            if (!!startPoint) {
                pickEndPoint(movement.position);
                // if (!!endPoint && endPoint.type !== PositionType.NONE) {
                //     removeTmpLine();
                //     addResult();
                // }
            } else {
                pickStartPoint(movement.position);
            }
        };

        function handleRightClick(movement) {
            if (!!startPoint) {
                startPoint = undefined;
            }
            // if (!!endPoint) {
            //     endPoint = undefined;
            // }
        }

        function handleMouseMove(movement) {
            if (!!startPoint && !FreeDo.Cartesian3.equals(movement.endPosition, movement.startPosition)) {
                updateTmpLine(movement.endPosition);
            }
        }

        screenSpaceEventHandler.setInputAction(handleLeftClick, FreeDo.ScreenSpaceEventType.LEFT_CLICK);
        screenSpaceEventHandler.setInputAction(handleRightClick, FreeDo.ScreenSpaceEventType.RIGHT_CLICK);
        screenSpaceEventHandler.setInputAction(handleMouseMove, FreeDo.ScreenSpaceEventType.MOUSE_MOVE);

        this.destroy = function() {
            screenSpaceEventHandler.removeInputAction(FreeDo.ScreenSpaceEventType.LEFT_CLICK);
            screenSpaceEventHandler.removeInputAction(FreeDo.ScreenSpaceEventType.RIGHT_CLICK);
            screenSpaceEventHandler.removeInputAction(FreeDo.ScreenSpaceEventType.MOUSE_MOVE);
            clearResults();
            viewer.scene.primitives.remove(polylineCollection);
        };
    }
    
    //点测量
    function SurveyToolPointDistance() {
    	var PointLableArray = [];
    	var PointList = [];
    	function handleLeftClick(movement) {
    		 var cartesian = viewer.camera.pickEllipsoid(movement.position, scene.globe.ellipsoid);
		        if (cartesian) {
		            var cartographic = FreeDo.Cartographic.fromCartesian(cartesian);
		            var longitudeString = FreeDo.Math.toDegrees(cartographic.longitude).toFixed(2);
		            var latitudeString = FreeDo.Math.toDegrees(cartographic.latitude).toFixed(2);
		            var PointLabText =
		                'Lon: ' + ('   ' + longitudeString).slice(-7) + '\u00B0' +
		                '\nLat: ' + ('   ' + latitudeString).slice(-7) + '\u00B0';
		    		var PointLabelEntity = viewer.entities.add({
		                position: cartesian,
		                label: {
		                    text: PointLabText,
		                    show: true, 
		                    showBackground: true,
		                    backgroundColor: new FreeDo.Color(0.165, 0.165, 0.165, 1),
		                    font: '14px monospace',
		                    horizontalOrigin : FreeDo.HorizontalOrigin.CENTER,
		                    verticalOrigin : FreeDo.VerticalOrigin.BOTTOM,
		                    pixelOffset : new FreeDo.Cartesian2(0, 3),
		                    disableDepthTestDistance: Number.POSITIVE_INFINITY
		                }
		            });
		    		PointLableArray.push(PointLabelEntity);
		        }
    		  /*var entity = viewer.entities.add({
    		        label : {
    		            showBackground : true,
    		            font : '14px monospace',
    		            horizontalOrigin : FreeDo.HorizontalOrigin.LEFT,
    		            verticalOrigin : FreeDo.VerticalOrigin.TOP,
    		            pixelOffset : new FreeDo.Cartesian2(15, 0)
    		        }
    		    });
    		  var cartesian = viewer.camera.pickEllipsoid(movement.position, scene.globe.ellipsoid);
		        if (cartesian) {
		            var cartographic = FreeDo.Cartographic.fromCartesian(cartesian);
		            var longitudeString = FreeDo.Math.toDegrees(cartographic.longitude).toFixed(2);
		            var latitudeString = FreeDo.Math.toDegrees(cartographic.latitude).toFixed(2);
d
		            entity.position = cartesian;
		            entity.label.show = true;
		            entity.label.text =
		                'Lon: ' + ('   ' + longitudeString).slice(-7) + '\u00B0' +
		                '\nLat: ' + ('   ' + latitudeString).slice(-7) + '\u00B0';
		        } else {
		            entity.label.show = false;
		        }*/
    		    // Mouse over the globe to see the cartographic position
    		    /*handler = new FreeDo.ScreenSpaceEventHandler(scene.canvas);
    		    handler.setInputAction(function(movement) {
    		        var cartesian = viewer.camera.pickEllipsoid(movement.endPosition, scene.globe.ellipsoid);
    		        if (cartesian) {
    		            var cartographic = FreeDo.Cartographic.fromCartesian(cartesian);
    		            var longitudeString = FreeDo.Math.toDegrees(cartographic.longitude).toFixed(2);
    		            var latitudeString = FreeDo.Math.toDegrees(cartographic.latitude).toFixed(2);

    		            entity.position = cartesian;
    		            entity.label.show = true;
    		            entity.label.text =
    		                'Lon: ' + ('   ' + longitudeString).slice(-7) + '\u00B0' +
    		                '\nLat: ' + ('   ' + latitudeString).slice(-7) + '\u00B0';
    		        } else {
    		            entity.label.show = false;
    		        }
    		    }, FreeDo.ScreenSpaceEventType.MOUSE_MOVE);*/
        };
        
    	screenSpaceEventHandler.setInputAction(handleLeftClick, FreeDo.ScreenSpaceEventType.LEFT_CLICK);
		
    	this.destroy= function() {
			 for (var i = 0; i < PointLableArray.length; ++i) {
	                viewer.entities.remove(PointLableArray[i]);
	            }
	            results = [];
			screenSpaceEventHandler.removeInputAction(FreeDo.ScreenSpaceEventType.LEFT_CLICK);
		};
	}
    
    //方位角测量
    function SurveyToolAzimuthDistance() {
    	var AngleLableArray = [];
    	var firstLon = null;
    	var firstLat = null;
    	function handleLeftClick(movement) {
    		if(!firstLon){
    			var firstCartesian = viewer.camera.pickEllipsoid(movement.position,scene.globe.ellipsoid);
    			if(firstCartesian){
    				var firstcartographic = FreeDo.Cartographic.fromCartesian(firstCartesian);
    				firstLon = firstcartographic.longitude;
    				firstLat = firstcartographic.latitude;
    				var firstlongitude = FreeDo.Math.toDegrees(firstLon);
    				var firstlatitude = FreeDo.Math.toDegrees(firstLat);
    				var verticalTempLine = viewer.entities.add({  
                        name : 'Red corridor on surface with rounded corners and outline',  
                        corridor : {  
                            positions : FreeDo.Cartesian3.fromDegreesArray([  
                            	firstlongitude, firstlatitude,  
                            	firstlongitude, firstlatitude+0.001 
                            ]),  
                            width : 1.0,  
                            material : FreeDo.Color.RED.withAlpha(0.5),  
                            outline : true,  
                            outlineColor : FreeDo.Color.RED  
                        }  
                    });
    				AngleLableArray.push(verticalTempLine);
    			}
    		}else{
    			var lastCartesian = viewer.camera.pickEllipsoid(movement.position, scene.globe.ellipsoid);
    			if (lastCartesian) {
    				var lastcartographic = FreeDo.Cartographic.fromCartesian(lastCartesian);
    				
    				var distance_North = (lastcartographic.latitude - firstLat)*6371000.0;  
    				var distance_East = (lastcartographic.longitude - firstLon)*6371000.0*Math.cos(firstLat); 
    				var angle = Math.atan(Math.abs(distance_East/distance_North))*180./Math.PI;   
    				var firstlongitude = FreeDo.Math.toDegrees(firstLon);
    				var firstlatitude = FreeDo.Math.toDegrees(firstLat);
    				var lastlongitude = FreeDo.Math.toDegrees(lastcartographic.longitude);
    				var lastlatitude = FreeDo.Math.toDegrees(lastcartographic.latitude);
    				var dLo = lastlongitude - firstlongitude;  
    				var dLa = lastlatitude - firstlatitude;  
    			        if(dLo>0&&dLa<=0){  
    			            angle=(90.-angle)+90;
    			        }  
    			        else if(dLo<=0&&dLa<0){  
    			            angle=angle+180.;  
    			        }else if(dLo<0&&dLa>=0){  
    			            angle= (90.-angle)+270;  
    			        }  
    				//alert(angle);
    				
    				var PointLabelEntity = viewer.entities.add({
    					//position: lastCartesian,
    					position: FreeDo.Cartesian3.fromDegrees(firstlongitude+0.0003, firstlatitude+0.001),
    					label: {
    						text: angle.toString(),
    						show: true,
    						showBackground: true,
    						backgroundColor: new FreeDo.Color(0.165, 0.165, 0.165, 1),
    						font: '14px monospace',
    						horizontalOrigin : FreeDo.HorizontalOrigin.CENTER,
    						verticalOrigin : FreeDo.VerticalOrigin.BOTTOM,
    						pixelOffset : new FreeDo.Cartesian2(0, 3),
    						disableDepthTestDistance: Number.POSITIVE_INFINITY
    					}
    				});
    				var tempLine = viewer.entities.add({  
                        name : 'Red corridor on surface with rounded corners and outline',  
                        corridor : {  
                            positions : FreeDo.Cartesian3.fromDegreesArray([  
                            	firstlongitude, firstlatitude,  
                                lastlongitude, lastlatitude 
                            ]),  
                            width : 1.0,  
                            material : FreeDo.Color.RED.withAlpha(0.5),  
                            outline : true,  
                            outlineColor : FreeDo.Color.RED  
                        }  
                    });
    				
    				AngleLableArray.push(PointLabelEntity);
    				AngleLableArray.push(tempLine);
    			}
    			firstLon = null;
    	    	firstLat = null;
    		}
    		
        };
        
        //画弧
		//dot 圆点
		//r 半径
		//angle 圆心角
		//angleOfSlope 与x轴的夹角
		function drawArc(dot, r, angle, angleOfSlope){
		    var newDot = [dot[0], dot[1]];
		    var a = (angleOfSlope+angle/2)*Math.PI/180; 
		   // if(pop){ //计算圆心的新坐标
		        newDot[0] = dot[0]+10*Math.cos(a);
		        newDot[1] = dot[1]+10*Math.sin(a);
		    //}
		    if(!angleOfSlope){
		        angleOfSlope = 0;
		    }
		    var aos = angleOfSlope*Math.PI/180;
		    var aos2 = (angleOfSlope+angle)*Math.PI/180;
		    var pstart = [newDot[0]+r*Math.cos(aos), newDot[1]+r*Math.sin(aos)]; //弧线的起点
		    var pend = [newDot[0]+r*Math.cos(aos2), newDot[1]+r*Math.sin(aos2)]; //弧线的终点
		    var pre = pstart;
		    for(var i=0; i < angle; i+=2){ //在angle范围内画弧
		        rad = (i+angleOfSlope)*Math.PI/180;
		        var cur = [r*Math.cos(rad)+newDot[0], r*Math.sin(rad)+newDot[1]];
		       // drawLine(pre,cur);
		        var tempLineangle = viewer.entities.add({  
                name : 'Red corridor on surface with rounded corners and outline',  
                corridor : {  
                    positions : FreeDo.Cartesian3.fromDegreesArray([  
                    	pre[0], pre[1],  
                    	cur[0], cur[1] 
                    ]),  
                    width : 100.0,  
                    material : FreeDo.Color.RED.withAlpha(0.5),  
                    outline : true,  
                    outlineColor : FreeDo.Color.RED  
                }  
            });
		        pre = cur;
		    }
		}
        
    	screenSpaceEventHandler.setInputAction(handleLeftClick, FreeDo.ScreenSpaceEventType.LEFT_CLICK);
		
    	this.destroy= function() {
			 for (var i = 0; i < AngleLableArray.length; ++i) {
	                viewer.entities.remove(AngleLableArray[i]);
	            }
			 firstLon = null;
 	    	 firstLat = null;
			 AngleLableArray = [];
			screenSpaceEventHandler.removeInputAction(FreeDo.ScreenSpaceEventType.LEFT_CLICK);
		};
	}
}
