var EbsViewer = EbsViewer || {};

var index = 0;
var newObj = {};
var arr = [];
var currArr = [];
var first = true;

var indexReal = 0;
var arrReal = [];
var newObjReal = {};
var currArrReal = [];
var firstReal = true;

var compareIndex = 0;
var compareF = true;
var compareArr = [];
var newObjCompare = {};
var compareCurrArr = [];

EbsViewer.EbsObj = function (nodeId, fatherId, type, name, startDatePlan, endDatePlan, startDate, endDate, modelId, leaf) {
    this.nodeId = nodeId;
    this.fatherId = fatherId;
    this.type = type;
    this.name = name;
    this.startDatePlan = startDatePlan;
    this.endDatePlan = endDatePlan;
    this.startDate = startDate;
    this.endDate = endDate;
    this.modelId = modelId;
    this.leaf = leaf;
    this.children = [];
}

EbsViewer.ModelObj = function (id, parentId, name, type, url, lon, lat, height, course, alpha, roll, scaleX, scaleY, scaleZ,viewer) {
    this.id = id;
    this.parentId = parentId;
    this.name = name;
    this.url = url;
    this.type = type;
    this.lon = lon;
    this.lat = lat;
    this.height = height;
    this.course = course;
    this.alpha = alpha;
    this.roll = roll;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.scaleZ = scaleZ;
    var modelMatrix = FreeDoTool.getModelMatrix(lon, lat, height, course, alpha, roll, scaleX, scaleY, scaleZ);
    this.primitive = viewer.scene.primitives.add(FreeDo.Model.fromGltf(
        {
            id: id,
            url: url,
            show: true,                     // default
            modelMatrix: modelMatrix,
            allowPicking: false,            // not pickable
            debugShowBoundingVolume: false, // default
            debugWireframe: false
        }));
}

EbsViewer.GroupObj = function (id, parentId, name, type) {
    this.id = id;
    this.parentId = parentId;
    this.name = name;
    this.type = type;
    this.children = [];
}

var Init = function (earthId) {
    this.modelContainer = this.modelContainer || {};//未来保存加载的模型的容器，便于快速访问
    this.ebsContainer = this.ebsContainer || {};
    this.timeArray = this.timeArray || [];//保存了按时间排序的Ebs叶子节点
    this.timeIndex = 0;
    this.showEbsContainer = this.showEbsContainer || {};//保存了当前时间点中显示出来的Ebs节点对应的模型
    this.viewer = this.viewer || {};
    //初始化地球
  

   
    this.viewer = new Freedo.Viewer(earthId, {
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        selectedImageryProviderViewModel: false,
        scene3DOnly: true,
        clock: null,
        showRenderLoopErrors: false,
        automaticallyTrackDataSourceClocks: false,
        imageryProvider: new Freedo.WebMapTileServiceImageryProvider({
            url: "http://{s}.tianditu.com/img_c/wmts?service=WMTS&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet={TileMatrixSet}&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style={style}&format=tiles ",
            style: "default",
            tileMatrixSetID: "c",
            tilingScheme: new Freedo.GeographicTilingScheme(),
            tileMatrixLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"],
            maximumLevel: 17,
            subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"]
        })

    });
    this.viewer._cesiumWidget._creditContainer.style.display = "none";
	this.viewer.scene.globe.depthTestAgainstTerrain = true;
    this.viewer.imageryLayers.addImageryProvider(new FreeDo.WebMapTileServiceImageryProvider({
        url: "http://{s}.tianditu.com/cia_w/wmts?service=WMTS&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet={TileMatrixSet}&TileMatrix={TileMatrix}&TileRow={TileRow}&Tilecol={TileCol}&style={style}&format=tiles",
        style: "default",
        tileMatrixSetID: "w",
        maximumLevel: 17,
        subdomains: ["t7", "t6", "t5", "t4", "t3", "t2", "t1", "t0"]
    }));

    // cx 添加
    this.flag = true;
    this.selectModels = this.selectModels || [];
    this.lastModelId = this.lastModelId || -2;
    this.cam = [116.00013, 38.998999999999999999999999, 80.75962432438108];
    new Compass(this.viewer);

    //初始化EBS容器
    this.initEbs();
    this.initModels();
}

/**
 * 初始化EBS树模型容器
 */
