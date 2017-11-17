$(function () {
	var h = $(".container-fluid-full").height();
	var h1 = $("#content .breadcrumb").height();
	WaterViewer.init("earth"); // 加载球模型
	WaterViewer.initModels();
	WaterViewer.initLeftClick(myviewer,showlabel);
	myviewer.camera.setView({
				destination : new FreeDo.Cartesian3(-2204069.3877862454,4508542.272707851,3976537.1194422017),
			    orientation : {
			        heading : 0.001440818034851965,
			        pitch : -0.7852116902406543,
			        roll : 6.281915594067648
			    }
			});
    tool.drag("#tableInfo");
    $("#tableInfo p span:last-of-type").click(function () {
        $("#tableInfo").hide();
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
								$("#tableInfo").hide();
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
var str_ghqmc,str_xmmc,str_bgmc,str_kjbj,str_xzqh,str_rjztmj,str_ghqmj,str_gdqx,str_znjg,str_zqgm,str_fzfx,str_czhfzmb =null;
function showlabel(picked){
	if(picked!=undefined){
		$("#tableInfo").show();
		let	name = picked.id.name;
		switch (name) {
		case "baiyangdianshuiwenbaohu":
			str_ghqmc="白洋淀水文保护区";
			str_xmmc="白洋淀水文保护区";
			str_bgmc="白洋淀水文保护区控制性工程规划报告书";
			str_kjbj="中心村以均匀布局形式带动基层村发展的空间结构形态";
			str_xzqh="河北省保定市安新县";
			str_rjztmj="99.24平方米";
			str_ghqmj="993公顷";
			str_gdqx="2008-2025年";
			str_znjg="中心镇是全镇的政治、经济、文化及交通中心，是以发展第三产业、农副产品精深加工及蔬菜等包装业和物流业为主的综合开发区，中心村是村民行政、文化娱乐中心、初级商贸中心，基层村是村民活动中心";
			str_zqgm="现状人口为8350，规划近期到2010年，镇区人口为8750，规划近期2015到年，镇区人口为9750，规划近期2025到年，镇区人口为10450";
			str_fzfx="旅游用地发展方向为向东发展";
			str_czhfzmb="2015年城镇人口为8430，城镇人口比重为33%<br>2015年城镇人口为10452，城镇人口比重为38%";
			TableAssign.setablevalue(str_ghqmc,str_xmmc,str_bgmc,str_kjbj,str_xzqh,str_rjztmj,str_ghqmj,str_gdqx,str_znjg,str_zqgm,str_fzfx,str_czhfzmb)
			$("#tableInfo").show();
			break;
		case "daqingheshuiwenbaohu":
			str_ghqmc="大清河水文保护区";
			str_xmmc="大清河水文保护区";
			str_bgmc="大清河水文保护区控制性工程规划报告书";
			str_kjbj="清河县地处环渤海经济区中心地带，北京、天津、济南、石家庄、郑州、太原等大城市拱卫辐射内外";
			str_xzqh="河北省邢台市清河县";
			str_rjztmj="120.24平方米";
			str_ghqmj="1200公顷";
			str_gdqx="2008-2025年";
			str_znjg="中心镇是全镇的政治、经济、文化及交通中心，是以发展第三产业、农副产品精深加工及蔬菜等包装业和物流业为主的综合开发区，中心村是村民行政、文化娱乐中心、初级商贸中心，基层村是村民活动中心";
			str_zqgm="现状人口为13020，规划近期到2010年，县区人口为13500，规划近期2015到年，县区人口为14031，规划近期2025到年，县区人口为16000";
			str_fzfx="建设用地发展方向为向东发展";
			str_czhfzmb="2015年城镇人口为6430，城镇人口比重为38%<br>2015年城镇人口为8552，城镇人口比重为44%";
			TableAssign.setablevalue(str_ghqmc,str_xmmc,str_bgmc,str_kjbj,str_xzqh,str_rjztmj,str_ghqmj,str_gdqx,str_znjg,str_zqgm,str_fzfx,str_czhfzmb)
			$("#tableInfo").show();
			break;
		default:
			break;
		}
	}else{
		$("#tableInfo").hide();
	}

}
