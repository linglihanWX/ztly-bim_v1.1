$(function () {
	
	var nodesChecked;
    var nodeSelected;
    var checkedArr = [];
    var defaultCheckedArr = [];
    var changeData = {};
    var defaultData = {};
    var stepData = {
        delfaultlon: 0.000001,
        delfaultlat: 0.000001,
        delfaultheight: 0.1,
        delfaultcourse: 1,
        delfaultalpha: 1,
        delfaultroll: 1,
        delfaultscaleX: 0.1,
        delfaultscaleY: 0.1,
        delfaultscaleZ: 0.1
    };
    
    var zTree;
	var demoIframe;

	var setting = {
		view: {
			dblClickExpand: false,
			showLine: true,
			selectedMulti: false
		},
		data: {
			simpleData: {
				enable:true,
				idKey: "id",
				pIdKey: "pid",
				rootPId: ""
			}
		},
		callback: {
			beforeClick: function(treeId, treeNode) {
				var zTree = $.fn.zTree.getZTreeObj("tree");
				if (treeNode.isParent) {
					zTree.expandNode(treeNode);
					return false;
				} else {
					//demoIframe.attr("src",treeNode.file + ".html");
					return true;
				}
			}
		}
	};

	//获取数据
	$.ajax(
	{
		url:"treeData",
		type:"GET",
		success:function(treeData)
		{
			var t = $("#tree");
			t = $.fn.zTree.init(t, setting, treeData);
		}
	})
	$("#left").hide();
	
	//加载球模型
    FD_Viewer.Init("right");
    
    $(".cesium-viewer-bottom").remove();
	/*demoIframe = $("#testIframe");
	demoIframe.bind("load", loadReady);
	var zTree = $.fn.zTree.getZTreeObj("tree");
	zTree.selectNode(zTree.getNodeByParam("id", 101));*/

    // 禁用默认的右击菜单
    $(document).bind("contextmenu", function (e) {
        return false;
    });
   
    // 初始化对话框化
    $('#singleEdit').dialog({
        title: '编辑(当前)',
        width: 500,
        height: 400,
        closed: true,
        cache: false,
        iconCls: 'icon-save',
        resizable: true
    });
    $('#manyEdit').dialog({
        title: '编辑(已选)',
        width: 400,
        height: 400,
        closed: true,
        cache: false,
        iconCls: 'icon-save',
        resizable: true
    });

    // 设置 content 的高度 为屏幕高度减去 header 的高度
    var height = $(document.body).height() - $("#header").height();
    $("#content").css({"height": height + "px"});
    $("#header .headerMiddle").width($(document.body).width() - $("#header .headerLeft").width() - $("#header .headerRight").width());
   
    
    // 右键添加功能，待定
    $("#addNode").click(function () {
        var node = $('#tree').tree('getSelected');
        $('#tree').tree('append', {
            parent: (node ? node.target : null),
            data: [{
                text: '请修改名称'
            }]
        });
    });

    // 右键删除当前按钮功能,待定
    $("#removeNode").click(function () {
        // 隐藏ContextMenu，显示模态框
        $("#menu").hide();
        $("#dialog").show();

        if (nodeSelected.children) {
            $("#dialog>div>p").html("您确认删除当前文件以及子文件吗");
        } else {
            $("#dialog>div>p").html("您确认删除当前文件吗？");
        }

        // 确认删除
        $("#dialog>div>#yes").click(function () {
            $('#tree').tree('remove', nodeSelected.target);
            
            // FD_Viewer.removePmodel(nodeSelected.id)
            
			/* $.ajax({ 
				 url: "delmodel.do", 
				 type: "POST", 
				 data: { 
					 id:nodeSelected.id 
					 }, 
				success(data) {
						 $('#tree').tree('remove',nodeSelected.target);
						 console.log("成功！");
						
						 },
				error(xhr, text, ex) { console.log(text) } 
				});*/
			 
            
            $("#dialog").hide();
        });

        // 取消删除
        $("#dialog>div>#no").click(function () {
            $("#dialog").hide();
            return false;
        });

    });

    // 右键删除已勾选按钮功能,待定
    $("#removeNodes").click(function () {

        // 隐藏ContextMenu，显示模态框
        $("#menu").hide();
        $("#dialog").show();

        $("#dialog>div>p").html("您确认删除已选中的文件吗？");

        // 确认删除
        $("#dialog>div>#yes").click(function () {
            console.log(nodesChecked);
            for (var i = 0; i < nodesChecked.length; i++) {
                $('#tree').tree('remove', nodesChecked[i].target);
                
				/*
				  $.ajax({ url: "delmodel.do", type: "POST", data: { id:
				  nodesChecked[i].id }, success(data) {
				  $('#tree').tree('remove', nodesChecked[i].target);
				 console.log("成功！") }, error(xhr, text, ex) {
				 console.log(text) } })
				 */
				 
            }
            $("#dialog").hide();
            console.log(nodesChecked);
        });

        // 取消删除
        $("#dialog>div>#no").click(function () {
            $("#dialog").hide();
            return false;
        });

    });

    // 右键编辑当前按钮功能,待定
    $("#editNode").click(function (e) {
        nodeSelected = $("#tree").tree("getSelected");
        if(nodeSelected.type == 1){
            console.log("此节点不为模型节点！");
        }else if(nodeSelected.type == 2){
            $('#singleEdit').dialog("open");
            $("#singleEdit").css({
                "display": "block"
            });
            edit.leftCloseOrOpen(false);
            defaultData={};
            changeData={};
            var jsonStr = JSON.parse(nodeSelected.attributes.parameter);
            for (var key in nodeSelected) {
                defaultData[key] = nodeSelected[key];
                changeData[key] = nodeSelected[key];
            }
            for( var key in jsonStr){
                defaultData[key] = jsonStr[key];
                changeData[key] = jsonStr[key];
            }

          
            // 获取对应的数据
            edit.getData(changeData);
            // 获取对应的步长
            // 本处有问题
            edit.getStep(stepData);

            // 修改步长
            edit.editStep(stepData);

            // 增加步长
           
            edit.addStep(stepData, changeData);

            // 数据减少步长
            edit.reduceStep(stepData, changeData);

            // 检测输入框
            edit.checkInp(changeData);
            $("#selectFile").change(function () {
                $('#filePath').val($('#selectFile').val());
            });
        }

        // 确认按钮，保存信息！ off 取消之前绑定的 click 事件
        $("#singleSure").off('click').click(function () {
            edit.saveData(nodeSelected, changeData);
            changeData = {};
            defaultData = {};
            edit.leftCloseOrOpen(true);
            // 重新获取数据
            $('#tree').tree({
                url: 'pm/selectByFatherNodeId'
            });
        });

        // 取消按钮
        edit.close(singleEdit,defaultData);

    });

    // 右键编辑已勾选按钮功能,待定
    $("#editNodes").click(function (e) {
    	nodesChecked = $('#tree').tree('getChecked');             
        for( var i = 0;i<nodesChecked.length;i++){
        	if(nodesChecked[i].type == 1){
               
        		console.log(nodesChecked[i]);

            }else if(nodesChecked[i].type == 2){
            	 $('#manyEdit').dialog({
                     closed: false,
                 });
                 $("#manyEdit").css({
                     "display": "block"
                 });
                 edit.leftCloseOrOpen(false);
                 
                 // 清空之前存储的数据
                 defaultCheckedArr = [];
                 checkedArr = [];

                 // 复制保存对象
                 edit.manyEditCopyObj(nodesChecked,defaultCheckedArr,checkedArr);

                 // 获取对应的步长
                 edit.getStep(stepData);

                 // 修改步长
                 edit.editStep(stepData);

                 // 增加
                 edit.manyEditAdd(stepData,checkedArr);

                 // 减少
                 edit.manyEditReduce (stepData,checkedArr);
            }
        }
        
        $("#manySure").off("click").click(function () {
            $('#manyEdit').dialog({
                closed: true,
            });
            edit.leftCloseOrOpen(true);         
            edit.arrayOrObject(checkedArr);
            // 重新获取数据
            $('#tree').tree({
                url: 'pm/selectByFatherNodeId'
            });
        });

        // 取消按钮
        edit.close(manyEdit,defaultCheckedArr);
    });

    
    // 窗口大小改变时自动刷新页面
    $(window).resize(function(){ 
    	window.location.reload();
    }); 

});




