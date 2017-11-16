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
	var surveymanager = new SurveyManager(myviewer,function(){});
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
                		
						var id = treeNode.id;
						switch (id) {
						case 1:
							setablevalue("K5+230-K1+100","高小王村拆迁区","400002","房屋");
							myviewer.zoomTo(environment[id-1]);
							$(".detailInfo").show();
							break;
						case 2:
							setablevalue("K5+235-K6+100","张巍庄头村拆迁区1","6541600","房屋");
							myviewer.zoomTo(environment[id-1]);
							$(".detailInfo").show();
							break;
						case 3:
							setablevalue("K5+820-R4+120","张巍庄头村拆迁区2","6616012","房屋");
							myviewer.zoomTo(environment[id-1]);
							$(".detailInfo").show();
							break;
						case 4:
							setablevalue("K5+432-K6+111","小阳村村拆迁区","3265654","房屋");
							myviewer.zoomTo(environment[id-1]);
							$(".detailInfo").show();
							break;
						case 5:
							setablevalue("K5+123-K6+120","大阳村村拆迁区","6126616","房屋");
							myviewer.zoomTo(environment[id-1]);
							$(".detailInfo").show();
							break;
						default:
							$(".detailInfo").hide();
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
    });
	/**
	 *工具栏按钮点击 
	 */
	$("#appendTools i").each(function(){
		$(this).click(function(){
			if($(this).hasClass("active")){
			//设置方法为none
			surveymanager.setSurveyType(SurveyType.NONE);
			//移除原有的监听事件
			EnvironmentViewer.removeListener();
			//初始化相应的监听事件
			switch ($(this).attr("id")) {
			//统计查询
			case "TJCX":
				$("#img").hide();
				surveymanager.setSurveyType(SurveyType.QUERY)
				break;
			//距离测量
			case "JLCL":
				$("#echartarea").hide();
				$("#img").hide();
				surveymanager.setSurveyType(SurveyType.LINE_DISTANCE);
				break;
			//方位测量
			case "FWCL":
				$("#echartarea").hide();
				$("#img").hide();						
				surveymanager.setSurveyType(SurveyType.Azimuth_DISTANCE);
				break;
			//面积测量
			case "MJCL":
				$("#echartarea").hide();
				$("#img").hide();					
				break;
			//地面刨切
			case "DMPQ":
				$("#echartarea").hide();					
				surveymanager.setSurveyType(SurveyType.Geology_SLICING);
				break;
			//其他
			default:
				break;
			}
		}else{
			//隐藏echarts和img窗口
			$("#echartarea").hide();
			$("#img").hide();
			//删除三维页面所有的线、标签
			
			//设置方法为none
			surveymanager.setSurveyType(SurveyType.NONE);
			//初始化原有的监听事件
			EnvironmentViewer.initLeftClick(myviewer,showlabel);
		}
		});
	});
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