Init.prototype = {
    initEbs:function(){
        var that = this;
        $.ajax({
            url: "../../../../../ebs/selectAll",
            dataType: "JSON",
            success: function (content) {
                var node = null;
                var ebsNode = null;
                var ebsParentNode = null;//模型缓存中的父节点
                var container = that.ebsContainer;
                var i = 0;
                for (; i < content.length; i++) {
                    node = content[i];

                    ebsParentNode = container[node.parentId];

                    if (ebsParentNode == undefined) {
                        ebsParentNode = container[node.parentId] = { children: [] };
                    }

                    ebsNode = new EbsViewer.EbsObj(node.id, node.parentId, node.type, node.text, node.startDatePlan, node.endDatePlan, node.startDate, node.endDate, node.modelId, node.leaf)

                    if (node.leaf == false) {
                        if (container[node.id] != undefined)
                            ebsNode.children = container[node.id].children;
                    } else {
                        if (typeof ebsNode.startDatePlan == "object") {
                            ebsNode.startDatePlan = new Date(ebsNode.startDatePlan).getTime();
                            ebsNode.endDatePlan = new Date(ebsNode.endDatePlan).getTime();
                            ebsNode.startDate = new Date(ebsNode.startDate).getTime();
                            ebsNode.endDate = new Date(ebsNode.endDate).getTime();
                        } else {
                            ebsNode.startDatePlan = new Date(ebsNode.startDatePlan);
                            ebsNode.endDatePlan = new Date(ebsNode.endDatePlan);
                            ebsNode.startDate = new Date(ebsNode.startDate);
                            ebsNode.endDate = new Date(ebsNode.endDate);
                        }
                    }

                    ebsParentNode.children.push(ebsNode);

                    container[node.id] = ebsNode;
                }
                //EbsViewer.initTimeArray();
            }
        })
    },
    initModels:function () {
        var that = this;
        $.ajax({
            url: "../../../../../pm/selectAll",
            dataType: "JSON",
            success: function (content) {
                var node = null;
                var modelNode = null;
                var modelParentNode = null;//模型缓存中的父节点
                var container = that.modelContainer;
    
                for (var i = 0; i < content.length; i++) {
                    node = content[i];
    
                    modelParentNode = container[node.parentId];
                    if (modelParentNode == undefined) {
                        modelParentNode = container[node.parentId] = { children: [] };
                    }
    
                    //非叶子节点
                    if (node.leaf == 0) {
                        modelNode = new EbsViewer.GroupObj(node.id, node.parentId, node.text, node.type);
    
                        if (container[node.id] != undefined) {
                            modelNode.children = container[node.id].children;
                        }
                    } else {
                        var parameter = JSON.parse(node.attributes.parameter);
                        modelNode = new EbsViewer.ModelObj(node.id, node.parentId, node.text, node.type, "../../../../../static/model/" + parameter.filePath, parameter.lon, parameter.lat, parameter.height-46, parameter.course, parameter.alpha, parameter.roll, parameter.scaleX, parameter.scaleY, parameter.scaleZ,that.viewer);
                    }
    
                    container[node.id] = modelNode;
                    modelParentNode.children.push(modelNode.id);
                }
            }
        });
    }
}

/**
 * 根据EBS计划开始时间排序的数组
 */
EbsViewer.initTimeArray = function () {
    for (var attr in this.ebsContainer) {
        if (this.ebsContainer[attr].leaf) {

            this.timeArray.push(this.ebsContainer[attr]);
        }
    }

    this.timeArray.sort(function (a, b) {
        return a.startDatePlan.getTime() - b.startDatePlan.getTime();
    })
}

/**
 * 显示当计划时间在currentDate之前的ebs节点对应的模型,用于拖拽情景
 * currentDate : type[Date]
 */
EbsViewer.showModelBeforeDate = function (currentDate) {
    var index = this.timeIndex;
    var direction;

    var finishColor = { red: 1, green: 1, blue: 1, alpha: 1 };
    var unfinishColor = { red: 1, green: 1, blue: 1, alpha: 0.5 };

    if (this.timeArray[index].startDatePlan.getTime() > currentDate.getTime())
        direction = -1;
    else if (this.timeArray[index].startDatePlan.getTime() < currentDate.getTime())
        direction = 1;
    else
        return;


    if (direction == -1) {
        for (; index > -1; index++) {
            var ebsObj = this.timeArray[index];
            if (ebsObj.startDatePlan.getTime() > currentDate.getTime())
                this.removeFromEbsContainer(ebsObj);
            else
                break;
        }

    } else {
        for (; index < this.timeArray.length; index++) {
            var ebsObj = this.timeArray[index];
            if (ebsObj.startDatePlan.getTime() < currentDate.getTime())
                this.addToShowEbsContainer(ebsObj);
            else
                break;
        }
    }

    this.timeIndex = index;

    for (var attr in this.showEbsContainer) {
        var ebsObj = this.showEbsContainer[attr];
        if (ebsObj.endDatePlan.getTime() < currentDate.getTime())
            this.changeEbsColor(ebsObj, finishColor);
        else
            this.changeEbsColor(ebsObj.unfinishColor);
    }

}


