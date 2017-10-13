$(function () {
	var h = $(".container-fluid-full").height();
	var h1 = $("#content .breadcrumb").height();
	$("#tree").height(h - h1 - 24);
			 WaterViewer.init("earth"); // 加载球模型
			 WaterViewer.initModels();
			 WaterViewer.initLeftClick(myviewer,showlabel);
			$.ajax({
				url: "./static/page/surveystudy/water/water.json",
				type: "get",
                dataType:"json",
				success: function (data) {
					var zTreeObj;
					var checkflag = null;
					var setting = {
						check:{
							enable: true,
							chkStyle: "checkbox",
							chkboxType: { "Y": "p", "N": "s" }
						},	
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
								var id = treeNode.id;
								switch (id) {
								case 1:
									myviewer.zoomTo(water[id-1]);
									break;
								case 2:
									myviewer.zoomTo(water[id-1]);
									break;
								default:
									break;
								}
							},
						     onCheck:function(event, treeId, treeNode){
						    	 $(".msgInfo").hide();
						    	 if(treeNode){
										checkflag =treeNode.checked;
										myviewer.zoomTo(water[treeNode.id-1]);
									}
						    	 if(checkflag){
						    		 water[treeNode.id-1].show=true;
						    	 }else{
						     		water[treeNode.id-1].show=false;
						    	 }
						     }
		                }
					};
					zTreeObj = $.fn.zTree.init($("#tree"), setting, data);
					
				}
			})
		});
function showlabel(data,data2){
	if(data2!=undefined){
	let left = data.x+220;
	let top = data.y-140;
	if(top<70){
		top=70
	}
	let	name = data2.id.name;
	$(".msgInfo").css({
		"left" : left,
		"top" : top,
		"z-index" : 1
	}).show();
	switch (name) {
	case "baiyangdianshuiwenbaohu":
		$(".msgInfo").html("水源地名称：白洋淀水文保护<br>水源所在地：白洋淀<br>取水口名称：水二场取水号<br>设计能力：23万吨/日");
		break;
	case "daqingheshuiwenbaohu":
		$(".msgInfo").html("水源地名称：大清河水文保护<br>水源所在地：大清河<br>取水口名称：水二场取水号<br>设计能力：15万吨/日");
		break;
	default:
		break;
	}
	
	}
}