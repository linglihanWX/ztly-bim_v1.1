$(function () {
	var h = $(".container-fluid-full").height();
	var h1 = $("#content .breadcrumb").height();
	$("#tree").height(h - h1 - 24);
	EnvironmentViewer.init("earth");
	EnvironmentViewer.initModels();
	EnvironmentViewer.initLeftClick(myviewer,showlabel);
    $.ajax({
        url: "./static/page/surveystudy/environment/environment.json",
        type: "get",
        dataType:"json",
        success: function (data) {
            
            var zTreeObj;
            var setting = {
           		check:{
           			enable:true
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
							myviewer.zoomTo(environment[id-1]);
							break;
						case 2:
							myviewer.zoomTo(environment[id-1]);
							break;
						case 3:
							myviewer.zoomTo(environment[id-1]);
							break;
						case 4:
							myviewer.zoomTo(environment[id-1]);
							break;
						case 5:
							myviewer.zoomTo(environment[id-1]);
							break;
						default:
							break;
						}
					},
				     onCheck:function(event, treeId, treeNode){
				    	 $(".msgInfo").hide();
				    	 if(treeNode){
				    		 	checkflag =treeNode.checked;
								myviewer.zoomTo(environment[treeNode.id-1]);
							}
				    	 if(checkflag){
				    		 environment[treeNode.id-1].show=true;
				    	 }else{
				    		 environment[treeNode.id-1].show=false;
				    	 }
				     },
                }
            }
            zTreeObj = $.fn.zTree.init( $("#tree"), setting, data);
        }
    })
})
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
	case "gaoxiaowangcenchaiquanqu":
		$(".msgInfo").html("征地编号：高小王村拆迁区<br>结构物名称：房屋<br>单位：m²");
		break;
	case "zhangweizhuangtoucenchaiqianqu1":
		$(".msgInfo").html("征地编号：张巍庄头村拆迁区1<br>结构物名称：房屋<br>单位：m²");
		break;
	case "zhangweizhuangtoucunchaiqianqu2":
		$(".msgInfo").html("征地编号：张巍庄头村拆迁区2<br>结构物名称：房屋<br>单位：m²");
		break;
	case "xiaoyangcunchaiqianqu":
		$(".msgInfo").html("征地编号：小阳村村拆迁区<br>结构物名称：房屋<br>单位：m²");
		break;
	case "dayangcunchaiqianqu":
		$(".msgInfo").html("征地编号：大阳村村拆迁区<br>结构物名称：房屋<br>单位：m²");
		break;
	default:
		break;
	}
	
	}
}