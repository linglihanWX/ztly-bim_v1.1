$(function () {
	var h = $(".container-fluid-full").height();
	var h1 = $("#content .breadcrumb").height();
	$("#tree").height(h - h1 - 24);
        	GeologyViewer.init("earth");
        	GeologyViewer.initModels();
        	globalviewer.camera.setView( 
        			{
        				destination : new FreeDo.Cartesian3(-2175972.075982492,4461132.435519839,3992238.28299535),
        			    orientation : {
        			        heading : 6.068072024715445,
        			        pitch : -0.2942832510125577,
        			        roll : 6.282452688055265
        			    }
        			});
        	var surveymanager = new SurveyManager(globalviewer,function(){});
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
                    			
                    			switch (treeNode.id) {
								case 1:
									GeologyViewer.fly(globalviewer,115.999,39.001,70);
									setablevalue1("钻井柱1","2017-9-22","100","103");
									$(".detailInfo").show();
									break;
								case 2:
									GeologyViewer.fly(globalviewer,116.001,39,70);
									setablevalue1("钻井柱2","2017-9-23","100","103");
									$(".detailInfo").show();
									break;
								case 3:
									GeologyViewer.fly(globalviewer,116.002,39.002,70);
									setablevalue1("钻井柱3","2017-9-24","8","113");
									$(".detailInfo").show();
									break;
								default:
									$(".detailInfo").hide();
									break;
								}
                    		}
                    	}
                    };
                    zTreeObj = $.fn.zTree.init($("#tree"), setting, data);
                    zTreeObj.expandAll(true);
                }
            })
            GeologyViewer.initLeftClick(globalviewer,flyToModel);
            /**
			 *工具栏按钮点击 
			 */
			$("#appendTools i").each(function(){
				$(this).click(function(){
					if($(this).hasClass("active")){
					//设置方法为none
					surveymanager.setSurveyType(SurveyType.NONE);
					//移除原有的监听事件
					GeologyViewer.removeListener();
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
					GeologyViewer.initLeftClick(globalviewer,flyToModel);
				}
				});
			});
})

var flyToModel=function(picked)
{	
	//globalviewer.scene.preRender.removeEventListener(setdivfollow)
	if(picked!=null){
		$(".detailInfo").show();
		switch (picked.id) {
		case "钻井柱1_0":
			GeologyViewer.fly(globalviewer,115.999,39.001,80);
			setablevalue2("粉质粘土","180","20","11");
			break;
		case "钻井柱1_1":
			GeologyViewer.fly(globalviewer,115.999,39.001,95);
			setablevalue2("泥岩","95","5","9");
			break;
		case "钻井柱1_2":
			$(".detailInfo ul").html("<li><span>名称</span><input type='text' value='沙岩'/></li><li><span>深度</span><input type='text' value='78米'/></li><li><span>厚度</span><input type='text' value='13米'/></li><li><span>标高</span><input type='text' value='15米'/></li>");
			GeologyViewer.fly(globalviewer,115.999,39.001,105);
			setablevalue2("沙岩","78","13","15");
			break;
		case "钻井柱1_3":
			GeologyViewer.fly(globalviewer,115.999,39.001,115);
			setablevalue2("素填土","50","10","10");
			break;
		case "钻井柱1_4":
			GeologyViewer.fly(globalviewer,115.999,39.001,120);
			setablevalue2("强风华带","30","2","8");
			break;
		case "钻井柱2_0":
			GeologyViewer.fly(globalviewer,116.001,39,70);
			setablevalue2("粉质粘土","98","2","11");
			break;
		case "钻井柱2_1":
			GeologyViewer.fly(globalviewer,116.001,39,73);
			setablevalue2("泥岩","95","5","8");
			break;
		case "钻井柱2_2":
			GeologyViewer.fly(globalviewer,116.001,39,75);
			setablevalue2("沙岩","93","3","15");
			break;
		case "钻井柱2_3":
			GeologyViewer.fly(globalviewer,116.001,39,81);
			setablevalue2("素填土","90","10","10");
			break;
		case "钻井柱2_4":
			GeologyViewer.fly(globalviewer,116.001,39,90);
			setablevalue2("强风华带","98","2","8");
			break;
		case "钻井柱3_0":
			GeologyViewer.fly(globalviewer,116.002,39.002,80);
			setablevalue2("粉质粘土","28","20","11");
			break;
		case "钻井柱3_1":
			GeologyViewer.fly(globalviewer,116.002,39.002,90);
			setablevalue2("泥岩","13","5","9");
			break;
		case "钻井柱3_2":
			GeologyViewer.fly(globalviewer,116.002,39.002,100);
			setablevalue2("沙岩","21","13","15");
			break;
		case "钻井柱3_3":
			GeologyViewer.fly(globalviewer,116.002,39.002,110);
			setablevalue2("素填土","18","10","10");
			break;
		case "钻井柱3_4":
			GeologyViewer.fly(globalviewer,116.002,39.002,120);
			setablevalue2("强风华带","28","20","8");
			break;

		default:
			break;
		}
	}else{
		$(".detailInfo").hide();
	}
	
}
var setablevalue1 = function(num,date,deep,height){
	$(".detailInfo ul").html("<li><span>钻孔编号</span><input type='text' value='"+num+"'/></li><li><span>日期</span><input type='text' value='"+date+"'/></li><li><span>钻孔深度</span><input type='text' value='"+deep+"米'/></li><li><span>孔口高程</span><input type='text' value='"+height+"米'/></li>");
}
var setablevalue2 = function(name,deep,thick,sheight){
	$(".detailInfo ul").html("<li><span>名称</span><input type='text' value='"+name+"'/></li><li><span>深度</span><input type='text' value='"+deep+"米'/></li><li><span>厚度</span><input type='text' value='"+thick+"米'/></li><li><span>标高</span><input type='text' value='"+sheight+"米'/></li>");
}