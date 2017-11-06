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