$(function () {
	var h = $(".container-fluid-full").height();
	var h1 = $("#content .breadcrumb").height();
	$("#tree").height(h - h1 - 24);
        	GeologyViewer.init("earth");
        	GeologyViewer.initModels();
            $.ajax({
                url: "static/page/surveystudy/geology/geology.json",
                type: "get",
                dataType:"json",
                success: function (data) {
                    var zTreeObj;
                    var setting = {
                        data: {
                            simpleData: {
                                enable: true,
                                idKey: "id",
                                pIdKey: "pId",
                                rootPId: "0"
                            }
                        },
                    	callback:{
                    		onClick:function(event, treeId, treeNode){
                    			$(".msgInfo").hide();
                    			switch (treeNode.id) {
								case 1:
									GeologyViewer.fly(globalviewer,115.999,39.001,70,labelPosition);
									$(".msgInfo").html("钻孔编号：钻井柱1<br>日期：2017-9-22<br>钻孔深度：-100<br>孔口高程：113");
									break;
								case 2:
									GeologyViewer.fly(globalviewer,116.001,39,70,labelPosition);
									$(".msgInfo").html("钻孔编号：钻井柱2<br>日期：2017-9-23<br>钻孔深度：-100<br>孔口高程：103");
									break;
								case 3:
									GeologyViewer.fly(globalviewer,116.002,39.002,70,labelPosition);
									$(".msgInfo").html("钻孔编号：钻井柱3<br>日期：2017-9-24<br>钻孔深度：8<br>孔口高程：113");
									break;
								default:
									break;
								}
                    		}
                    	}
                    };
                    zTreeObj = $.fn.zTree.init($("#tree"), setting, data);
                }
            })
            GeologyViewer.initLeftClick(globalviewer,flyToModel);
})
var labelPosition=function(mycanvas){
	
	let left = mycanvas.clientWidth/2 + 240;
	let top = mycanvas.clientHeight/2;
	$(".msgInfo").css({
		"left" : left,
		"top" : top,
		"z-index" : 1
	}).show();
}
var flyToModel=function(picked)
{	
	$(".msgInfo").hide();
	if(picked!=null){
		switch (picked.id) {
		case "钻井柱1_0":
			$(".msgInfo").html("名称：粉质粘土<br>深度：180米<br>厚度：20米<br>标高：11米");
			GeologyViewer.fly(globalviewer,115.999,39.001,80,labelPosition);
			break;
		case "钻井柱1_1":
			$(".msgInfo").html("名称：泥岩<br>深度：-95米<br>厚度：5米<br>标高：9米");
			GeologyViewer.fly(globalviewer,115.999,39.001,95,labelPosition);
			break;
		case "钻井柱1_2":
			$(".msgInfo").html("名称：沙岩<br>深度：-87米<br>厚度：13米<br>标高：15米");
			GeologyViewer.fly(globalviewer,115.999,39.001,105,labelPosition);
			break;
		case "钻井柱1_3":
			GeologyViewer.fly(globalviewer,115.999,39.001,115,labelPosition);
			$(".msgInfo").html("名称：素填土<br>深度：-90米<br>厚度：10米<br>标高：10米");
			break;
		case "钻井柱1_4":
			GeologyViewer.fly(globalviewer,115.999,39.001,120,labelPosition);
			$(".msgInfo").html("名称：强风华带<br>深度：198米<br>厚度：2米<br>标高：8米");
			break;
		case "钻井柱2_0":
			GeologyViewer.fly(globalviewer,116.001,39,70,labelPosition);
			$(".msgInfo").html("名称：粉质粘土<br>深度：-98米<br>厚度：2米<br>标高：11米");
			break;
		case "钻井柱2_1":
			GeologyViewer.fly(globalviewer,116.001,39,73,labelPosition);
			$(".msgInfo").html("名称：泥岩<br>深度：-95米<br>厚度：5米<br>标高：9米");
			break;
		case "钻井柱2_2":
			GeologyViewer.fly(globalviewer,116.001,39,75,labelPosition);
			$(".msgInfo").html("名称：沙岩<br>深度：-97米<br>厚度：3米<br>标高：15米");
			break;
		case "钻井柱2_3":
			GeologyViewer.fly(globalviewer,116.001,39,81,labelPosition);
			$(".msgInfo").html("名称：素填土<br>深度：-90米<br>厚度：10米<br>标高：10米");
			break;
		case "钻井柱2_4":
			GeologyViewer.fly(globalviewer,116.001,39,90,labelPosition);
			$(".msgInfo").html("名称：强风华带<br>深度：-98米<br>厚度：2米<br>标高：8米");
			break;
		case "钻井柱3_0":
			GeologyViewer.fly(globalviewer,116.002,39.002,80,labelPosition);
			$(".msgInfo").html("名称：粉质粘土<br>深度：28米<br>厚度：20米<br>标高：11米");
			break;
		case "钻井柱3_1":
			GeologyViewer.fly(globalviewer,116.002,39.002,90,labelPosition);
			$(".msgInfo").html("名称：泥岩<br>深度：13米<br>厚度：5米<br>标高：9米");
			break;
		case "钻井柱3_2":
			GeologyViewer.fly(globalviewer,116.002,39.002,100,labelPosition);
			$(".msgInfo").html("名称：沙岩<br>深度：21米<br>厚度：13米<br>标高：15米");
			break;
		case "钻井柱3_3":
			GeologyViewer.fly(globalviewer,116.002,39.002,110,labelPosition);
			$(".msgInfo").html("名称：素填土<br>深度：18米<br>厚度：10米<br>标高：10米");
			break;
		case "钻井柱3_4":
			GeologyViewer.fly(globalviewer,116.002,39.002,120,labelPosition);
			$(".msgInfo").html("名称：强风华带<br>深度：28米<br>厚度：20米<br>标高：8米");
			break;

		default:
			break;
		}
	}
	
}