/**
 * 正常播放时每次时间发生了变化调用此方法
 * currentDate:type[Date]
 */
EbsViewer.showModelContinuePlay = function (currentDate) {
    var index = this.timeIndex;
    for (; index < this.timeArray.length; index++) {
        var ebsObj = this.timeArray[index];
        if (ebsObj.startDatePlan.getTime() > currentDate.getTime())
            break;
        this.addToShowEbsContainer(ebsObj);
        this.changeEbsColor(ebsObj, { red: 1, green: 1, blue: 1, alpha: 0.5 });
    }

    this.timeIndex = index;

    for (var attr in this.showEbsContainer) {
        var ebsObj = this.showEbsContainer[attr];
        if (ebsObj.endDatePlan.getTime() < currentDate.getTime()) {
            this.changeEbsColor(ebsObj.finishColor);
            delete this.showEbsContainer[ebsObj.nodeId];
        }
    }
}

EbsViewer.addToShowEbsContainer = function (ebsObj) {
    this.showEbsContainer[ebsObj.nodeId] = ebsObj;
    this.showEbs(ebsObj);
}

EbsViewer.removeFromShowEbsContainer = function (ebsObj) {
    delete this.showEbsContainer[ebsObj.nodeId];
    this.hideEbs(ebsObj);
}

EbsViewer.showEbs = function (ebsObj) {
    var modelObjs = [];
    var modelObj = this.modelContainer[ebsObj.modelId];

    modelObjs.push(modelObj);
    for (var i = 0; i < modelObjs.length; i++) {

        modelObj = modelObjs.pop();

        if (modelObj.type == 2) {
            FreeDoTool.showModel(modelObj.primitive)
            FreeDoTool.changeColor(modelObj.primitive, 1, 1, 1, 1);
        } else {
            for (var j = 0; j < modelObj.children.length; j++) {
                modelObjs.push(modelObj.children[j]);
            }
        }
    }
}

EbsViewer.hideEbs = function (ebsObj) {
    var modelObjs = [];
    var modelObj = this.modelContainer[ebsObj.modelId];

    modelObjs.push(modelObj);
    for (var i = 0; i < modelObjs.length; i++) {

        modelObj = modelObjs.pop();

        if (modelObj.type == 2) {
            FreeDoTool.hideModel(modelObj.primitive)
        } else {
            for (var j = 0; j < modelObj.children.length; j++) {
                modelObjs.push(modelObj.children[j]);
            }
        }
    }
}

EbsViewer.changeEbsColor = function (ebsObj, color) {
    var modelObjs = [];
    var modelObj = this.modelContainer[ebsObj.modelId];

    modelObjs.push(modelObj);
    for (var i = 0; i < modelObjs.length; i++) {

        modelObj = modelObjs.pop();

        if (modelObj.type == 2) {
            FreeDoTool.changeColor(ebsObj, color.red, color.green, color.blue, color.alpha);
        } else {
            for (var j = 0; j < modelObj.children.length; j++) {
                modelObjs.push(modelObj.children[j]);
            }
        }
    }
}

EbsViewer.flyToModel = function (nodeId,obj) {

    var modelObj = obj.modelContainer[nodeId];
    if (modelObj instanceof EbsViewer.EbsObj) {
        return;
    }
    if (obj.selectModels.length != 0) {	//清空存储所选模型的容器

        for (var i = 0; i < obj.selectModels.length; i++)
            obj.selectModels[i].primitive.color = new FreeDo.Color(1, 1, 1, 1);

        obj.selectModels = [];
    }
    if (obj.lastModelId != -2) {
        obj.modelContainer[obj.lastModelId].primitive.color = new FreeDo.Color(1, 1, 1, 1);

    }
    obj.modelContainer[nodeId].primitive.color = new FreeDo.Color(0, 238, 0, 1);
    FreeDoTool.flyToModel(obj.viewer.camera, modelObj.primitive, 1);
    obj.lastModelId = nodeId;

}

