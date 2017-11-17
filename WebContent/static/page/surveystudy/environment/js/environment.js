$(function () {
	var h = $(".container-fluid-full").height();
	var h1 = $("#content .breadcrumb").height();
	$("#tree").height(h - h1 - 24);
	EnvironmentViewer.init("earth");
	EnvironmentViewer.initModels();
	EnvironmentViewer.initLeftClick(myviewer,showlabel);
	myviewer.camera.setView({
				destination : new FreeDo.Cartesian3(-2176905.1385308662,4471880.533473881,3995906.2301306115),
			    orientation : {
			        heading : 0.8982847035993551,
			        pitch : -1.0446122396829853,
			        roll : 0.005203217157572659
			    }
			});
    tool.drag("#tableInfo");
    $("#tableInfo p span:last-of-type").click(function () {
        $("#tableInfo").hide();
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
                		$("#tableInfo").hide();
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
var str_ghqmc,str_xmmc,str_bgmc,str_kjbj,str_xzqh,str_rjztmj,str_ghqmj,str_gdqx,str_znjg,str_zqgm,str_fzfx,str_czhfzmb =null;
function showlabel(picked){
	if(picked!=undefined){
		let	name = picked.id.name;
		switch (name) {
		case "gaoxiaowangcenchaiquanqu":
			str_ghqmc="高小王村拆迁区";
			str_xmmc="高小王村拆迁区";
			str_bgmc="高小王村拆迁区控制性工程规划报告书";
			str_kjbj="中心村以均匀布局形式带动基层村发展的空间结构形态";
			str_xzqh="河北省保定市空城县";
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
		case "zhangweizhuangtoucenchaiqianqu1":
			str_ghqmc="张巍庄头村拆迁区一区";
			str_xmmc="张巍庄头村拆迁区一区";
			str_bgmc="张巍庄头村拆迁区一区控制性工程规划报告书";
			str_kjbj="中心村以均匀布局形式带动基层村发展的空间结构形态";
			str_xzqh="河北省保定市安新县";
			str_rjztmj="97.24平方米";
			str_ghqmj="697.3公顷";
			str_gdqx="2008-2025年";
			str_znjg="中心镇是全镇的政治、经济、文化及交通中心，是以发展第三产业、农副产品精深加工及蔬菜等包装业和物流业为主的综合开发区，中心村是村民行政、文化娱乐中心、初级商贸中心，基层村是村民活动中心";
			str_zqgm="现状人口为8350，规划近期到2010年，镇区人口为8750，规划近期2015到年，镇区人口为9750，规划近期2025到年，镇区人口为10450";
			str_fzfx="旅游用地发展方向为向东发展";
			str_czhfzmb="2015年城镇人口为8430，城镇人口比重为33%<br>2015年城镇人口为10452，城镇人口比重为38%";
			TableAssign.setablevalue(str_ghqmc,str_xmmc,str_bgmc,str_kjbj,str_xzqh,str_rjztmj,str_ghqmj,str_gdqx,str_znjg,str_zqgm,str_fzfx,str_czhfzmb)
			$("#tableInfo").show();
			break;
		case "zhangweizhuangtoucunchaiqianqu2":
			str_ghqmc="张巍庄头村拆迁区二区";
			str_xmmc="张巍庄头村拆迁区二区";
			str_bgmc="张巍庄头村拆迁区二区控制性工程规划报告书";
			str_kjbj="中心村以均匀布局形式带动基层村发展的空间结构形态";
			str_xzqh="河北省保定市安新县";
			str_rjztmj="88.26平方米";
			str_ghqmj="785公顷";
			str_gdqx="2008-2025年";
			str_znjg="中心镇是全镇的政治、经济、文化及交通中心，是以发展第三产业、农副产品精深加工及蔬菜等包装业和物流业为主的综合开发区，中心村是村民行政、文化娱乐中心、初级商贸中心，基层村是村民活动中心";
			str_zqgm="现状人口为8350，规划近期到2010年，镇区人口为8750，规划近期2015到年，镇区人口为9750，规划近期2025到年，镇区人口为10450";
			str_fzfx="旅游用地发展方向为向东发展";
			str_czhfzmb="2015年城镇人口为8430，城镇人口比重为33%<br>2015年城镇人口为10452，城镇人口比重为38%";
			TableAssign.setablevalue(str_ghqmc,str_xmmc,str_bgmc,str_kjbj,str_xzqh,str_rjztmj,str_ghqmj,str_gdqx,str_znjg,str_zqgm,str_fzfx,str_czhfzmb)
			$("#tableInfo").show();
			break;
		case "xiaoyangcunchaiqianqu":
			str_ghqmc="小阳村拆迁区";
			str_xmmc="小阳村拆迁区";
			str_bgmc="小阳村拆迁区控制性工程规划报告书";
			str_kjbj="中心村以均匀布局形式带动基层村发展的空间结构形态";
			str_xzqh="河南郑州市新密市小阳村";
			str_rjztmj="98.24平方米";
			str_ghqmj="853公顷";
			str_gdqx="2008-2025年";
			str_znjg="中心镇是全镇的政治、经济、文化及交通中心，是以发展第三产业、农副产品精深加工及蔬菜等包装业和物流业为主的综合开发区，中心村是村民行政、文化娱乐中心、初级商贸中心，基层村是村民活动中心";
			str_zqgm="现状人口为8350，规划近期到2010年，镇区人口为8750，规划近期2015到年，镇区人口为9750，规划近期2025到年，镇区人口为10450";
			str_fzfx="旅游用地发展方向为向东发展";
			str_czhfzmb="2015年城镇人口为8430，城镇人口比重为33%<br>2015年城镇人口为10452，城镇人口比重为38%";
			TableAssign.setablevalue(str_ghqmc,str_xmmc,str_bgmc,str_kjbj,str_xzqh,str_rjztmj,str_ghqmj,str_gdqx,str_znjg,str_zqgm,str_fzfx,str_czhfzmb)
			$("#tableInfo").show();
			break;
		case "dayangcunchaiqianqu":
			str_ghqmc="大阳村拆迁区";
			str_xmmc="大阳村拆迁区";
			str_bgmc="大阳村拆迁区控制性工程规划报告书";
			str_kjbj="中心村以均匀布局形式带动基层村发展的空间结构形态";
			str_xzqh="山东省日照市五莲县大阳村";
			str_rjztmj="78.24平方米";
			str_ghqmj="600公顷";
			str_gdqx="2008-2025年";
			str_znjg="中心镇是全镇的政治、经济、文化及交通中心，是以发展第三产业、农副产品精深加工及蔬菜等包装业和物流业为主的综合开发区，中心村是村民行政、文化娱乐中心、初级商贸中心，基层村是村民活动中心";
			str_zqgm="现状人口为8350，规划近期到2010年，镇区人口为8750，规划近期2015到年，镇区人口为9750，规划近期2025到年，镇区人口为10450";
			str_fzfx="旅游用地发展方向为向东发展";
			str_czhfzmb="2015年城镇人口为8430，城镇人口比重为33%<br>2015年城镇人口为10452，城镇人口比重为38%";
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
