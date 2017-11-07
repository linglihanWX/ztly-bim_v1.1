$(function () {
	var h = $(".container-fluid-full").height();
	var h1 = $("#content .breadcrumb").height();
	$("#tree").height(h - h1 - 24);
	EnvironmentViewer.init("earth");
	EnvironmentViewer.initModels();
	EnvironmentViewer.initLeftClick(myviewer,showlabel);
	myviewer.camera.setView( 
			{
				destination : new FreeDo.Cartesian3(-2176905.1385308662,4471880.533473881,3995906.2301306115),
			    orientation : {
			        heading : 0.8982847035993551,
			        pitch : -1.0446122396829853,
			        roll : 0.005203217157572659
			    }
			});
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
                		$(".detailInfo").show();
						var id = treeNode.id;
						switch (id) {
						case 1:
							setablevalue("K5+230-K1+100","高小王村拆迁区","400002","房屋");
							myviewer.zoomTo(environment[id-1]);
							break;
						case 2:
							setablevalue("K5+235-K6+100","张巍庄头村拆迁区1","6541600","房屋");
							myviewer.zoomTo(environment[id-1]);
							break;
						case 3:
							setablevalue("K5+820-R4+120","张巍庄头村拆迁区2","6616012","房屋");
							myviewer.zoomTo(environment[id-1]);
							break;
						case 4:
							setablevalue("K5+432-K6+111","小阳村村拆迁区","3265654","房屋");
							myviewer.zoomTo(environment[id-1]);
							break;
						case 5:
							setablevalue("K5+123-K6+120","大阳村村拆迁区","6126616","房屋");
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
            zTreeObj.checkAllNodes(true);
            zTreeObj.expandAll(true);
        }
    })
})
function showlabel(picked){
	if(picked!=undefined){
		$(".detailInfo").show();
		let	name = picked.id.name;
		switch (name) {
		case "gaoxiaowangcenchaiquanqu":
			setablevalue("K5+230-K1+100","高小王村拆迁区","400002","房屋");
			break;
		case "zhangweizhuangtoucenchaiqianqu1":
			setablevalue("K5+235-K6+100","张巍庄头村拆迁区1","6541600","房屋");
			break;
		case "zhangweizhuangtoucunchaiqianqu2":
			setablevalue("K5+820-R4+120","张巍庄头村拆迁区2","6616012","房屋");
			break;
		case "xiaoyangcunchaiqianqu":
			setablevalue("K5+432-K6+111","小阳村村拆迁区","3265654","房屋");
			break;
		case "dayangcunchaiqianqu":
			setablevalue("K5+123-K6+120","大阳村村拆迁区","6126616","房屋");
			break;
		default:
			break;
		}
	}else{
		$(".detailInfo").hide();
	}	
}
var setablevalue = function(num,name1,s,name2){
	$(".detailInfo ul").html("<li><span>征地编号</span><input type='text' value='"+num+"'/></li><li><span>征地区域</span><input type='text' value='"+name1+"'/></li><li><span>面积</span><input type='text' value='"+s+"平方米'/></li><li><span>结构物名称</span><input type='text' value='"+name2+"'/></li>");
}