// 多模型飞行
EbsViewer.flyToModels = function (nodeIds,obj) {
    if (obj.lastModelId != -2) {
        obj.modelContainer[obj.lastModelId].primitive.color = new FreeDo.Color(1, 1, 1, 1);
    }
    if (nodeIds.length == 0){
            return false;
        }
    var positions = [];
    var node = null;
    if (obj.selectModels.length != 0) {	//清空存储所选模型的容器
        for (var i = 0; i < obj.selectModels.length; i++) {
                obj.selectModels[i].primitive.color = new FreeDo.Color(1, 1, 1, 1);
            }
        obj.selectModels = [];
    }
    for (var i = 0; i < nodeIds.length; i++) {	//设置多模型颜色
        node = obj.modelContainer[nodeIds[i]];
        positions.push({ lon: node.lon, lat: node.lat, height: node.height });
        //设置模型颜色
        // obj.selectModels.push({ primitive: node.primitive });
        // node.primitive.color = new FreeDo.Color(0, 238, 0, 1);
    }
    obj.flag = false;
    FreeDoTool.flyToModels(obj.viewer.camera, positions, function(){
        obj.flag = true;
    });
}

// 点击计划/实际 切换 飞到对应的模型上
EbsViewer.planRealFly = function (currDay,flag,obj) {
   
    var nodeIds = [];
    for (var j in obj.ebsContainer) {
        if (obj.ebsContainer[j].type == 2) {
            obj.ebsContainer[j].startDatePlan = new Date(obj.ebsContainer[j].startDatePlan).getTime();
            obj.ebsContainer[j].endDatePlan = new Date(obj.ebsContainer[j].endDatePlan).getTime();
            obj.ebsContainer[j].startDate = new Date(obj.ebsContainer[j].startDate).getTime();
            obj.ebsContainer[j].endDate = new Date(obj.ebsContainer[j].endDate).getTime();
        }
    }
    if(flag){
        for (var i in obj.ebsContainer) {
            if (obj.ebsContainer[i].type == 2 && obj.ebsContainer[i].startDatePlan <= currDay && obj.ebsContainer[i].endDatePlan >= currDay) {
                let id = obj.ebsContainer[i].modelId;
                obj.modelContainer[id].primitive.color = new FreeDo.Color(255, 0, 0, 1);
                nodeIds.push(id);
                obj.modelContainer[id].primitive.show = true;
            } else if (obj.ebsContainer[i].type == 2 && obj.ebsContainer[i].endDatePlan < currDay) {
                let id = obj.ebsContainer[i].modelId;
                obj.modelContainer[id].primitive.show = true;
                obj.modelContainer[id].primitive.color = new FreeDo.Color(1, 1, 1, 1);
            } else if (obj.ebsContainer[i].type == 2 && obj.ebsContainer[i].startDatePlan > currDay) {
                let id = obj.ebsContainer[i].modelId;
                obj.modelContainer[id].primitive.show = false;
            }
        }
    }else{
        for (var i in obj.ebsContainer) {
            if (obj.ebsContainer[i].type == 2 && obj.ebsContainer[i].startDate <= currDay && obj.ebsContainer[i].endDate >= currDay) {
                let id = obj.ebsContainer[i].modelId;
                obj.modelContainer[id].primitive.color = new FreeDo.Color(0, 238, 0, 1);
                nodeIds.push(id);
                obj.modelContainer[id].primitive.show = true;
            } else if (obj.ebsContainer[i].type == 2 && obj.ebsContainer[i].endDate < currDay) {
                let id = obj.ebsContainer[i].modelId;
                obj.modelContainer[id].primitive.show = true;
                obj.modelContainer[id].primitive.color = new FreeDo.Color(1, 1, 1, 1);
            } else if (obj.ebsContainer[i].type == 2 && obj.ebsContainer[i].startDate > currDay) {
                let id = obj.ebsContainer[i].modelId;
                obj.modelContainer[id].primitive.show = false;
            }
        }
    }
    EbsViewer.flyToModels(nodeIds,obj);
    obj.flag = true;
};

