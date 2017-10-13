$(function () {
    let manager = {};
    let lineId = {};                        // 选中时的对象
    let strOption = "";
    let resData; 
    let date = {};                           // 存储请求回来的数据
    let btn = {};
    let layerCount = 20; 
    let docWidth = $(document.body).width();
    let height = $(document.body).height() - $("#header").height();  
    let spicked = null;
    let data = [
        {
            "id": 1,
            "name": "大桥",
            "length": 200,
            "start": "2017-01-01",
            "cycle": "5年零6个月",
            "ConstructionUnit": "中铁四局",
            "pos": "广东省珠海市",
            "des": "bridge"
        },
        {
            "id": 2,
            "name": "厦门路桥科研",
            "length": 14,
            "start": "2018-05-10",
            "cycle": "3年零8个月",
            "ConstructionUnit": "中建十八局",
            "pos": "福建省厦门",
            "des": "XMBridge"
        },
        {
            "id": 3,
            "name": "吴定高速",
            "length": 1000,
            "start": "2018-05-10",
            "cycle": "6年",
            "ConstructionUnit": "中铁八局",
            "pos": "陕西省吴起县",
            "des": "highSpeed"
        },
        {
            "id": 4,
            "name": "设计施工一体化",
            "length": 136,
            "start": "2018-05-10",
            "cycle": "4年",
            "ConstructionUnit": "中国水利水电建设集团",
            "pos": "北京市",
            "des": "waterOrElectricity"
        }
    ];                       // 工程的模拟数据

    //设置表单的宽高
    $('#treeGrid').treegrid({width: docWidth,height: height});

    

    // 页面初始化
    manager.loadDataInit = function () {
        manager._ajax(layerCount)
        $('#nodeModel').dialog({
            // width: 800,
            // height: 300,
            closed: true,
            resizable: true,
            modal: true
            
        });


    };

    // 加载下拉列表的数据
    manager.select = function () {
        let selStr = "";
        for (let i = 0; i < data.length; i++) {
            selStr += `<option>${data[i].name}</option>`;
        }
        $("#header .select").append(selStr);
    };
    //2d-3d 按钮切换
    btn.change = function  (el) {
        $(el).on('click', function  () {
            $(el).find('.on').toggleClass('on-change')
            $(el).find('.off').toggleClass('off-change')
            if ($(el).find('.on').hasClass('on-change')) {
                console.log('3D')
                manager.showView()
                
            }else{
            	$(".msgInfo").hide();
                console.log('2D')
                $("#content #left").width(docWidth);
                $("#content #right").hide()
                manager._initTreeGrid('.datagrid-view2 .datagrid-header-row',resData)
                $('#treeGrid').treegrid('select', lineId.id);
                
            }
        })
    }
    

    // 进入时，获取treegrid的数据
    manager._ajax = function (layerCount) {
        $.ajax({
            url: 'getAllDrillingColumnCha',
            dataType: "json",
            success(content) {
                resData = content;
                // console.log(resData);
                let bufferData = {}; // 缓存数据
                let node = null;
                let parentNode = null;
                for (let i = 0; i < content.length; i++) {
                    node = content[i];
                    if (node.date) {
                        node.date = edit.formatDate(node.date)
                    };
                    parentNode = bufferData[node.parentId];
                    if (parentNode == undefined) { // 如果在树结构数据中不存在父节点则创建一个
                        parentNode = bufferData[node.parentId] = {
                            children: []
                        };
                    }
                    if (node.leaf == false) {
                        if (bufferData[node.id] == undefined) {
                            node.children = [];
                        } else
                            node.children = bufferData[node.id].children;
                        bufferData[node.id] = node;
                    }
                    parentNode.children.push(node);
                }
                manager._initTreeGrid('.datagrid-view2 .datagrid-header-row',resData)
                $('#treeGrid').treegrid('select', resData[0].id);       // 初始化选中第一行，并赋值给 lineId
                lineId = resData[0];
               
            }
        });
       
    }

    

    //初始化渲染树节点
    manager._initTreeGrid = function  (el, resData) {
        let arrCol = [];
        for (let i = 0; i < layerCount; i++) {
            arrCol.push({field: 'layerh5',title: '地层',width: docWidth / 14,align: 'center'})
            arrCol.push({field: 'layerh' + (i + 1),title: '厚度',width: docWidth / 14,align: 'center'})
        };
        $('#treeGrid').treegrid({
            data: [resData[0]],
            idField:'id',
            treeField:'text',
            width: docWidth,
            height: height,
            frozenColumns: [
                [
                    {field: 'text',title: '名称',width: docWidth / 7,align: 'left'},
                    {field: 'date',title: '日期',width: docWidth / 7,align: 'left'}
                ]
            ],
            columns: [arrCol],
            onContextMenu(e, row){
                e.preventDefault();
                $(this).treegrid('select', row.id);
                let node = $('#treeGrid').treegrid('getSelected'); //选择的row
                if (node.leaf == 0) { //右键菜单判定是否可选
                    
                    if (node.children && node.children[0]) {
                        $('#text').val('')
                        if (node.children[0].children) {
                            $('#menu').menu('disableItem', $('#drilling-column')[0]);
                            $('#menu').menu('enableItem', $('#level-group')[0]);
                            $('#menu').menu('enableItem', $('#lower-group')[0]);

                        }else{
                            $('#menu').menu('enableItem', $('#drilling-column')[0]);
                            $('#menu').menu('disableItem', $('#level-group')[0]);
                            $('#menu').menu('disableItem', $('#lower-group')[0]);
                        }
                    }else{
                        $('#menu').menu('enableItem', $('#drilling-column')[0]);
                        $('#menu').menu('enableItem', $('#level-group')[0]);
                        $('#menu').menu('enableItem', $('#lower-group')[0]);
                    }
                }else{
                    $('#menu').menu('enableItem', $('#drilling-column')[0]);
                    $('#menu').menu('disableItem', $('#level-group')[0]);
                    $('#menu').menu('disableItem', $('#lower-group')[0]);
                }
                $('#menu').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
            },
            onClickRow(row){
            },
            onSelect(row){

            	}
            
        });
        $(el).before('<tr class="datagrid-header-row"></tr>')
        for (let i = 0; i < layerCount; i++) {
            $(el + ':first').append('<td colspan="2"><div class="datagrid-cell-group">第' + (i + 1) + '层</div></td>')
        }

        


    }
   
    // 对应模型文字
    manager.relativeModel = function () {
        // 2D 页面显示对应模型的位置
        for (let i = 0; i < resData.length; i++) {
            let arr = [];
            let parentId = resData[i].parentId;
            arr.push(resData[i].text);
            deep(arr, resData, parentId);
            arr.reverse();
            resData[i].textPath = arr.join("/");
            strOption += `<option value="${resData[i].modelId}">${resData[i].textPath}</option>`;
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
    //添加钻井柱层的信息节点
    manager._addDo = function (el) {
        if (!$(el+' .form-group div').hasClass('date')) {
            let doDate = `<div class="date">
                            <span>日期 :</span>
                            <input type="date" id="date" >
                        </div>`
            let doFormGroup = `<div class="form-group">
                                    <div class="lon">
                                        <span>经度 :</span> <input type="number" id="lon" min="-180" max="180">
                                    </div>
                                    <div class="lat">
                                        <span>纬度 :</span> <input type="number" id="lat" min="-90" max="90">
                                    </div>
                                    <div class="height">
                                        <span>高度 :</span>
                                        <input type="number" id="height" >
                                    </div>
                                </div>`

            $(el+' .form-group:first').append(doDate)
            $(el+' .form-group:first').after(doFormGroup)
            for(let i = 0; i<20; i++){  // 添加曾层数
                let docNode = `<div class="form-group layer-wrapper">
                                    <div class="attribute">
                                        <span style="color: #fff">第${i+1}层</span>
                                        <span>地层 :</span> <input type="text" id=formation${i+1} name=formation${i+1} class="formation">
                                    </div>
                                    <div class="attribute">
                                        <span>厚度 :</span> <input type="number" id=thickness${i+1} name=thickness${i+1} class="thickness" min="0">
                                    </div>
                                </div>`
                $(el+' .layer').append(docNode)
            }
        }
    }
    //清除钻井柱的信息节点
    manager._clearDo = function () {
        $('#nodeModel .layer-wrapper').remove()
        $('#nodeModel .date').remove()
        $('#nodeModel #lon').parents('.form-group').remove()
    }
    // 工程分解 添加 2D
    manager.projectAdd = function () {
        let addNode = {}
        let selectNode = $('#treeGrid').treegrid('getSelected')
        let dialogHeight = null;  //初始化对话框的高
        let dialogWidth = 400;  //初始化对话框的宽
        const lower = 0;
        const level = 1;
        const drilling = 2;

        //工程分解 添加 平级分组
        $('#level-group').on('click', () => {
            dialogHeight = 140;  //设置对话框的宽高
            dialogWidth = 400;
            manager._clearDo ()  //清楚添加的节点
            if ($('#level-group').hasClass('menu-item-disabled'))
                return false
            
            _showDialog (level)  //显示对话框
        })
        //工程分解 添加 下级分组
        $('#lower-group').on('click', () => {
            dialogHeight = 140;  //设置对话框的宽高
            dialogWidth = 400;
            manager._clearDo ()  //清楚添加的节点
            if ($('#lower-group').hasClass('menu-item-disabled'))
                return false
            _showDialog (lower)  //显示对话框
        })

        //工程分解 添加 钻井柱
        $('#drilling-column').on('click', () => {
            dialogHeight = 530;  //设置对话框的宽高
            dialogWidth = 800;
            if ($('#drilling-column').hasClass('menu-item-disabled'))
                return false
            $("#addModel").show().siblings().hide();
            manager._addDo ('#nodeModel #addModel')
            _showDialog (drilling)
            
                
            
        })
        
        
            
        //显示添加的对话框
        function _showDialog (classType) {
            let selectNode = $('#treeGrid').treegrid('getSelected');
            $('#nodeModel').dialog({
                title: '工程分解/添加',
                width: dialogWidth,
                height: dialogHeight,
                buttons: [{
                    text: '确认',
                    handler: function(){
                        // $.ajax({ //请求需要添加节点的id值
                        //     url: "../../data.json",
                        //     dataType: "json",
                        //     success: function (content) {  //添加节点
                        //         _addData (content[0].id, selectNode, classType)
                        //     },
                        //     error(err){
                        //         console.log(err);
                        //     }
                        // });
                         let randomId = parseInt(Math.random()*50 + 20, 10)
                        _addData (randomId, selectNode, classType)


                    }
                },{
                    text: '取消',
                    handler: function(){
                        if (edit.Trim($("#text").val(), "g") != "") {
                            edit.cancelTip();
                        } else {
                            $('#nodeModel').dialog({closed: true});
                            
                        }
                    }
                }]
            });
            $('.panel.window').css({"visibility": "visible"});      // 显示对话框 隐藏右击菜单
            $('.panel.window').css({"display": "block"});      // 显示对话框 隐藏右击菜单
            $("#addModel input").val('')                      // 清空数据
        }
        
        //获取需要添加的数据
        function _addData (id, selectNode, classType) {
            var addNode = {}   //声明添加的节点数据
            
            if ($('#addModel input').hasClass('thickness')) { //判断是添加分组还是钻井柱
                checkOut(id, selectNode) //校验添加钻井柱
                return false
            };
            if (edit.Trim($("#text").val(), "g") == "") {
                manager.toolTip(1); //提示
                return false;
            }
            addNode.id = id;
            addNode.text = edit.Trim($("#text").val(), "g");
            addNode.state = 'closed';
            addNode.leaf = 0;
            $('#treeGrid').treegrid('append', { //添加
                parent: ((classType == 1) ? selectNode.parentId:selectNode.id), //根据classType添加子级还是同级 1是子级
                data: [addNode]
            });
            console.log('需要添加接口！')
            $('#treeGrid').treegrid('select', addNode.id); //跳转到选中
            $("#treeGrid").treegrid("expandTo", addNode.id); // 展开树
            $('#nodeModel').dialog({closed: true});



            function checkOut (id, selectNode) {
                let preName = null;
                if (edit.Trim($("#text").val(), "g") == ""  
                    || $("#date").val() == "" 
                    || $("#lon").val() == ""
                    || $("#lat").val() == ""  
                    || $("#height").val() == "") { //必填项不能为空
                    manager.toolTip(1);
                    return false;
                }else if ($("#lon").val()&& ($("#lon").val()< -180 || $("#lon").val()> 180)) { //经度区间值
                    manager.toolTip(5); 
                    return false; 
                }else if ($("#lat").val()&& ($("#lat").val() < -90 || $("#lat").val() > 90)){ // 纬度区间值
                    manager.toolTip(6);
                    return false; 
                }else if (!$('#formation1').val() || !$('#thickness1').val()) { //第一层不能为空
                    manager.toolTip(7);
                    return false; 
                }else if (!_checkOutlayer (preName)) {
                    return false
                };
                addNode.id = id;
                addNode.text = edit.Trim($("#text").val(), "g");
                addNode.date = $("#date").val()
                addNode.lon = $("#lon").val()
                addNode.lat = $("#lat").val()
                addNode.height = $("#height").val()
                addNode.leaf = 1
                $('.formation').each((index, item) => {
                    addNode['layerh'+(index+1)] = $(item).val()
                    addNode['layerq'+(index+1)] = $('.thickness').eq(index).val()
                })
                
                addNode.state = 'open';
                $('#treeGrid').treegrid('append', {
                    parent: ((selectNode.leaf === 0 )?selectNode.id:selectNode.parentId),
                    data: [addNode]
                });
                console.log('需要添加接口！')

                
                $('#treeGrid').treegrid('select', addNode.id);
                $("#treeGrid").treegrid("expandTo", addNode.id);
                $('#nodeModel').dialog({closed: true});

                
            }

        }
        

        
    };
    //工程分解 删除 2D 
    manager.projectDel = function  () {
        //删除
        $('#removeNode').on('click', () => {
            let selectNode = $('#treeGrid').treegrid('getSelected')
                let parentId = $('#treeGrid').treegrid('getParent', selectNode.id)
                $("#dialog").show();
                if (selectNode.parentId === -1 || parentId.children.length === 1 ) {
                    $("#dialog>div>p").html("不能删除此文件")
                    $("#dialog>div>#yes").remove()
                    return 
                }
            
                
                selectNode.children ? $("#dialog>div>p").html("您确认删除当前文件以及子文件吗") : $("#dialog>div>p").html("您确认删除当前文件吗？");
        })
        // 确认删除
        $("#dialog>div>#yes").click(function () {
            let selectNode = $('#treeGrid').treegrid('getSelected')
            console.log("缺少删除数据的接口！"); // 删除模型以及数据库
            $("#dialog").hide();
            $('#treeGrid').treegrid('remove', selectNode.id)
        });
        // 取消删除
        $("#dialog>div>#no").click(function () {
            $("#dialog").hide();
            return false;
        });
    }
    

    // 工程分解 编辑 2D
    manager.projectChange = function () {
        $("#editNode").click(function () {

            let editNode = $('#treeGrid').treegrid('getSelected') //选择的row
            let docWidth = null;
            let docHeight = null;
            if (editNode.leaf == 0) { //右键菜单判定是否可选
                docWidth = 400;
                docHeight = 140;
                manager._clearDo ()  //清楚添加的节点
            }else{
                docWidth = 800;
                docHeight = 530;
                manager._clearDo ()  //清楚添加的节点
                manager._addDo ('#nodeModel #changeInfo')
            }
            $('#nodeModel').dialog({
                title: '工程分解/编辑',
                width: docWidth,
                height: docHeight,
                buttons: [{
                    text:'确认',
                    handler:function(){ 
                                                // 校验是否为空，为空提示
                        if (!editNode.leaf) { 
                            if (edit.Trim($("#changeText").val(), "g") == "") {
                                manager.toolTip(1);
                                return false;
                            }
                        }else{
                            let preName = null;
                            if (edit.Trim($("#changeText").val(), "g") == ""  
                                || $("#date").val() == "" 
                                || $("#lon").val() == ""
                                || $("#lat").val() == ""  
                                || $("#height").val() == "") { //必填项不能为空
                                manager.toolTip(1);
                                return false;
                            }else if ($("#lon").val()&& ($("#lon").val()< -180 || $("#lon").val()> 180)) { //经度区间值
                                manager.toolTip(5); 
                                return false; 
                            }else if ($("#lat").val()&& ($("#lat").val() < -90 || $("#lat").val() > 90)){ // 纬度区间值
                                manager.toolTip(6);
                                return false; 
                            }else if (!$('#formation1').val() || !$('#thickness1').val()) { //第一层不能为空
                                manager.toolTip(7);
                                return false; 
                            }else if (!_checkOutlayer(preName)) {
                                return false
                            };
                                
                        }
                        if (editNode) {

                            
                            //缓存修改的数据
                            editNode.text = edit.Trim($("#changeText").val(), "g");
                            if (editNode.date) {
                                editNode.date = $('#date').val();
                                editNode.lon = $('#lon').val();
                                editNode.lat = $('#lat').val();
                                editNode.height = $('#height').val();
                                $('.formation').each((index, item) => {
                                    editNode['layerq'+(index+1)] = $(item).val()
                                    editNode['layerh'+(index+1)] = $('.thickness').eq(index).val()
                                })
                            };

                            $('#treeGrid').treegrid('update',{  //页面更新数据
                                id: editNode.id
                            });
                            console.log('需要修改接口！')
                            $('#nodeModel').dialog({closed: true});
                        };
                    }
                },{
                    text:'取消',
                    handler:function(){
                        if (!editNode.leaf) {
                            if (edit.Trim($("#changeText").val(), "g") != "") {
                                edit.cancelTip();
                            }else{
                                $('#nodeModel').dialog({closed: true});
                            }
                        }else{
                            if (edit.Trim($("#changeText").val(), "g") != ""  
                                || $("#date").val() != "" 
                                || $("#lon").val() != ""
                                || $("#lat").val() != ""  
                                || $("#height").val() != "") { //必填项不能为空
                                edit.cancelTip();
                            }else{
                                $('#nodeModel').dialog({closed: true});
                            }
                        }
                        
                    }
                }]

            });

            $('.panel.window').css({"display": "block"});          // 显示对话框 隐藏右击菜单
            $('.panel.window').css({"visibility": "visible"});          // 显示对话框 隐藏右击菜单
            $('#menu').hide();

            // $("#changeInfoMold").append(strOption);                     // 对应的 select 动态添加 option

            let node = $('#treeGrid').treegrid('getSelected');          // 清空数据
            if (node) {
                $('#nodeModel').dialog({closed: false});
                $("#changeInfo").show().siblings().hide();
                $("#changeText").val(node.text);
                if (node.leaf) {
                    $("#date").val(node.date);
                    $("#lon").val(node.lon);
                    $("#lat").val(node.lat);
                    $("#height").val(node.height);
                    for(let i = 0; i<20; i++){
                       $(`#thickness${i+1}`).val(node['layerh'+(i+1)]) 
                       $(`#formation${i+1}`).val(node['layerq'+(i+1)]) 
                    }
                };
                


                
            }
        });
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
            console.log(resData)
            for (let i = 0; i < resData.length; i++) {
                if (resData[i].text.indexOf(searchStr) != -1) {
                    searchArr.push(resData[i]);
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



    // 显示 3D 视图
    manager.showView = function () {
        $("#content #left").width(200);
        $("#content #right").show()
        $('#treeGrid').treegrid({
            width: 200,
            columns: [[
                {field: 'text', title: '名称', width: 200, align: 'left'}
            ]],
            onClickRow(row){
                // if (row.type == 2) {
                //     EbsViewer.flyToModel(row.modelId);
                //     playFirst = false;
                // }
                // if ($("#header .showInfo .project").attr("class").includes("active")) {
                //     manager.projectEdit(row);
                // } else if ($("#header .showInfo .planManage").attr("class").includes("active")) {
                //     manager.planEdit(row);
                // } else if ($("#header .showInfo .write").attr("class").includes("active")) {
                //     manager.realityEdit(row);
                // } else if ($("#header .showInfo .progressScene").attr("class").includes("active")) {
                //     console.log("progressScene")
                // }
            },
            onSelect(row){
            	$("#showmsg").hide();
            	if(row.leaf==1){
           		 FreeDoEarth.flyToLabel(lc,row.lon,row.lat,70,showlabel);
           		 $(".msgInfo").html("名称："+row.text+"<br>日期："+row.date);
                }
            	if(spicked!=null){
            	if(spicked instanceof FreeDo.Entity){
            		FreeDoEarth.flyToLabel(lc,row.lon,row.lat,70,showlabel);
           		 $(".msgInfo").html("名称："+row.text+"<br>日期："+row.date);
           		 spicked=null;
            	}else{    		
            			var arr = spicked.split("_");
                		var name = arr[0];
                		var cengid = parseInt(arr[1]);
                		cengid = cengid+1;
                		
                		var drillingid =parseInt(name[name.length-1]);
                		var rowid=drillingid+1;
                		var selectrow = $("#treeGrid").treegrid("find",rowid);
                		var sum = null;
                		for(var i = 1;i<=cengid-1;i++){
                			var shuxing = "layerh"+i
                			sum = sum+selectrow[shuxing];
                		}
                		sum = sum+selectrow["layerh"+cengid]/2;
                		FreeDoEarth.flyToLabel(lc,row.lon,row.lat,sum+70,showlabel);
               		 	$(".msgInfo").html("名称："+row.text+"<br>日期："+row.date);
               		 	spicked=null;
                		
                	}
            	}
            }
            	 
            
        });
        if (lineId) {
            $('#treeGrid').treegrid('select', lineId.id); 
        };

    };



    // 填写/保存时信息时提示
    manager.toolTip = function (num) {
        $("#quit").show();
        if (num == 1) {
            $("#quit p").html("填写不项能为空，请您重新填写!");
        } else if (num == 2) {
            $("#quit p").html("结束时间不能小于开始时间，请您重新填写!");
        } else if (num == 3) {
            $("#quit p").html("保存数据成功!");
        } else if (num == 4) {
            $("#quit p").html("数据尚未修改!");
        } else if (num == 5) {
            $("#quit p").html("经度范围超过，请您重新填写!");
        } else if (num == 6) {
            $("#quit p").html("纬度范围超过，请您重新填写!");
        } else if (num == 7) {
            $("#quit p").html("第一层属性不能为空，请您重新填写!");
        } else if (num == 8) {
            $("#quit p").html("地层相邻的不能重复，请您重新填写!");
        } else if (num == 9) {
            $("#quit p").html("属性不能为空，请您重新填写!");
        };
        $("#quit #quitYes").click(function () {
            $("#quit").hide();
        });
        $("#quit #quitNo").click(function () {
            $("#quit").hide();
        });
    };

    function  _checkOutlayer (preName) {

        for(var i = 0; i < $('.formation').length; i++){
            if ($('.formation').eq(i).val()) {
                if (preName == $('.formation').eq(i).val()){ //相邻地层重名
                    manager.toolTip(8);
                    return false;
                }else{
                    preName = $('.formation').eq(i).val()
                    
                    if (!$('.thickness').eq(i).val()) { //地层存在，厚度不存在
                        manager.toolTip(9);
                        return false;
                    }
                }
            }else{
                if ($('.thickness').eq(i).val()) { // 厚度存在， 地层不存在
                    manager.toolTip(9);
                    return false;
                }
                for( let j = i; j < $('.formation').length; j++){ //层数之间不能为空
                    if ($('.formation').eq(j).val()) {
                        manager.toolTip(1);
                        return false;
                    }
                }
            }
        }
        return true
    }
    
function ClickModelSelectLeaf(data) {
	spicked = data
	if(data==null){
		$(".msgInfo").hide();
	}else{
	if(data instanceof FreeDo.Entity){

		var drillingid = parseInt(data._id[data._id.length-1]);
		
		var rowid=drillingid+1;
		
		var selectrow = $("#treeGrid").treegrid("find",rowid);
		$("#treeGrid").treegrid("select",selectrow.id);
		$(".msgInfo").html("名称："+selectrow.text+"<br>日期："+selectrow.date)
	}else{    		
			var arr = data.split("_");
    		var name = arr[0];
    		var cengid = parseInt(arr[1]);
    		cengid = cengid+1;
    		var shuxing = "layerh"+cengid;
    		var drillingid =parseInt(name[name.length-1]);
    		var rowid=drillingid+1;
    		
    		var selectrow = $("#treeGrid").treegrid("find",rowid);
    		$("#treeGrid").treegrid("select",selectrow.id);
    		$(".msgInfo").html("名称：第"+cengid+"层<br>厚度："+selectrow[shuxing]+"米")
    		}
	}	
    	

    }
    function showlabel(mycanvas){
    	
    	let left = mycanvas.clientWidth/2 + 210;
    	let top = mycanvas.clientHeight/2;
    	$(".msgInfo").css({
    		"left" : left,
    		"top" : top,
    		"z-index" : 1
    	}).show();
    }
    FreeDoEarth.init("right");
    FreeDoEarth.initLeftClick(ClickModelSelectLeaf);
    // date.format()
    manager.select();                           // 加载 select 下拉列表

    manager.loadDataInit();                     // 获取数据
    
    // 
    manager.projectAdd();
    manager.projectChange();
    manager.projectDel();
    manager.search();
    btn.change('.btn-wrapper');                 //2D-3D按钮切换
    /* $(window).resize(function () {window.location.reload();}); */         // 窗口改变 刷新页面


});



