$(function () {
	var h = $(".container-fluid-full").height();
	var h1 = $("#content .breadcrumb").height();
	WaterViewer.init("earth"); // 加载球模型
	WaterViewer.initModels();
	WaterViewer.initLeftClick(myviewer,showlabel);
	myviewer.camera.setView( 
			{
				destination : new FreeDo.Cartesian3(-2204069.3877862454,4508542.272707851,3976537.1194422017),
			    orientation : {
			        heading : 0.001440818034851965,
			        pitch : -0.7852116902406543,
			        roll : 6.281915594067648
			    }
			});
	var surveymanager = new SurveyManager(myviewer,function(){});
	$("#tree").height(h - h1 - 24);
			 
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
								var id = treeNode.id;
								switch (id) {
								case 1:
									setablevalue("白洋淀水文保护","白洋淀","水一场取水号","23");
									$(".detailInfo").show();
									myviewer.zoomTo(water[id-1]);
									break;
								case 2:
									setablevalue("大清河水文保护","大清河","水二场取水号","15");
									$(".detailInfo").show();
									myviewer.zoomTo(water[id-1]);
									break;
								default:
									$(".detailInfo").hide();
									break;
								}
							},
						    onCheck:function(event, treeId, treeNode){
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
					zTreeObj.checkAllNodes(true);
					zTreeObj.expandAll(true);
					
				}
			})
			/**
			 *工具栏按钮点击 
			 */
			$("#appendTools i").each(function(){
				$(this).click(function(){
					if($(this).hasClass("active")){
					//设置方法为none
					surveymanager.setSurveyType(SurveyType.NONE);
					//移除原有的监听事件
					WaterViewer.removeListener();
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
					WaterViewer.initLeftClick(myviewer,showlabel);
				}
				});
			});
		});
function showlabel(picked){
	if(picked!=undefined){
		$(".detailInfo").show();
		let	name = picked.id.name;
		switch (name) {
		case "baiyangdianshuiwenbaohu":
			setablevalue("白洋淀水文保护","白洋淀","水一场取水号","23");
			break;
		case "daqingheshuiwenbaohu":
			setablevalue("大清河水文保护","大清河","水二场取水号","15");
			break;
		default:
			break;
		}
	}else{
		$(".detailInfo").hide();
	}

}
var setablevalue = function(name1,place,name2,ability){
	$(".detailInfo ul").html("<li><span>水源地名称</span><input type='text' value='"+name1+"'/></li><li><span>水源所在地</span><input type='text' value='"+place+"'/></li><li><span>取水口名称</span><input type='text' value='"+name2+"'/></li><li><span>设计能力</span><input type='text' value='"+ability+"万吨/日'/></li>");
}