EbsViewer.compareFly = function (currDay,obj) {
    
     var nodeIds = [];
     for (var j in obj.ebsContainer) {
         if (obj.ebsContainer[j].type == 2) {
             obj.ebsContainer[j].startDatePlan = new Date(obj.ebsContainer[j].startDatePlan).getTime();
             obj.ebsContainer[j].endDatePlan = new Date(obj.ebsContainer[j].endDatePlan).getTime();
             obj.ebsContainer[j].startDate = new Date(obj.ebsContainer[j].startDate).getTime();
             obj.ebsContainer[j].endDate = new Date(obj.ebsContainer[j].endDate).getTime();
         }
     }
     
         for (var i in obj.ebsContainer) {
             if (obj.ebsContainer[i].type == 2 && obj.ebsContainer[i].startDatePlan <= currDay && obj.ebsContainer[i].endDatePlan >= currDay) {
                 let id = obj.ebsContainer[i].modelId;
                 nodeIds.push(id);
                 obj.modelContainer[id].primitive.show = true;
             } else if (obj.ebsContainer[i].type == 2 && obj.ebsContainer[i].endDatePlan < currDay) {
                 let id = obj.ebsContainer[i].modelId;
                 obj.modelContainer[id].primitive.show = true;
                 obj.modelContainer[id].primitive.color = new FreeDo.Color(1, 1, 1, 1);
             } else if (obj.ebsContainer[i].type == 2 && obj.ebsContainer[i].startDatePlan > currDay) {
                 let id = obj.ebsContainer[i].modelId;
                 obj.modelContainer[id].primitive.show = false;
             }

             if (obj.ebsContainer[i].type == 2 && obj.ebsContainer[i].startDate <= currDay && obj.ebsContainer[i].endDate >= currDay) {
                let id = obj.ebsContainer[i].modelId;
                nodeIds.push(id);
                obj.modelContainer[id].primitive.show = true;
                obj.modelContainer[id].primitive.color = new FreeDo.Color(255, 0, 0, 1);
            } 
         }

     EbsViewer.flyToModels(nodeIds,obj);
     obj.flag = true;
 };

// 是否隐藏模型
EbsViewer.hideOrShowModel = function (show,obj) {
    if (show) {
        for (let i in obj.modelContainer) {
            if (obj.modelContainer[i].primitive != undefined) {
                obj.modelContainer[i].primitive.show = true;
                obj.modelContainer[i].primitive.color = new FreeDo.Color(1, 1, 1, 1);
            }
        }
    } else {
        for (let i in obj.modelContainer) {
            if (obj.modelContainer[i].primitive != undefined) {
                obj.modelContainer[i].primitive.show = false;
            }
        }
    }
};

// 计划播放优化
EbsViewer.playFlyPlan = function (currDay,obj) {
    var nodeIds = [];
    if (first) {
        for (var j in obj.ebsContainer) {
            if (obj.ebsContainer[j].type == 2) {
                obj.ebsContainer[j].startDatePlan = new Date(obj.ebsContainer[j].startDatePlan).getTime();
                obj.ebsContainer[j].endDatePlan = new Date(obj.ebsContainer[j].endDatePlan).getTime();
            }
        }
        deepCopy(newObj, obj.ebsContainer);
        for (var key in newObj) {
            if (newObj.hasOwnProperty(key)) {
                if (newObj[key].type == 2) {
                    arr.push(newObj[key]);
                }
            }
        }
         // 按开始时间排序
        arr.sort(function (a, b) {
            return a.startDatePlan > b.startDatePlan ? 1 : -1;
        });

        // 每一项添加一个排序后的索引
        for (var i = 0; i < arr.length; i++) {
            arr[i].index = i;
        }
        
    } else {
        for (let i = 0; i < currArr.length; i++) {
            currArr[i].primitive.show = true;
            currArr[i].primitive.color = new FreeDo.Color(1, 1, 1, 1);
        }
    }
    currArr = [];                      //清空当前数组
    // 与当前时间相同的添加到当前数组里面
    
    for (let m = index; m < arr.length; m++) {
        if (currDay >= arr[m].startDatePlan && currDay <= arr[m].endDatePlan) {
            let id = arr[m].modelId;
            obj.modelContainer[id].primitive.show = true;
            obj.modelContainer[id].primitive.color = new FreeDo.Color(255, 0, 0, 1);
            currArr.push(obj.modelContainer[id]);
            index = arr[m].index;
        }
    }
    for (var n = 0; n < currArr.length; n++) {
        nodeIds.push(currArr[n].id);
    }

    if (obj.flag == true) {
        EbsViewer.flyToModels(nodeIds,obj)
    }
    first = false;
};


