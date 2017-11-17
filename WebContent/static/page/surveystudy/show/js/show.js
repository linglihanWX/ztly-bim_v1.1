var flag = false;
$(function () {
	var h = $(".container-fluid-full").height();
	var h1 = $("#content .breadcrumb").height();
	$("#tree").height(h - h1 - 24);
	 ShowViewer.init("earth"); // 加载球模型
	 ShowViewer.initLeftClick(globalviewer,showlabel);
	 globalviewer.camera.setView( 
				{
					destination : new FreeDo.Cartesian3(-2183570.5850746077,4471852.254049122,3990050.5935917823),
				    orientation : {
				        heading : 6.283061736872095,
				        pitch : -0.7852936750535262,
				        roll : 0.00010838690093617487
				    }
				});
	 var surveymanager = new SurveyManager(globalviewer,function(){});
    var h = $(".container-fluid-full").height();
    var h1 = $("#content .breadcrumb").height();
    $("#tree").height(h - h1 - 24);
	$.ajax({
		url: "static/page/surveystudy/show/show.json",
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
			check:{
				enable: true,
				chkStyle: "checkbox",
				chkboxType: { "Y": "p", "N": "s" }
			},
			callback:{
				onCheck:function(event, treeId, treeNode){
					$(".msgInfo").hide();
					 checkflag =treeNode.checked;
					switch (treeNode.id) {
					case 7:
						globalviewer.zoomTo(water[0]);
						 if(checkflag){
				    		 water[0].show=true;
				    	 }else{
				    		 water[0].show=false;
				    	 }
						break;
					case 8:
						globalviewer.zoomTo(water[1]);
						 if(checkflag){
				    		 water[1].show=true;
				    	 }else{
				    		 water[1].show=false;
				    	 }
						break;
					case 10:
						globalviewer.zoomTo(environment[0]);
						 if(checkflag){
				    		 environment[0].show=true;
				    	 }else{
				    		 environment[0].show=false;
				    	 }
						break;
					case 11:
						globalviewer.zoomTo(environment[1]);
						 if(checkflag){
				    		 environment[1].show=true;
				    	 }else{
				    		 environment[1].show=false;
				    	 }
						break;
					case 12:
						globalviewer.zoomTo(environment[2]);
						 if(checkflag){
				    		 environment[2].show=true;
				    	 }else{
				    		 environment[2].show=false;
				    	 }
						break;
					case 13:
						globalviewer.zoomTo(environment[3]);
						 if(checkflag){
				    		 environment[3].show=true;
				    	 }else{
				    		 environment[3].show=false;
				    	 }
						break;
					case 14:
						globalviewer.zoomTo(environment[4]);
						 if(checkflag){
				    		 environment[4].show=true;
				    	 }else{
				    		 environment[4].show=false;
				    	 }
						break;

					default:
						break;
					}
				},
				onClick:function(event, treeId, treeNode){
					$(".msgInfo").hide();
					$("#tableInfo").hide();
					switch (treeNode.id) {
					case 3:
						ShowViewer.fly(globalviewer,115.999,39.001,70,function(){});
						break;
					case 4:
						ShowViewer.fly(globalviewer,116.001,39,70,function(){});
						break;
					case 5:
						ShowViewer.fly(globalviewer,116.002,39.002,70,function(){});
						break;
					case 7:
						globalviewer.zoomTo(water[0]);
						break;
					case 8:
						globalviewer.zoomTo(water[1]);
						break;
					case 10:
						globalviewer.zoomTo(environment[0]);
						break;
					case 11:
						globalviewer.zoomTo(environment[1]);
						break;
					case 12:
						globalviewer.zoomTo(environment[2]);
						break;
					case 13:
						globalviewer.zoomTo(environment[3]);
						break;
					case 14:
						globalviewer.zoomTo(environment[4]);
						break;
						
					default:
						break;
					}
				}
			}
			};
			zTreeObj = $.fn.zTree.init($("#tree"), setting, data);
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
			ShowViewer.removeListener();
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
			ShowViewer.initLeftClick(globalviewer,showlabel);
		}
		});
	});
	//窗口拖动
	 tool.drag("#tableInfo");
	    $("#tableInfo p span:last-of-type").click(function () {
	        $("#tableInfo").hide();
	    });
   
});
var cartesian= null;
var str_ghqmc,str_xmmc,str_bgmc,str_kjbj,str_xzqh,str_rjztmj,str_ghqmj,str_gdqx,str_znjg,str_zqgm,str_fzfx,str_czhfzmb =null;
function showlabel(data,data2){
	
	if(data!=null){
		if(flag==true){
			removeFollowListener();
		}
			let	name = data2.id.name;
			if(data2.id=="钻井柱1_0"){
				$(".msgInfo").html("名称：粉质粘土<br>深度：180米<br>厚度：20米<br>标高：11米");
				$(".msgInfo").show();
				cartesian = transform1([115.999,39.001,15]);
			}else if(data2.id=="钻井柱1_1"){
				$(".msgInfo").html("名称：泥岩<br>深度：-95米<br>厚度：5米<br>标高：9米");
				$(".msgInfo").show();
				cartesian = transform1([115.999,39.001,27.5]);
			}else if(data2.id=="钻井柱1_2"){
				$(".msgInfo").html("名称：沙岩<br>深度：-87米<br>厚度：13米<br>标高：15米");
				$(".msgInfo").show();
				cartesian = transform1([115.999,39.001,36.5]);
			}else if(data2.id=="钻井柱1_3"){
				$(".msgInfo").html("名称：素填土<br>深度：-90米<br>厚度：10米<br>标高：10米");
				$(".msgInfo").show();
				cartesian = transform1([115.999,39.001,48]);
			}else if(data2.id=="钻井柱1_4"){
				$(".msgInfo").html("名称：强风华带<br>深度：198米<br>厚度：2米<br>标高：8米");
				$(".msgInfo").show();
				cartesian = transform1([115.999,39.001,54]);
			}else if(data2.id=="钻井柱2_0"){
				$(".msgInfo").html("名称：粉质粘土<br>深度：-98米<br>厚度：2米<br>标高：11米");
				$(".msgInfo").show();
				cartesian = transform1([116.001,39,6]);
			}else if(data2.id=="钻井柱2_1"){
				$(".msgInfo").html("名称：泥岩<br>深度：-95米<br>厚度：5米<br>标高：9米");
				$(".msgInfo").show();
				cartesian = transform1([116.001,39,10.5]);
			}else if(data2.id=="钻井柱2_2"){
				$(".msgInfo").html("名称：沙岩<br>深度：-97米<br>厚度：3米<br>标高：15米");
				$(".msgInfo").show();
				cartesian = transform1([116.001,39,11.5]);
			}else if(data2.id=="钻井柱2_3"){
				$(".msgInfo").html("名称：素填土<br>深度：-90米<br>厚度：10米<br>标高：10米");
				$(".msgInfo").show();
				cartesian = transform1([116.001,39,20]);
			}else if(data2.id=="钻井柱2_4"){
				$(".msgInfo").html("名称：强风华带<br>深度：-98米<br>厚度：2米<br>标高：8米");
				$(".msgInfo").show();
				cartesian = transform1([116.001,39,26]);
			}else if(data2.id=="钻井柱3_0"){
				$(".msgInfo").html("名称：粉质粘土<br>深度：28米<br>厚度：20米<br>标高：11米");
				$(".msgInfo").show();
				cartesian = transform1([116.002,39.002,15]);
			}else if(data2.id=="钻井柱3_1"){
				$(".msgInfo").html("名称：泥岩<br>深度：13米<br>厚度：5米<br>标高：9米");
				$(".msgInfo").show();
				cartesian = transform1([116.002,39.002,27.5]);
			}else if(data2.id=="钻井柱3_2"){
				$(".msgInfo").html("名称：沙岩<br>深度：21米<br>厚度：13米<br>标高：15米");
				$(".msgInfo").show();
				cartesian = transform1([116.002,39.002,36.5]);
			}else if(data2.id=="钻井柱3_3"){
				$(".msgInfo").html("名称：素填土<br>深度：18米<br>厚度：10米<br>标高：10米");
				$(".msgInfo").show();
				cartesian = transform1([116.002,39.002,48]);
			}else if(data2.id=="钻井柱3_4"){
				$(".msgInfo").html("名称：强风华带<br>深度：28米<br>厚度：20米<br>标高：8米");
				$(".msgInfo").show();
				cartesian = transform1([116.002,39.002,63]);
			}else if(name=="baiyangdianshuiwenbaohu"){
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
			}else if(name=="daqingheshuiwenbaohu"){
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
			}else if(name=="gaoxiaowangcunchaiquanqu"){
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
			}else if(name=="zhangweizhuangtoucunchaiqianqu1"){
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
			}else if(name=="zhangweizhuangtoucunchaiqianqu2"){
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
			}else if(name=="xiaoyangcunchaiqianqu"){
				str_ghqmc="小阳村拆迁区";
				str_xmmc="小阳村拆迁区";
				str_bgmc="小阳村拆迁区控制性工程规划报告书";
				str_kjbj="中心村以均匀布局形式带动基层村发展的空间结构形态";
				str_xzqh=" 郑州市新密市小阳村";
				str_rjztmj="98.24平方米";
				str_ghqmj="853公顷";
				str_gdqx="2008-2025年";
				str_znjg="中心镇是全镇的政治、经济、文化及交通中心，是以发展第三产业、农副产品精深加工及蔬菜等包装业和物流业为主的综合开发区，中心村是村民行政、文化娱乐中心、初级商贸中心，基层村是村民活动中心";
				str_zqgm="现状人口为8350，规划近期到2010年，镇区人口为8750，规划近期2015到年，镇区人口为9750，规划近期2025到年，镇区人口为10450";
				str_fzfx="旅游用地发展方向为向东发展";
				str_czhfzmb="2015年城镇人口为8430，城镇人口比重为33%<br>2015年城镇人口为10452，城镇人口比重为38%";
				TableAssign.setablevalue(str_ghqmc,str_xmmc,str_bgmc,str_kjbj,str_xzqh,str_rjztmj,str_ghqmj,str_gdqx,str_znjg,str_zqgm,str_fzfx,str_czhfzmb)
				$("#tableInfo").show();
			}else if(name=="dayangcunchaiqianqu"){
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
			}else if(name=="钻井柱1"){
				cartesian = transform(data);
				$(".msgInfo").html("钻孔编号：钻井柱1<br>日期：2017-9-22<br>钻孔深度：-100<br>孔口高程：113")
				$(".msgInfo").show();
			}else if(name=="钻井柱2"){
				cartesian = transform(data);
				$(".msgInfo").html("钻孔编号：钻井柱2<br>日期：2017-9-23<br>钻孔深度：-100<br>孔口高程：103")
				$(".msgInfo").show();
			}else{
				cartesian = transform(data);
				$(".msgInfo").html("钻孔编号：钻井柱3<br>日期：2017-9-24<br>钻孔深度：8<br>孔口高程：113")
				$(".msgInfo").show();
			}
			addFollowListener();
			
	}else{
		
		removeFollowLisener();
		$(".msgInfo").hide();
		$("#tableInfo").hide();
		return;
	}
    
     
}
var htmlOverlay = document.getElementById('showmsg');
var addFollowListener=function(){
	flag = globalviewer.scene.preRender.addEventListener(setScreenPostion);
}
var removeFollowLisener= function(){
	if(flag==true){
	globalviewer.scene.preRender.removeEventListener(setScreenPostion);
	}
	flag = false;
}
var setScreenPostion=function (){	
	var canvasPosition = globalviewer.scene.cartesianToCanvasCoordinates(cartesian);
	    if (FreeDo.defined(canvasPosition)) {
	        htmlOverlay.style.top = canvasPosition.y -150+ 'px';
	        htmlOverlay.style.left = canvasPosition.x +220+ 'px';
	    }
}
var transform = function(data){
	var pick= new FreeDo.Cartesian2(data.x,data.y);
	var cartesian = globalviewer.scene.globe.pick(globalviewer.camera.getPickRay(pick), globalviewer.scene);
	return cartesian;
}
var transform1 = function(lonlathei){
	return  FreeDo.Cartesian3.fromDegrees(lonlathei[0],lonlathei[1],lonlathei[2]);	
}