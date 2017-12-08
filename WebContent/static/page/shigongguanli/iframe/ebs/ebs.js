$(function () {
    let manager = {};
    let lineId = {};                                                // 选中时的对象
    let threeD = false;                                             // 是否为 3D 视图
    let lastBtn = "project";                                        // 判断上次点击是
																	// 计划管理-->计划播放
																	// /
																	// 进度填报-->实际播放
    let oneDayMS = 24 * 60 * 60 * 1000;                             // 一天的毫秒数
    let sliderWidth = 600;                                          // 进度条的总长度
    let ebsData;                                                    // 存储请求回来的数据
    let strOption = "";                                             // 对应模型文字
    let playPlanTime = 400;                                         // 计划播放 时间间隔
    let leftDis = 0;                                                // 计划播放初始值
    let startDayMS;                                                 // 计划播放开始时间的毫秒
    let endDayMS;                                                   // 计划播放结束时间的毫秒
    let currDayMS;                                                  // 计划播放当前时间的毫秒
    let playFirst = true;                                           // 设置第一次播放标志

    let playRealTime = 400;                                         // 实际播放 时间间隔
    let realLeftDis = 0;                                            // 实际播放初始值
    let realStartDayMS;                                             // 实际播放开始时间的毫秒
    let realEndDayMS;                                               // 实际播放结束时间的毫秒
    let realCurrDayMS;                                              // 实际播放当前时间的毫秒

    let compareTime = 400;                                          // 比较播放 时间间隔
    let compareLeftDis = 0;                                         // 比较播放初始值
    let compareStartDayMS;                                          // 比较播放开始时间的毫秒
    let compareEndDayMS;                                            // 比较播放结束时间的毫秒
    let comparelCurrDayMS;                                          // 比较播放当前时间的毫秒
    let timer1 = null,timer2 = null,timer3 = null;                  // 计划播放和实际播放定时器

    let data = [
        {"name": "大桥", "des": "bridge"},
        {"name": "厦门路桥科研", "des": "XMBridge"},
        {"name": "吴定高速", "des": "highSpeed"},
        {"name": "设计施工一体化", "des": "waterOrElectricity"}
    ]; // 工程的模拟数据
    let loadTimeData = true;
    let docWidth = $(document.body).width();
    let avgWidth = docWidth / 7;
    let oneFifth = docWidth / 5;
    let height = $(document.body).height() - $("#header").height();
    
    $('#treeGrid').treegrid({
        animate:true,
        width: docWidth,
        height: height
    });

    // 获取数据并初始化
    manager.loadDataInit = function () {
        $.ajax({
            url: "../../../../../ebs/selectAll",
            dataType: "json",
            success: function (content) {
                let bufferData = {}; // 缓存数据
                let node = null;
                let parentNode = null;

                for (let i = 0; i < content.length; i++) {
                    // 数据库没有暂时内存添加
                    if (content[i].type == 2) {
                        content[i].car = 0;
                        content[i].men = 0;
                        content[i].unit = "个";
                        
                    }
                    content[i].unit_Account = 6;
                    content[i].quantities = 3;
                    content[i].start = 24;
                    content[i].end = 24;
                    // 格式化日期
                    content[i].startDatePlan = edit.formatDate(content[i].startDatePlan);
                    content[i].startDate = edit.formatDate(content[i].startDate);
                    content[i].endDatePlan = edit.formatDate(content[i].endDatePlan);
                    content[i].endDate = edit.formatDate(content[i].endDate);
                    node = content[i];

                    parentNode = bufferData[node.parentId];
                    if (parentNode == undefined) { // 如果在树结构数据中不存在父节点则创建一个
                        parentNode = bufferData[node.parentId] = {
                            children: []
                        };
                    }
                    if (node.leaf == false) {
                        if (bufferData[node.id] == undefined) {
                            node.children = [];
                        } else {
                            node.children = bufferData[node.id].children;
                        }
                        bufferData[node.id] = node;
                    }
                    parentNode.children.push(node);
                }
                ebsData = content;
                manager.relativeModel(); // 加载二维页面的对应模型数据
                manager.twoProject(content); // 进入时，初始化的页面 工程分解的二维页面

                $('#treeGrid').treegrid('select', content[0].id); // 初始化选中第一行，并赋值给
																	// lineId
                lineId = content[0];

            },
            error: function (err) {
                console.log(err);
            }
        });
        $('#nodeModel').dialog({
            width: 400,
            height: 400,
            closed: true,
            resizable: true,
            modal: true
        });
    };

    // 加载下拉列表的数据
    manager.select = function () {
        let selStr = "";
        for (let i = 0; i < data.length; i++) {
            selStr += "<option value=" + data[i].des + ">" + data[i].name + "</option>";
        }
        $("#header .select").append(selStr);
    };

    // 对应模型文字
    manager.relativeModel = function () {
        // 2D 页面显示对应模型的位置
        for (let i = 0; i < ebsData.length; i++) {
            let arr = [];
            let parentId = ebsData[i].parentId;
            arr.push(ebsData[i].text);
            deep(arr, ebsData, parentId);
            arr.reverse();
            ebsData[i].textPath = arr.join("/");
            strOption += "<option value=" + ebsData[i].modelId + ">" + ebsData[i].textPath + "</option>";
        }

        function deep(arr, content, parentId) {
            for (let j = 0; j < content.length; j++) {
                if (parentId != -1) {
                    if (parentId == content[j].id) {
                        parentId = content[j].parentId;
                        arr.push(content[j].text);
                        deep(arr, content, parentId);
                    }
                }
            }
        }
    };

    // 进入时，初始化的页面 工程分解的二维页面
    manager.twoProject = function (content) {
        $('#treeGrid').treegrid({
            animate:true,
            data: [content[0]],
            idField: 'id',
            treeField: 'text',
            columns: [
                [
                    {field: 'text',title: '名称',width: avgWidth,align: 'center'},
                    {field: 'unit',title: '工程量单位',width: avgWidth,align: 'center'},
                    {field: 'unit_Account',title: '数量',width: avgWidth,align: 'center'},
                    {field: 'quantities',title: '总量',width: avgWidth,align: 'center'},
                    {field: 'start',title: '开始里程(米)',width: avgWidth,align: 'center'},
                    {field: 'end',title: '结束里程(米)',width: avgWidth,align: 'center'},
                    {field: 'textPath',title: '对应模型',width: avgWidth,align: 'center'}
                ]
            ],
            onContextMenu: function (e, row) {
                e.preventDefault();
                window.event.returnValue = false;
                $('#menu').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
            },
            onSelect: function (row) {
                lineId = row;
            },

        });
        $(".showInfo button").attr("disabled", false);
        $(".toggleInfo ").show();
    };

    // 工程分解 删除
    manager.projectRemove = function () {
        $("#removeNode").click(function () {
            let node = $('#treeGrid').treegrid("getSelected");
            if (!node) return false;

            $("#menu").hide(); // 隐藏ContextMenu，显示模态框
            $("#dialog").show();
            node.children ? $("#dialog>div>p").html("您确认删除当前文件以及子文件吗") : $("#dialog>div>p").html("您确认删除当前文件吗？");

            // 确认删除
            $("#dialog>div>#yes").click(function () {
                console.log("缺少删除数据的接口！"); // 删除模型以及数据库
                $("#dialog").hide();
                $('#treeGrid').treegrid('remove', node.id);
            });
            // 取消删除
            $("#dialog>div>#no").click(function () {
                $("#dialog").hide();
                return false;
            });
        });
    };

    // 工程分解 复制 2D
    manager.projectCopy = function () {
        $("#downCopy").click(function () {
            $("#menu").hide();

            let node = $('#treeGrid').treegrid("getSelected");
            let copyObj = {};
            if (!node) {
                return false;
            }
            deepCopy(copyObj, node); // 深复制对象
            let parentId = node.parentId;
            // 判断怎么添加
            if (parentId == -1) {
                $('#treeGrid').treegrid('append', {
                    data: [copyObj]
                });
            } else {
                $('#treeGrid').treegrid('append', {
                    parent: parentId,
                    data: [copyObj]
                });
            }
            $('#treeGrid').treegrid('select', copyObj.id);
            console.log("缺少复制模型接口！");
        });
        // 深复制对象函数
        function deepCopy(obj1, obj2) {
            obj1 = obj1 || {};
            for (let i in obj2) {
                if (obj2.hasOwnProperty(i)) {
                    if (typeof obj2[i] == "object") {

                        obj1[i] = Array.isArray(obj2[i]) ? [] : {}; // 判断是数组还是对象
                        deepCopy(obj1[i], obj2[i]); // 引用类型
                    } else {
                        obj1[i] = obj2[i]; // 值类型
                        if (i == 'id') {
                            console.log("id值需要改变");
                        }
                        if (i == "text") {
                            obj1.text = obj1.text.indexOf('(复制)') != -1 ? obj1.text : obj1.text + "(复制)";
                        }
                    }
                }
            }
            return obj1;
        }
    };

     // 工程分解 添加 2D
     manager.projectAdd = function () {
        // 工程分解 添加
        $("#addNode").click(function () {
            $('#nodeModel').dialog({
                title: '工程分解/添加',
            });
            $('.panel.window').css({
                "visibility": "visible"
            }); // 显示对话框 隐藏右击菜单
            $('#menu').hide();
            $("#changeMold").append(strOption);

            let addNode = {}; // 清空数据
            $("#addModel input,#changeMold").val("");
            $("#addSure").val("确定");
            $("#addCancel").val("取消");

            let node = $('#treeGrid').treegrid('getSelected');
            if (node) {
                $('#nodeModel').dialog({
                    closed: false
                });
                $("#addModel").show().siblings().hide();
                // 点击确定事件
                $("#addSure").off("click").click(function () {
                    addNode.text = edit.Trim($("#text").val(), "g");
                    addNode.unit = edit.Trim($("#projectUnit").val(), "g");
                    addNode.unit_Account = edit.Trim($("#count").val(), "g");
                    addNode.quantities = edit.Trim($("#total").val(), "g");
                    addNode.start = edit.Trim($("#startMeter").val(), "g");
                    addNode.end = edit.Trim($("#endMeter").val(), "g");
                    addNode.modelId = $("#changeMold").val();
                    addNode.textPath = $("#changeMold option:selected").text();

                    console.log("type，leaf 未确定！id 未确定！设置为了9000!");
                    addNode.id = 9000;
                    // 校验是否为空，为空提示
                    if (edit.Trim($("#text").val(), "g") == "" && edit.Trim($("#projectUnit").val(), "g") == "" && edit.Trim($("#count").val(), "g") == "" && edit.Trim($("#total").val(), "g") == "" && edit.Trim($("#startMeter").val(), "g") == "" && edit.Trim($("#endMeter").val(), "g") == "" && $("#changeMold").val() != "" &&$("#changeLevel").val() == "") {
                         $('#nodeModel').dialog({closed: true});
                         return false;
                     }else if (addNode.text != "" || addNode.mold != "" || addNode.unit != "" || addNode.unit_Account != "" || addNode.quantities != "" || addNode.start != "" || addNode.end != "" || $("#changeMold").val() != "" || $("#changeLevel").val() != "") {
                        manager.toolTip(1);
                        return false;
                    }
                    
                    // 选择添加的级别，改变fatherID
                    if ($("#changeLevel").val() == "平级") {
                        addNode.parentId = node.parentId;
                        addNode.state = "closed";
                        $('#treeGrid').treegrid('append', {
                            parent: node.parentId,
                            data: [addNode]
                        });

                    } else if ($("#changeLevel").val() == "下级") {
                        addNode.parentId = node.id;
                        $('#treeGrid').treegrid('append', {
                            parent: node.id,
                            data: [addNode]
                        });
                    }
                    console.log("缺少添加模型和保存数据接口！");
                    $('#nodeModel').dialog({
                        closed: true
                    });
                    $('#treeGrid').treegrid('select', addNode.id);
                });

                $("#addCancel").click(function () {
                    if (edit.Trim($("#text").val(), "g") == "" && edit.Trim($("#projectUnit").val(), "g") == "" && edit.Trim($("#count").val(), "g") == "" && edit.Trim($("#total").val(), "g") == "" && edit.Trim($("#startMeter").val(), "g") == "" && edit.Trim($("#endMeter").val(), "g") == "" && $("#changeMold").val() != "" &&$("#changeLevel").val() == "") {
                        $('#nodeModel').dialog({
                            closed: true
                        });
                    }else if (edit.Trim($("#text").val(), "g") != "" || edit.Trim($("#projectUnit").val(), "g") != "" || edit.Trim($("#count").val(), "g") != "" || edit.Trim($("#total").val(), "g") != "" || edit.Trim($("#startMeter").val(), "g") != "" || edit.Trim($("#endMeter").val(), "g") != "" || $("#changeMold").val() != "") {
                        edit.cancelTip();
                    } else {
                        $('#nodeModel').dialog({
                            closed: true
                        });
                    }
                });
            }
        });
    };

    // 工程分解 编辑 2D
    manager.projectChange = function () {
        $("#editNode").click(function () {
            $('#nodeModel').dialog({title: '工程分解/编辑'});

            $('.panel.window').css({"visibility": "visible"}); // 显示对话框 隐藏右击菜单
            $('#menu').hide();

            $("#changeInfoMold").append(strOption); // 对应的 select 动态添加 option

            let node = $('#treeGrid').treegrid('getSelected'); // 清空数据
            if (node.type == 2) {
                $('#nodeModel').dialog({
                    closed: false
                });
                $("#changeInfo").show().siblings().hide();
                $("#changeText").val(node.text);
                $("#changeProjectUnit").val(node.unit);
                $("#changeCount").val(node.unit_Account);
                $("#changeTotal").val(node.quantities);
                $("#changeStartMeter").val(node.start);
                $("#changeEndMeter").val(node.end);
                $("#changeInfoMold").find("option[value = " + node.modelId + "]").attr("selected", "selected");

                // 点击确定事件
                $("#changeSure").off("click").click(function () {

                    console.log(node);
                    if (edit.Trim($("#changeText").val(), "g") == node.text && $("#changeInfoMold").val() == node.modelId && edit.Trim($("#changeProjectUnit").val(), "g") == node.unit && $("#changeCount").val() == node.unit_Account && $("#changeTotal").val() == node.quantities && $("#changeStartMeter").val() == node.start && $("#changeEndMeter").val() == node.end) {
                        $('#nodeModel').dialog({closed: true});
                        return false;
                    }
                    // 校验是否为空，为空提示
                    if (edit.Trim($("#changeText").val(), "g") == "" || $("#changeInfoMold").val() == "" || edit.Trim($("#changeProjectUnit").val(), "g") == "" || $("#changeCount").val() == "" || $("#changeTotal").val() == "" || $("#changeStartMeter").val() == "" || $("#changeEndMeter").val() == "") {
                        manager.toolTip(1);
                        return false;
                    }
                    node.modelId = $("#changeInfoMold").val();
                    node.text = edit.Trim($("#changeText").val(), "g");
                    node.unit = edit.Trim($("#changeProjectUnit").val(), "g");
                    node.unit_Account = $("#changeCount").val();
                    node.quantities = $("#changeTotal").val();
                    node.start = $("#changeStartMeter").val();
                    node.end = $("#changeEndMeter").val();
                    node.textPath = $("#changeInfoMold option:selected").text();
                    console.log("缺少添加模型和保存数据接口！");
                    $('#nodeModel').dialog({closed: true});
                    $('#treeGrid').treegrid("update", {id: node.id}); // 刷新修改的值
                });

                $("#changeCancel").off("click").click(function () {
                    if (edit.Trim($("#changeText").val(), "g") == node.text && $("#changeInfoMold").val() == node.modelId && edit.Trim($("#changeProjectUnit").val(), "g") == node.unit && $("#changeCount").val() == node.unit_Account && $("#changeTotal").val() == node.quantities && $("#changeStartMeter").val() == node.start && $("#changeEndMeter").val() == node.end) {
                        $('#nodeModel').dialog({closed: true});
                        return false;
                    }else if (edit.Trim($("#changeText").val(), "g") != node.text || $("#changeInfoMold").val() != node.modelId || edit.Trim($("#changeProjectUnit").val(), "g") != node.unit || $("#changeCount").val() != node.unit_Account || $("#changeTotal").val() != node.quantities || $("#changeStartMeter").val() != node.start || $("#changeEndMeter").val() != node.end) {
                        edit.cancelTip();
                    } else {
                        $('#nodeModel').dialog({closed: true});
                    }
                });
            }
        });
    };

    // 计划管理 修改 2D
    manager.planChange = function () {
        $("#editNode").click(function () {
            $('#nodeModel').dialog({title: '计划管理/编辑'});
            $('.panel.window').css({"visibility": "visible"}); // 显示对话框 隐藏右击菜单
            $('#menu').hide();

            let node = $('#treeGrid').treegrid('getSelected');
            if (node.type == 2) {
                $('#nodeModel').dialog({closed: false});
                $("#planChange").show().siblings().hide();

                $("#planText").val(node.text);
                node.startDatePlan ? $("#planST").val(edit.formatDate(node.startDatePlan)) : $("#planST").val("");
                node.endDatePlan ? $("#planET").val(edit.formatDate(node.endDatePlan)) : $("#planET").val("");
                console.log("需要修改对应数据");
                $("#planMen").val(node.men);
                $("#planCar").val(node.car);

                // 点击确定事件
                $("#planSure").off("click").click(function () {
                    if ($("#planET").val() != "" && $("#planST").val() != "") {
                        let start = $("#planST").val();
                        let end = $("#planET").val();
                        // 判断开始时间是否小于结束时间
                        if (start > end) {
                            manager.toolTip(2);
                            return false;
                        }
                    }
                    if($("#planST").val() == node.startDatePlan &&  $("#planET").val() == node.endDatePlan && $("#planMen").val() == node.men && $("#planCar").val() == node.car){
                        $('#nodeModel').dialog({closed: true});
                        return false;
                    }
                    node.startDatePlan = $("#planST").val();
                    node.endDatePlan = $("#planET").val();
                    node.men = $("#planMen").val();
                    node.car = $("#planCar").val();
                    $('#nodeModel').dialog({closed: true});

                    $('#treeGrid').treegrid("update", {id: node.id});
                });

                $("#planCancel").off("click").click(function () {
                    if($("#planST").val() == node.startDatePlan &&  $("#planET").val() == node.endDatePlan && $("#planMen").val() == node.men && $("#planCar").val() == node.car){
                        $('#nodeModel').dialog({closed: true});
                        return false;
                    }else if ($("#planST").val() != node.startDatePlan || $("#planET").val() != node.endDatePlan || $("#planMen").val() != node.men || $("#planCar").val() != node.car) {
                        edit.cancelTip();
                    } else {
                        $('#nodeModel').dialog({closed: true});
                    }
                });
            }
        });
    };

    // 进度管理 修改 2D
    manager.realChange = function () {
        $("#editNode").click(function () {
            $('#nodeModel').dialog({title: '进度填报/编辑'});

            $('.panel.window').css({"visibility": "visible"}); // 显示对话框 隐藏右击菜单
            $('#menu').hide();

            let node = $('#treeGrid').treegrid('getSelected');
            if (node.type == 2) {
                $('#nodeModel').dialog({closed: false});
                $("#realChange").show().siblings().hide();

                $("#realText").val(node.text);
                node.startDate ? $("#realST").val(edit.formatDate(node.startDate)) : $("#realST").val("");
                node.endDate ? $("#realET").val(edit.formatDate(node.endDate)) : $("#realET").val("");

                $("#realMen").val(node.men);
                $("#realCar").val(node.car);

                // 点击确定事件
                $("#realSure").off("click").click(function () {
                    if ($("#realST").val() != "" && $("#realET").val() != "") {
                        let start = $("#realST").val();
                        let end = $("#realET").val();
                        // 判断开始时间是否小于结束时间
                        if (start > end) {
                            manager.toolTip(2);
                            return false;
                        }
                    }

                    if($("#realST").val() == node.startDate &&  $("#realET").val() == node.endDate && $("#realMen").val() == node.men && $("#realCar").val() == node.car){
                        $('#nodeModel').dialog({closed: true});
                        return false;
                    }
                    node.startDate = $("#realST").val();
                    node.endDate = $("#realET").val();
                    node.men = $("#realMen").val();
                    node.car = $("#realCar").val();
                    $('#nodeModel').dialog({closed: true});

                    $('#treeGrid').treegrid("update", {id: node.id});
                });

                $("#realCancel").off("click").click(function () {
                    if($("#realST").val() == node.startDate &&  $("#realET").val() == node.endDate && $("#realMen").val() == node.men && $("#realCar").val() == node.car){
                        $('#nodeModel').dialog({closed: true});
                        return false;
                    }else if ($("#realST").val() != node.startDate || $("#realET").val() != node.endDate || $("#realMen").val() != node.men || $("#realCar").val() != node.car) {
                        edit.cancelTip();
                    } else {
                        $('#nodeModel').dialog({
                            closed: true
                        });
                    }
                });
            }
        });
    };

    // 显示 3D 视图
     manager.showView = function () {
        $("#left").css({width:200});
        $("#right").css({width:docWidth - 200});
        $('#treeGrid').treegrid({
            animate:true,
            width: 200,
            columns: [
                [{field: 'text',title: '名称',width: 200,align: 'left'}]
            ],
            onClickRow: function (row) {
                EbsViewer.hideOrShowModel(true,obj);                    // 显示模型
                if (row.type == 2) {
                    EbsViewer.flyToModel(row.modelId,obj);
                } else {
                    var children = $("#treeGrid").treegrid("getChildren", row.id);
                    var nodeIds = [];
                    for (var i = 0; i < children.length; i++) {
                        if (children[i].type == 2)
                            nodeIds.push(children[i].modelId);
                    }
                    EbsViewer.flyToModels(nodeIds,obj);
                }
                playFirst = false;
                if ($("#header .showInfo .project").attr("class").indexOf("active") != -1) {
                    manager.projectEdit(row);                 
                } else if ($("#header .showInfo .planManage").attr("class").indexOf("active") != -1) {
                    manager.planEdit(row);                  
                } else if ($("#header .showInfo .write").attr("class").indexOf("active") != -1) {
                    manager.realityEdit(row);
                }
            },
            onSelect: function (row) {
                lineId = row;
                if ($("#header .showInfo .project").attr("class").indexOf("active") != -1) {
                    manager.projectEdit(row);
                } else if ($("#header .showInfo .planManage").attr("class").indexOf("active")) {
                    manager.planEdit(row);
                } else if ($("#header .showInfo .write").attr("class").indexOf("active") != -1) {
                    manager.realityEdit(row);
                }
            }
        });
        EbsViewer.hideOrShowModel(true,obj);  
        if (lineId) {
            if (lineId.type == 2) {
                EbsViewer.flyToModel(lineId.modelId,obj);
                playFirst = false;
            }
        }
        
        $("#header .toggleInfo").show();
        $("#header .toggleProgress").hide();
        $("#header .compare").hide();
        $("#right .model .realityPlay,#right .model .planPlay").hide();
    };

    // 工程分解 修改 3D
    manager.projectEdit = function (row) {
        let id = row.id;
        let textInp = [];
        let str = "";
        let path = "";
        for (let i = 0;; i++) {
            let node = $('#treeGrid').treegrid("getParent", id);
            if (node) {
                textInp.push(node.text);
                id = node.id;
            } else {
                break;
            }
        }
        if (textInp.length != 0) {
            str = textInp.reverse().join("/");
            str = str + "/";
            path = str + row.text;
        } else {
            path = row.text;
        }
     
        manager.sure(row);
           };

           // 工程分解修改 3D的 确认
           manager.sure = function(row){
               $(".sureChange").off("click").click(function () {
                   var text = $(".model .projectCut ul li:nth-of-type(1) input").val();
                   var unit_Account = $(".model .projectCut ul li:nth-of-type(2) input").val();
                   var quantities = $(".model .projectCut ul li:nth-of-type(3) input").val();
                   var start = $(".model .projectCut ul li:nth-of-type(4) input").val();
                   var end = $(".model .projectCut ul li:nth-of-type(5) input").val();
                   
                   if (text == "" || unit_Account == "" || quantities == "" || start == "" || end == "") {
                       manager.toolTip(1);

                   } else if (text == row.text && unit_Account == row.unit_Account && quantities == row.quantities && start == row.start && end == row.end) {
                       // manager.toolTip(4);
                       return false;
                   } else if(text != row.text ||  unit_Account != row.unit_Account || quantities != row.quantities || start != row.start || end != row.end){
                       // 保存数据
                       row.text = text;
                       row.unit_Account = unit_Account;
                       row.quantities =quantities;
                       row.start = start;
                       row.end = end;
                       manager.toolTip(3);
                   }
               });
           }


    // 计划管理 修改 3D
    manager.planEdit = function (row) {
        let time = [];
        $("#right .model .planTimeInfo").show();
        time = [row.startDatePlan, row.endDatePlan];
        $(".model .planTimeInfo ul li:nth-child(1) input").val(row.startDatePlan);
        $(".model .planTimeInfo ul li:nth-child(2) input").val(row.endDatePlan);
        $(".surePlanChange").click(function () {
            let time1 = [];
            time1[0] = $(".model .planTimeInfo ul li:nth-child(1) input").val();
            time1[1] = $(".model .planTimeInfo ul li:nth-child(2) input").val();
            if (time1[0] != "" && time1[1] != "") {
                if (time[0] != time1[0] || time[1] != time1[1]) {
                    if (time1[1] >= time1[0]) {
                        row.startDatePlan = time1[0];
                        row.endDatePlan = time1[1];
                        // $.ajax({});
                        manager.toolTip(3);
                    } else {
                        manager.toolTip(2);
                    }
                } else if (time[0] == time1[0] && time[1] == time1[1]) {
                    manager.toolTip(4);
                }
            }
        });
    };

    // 进度填报 修改 3D
    manager.realityEdit = function (row) {
        let time = [];
        $("#right .model .realityTimeInfo").show();
        time = [row.startDate, row.endDate];
        $(".model .realityTimeInfo ul li:nth-child(1) input").val(row.startDate);
        $(".model .realityTimeInfo ul li:nth-child(2) input").val(row.endDate);
        $(".sureRealChange").click(function () {
            let time1 = [];
            time1[0] = $(".model .realityTimeInfo ul li:nth-child(1) input").val();
            time1[1] = $(".model .realityTimeInfo ul li:nth-child(2) input").val();
            if (time1[0] != "" && time1[1] != "") {
                if (time[0] != time1[0] || time[1] != time1[1]) {
                    if (time1[1] > time1[0]) {
                        row.startDate = time1[0];
                        row.endDate = time1[1];
                        // $.ajax({});
                        manager.toolTip(3);
                    } else {
                        manager.toolTip(2);
                    }
                } else if (time[0] == time1[0] && time[1] == time1[1]) {
                    manager.toolTip(4);
                }
            }
        });
    };

    // 信息提示
    manager.toolTip = function (num) {
        $("#quit").show();
        if (num == 1) {
            $("#quit p").html("填写项不能为空，请您重新填写!");
        } else if (num == 2) {
            $("#quit p").html("结束时间不能小于开始时间，请您重新填写!");
        } else if (num == 3) {
            $("#quit p").html("保存数据成功!");
        } else if (num == 4) {
            $("#quit p").html("数据尚未修改!");
        }
        $("#quit #quitYes,#quit #quitNo").click(function () {
            $("#quit").hide();
        });
    };

    // 展示工程分解信息
    manager.projectInfo = function () {
    	 if (lineId) {
	            $("#right .model .detailInfo").hide();
	            $("#right .model .projectCut").show();
	            $(".model .projectCut ul li:nth-of-type(1) input").val(lineId.text);
	            $(".model .projectCut ul li:nth-of-type(2) input").val(lineId.unit_Account);
	            $(".model .projectCut ul li:nth-of-type(3) input").val(lineId.quantities);
	            $(".model .projectCut ul li:nth-of-type(4) input").val(lineId.start);
	            $(".model .projectCut ul li:nth-of-type(5) input").val(lineId.end);
	            let id = lineId.id;
	            let textInp = [lineId.text];
	            for (let i = 0;; i++) {
	                let node = $('#treeGrid').treegrid("getParent", id);
	                if (node) {
	                    textInp.push(node.text);
	                    id = node.id;
	                } else {
	                    break;
	                }
	            }
	            let str = textInp.reverse().join("/");
	            $(".model .projectCut ul li:nth-of-type(6) input").val(str);
	        }

    };

    // 展示计划管理信息
    manager.planInfo = function () {
        if (lineId) {
            $("#right .model .detailInfo").hide();
            $("#right .model .planTimeInfo").show();
            $(".model .planTimeInfo ul li:nth-child(1) input").val(lineId.startDatePlan);
            $(".model .planTimeInfo ul li:nth-child(2) input").val(lineId.endDatePlan);
        }
    };

    // 展示填报管理信息
    manager.writeInfo = function () {
        if (lineId) {
            $("#right .model .detailInfo").hide();
            $("#right .model .realityTimeInfo").show();
            $(".model .realityTimeInfo ul li:nth-child(1) input").val(lineId.startDate);
            $(".model .realityTimeInfo ul li:nth-child(2) input").val(lineId.endDate);
        }
    };

    // 右击 显示/隐藏 3D视图下的 计划/填报/形象化的右击菜单
    manager.hideRightClick = function (hide) {
        if (hide == "all") {
            $("#editNode").hide().siblings().hide(); // 隐藏右击菜单对应的项,隐藏菜单的边框
            $(".menu").css({
                "border-width": 0,
                "border-style": "none"
            });
        } else if (hide == "other") {
            $("#editNode").show().siblings().hide();
            // 显示菜单的边框
            $(".menu").css({
                "border-width": 1 + "px",
                "border-style": "solid"
            });
        } else if (hide == "edit") {
            $("#editNode").hide().siblings().show();
            $(".menu").css({
                "border-width": 1 + "px",
                "border-style": "solid"
            });
        } else if (hide == "no") {
            $("#editNode").show().siblings().show();
            $(".menu").css({
                "border-width": 1 + "px",
                "border-style": "solid"
            });
        }
    };

    // 显示隐藏对应的按钮
    manager.showHideBtn = function () {
        $("#header .toggleInfo").show();                    // 2D/3D 和 计划/实际 的切换
        $("#header .toggleProgress").hide();                // 隐藏计划和实际按钮
        $(".compareRealPlan").hide();         // 隐藏对照按钮和对照的添加的模型
        $("#right .model .planPlay,#right .model .realityPlay,.comparePlay").hide();  // 隐藏播放进度条等
    };

    // 点击切换到 工程分解
    manager.projectClick = function () {
        $("#header .showInfo .project").click(function () {
            manager.showHideBtn();                              // 显示 2D/3D按钮，隐藏
																// 计划/实际/对照按钮
            manager.clearTimer("all");                          // 清空定时器
            lastBtn = $(this).attr("class");
            $(this).addClass("active").siblings().removeClass("active");
            $(this).attr("disabled", true).siblings().attr("disabled", false);
            if (threeD) {
                $(".threeD").addClass("checkSpan").siblings().removeClass("checkSpan");
                manager.showView();
                $(".toolTip").hide();
                manager.projectInfo();
                manager.hideRightClick("edit");

            } else {
                $(".twoD").addClass("checkSpan").siblings().removeClass("checkSpan");
                
                $("#left").css({width:docWidth});
                $("#right").hide();
                $('#treeGrid').treegrid({
                    animate:true,
                    width: docWidth,
                    columns: [
                        [
                            {field: 'text', title: '名称', width: avgWidth, align: 'center'},
                            {field: 'unit', title: '工程量单位', width: avgWidth, align: 'center'},
                            {field: 'unit_Account', title: '数量', width: avgWidth, align: 'center'},
                            {field: 'quantities', title: '总量', width: avgWidth, align: 'center'},
                            {field: 'start', title: '开始里程(米)', width: avgWidth, align: 'center'},
                            {field: 'end', title: '结束里程(米)', width: avgWidth, align: 'center'},
                            {field: 'textPath', title: '对应模型', width: avgWidth, align: 'center'}
                        ]
                    ],
                    onClickRow: function (row) {
                       
                    },
                    onSelect: function (row) {
                        lineId = row;
                    }
                });
                manager.hideRightClick("no");                   // 隐藏右击菜单对应的项
                manager.projectChange();                        // 工程分解 编辑 2D
            }
            if (lineId) {
                $('#treeGrid').treegrid('select', lineId.id);
            }
        });
    };

    // 点击切换到 计划管理
    manager.planClick = function () {
        $("#header .showInfo .planManage").click(function () {
            
            manager.showHideBtn();                              // 显示 2D/3D按钮，隐藏
																// 计划/实际，对照按钮
            manager.clearTimer("all");
            lastBtn = $(this).attr("class");
            $(this).addClass("active").siblings().removeClass("active");
            $(this).attr("disabled", true).siblings().attr("disabled", false);
            if (threeD) {
                $(".threeD").addClass("checkSpan").siblings().removeClass("checkSpan");
                $(".toolTip").hide();
                manager.showView();
                manager.planInfo();
                manager.hideRightClick("all"); // 右击不显示菜单
            } else {
                $(".twoD").addClass("checkSpan").siblings().removeClass("checkSpan");
                $("#left").css({width:docWidth});
                $("#right").hide();
                $('#treeGrid').treegrid({
                    animate:true,
                    width: docWidth,
                    columns: [
                        [
                            {field: 'text',title: '名称',width: oneFifth, height: 30, align: 'center'},
                            {field: 'startDatePlan', title: '计划开始时间', width: oneFifth, height: 30, align: 'center'},
                            {field: 'endDatePlan', title: '计划结束时间', width: oneFifth, height: 30, align: 'center'},
                            {field: 'men', title: '木工(人)', width: oneFifth, height: 30, align: 'center'},
                            {field: 'car', title: '重型卡车(台)', width: oneFifth, height: 30, align: 'center'}
                        ]
                    ],
                    onClickRow: function (row) {
                        
                    },
                    onSelect: function (row) {
                        lineId = row;
                    }
                });
                manager.hideRightClick("other");                // 右击显示菜单
                manager.planChange();                           // 计划管理 编辑 2D
            }
            if (lineId) {
                $('#treeGrid').treegrid('select', lineId.id);
            }
        });
    };

    // 点击切换到 进度填报
    manager.writeClick = function () {
        $("#header .showInfo .write").click(function () {
            manager.showHideBtn();                              // 显示 2D/3D按钮，隐藏
																// 计划/实际，对照按钮
            manager.clearTimer("all");
            lastBtn = $(this).attr("class");
            $(this).addClass("active").siblings().removeClass("active");
            $(this).attr("disabled", true).siblings().attr("disabled", false);
            if (threeD) {
                $(".threeD").addClass("checkSpan").siblings().removeClass("checkSpan");
                $(".toolTip").hide();
                manager.showView();
                manager.writeInfo();
                manager.hideRightClick("all"); // 右击不显示菜单
            } else {
                $(".twoD").addClass("checkSpan").siblings().removeClass("checkSpan");
                $("#left").css({width:100+"%"});
                $(".panel.datagrid").width(docWidth);
                $('#treeGrid').treegrid({
                    animate:true,
                    width: docWidth,
                    columns: [
                        [
                            {field: 'text', title: '名称', width: oneFifth, height: 30, align: 'center'},
                            {field: 'startDate', title: '实际开始时间', width: oneFifth, height: 30, align: 'center'},
                            {field: 'endDate', title: '实际结束时间', width: oneFifth, height: 30, align: 'center'},
                            {field: 'men', title: '木工(人)', width: oneFifth, height: 30, align: 'center'},
                            {field: 'car', title: '重型卡车(台)', width: oneFifth, height: 30, align: 'center'}
                        ]
                    ],
                    onClickRow: function (row) {
                        
                    },
                    onSelect: function (row) {
                        lineId = row;
                    }
                });

                manager.hideRightClick("other");                // 右击显示菜单
                manager.realChange();                           // 进度管理 修改 2D
            }
            if (lineId) {
                $('#treeGrid').treegrid('select', lineId.id);
            }
        });
    };

    // 点击切换到 进度形象化
    manager.progressSceneClick = function () {
        $("#header .showInfo .progressScene").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            $(this).attr("disabled", true).siblings().attr("disabled", false);
            EbsViewer.hideOrShowModel(false,obj); // 隐藏模型
            if (loadTimeData) {
                manager.playData(); // 初始化大桥的计划时间
                loadTimeData = false;
            }
            threeD = true;
            $("#left,.panel.datagrid").width(200);
            $("#right").show();
            $('#treeGrid').treegrid({
                animate:true,
                width: 200,
                columns: [[{field: 'text', title: '名称', width: 200, align: 'left'}]],
                onClickRow: function (row) {
                    manager.clearTimer("all");
                    if (row.type == 2) {
                        EbsViewer.flyToModel(row.modelId,obj);
                    } else {
                        var children = $("#treeGrid").treegrid("getChildren", row.id);
                        var nodeIds = [];
                        for (var i = 0; i < children.length; i++) {
                            if (children[i].type == 2) {
                                nodeIds.push(children[i].modelId);
                            }
                        }
                        EbsViewer.flyToModels(nodeIds,obj);
                    }
                    playFirst = false;
                    lineId = row;
                },
                onSelect: function (row) {lineId = row;}
            });
            if (lineId) {
                $('#treeGrid').treegrid('select', lineId.id);
            }
            manager.hideRightClick("all"); // 右击不显示菜单

            $("#header .toggleInfo").hide();
            $("#header .toggleProgress").show();
            if (lastBtn.indexOf("write") != -1) {
                $(".real").addClass("checkSpan").siblings().removeClass("checkSpan");
                $("#right .model .realityPlay").show().siblings().hide();
                if(!playFirst){
                    EbsViewer.planRealFly(realCurrDayMS,false,obj);             // 飞到对应的模型上
                }
                manager.real();
            } else {
                $(".plan").addClass("checkSpan").siblings().removeClass("checkSpan");
                $("#right .model .planPlay").show().siblings().hide();
                if(!playFirst){
                    EbsViewer.planRealFly(currDayMS,true,obj);                  // 飞到对应的模型上
                }
                manager.plan();
            }
            $("#right .model .cesium-viewer").show();
            lastBtn = $(this).attr("class");
        });
    };

    // 2D/3D切换
    manager.twoToThree = function () {
        $("#header .toggleInfo").click(function () {
            $("#right").toggle();
            if ($("#right").css("display") == "block") {

                EbsViewer.hideOrShowModel(true,obj);                            // 显示模型
                $(".threeD").addClass("checkSpan").siblings().removeClass("checkSpan");
                threeD = true;
                if ($("#header .showInfo .project").attr("class").indexOf("active") != -1) {
                    manager.hideRightClick("edit");                         // 显示菜单的边框
                    manager.projectInfo();
                    if (lineId) {manager.projectEdit(lineId);}
                } else if ($("#header .showInfo .planManage").attr("class").indexOf("active") != -1) {
                    manager.hideRightClick("all");                          // 右击不显示菜单
                    manager.planInfo();
                    if (lineId) {manager.planEdit(lineId);}
                } else if ($("#header .showInfo .write").attr("class").indexOf("active") != -1) {
                    manager.hideRightClick("all");                          // 右击不显示菜单
                    manager.writeInfo();
                    if (lineId) {manager.realityEdit(lineId);}
                }
                $("#left").width(200);
                $('#treeGrid').treegrid({
                    animate:true,
                    width: 200,
                    columns: [[{field: 'text', title: '名称', width: 200, align: 'left'}]],
                    onClickRow: function (row) {
                        if (row.type == 2) {
                            EbsViewer.flyToModel(row.modelId,obj);
                        } else {
                            var children = $("#treeGrid").treegrid("getChildren", row.id);
                            var nodeIds = [];
                            for (var i = 0; i < children.length; i++) {
                                if (children[i].type == 2) {
                                    nodeIds.push(children[i].modelId);
                                }
                            }
                            EbsViewer.flyToModels(nodeIds,obj);
                        }
                        playFirst = false;
                        if ($("#header .showInfo .project").attr("class").indexOf("active") != -1) {
                            manager.projectInfo();
                            manager.projectEdit(row);
                        } else if ($("#header .showInfo .planManage").attr("class").indexOf("active") != -1) {
                            manager.planInfo();
                            manager.planEdit(row);
                        } else if ($("#header .showInfo .write").attr("class").indexOf("active") != -1) {
                            manager.writeInfo();
                            manager.realityEdit(row);
                        }
                        lineId = row;
                    },
                    onSelect: function (row) {lineId = row;}
                });

                $("#right .model .planPlay,#right .model .realityPlay").hide();
                if (lineId) {$('#treeGrid').treegrid('select', lineId.id);}
            } else {
                $(".twoD").addClass("checkSpan").siblings().removeClass("checkSpan");
                threeD = false;
                $(".menu").css({ // 显示菜单的边框
                    "border-width": 1 + "px",
                    "border-style": "solid"
                });

                $("#left").width(100 + "%");
                $(".panel.datagrid").width(docWidth);
                if (lastBtn.indexOf("project") != -1) {
                    $('#treeGrid').treegrid({
                        animate:true,
                        width: docWidth,
                        columns: [
                            [
                                {field: 'text', title: '名称', width: avgWidth, align: 'center'},
                                {field: 'unit', title: '工程量单位', width: avgWidth, align: 'center'},
                                {field: 'unit_Account', title: '数量', width: avgWidth, align: 'center'},
                                {field: 'quantities', title: '总量', width: avgWidth, align: 'center'},
                                {field: 'start', title: '开始里程(米)', width: avgWidth, align: 'center'},
                                {field: 'end', title: '结束里程(米)', width: avgWidth, align: 'center'},
                                {field: 'textPath', title: '对应模型', width: avgWidth, align: 'center'}
                            ]
                        ],
                        onSelect: function (row) {lineId = row;}
                    });
                    $("#editNode").show().siblings().show();               // 显示右击菜单对应的项
                    manager.projectChange();                                // 工程分解
																			// 编辑
																			// 2D

                } else if (lastBtn.indexOf("planManage") != -1) {
                    $('#treeGrid').treegrid({
                        animate:true,
                        width: docWidth,
                        columns: [
                            [
                                {field: 'text', title: '名称', width: oneFifth, height: 30, align: 'center'},
                                {field: 'startDatePlan', title: '计划开始时间', width: oneFifth, height: 30, align: 'center'},
                                {field: 'endDatePlan', title: '计划结束时间', width: oneFifth, height: 30, align: 'center'},
                                {field: 'men', title: '木工(人)', width: oneFifth, height: 30, align: 'center'},
                                {field: 'car', title: '重型卡车(台)', width: oneFifth, height: 30, align: 'center'}
                            ]
                        ],
                        onSelect: function (row) {lineId = row;}
                    });

                    $("#editNode").show().siblings().hide();                                    // 显示右击菜单对应的项
                    manager.planChange();                                                       // 计划管理
																								// 修改
																								// 3D

                } else if (lastBtn.indexOf("write") != -1) {
                    $('#treeGrid').treegrid({
                        animate:true,
                        width: docWidth,
                        columns: [
                            [
                                {field: 'text', title: '名称', width: oneFifth, height: 30, align: 'center'},
                                {field: 'startDate', title: '实际开始时间', width: oneFifth, height: 30, align: 'center'},
                                {field: 'endDate', title: '实际结束时间', width: oneFifth, height: 30, align: 'center'},
                                {field: 'men', title: '木工(人)', width: oneFifth, height: 30, align: 'center'},
                                {field: 'car', title: '重型卡车(台)', width: oneFifth, height: 30, align: 'center'}
                            ]
                        ],
                        onSelect: function (row) {lineId = row;}
                    });
                    $("#editNode").show().siblings().hide();                            // 显示右击菜单对应的项
                    manager.realChange();                                               // 展示填报管理信息
                }
                if (lineId) {$('#treeGrid').treegrid('select', lineId.id);}
            }
        });
    };

    // 计划/实际 三维页面
    manager.threePage = function(){
        $("#left").width(200);
        $("#right").width(docWidth - 200);
        $('#treeGrid').treegrid({
            animate:true,
            width: 200,
            columns: [[{field: 'text', title: '名称', width: 200, align: 'left'}]],
            onClickRow: function (row) {
                if (row.type == 2) {
                    EbsViewer.flyToModel(row.modelId,obj);
                } else {
                    var children = $("#treeGrid").treegrid("getChildren", row.id);
                    var nodeIds = [];
                    for (var i = 0; i < children.length; i++) {
                        if (children[i].type == 2) {
                            nodeIds.push(children[i].modelId);
                        }
                    }
                    EbsViewer.flyToModels(nodeIds,obj);
                }
                playFirst = false;
                lineId = row;
            },
            onSelect: function (row) {lineId = row;}
        });
    }

    // 实际/计划/对照 点击
    manager.planToReal = function () {
        $("#header .toggleProgress div").click(function () {
            $(this).addClass("checkSpan").siblings().removeClass("checkSpan");
            manager.clearTimer("all");
            $("#right .model .detailInfo").hide();
            $(".comparePlay,#right .model .planPlay,#right .model .realityPlay,.compareRealPlan").hide();
            $(".toolTip").hide();
            EbsViewer.hideOrShowModel(false,obj);
            if($(".plan").attr("class").indexOf("checkSpan") != -1){
                $(".comparePlay .playOrStop,.realityPlay .playOrStop").addClass("icon-start").removeClass("icon-stop");      // 切换图标
                manager.threePage();
                $("#right .model .planPlay").show();
                EbsViewer.planRealFly(currDayMS, true,obj);
                manager.plan();

            }else if ($(".real").attr("class").indexOf("checkSpan") != -1) {
                $(".comparePlay .playOrStop,.planPlay .playOrStop").addClass("icon-start").removeClass("icon-stop");      // 切换图标
                manager.threePage();
                $("#right .model .realityPlay").show();
                EbsViewer.planRealFly(realCurrDayMS, false,obj);
                manager.real();

            }else if ($(".compare").attr("class").indexOf("checkSpan") != -1) {
                $(".realityPlay .playOrStop,.planPlay .playOrStop").addClass("icon-start").removeClass("icon-stop");      // 切换图标
                $(".compareRealPlan,.comparePlay,.toolTip").show();
                EbsViewer.hideOrShowModel(false,obj); // 隐藏模型
                EbsViewer.compareFly(comparelCurrDayMS,obj)
                manager.compare();
            }
        });
    };

    // 播放数据，开始时间/结束时间/当前时间
    manager.playData = function () {
        startDayMS = new Date(ebsData[0].startDatePlan).getTime();
        endDayMS = new Date(ebsData[0].endDatePlan).getTime();
        currDayMS = startDayMS;
        $(".planPlay .fd-planStart").html(edit.formatDate(ebsData[0].startDatePlan)); // 显示计划开始时间
        $(".planPlay .fd-planEnd").html(edit.formatDate(ebsData[0].endDatePlan)); // 显示计划结束时间
        $(".tip").html(edit.formatDate(currDayMS)); // 初始化显示计划时间

        realStartDayMS = new Date(ebsData[0].startDate).getTime();
        realEndDayMS = new Date(ebsData[0].endDate).getTime();
        realCurrDayMS = realStartDayMS;
        $(".realityPlay .fd-realStart").html(edit.formatDate(ebsData[0].startDate)); // 显示实际开始时间
        $(".realityPlay .fd-realEnd").html(edit.formatDate(ebsData[0].endDate)); // 显示实际结束时间
        $(".realTip").html(edit.formatDate(realCurrDayMS)); // 初始化显示实际时间

        compareStartDayMS = startDayMS > realStartDayMS ? realStartDayMS : startDayMS;
        compareEndDayMS = endDayMS > realEndDayMS ? endDayMS : realEndDayMS;
        comparelCurrDayMS = compareStartDayMS;
        $(".comparePlay .compareS").html(edit.formatDate(compareStartDayMS)); // 显示实际开始时间
        $(".comparePlay .compareE").html(edit.formatDate(compareEndDayMS)); // 显示实际结束时间
        $(".comparePlay .compareTip").html(edit.formatDate(comparelCurrDayMS)); // 初始化显示实际时间
        
    };

    // 清空定时器
    manager.clearTimer = function (timer) {
        if (timer == "plan") {
            clearTimeout(timer1); // 清空计划播放的定时器
            $(".planPlay .playOrStop").addClass("icon-start").removeClass("icon-stop");
        }
        if (timer == "real") {
            clearTimeout(timer2); // 清空实际播放的定时器
            $(".realityPlay .playOrStop").addClass("icon-start").removeClass("icon-stop");
        }
        if(timer == "compare"){
            clearTimeout(timer3); // 清空比较播放的定时器
            $(".comparePlay .playOrStop").addClass("icon-start").removeClass("icon-stop");
        }
        if (timer == "all") {
            clearTimeout(timer1); // 清空计划播放的定时器
            clearTimeout(timer2); // 清空实际播放的定时器
            clearTimeout(timer3); // 清空比较播放的定时器
            $(".planPlay .playOrStop,.realityPlay .playOrStop，.comparePlay .playOrStop").addClass("icon-start").removeClass("icon-stop");
        }
    };

    // 键盘单击
    manager.keyClick = function(){
        $(document).off("keydown").keydown(function (e) {
            if (e.keyCode == 32) {
                spanHasClass();
            }
            if (e.keyCode == 39) {
                spanHasClass();
            }
            if (e.keyCode == 37) {
                spanHasClass();
            }
        });
        function spanHasClass() {
            if ($(".plan").attr("class").indexOf("checkSpan") != -1) {
                $(".planPlay .playOrStop").trigger("click");
            }else if ($(".real").attr("class").indexOf("checkSpan") != -1) {
                $(".realityPlay .playOrStop").trigger("click")
            }else if ($(".compare").attr("class").indexOf("checkSpan") != -1) {
                $(".comparePlay .playOrStop").trigger("click")
            }
        }
    }

    // 计划进度播放
    manager.plan = function () {
        let offsetLeft = $(".planPlay").offset().left + 100;                                    // 求拖拽的小圆的距离窗口左边的距离值
        let stepDis = sliderWidth / ((endDayMS - startDayMS) / oneDayMS);                       // 求出步长并设置步长

        $(".slider").mousedown(function () {
            var clickDown = true;
            $(".planPlay").mousemove(function (e) {
                manager.clearTimer("plan");
                let disX = e.pageX - offsetLeft;
                if (disX <= 0) {
                    leftDis = 0;
                    currDayMS = startDayMS;
                } else if (disX >= sliderWidth) {
                    leftDis = sliderWidth;
                    currDayMS = startDayMS + parseInt(leftDis / stepDis) * oneDayMS;
                } else {
                    leftDis = disX;
                    currDayMS = startDayMS + parseInt(leftDis / stepDis) * oneDayMS;
                }
                $(".slider").css({"left": leftDis});
                $(".tip").css({"left": leftDis - 25}).html(edit.formatDate(currDayMS));
            });
            $(".planPlay").mouseup(function () {
                $(".planPlay").off('mousedown');
                $(".planPlay").off('mousemove');
                EbsViewer.dragPlan(currDayMS,obj);
                playFirst = false;
            });
           
        });

        // 点击暂停或者播放
        $(".planPlay .playOrStop").off("click").click(function () {
            clearTimeout(timer1);
               
            EbsViewer.planRealFly(currDayMS, true,obj);

            if ($(this).attr("class").indexOf("icon-start") != -1) {
                if (playFirst) {
                    playFirst = false;                                                          // 首次加载后设置为true
                    EbsViewer.flyPlay(undefined,obj);                                           // 相机飞到对应的位置
                    setTimeout(function () {                                                    // 等到相机飞到对应位置开始播放
                        $(".planPlay .playOrStop").toggleClass("icon-start icon-stop");         // 切换图标
                        autoPlay(playPlanTime);
                    }, 2000);
                } else {
                    $(this).toggleClass("icon-start icon-stop");
                    autoPlay(playPlanTime)
                }
            } else {
                $(this).toggleClass("icon-start icon-stop");
            }
        });

       // 空格键的播放与暂停
       manager.keyClick();
       

        // 点击加速
        $(".planPlay .addSpeed").click(function () {
            cutOrAdd(true);
        });

        // 点击减速
        $(".planPlay .cutSpeed").click(function () {
            cutOrAdd(false);
        });

        // 加速或者减速改变定时器的间隔时间
        function cutOrAdd(flag) {
            clearTimeout(timer1);
            if (flag) {
                playPlanTime = playPlanTime / 2;
                if (playPlanTime <= 50) {
                    playPlanTime = 50
                }
            } else {
                playPlanTime = playPlanTime * 2;
                if (playPlanTime >= 800) {
                    playPlanTime = 800
                }
            }
            if ($(".planPlay .playOrStop").attr("class").indexOf("icon-stop") != -1) {
                autoPlay(playPlanTime);
            }
        }

        // 播放函数
        function autoPlay(playPlanTime) {
            EbsViewer.playFlyPlan(currDayMS,obj);
           
            for (let i = 0; i < ebsData.length; i++) {
                if (edit.formatDate(currDayMS) == ebsData[i].startDatePlan) {
                    $("#treeGrid").treegrid("expand", ebsData[i].id);
                    $("#treeGrid").treegrid("select", ebsData[i].id);
                    $("#treeGrid").treegrid("scrollTo", i + 1);
                }
            }
            if (leftDis >= sliderWidth) {
                leftDis = sliderWidth;
                $(".slider").css({"left": leftDis});
                $(".tip").css({"left": leftDis - 25}).html(edit.formatDate(ebsData[0].endDatePlan));
                manager.clearTimer("plan");
            } else {
                leftDis += stepDis;
                currDayMS += oneDayMS;
                $(".slider").css({"left": leftDis});
                $(".tip").css({"left": leftDis - 25}).html(edit.formatDate(currDayMS));
                timer1 = setTimeout(function () {
                    return autoPlay(playPlanTime);
                }, playPlanTime)
            }

        }
    };

    // 实际进度播放
    manager.real = function () {
        let realOffsetLeft = $(".realityPlay").offset().left + 100; // 求拖拽的小圆的距离窗口左边的距离值
        let stepDis = sliderWidth / ((realEndDayMS - realStartDayMS) / oneDayMS); // 求出步长并设置步长

        $(".realSlider").mousedown(function () {
            $(".realityPlay").mousemove(function (e) {
                manager.clearTimer("real");
                let disX = e.pageX - realOffsetLeft;
                if (disX <= 0) {
                    realLeftDis = 0;
                    realCurrDayMS = realStartDayMS;
                } else if (disX >= sliderWidth) {
                    realLeftDis = sliderWidth;
                    realCurrDayMS = realStartDayMS + parseInt(realLeftDis / stepDis) * oneDayMS;
                } else {
                    realLeftDis = disX;
                    realCurrDayMS = realStartDayMS + parseInt(realLeftDis / stepDis) * oneDayMS;
                }
                $(".realSlider").css({"left": realLeftDis});
                $(".realTip").css({"left": realLeftDis - 25}).html(edit.formatDate(realCurrDayMS));
            });
            $(".realityPlay").mouseup(function () {
                $(".realityPlay").off('mousedown');
                $(".realityPlay").off('mousemove');
                EbsViewer.dragReal(realCurrDayMS,obj);
                playFirst = false;
            });
        });

        // 点击暂停或者播放
        $(".realityPlay .playOrStop").off("click").click(function () {
            clearTimeout(timer2);
            EbsViewer.planRealFly(realCurrDayMS, false,obj);
            if ($(this).attr("class").indexOf("icon-start") != -1) {
                if (playFirst) {
                    playFirst = false; // 首次加载后设置为true
                    EbsViewer.flyPlay(undefined,obj); // 相机飞到对应的位置
                    setTimeout(function () { // 等到相机飞到对应位置开始播放
                        $(".realityPlay .playOrStop").toggleClass("icon-start icon-stop"); // 切换图标
                        autoRealPlay(playRealTime);
                    }, 2000);
                } else {
                    $(this).toggleClass("icon-start icon-stop");
                    autoRealPlay(playRealTime)
                }
            } else {
                $(this).toggleClass("icon-start icon-stop");
            }
        });
        
        // 空格键的播放与暂停
        manager.keyClick();                  
      
        // 点击加速
        $(".realityPlay .addSpeed").click(function () {
            realCutOrAdd(true);
        });

        // 点击减速
        $(".realityPlay .cutSpeed").click(function () {
            realCutOrAdd(false);
        });

        // 加速或者减速改变定时器的间隔时间
        function realCutOrAdd(flag) {
            clearTimeout(timer2);
            if (flag) {
                playRealTime = playRealTime / 2;
                if (playRealTime <= 50) {
                    playRealTime = 50
                }
            } else {
                playRealTime = playRealTime * 2;
                if (playRealTime >= 800) {
                    playRealTime = 800
                }
            }
            if ($(".realityPlay .playOrStop").attr("class").indexOf("icon-stop") != -1) {
                autoRealPlay(playRealTime)
            }
        }

        // 播放函数
        function autoRealPlay(playRealTime) {
            EbsViewer.playFlyReal(realCurrDayMS,obj);
            for (let i = 0; i < ebsData.length; i++) {
                if (edit.formatDate(realCurrDayMS) == ebsData[i].startDate) {
                    $("#treeGrid").treegrid("expand", ebsData[i].id);
                    $("#treeGrid").treegrid("select", ebsData[i].id);
                    $("#treeGrid").treegrid("scrollTo", i + 1);
                }
            }
            if (realLeftDis >= sliderWidth) {
                realLeftDis = sliderWidth;
                $(".realSlider").css({
                    "left": realLeftDis
                });
                $(".realTip").css({
                    "left": realLeftDis - 25
                }).html(edit.formatDate(ebsData[0].endDate));
                manager.clearTimer("real");
            } else {
                realLeftDis += stepDis;
                realCurrDayMS += oneDayMS;
                $(".realSlider").css({
                    "left": realLeftDis
                });
                $(".realTip").css({
                    "left": realLeftDis - 25
                }).html(edit.formatDate(realCurrDayMS));
                timer2 = setTimeout(function () {
                    return autoRealPlay(playRealTime);
                }, playRealTime)
            }
        }
    };

    // 对比进度播放
    manager.compare = function () {
        
        let offsetLeft = $(".comparePlay").offset().left + 100;                                 // 求拖拽的小圆的距离窗口左边的距离值
        let stepDis = sliderWidth / ((compareEndDayMS - compareStartDayMS) / oneDayMS);                       // 求出步长并设置步长

        $(".compareSlider").mousedown(function () {
            $(".comparePlay").mousemove(function (e) {
                manager.clearTimer("compare");
                let disX = e.pageX - offsetLeft;
                if (disX <= 0) {
                    compareLeftDis = 0;
                    comparelCurrDayMS = compareStartDayMS;
                } else if (disX >= sliderWidth) {
                    compareLeftDis = sliderWidth;
                    comparelCurrDayMS = compareStartDayMS + parseInt(compareLeftDis / stepDis) * oneDayMS;
                } else {
                    compareLeftDis = disX;
                    comparelCurrDayMS = compareStartDayMS + parseInt(compareLeftDis / stepDis) * oneDayMS;
                }
                $(".compareSlider").css({"left": compareLeftDis});
                $(".compareTip").css({"left": compareLeftDis - 25}).html(edit.formatDate(comparelCurrDayMS));
            });
            $(".comparePlay").mouseup(function () {
                $(".comparePlay").off('mousedown');
                $(".comparePlay").off('mousemove');
                 EbsViewer.dragCompare(comparelCurrDayMS,obj);
                 playFirst = false
            });
        });

        // 点击暂停或者播放
        $(".comparePlay .playOrStop").off("click").click(function () {
            clearTimeout(timer3);
            // EbsViewer.compareFirstFly(comparelCurrDayMS,obj);
            if ($(this).attr("class").indexOf("icon-start") != -1) {
                if (playFirst) {
                    playFirst = false;                                                          // 首次加载后设置为true
                    EbsViewer.flyPlay(undefined,obj);                                           // 相机飞到对应的位置
                    setTimeout(function () {                                                    // 等到相机飞到对应位置开始播放
                        $(".comparePlay .playOrStop").toggleClass("icon-start icon-stop");      // 切换图标
                        autoPlayCompare(compareTime);
                    }, 2000);
                } else {
                    $(this).toggleClass("icon-start icon-stop");
                    autoPlayCompare(compareTime)
                }
            } else {
                $(this).toggleClass("icon-start icon-stop");
            }
        });

        // 空格键的播放与暂停
        manager.keyClick();

        // 点击加速
        $(".comparePlay .addSpeed").click(function () {
            cutOrAdd(true);
        });

        // 点击减速
        $(".comparePlay .cutSpeed").click(function () {
            cutOrAdd(false);
        });

        // 加速或者减速改变定时器的间隔时间
        function cutOrAdd(flag) {
            clearTimeout(timer3);
            if (flag) {
                compareTime = compareTime / 2;
                if (compareTime <= 50) {
                    compareTime = 50
                }
            } else {
                compareTime = compareTime * 2;
                if (compareTime >= 800) {
                    compareTime = 800
                }
            }
            if ($(".comparePlay .playOrStop").attr("class").indexOf("icon-stop") != -1) {
                autoPlayCompare(compareTime);
            }
        }

        // 播放函数
        function autoPlayCompare(compareTime) {
            EbsViewer.playFlyCompare(comparelCurrDayMS,obj);
            if (compareLeftDis >= sliderWidth) {
                compareLeftDis = sliderWidth;
                $(".compareSlider").css({"left": compareLeftDis});
                $(".compareTip").css({"left": compareLeftDis - 25}).html(edit.formatDate(compareEndDayMS));
                manager.clearTimer("compare");
            } else {
                compareLeftDis += stepDis;
                comparelCurrDayMS += oneDayMS;
                $(".compareSlider").css({"left": compareLeftDis});
                $(".compareTip").css({"left": compareLeftDis - 25}).html(edit.formatDate(comparelCurrDayMS));
                timer3 = setTimeout(function () {
                    return autoPlayCompare(compareTime);
                }, compareTime)
            }

        }
    };

    // 搜索
    manager.search = function () {
        let searchArr = []; // 存放对象的
        let indexArr = []; // 存放index,为 scrollTo 铺垫
        let count = 0; // 第几条数据
        $("#searchText").click(function () {
            searchArr = [];
            indexArr = [];
            count = 0;
            let searchStr = $("#search").val(); // 搜索的内容
            if (searchStr == "") {
                return false;
            }
            for (let i = 0; i < ebsData.length; i++) {
                if (ebsData[i].text.indexOf(searchStr) != -1) {
                    searchArr.push(ebsData[i]);
                    indexArr.push(i);
                }
            }

            $(".search p").show();
            if (searchArr.length == 0) {
                $(".search p span:first-of-type,.search p span:last-of-type").html(0);
            } else {
                scrollTo(searchArr, indexArr, count);
            }
        });

        // 点击下一个
        $(".countAdd").click(function () {
            if (searchArr.length != 0) {
                if (count == searchArr.length - 1) {
                    count = searchArr.length - 1;
                    return false;
                }
                count++;
                scrollTo(searchArr, indexArr, count);
                if ($("#right").css("display") == "block") {
                    if (searchArr[count].type == 2) {
                        EbsViewer.flyToModel(searchArr[count].id,obj);
                    }
                }
            }
        });

        // 点击上一个
        $(".countCut").click(function () {
            if (count == 0) {
                count = 0;
                return false;
            }
            count--;
            scrollTo(searchArr, indexArr, count);
            if ($(" #right").css("display") == "block") {
                if (searchArr[count].type == 2) {
                    EbsViewer.flyToModel(searchArr[count].id,obj);
                }
            }
        });

        // enter搜索，↑ 上一个， ↓ 下一个
        $(document).keydown(function (e) {
            if (e.keyCode == 13) {
                $("#searchText").trigger("click");
            }
            if (e.keyCode == 38) {
                $(".countCut").trigger("click");
            }
            if (e.keyCode == 40) {
                $(".countAdd").trigger("click");
            }
            if ($("#search").val() == "") {
                $(".search p").hide();
            }
        });
        // 确认搜索栏是否为空
        $(document).keyup(function (e) {
            if ($("#search").val() == "") {
                $(".search p").hide();
            }
        });

        function scrollTo(searchArr, indexArr, count) {
            $(".search p span:first-of-type").html(count + 1);
            $(".search p span:last-of-type").html(searchArr.length);
            $("#treeGrid").treegrid("expandTo", searchArr[count].id);
            $("#treeGrid").treegrid("select", searchArr[count].id);
            $("#treeGrid").treegrid("scrollTo", indexArr[count]);
        }
    };

    $("#menu").unbind("mousedown").bind("contextmenu", function (e) {
        return false;
    });

    manager.select();                           // 加载 select 下拉列表

    manager.loadDataInit();                     // 获取数据

    var obj = new Init("model");                // 加载球模型
    
    manager.projectChange();                    // 工程分解 编辑 2D

    manager.projectClick();                     // 点击切换到 工程分解

    manager.planClick();                        // 点击切换到 计划管理

    manager.writeClick();                       // 点击切换到 进度填报

    manager.progressSceneClick();               // 点击切换到 进度形象化

    manager.twoToThree();                       // 管理 2D/3D切换

    manager.planToReal();                       // 进度形象化 实际/计划 切换

    manager.projectAdd();                       // 工程分解 添加 2D/3D

    manager.projectCopy();                      // 工程分解 复制 2D/3D

    manager.projectRemove();                    // 工程分解 删除 2D/3D

    manager.search();                           // 搜索
});