// 实际播放优化
EbsViewer.playFlyReal = function (currDay,obj) {
    var nodeIds = [];
    if (firstReal) {
        for (var j in obj.ebsContainer) {
            if (obj.ebsContainer[j].type == 2) {
                obj.ebsContainer[j].startDate = new Date(obj.ebsContainer[j].startDate).getTime();
                obj.ebsContainer[j].endDate = new Date(obj.ebsContainer[j].endDate).getTime();
            }
        }
        deepCopy(newObjReal, obj.ebsContainer);
        for (var key in newObjReal) {
            if (newObjReal.hasOwnProperty(key)) {
                if (newObjReal[key].type == 2) {
                    arrReal.push(newObjReal[key]);
                }
            }
        }
        // 按开始时间排序
        arrReal.sort(function (a, b) {
            return a.startDate > b.startDate ? 1 : -1;
        });
        // 每一项添加一个排序后的索引
        for (var i = 0; i < arrReal.length; i++) {
            arrReal[i].index = i;
        }
    } else {
        for (let i = 0; i < currArrReal.length; i++) {
            currArrReal[i].primitive.show = true;
            currArrReal[i].primitive.color = new FreeDo.Color(1, 1, 1, 1);
        }
    }
    currArrReal = [];                      //清空当前数组
    // 与当前时间相同的添加到当前数组里面
    for (let m = indexReal; m < arrReal.length; m++) {
        if (currDay >= arrReal[m].startDate && currDay <= arrReal[m].endDate) {
            let id = arrReal[m].modelId;
            obj.modelContainer[id].primitive.show = true;
            obj.modelContainer[id].primitive.color = new FreeDo.Color(0, 238, 0, 1);
            currArrReal.push(obj.modelContainer[id]);
            indexReal = arrReal[m].index;
        }
    }

    // 获取 id 组
    for (var n = 0; n < currArrReal.length; n++) {
        nodeIds.push(currArrReal[n].id);
    }
    
    if (obj.flag == true) {
        EbsViewer.flyToModels(nodeIds,obj)
    }
    firstReal = false;
};

//比较播放
EbsViewer.playFlyCompare = function (currDay,obj) {
    var nodeIds = [];
    if (compareF) {
        for (var j in obj.ebsContainer) {
            if (obj.ebsContainer[j].type == 2) {
                obj.ebsContainer[j].startDatePlan = new Date(obj.ebsContainer[j].startDatePlan).getTime();
                obj.ebsContainer[j].endDatePlan = new Date(obj.ebsContainer[j].endDatePlan).getTime();
                obj.ebsContainer[j].startDate = new Date(obj.ebsContainer[j].startDate).getTime();
                obj.ebsContainer[j].endDate = new Date(obj.ebsContainer[j].endDate).getTime();
            }
        }
        deepCopy(newObjCompare, obj.ebsContainer);
        for (var key in newObjCompare) {
            if (newObjCompare.hasOwnProperty(key)) {
                if (newObjCompare[key].type == 2) {
                    compareArr.push(newObjCompare[key]);
                }
            }
        }
        // 按开始时间排序
        compareArr.sort(function (a, b) {
            return a.startDate > b.startDate ? 1 : -1;
        });
        // 每一项添加一个排序后的索引
        for (var i = 0; i < compareArr.length; i++) {
            compareArr[i].index = i;
        }
    } else {
        for (let i = 0; i < compareCurrArr.length; i++) {
            compareCurrArr[i].primitive.show = true;
            compareCurrArr[i].primitive.color = new FreeDo.Color(1, 1, 1, 1);
        }
    }
    compareCurrArr = [];                      //清空当前数组
    // 与当前时间相同的添加到当前数组里面
    for (let m = compareIndex; m < compareArr.length; m++) {

        if (currDay >= compareArr[m].startDate && currDay <= compareArr[m].endDate) {
            let id = compareArr[m].modelId;
            obj.modelContainer[id].primitive.show = true;
            obj.modelContainer[id].primitive.color = new FreeDo.Color(0, 238, 0, 1);
            compareCurrArr.push(obj.modelContainer[id]);
            compareIndex = compareArr[m].index;
        }
        if (currDay >= compareArr[m].startDatePlan && currDay <= compareArr[m].endDatePlan) {
            let id = compareArr[m].modelId;
            obj.modelContainer[id].primitive.show = true;
            obj.modelContainer[id].primitive.color = new FreeDo.Color(255,0,0, 1);
            compareCurrArr.push(obj.modelContainer[id]);
        }
    }
    

    // 获取 id 组
    for (var n = 0; n < compareCurrArr.length; n++) {
        nodeIds.push(compareCurrArr[n].id);
    }
    if (obj.flag == true) {
        EbsViewer.flyToModels(nodeIds,obj)
    }
    compareF = false;
};

// 计划拖拽
EbsViewer.dragPlan = function (currDay,obj) {
    obj.flag = true;
    currArr = [];                      //清空当前数组
    var nodeIds = [];
    var indexArr = [];
    if (first) {
        for (var j in obj.ebsContainer) {
            if (obj.ebsContainer[j].type == 2) {
                obj.ebsContainer[j].startDatePlan = new Date(obj.ebsContainer[j].startDatePlan).getTime();
                obj.ebsContainer[j].endDatePlan = new Date(obj.ebsContainer[j].endDatePlan).getTime();
            }
        }
        deepCopy(newObj, obj.ebsContainer);
        for (var key in newObj) {
            if (newObj.hasOwnProperty(key)) {
                if (newObj[key].type == 2) {
                    arr.push(newObj[key]);
                }
            }
        }
         // 按开始时间排序
        arr.sort(function (a, b) {
            return a.startDatePlan > b.startDatePlan ? 1 : -1;
        });

        // 每一项添加一个排序后的索引
        for (var i = 0; i < arr.length; i++) {
            arr[i].index = i;
        }
    } 
    for (var m = 0; m < arr.length; m++) {
        if (currDay >= arr[m].startDatePlan && currDay <= arr[m].endDatePlan) {
            let id = arr[m].modelId;
            obj.modelContainer[id].primitive.show = true;
            obj.modelContainer[id].primitive.color = new FreeDo.Color(255, 0, 0, 1);
            currArr.push(obj.modelContainer[id]);
            indexArr.push(arr[m]);
        } else if (currDay < arr[m].startDatePlan) {
            let id = arr[m].modelId;
            obj.modelContainer[id].primitive.show = false;
        } else if (currDay > arr[m].endDatePlan) {
            let id = arr[m].modelId;
            obj.modelContainer[id].primitive.show = true;
            obj.modelContainer[id].primitive.color = new FreeDo.Color(1, 1, 1, 1);
        }
    }

    // 模型的 id 组
    for (var n = 0; n < currArr.length; n++) {
        nodeIds.push(currArr[n].id);
    }

    // 求出最大的 index,下次遍历从 index 开始
    for (var n = 0; n < indexArr.length; n++) {
        index = indexArr[0].index;
        if (indexArr[n].index > index) {
            index = indexArr[n].index;
        }
    }

    if (obj.flag == true) {
        EbsViewer.flyToModels(nodeIds,obj)
        first = false;
    }
};

// 实际拖拽
EbsViewer.dragReal = function (currDay,obj) {
    obj.flag = true;
    currArrReal = [];                      //清空当前数组
    var nodeIds = [];
    var indexArr = [];
    if (firstReal) {
        for (var j in obj.ebsContainer) {
            if (obj.ebsContainer[j].type == 2) {
                obj.ebsContainer[j].startDate = new Date(obj.ebsContainer[j].startDate).getTime();
                obj.ebsContainer[j].endDate = new Date(obj.ebsContainer[j].endDate).getTime();
            }
        }
        deepCopy(newObjReal, obj.ebsContainer);
        for (var key in newObjReal) {
            if (newObjReal.hasOwnProperty(key)) {
                if (newObjReal[key].type == 2) {
                    arrReal.push(newObjReal[key]);
                }
            }
        }
        // 按开始时间排序
        arrReal.sort(function (a, b) {
            return a.startDate > b.startDate ? 1 : -1;
        });
        // 每一项添加一个排序后的索引
        for (var i = 0; i < arrReal.length; i++) {
            arrReal[i].index = i;
        }
    } 
    for (var m = 0; m < arrReal.length; m++) {
        if (currDay >= arrReal[m].startDate && currDay <= arrReal[m].endDate) {
            let id = arrReal[m].modelId;
            obj.modelContainer[id].primitive.show = true;
            obj.modelContainer[id].primitive.color = new FreeDo.Color(0, 238, 0, 1);
            currArrReal.push(obj.modelContainer[id]);
            indexArr.push(arrReal[m]);
        } else if (currDay < arrReal[m].startDate) {
            let id = arrReal[m].modelId;
            obj.modelContainer[id].primitive.show = false;
        } else if (currDay > arrReal[m].endDate) {
            let id = arrReal[m].modelId;
            obj.modelContainer[id].primitive.show = true;
            obj.modelContainer[id].primitive.color = new FreeDo.Color(1, 1, 1, 1);
        }
    }
     // 模型的 id 组
     for (var n = 0; n < currArrReal.length; n++) {
        nodeIds.push(currArrReal[n].id);
    }

    // 求出最大的 index,下次遍历从 index 开始
    for (var n = 0; n < indexArr.length; n++) {
        indexReal = indexArr[0].index;
        if (indexArr[n].index > index) {
            indexReal = indexArr[n].index;
        }
    }

    if (obj.flag == true) {
        EbsViewer.flyToModels(nodeIds,obj)
    }
    firstReal = false;
};


// 实际拖拽
EbsViewer.dragCompare = function (currDay,obj) {
    obj.flag = true;
    compareCurrArr = [];                      //清空当前数组
    var nodeIds = [];
    var indexArr = [];
    if (compareF) {
        for (var j in obj.ebsContainer) {
            if (obj.ebsContainer[j].type == 2) {
                obj.ebsContainer[j].startDatePlan = new Date(obj.ebsContainer[j].startDatePlan).getTime();
                obj.ebsContainer[j].endDatePlan = new Date(obj.ebsContainer[j].endDatePlan).getTime();
                obj.ebsContainer[j].startDate = new Date(obj.ebsContainer[j].startDate).getTime();
                obj.ebsContainer[j].endDate = new Date(obj.ebsContainer[j].endDate).getTime();
            }
        }
        deepCopy(newObjCompare, obj.ebsContainer);
        for (var key in newObjCompare) {
            if (newObjCompare.hasOwnProperty(key)) {
                if (newObjCompare[key].type == 2) {
                    compareArr.push(newObjCompare[key]);
                }
            }
        }
        // 按开始时间排序
        compareArr.sort(function (a, b) {
            return a.startDate > b.startDate ? 1 : -1;
        });
        // 每一项添加一个排序后的索引
        for (var i = 0; i < compareArr.length; i++) {
            compareArr[i].index = i;
        }
    } 
    for (var m = 0; m < compareArr.length; m++) {
        if (currDay >= compareArr[m].startDatePlan && currDay <= compareArr[m].endDatePlan) {
            let id = compareArr[m].modelId;
            obj.modelContainer[id].primitive.show = true;
            obj.modelContainer[id].primitive.color = new FreeDo.Color(255,0,0, 1);
            compareCurrArr.push(obj.modelContainer[id]);
            indexArr.push(compareArr[m]);
        }
        if (currDay < compareArr[m].startDatePlan) {
            let id = compareArr[m].modelId;
            obj.modelContainer[id].primitive.show = false;
        }
        if (currDay > compareArr[m].endDatePlan) {
            let id = compareArr[m].modelId;
            obj.modelContainer[id].primitive.show = true;
            obj.modelContainer[id].primitive.color = new FreeDo.Color(1, 1, 1, 1);
        }

        if (currDay >= compareArr[m].startDate && currDay <= compareArr[m].endDate) {
            let id = compareArr[m].modelId;
            obj.modelContainer[id].primitive.show = true;
            obj.modelContainer[id].primitive.color = new FreeDo.Color(0,238,0, 1);
           
        }
    }
     // 模型的 id 组
     for (var n = 0; n < compareCurrArr.length; n++) {
        nodeIds.push(compareCurrArr[n].id);
    }

    // 求出最大的 index,下次遍历从 index 开始
    for (var n = 0; n < indexArr.length; n++) {
        compareIndex = indexArr[0].index;
        if (indexArr[n].index > index) {
            compareIndex = indexArr[n].index;
        }
    }

    if (obj.flag == true) {
        EbsViewer.flyToModels(nodeIds,obj)
    }
    compareF  = false;
};



//CX 第一次飞行时相机的定位
EbsViewer.flyPlay = function (lon,obj) {
    obj.flag = false;
    lon = lon || obj.cam[0];
    obj.viewer.camera.flyTo({
        duration: 2,
        destination: FreeDo.Cartesian3.fromDegrees(lon, obj.cam[1], obj.cam[2]),
        orientation: {
            heading: FreeDo.Math.toRadians(0),
            pitch: FreeDo.Math.toRadians(-23.505602651317178),
            roll: 0.0022478112313147024
        },
        complete: function () {
            obj.flag = true;
        }
    });
};
/**
 * @param {any} newObj     新的对象
 * @param {any} oldObj     复制的对象
 * @returns                复制过后的对象
· */
function deepCopy(newObj, oldObj) {
    newObj = newObj || {};
    for (let i in oldObj) {
        if (oldObj.hasOwnProperty(i)) {
            if (typeof oldObj[i] == "object") {
                newObj[i] = Array.isArray(oldObj[i]) ? [] : {};         // 判断是数组还是对象
                deepCopy(newObj[i], oldObj[i]);                         // 引用类型
            } else {
                newObj[i] = oldObj[i];                                  // 值类型
            }
        }
    }
    return newObj;
}


