//保存树中被其他方法使用的公共数据
var PmTree=PmTree||{};
PmTree.Tools=PmTree.Tools||{};
PmTree.selectedNode=null;
PmTree.checkedNodes=[];
PmTree.copyNodes=[];//复制的节点数组
PmTree.Nodes=[];//同时编辑多个模型时缓存模型节点
//设置各个面板加减号的鼠标点击标识
PmTree.mouseup=false;
PmTree.timer=null;//定时器
let data = [
{
    "id":1,
    "name":"大桥",
    "length":200,
    "start":"2017-01-01",
    "cycle":"5年零6个月",
    "ConstructionUnit":"中铁四局",
    "pos":"广东省珠海市",
    "des":"bridge"
},
{
    "id":2,
    "name":"厦门路桥科研",
    "length":14,
    "start":"2018-05-10",
    "cycle":"3年零8个月",
    "ConstructionUnit":"中建十八局",
    "pos":"福建省厦门",
    "des":"XMBridge"
},
{
    "id":3,
    "name":"吴定高速",
    "length":1000,
    "start":"2018-05-10",
    "cycle":"6年",
    "ConstructionUnit":"中铁八局",
    "pos":"陕西省吴起县",
    "des":"highSpeed"
},
{
    "id":4,
    "name":"设计施工一体化",
    "length":136,
    "start":"2018-05-10",
    "cycle":"4年",
    "ConstructionUnit":"中国水利水电建设集团",
    "pos":"北京市",
    "des":"waterOrElectricity"
}
];

//搜集面板中对应的模型属性
PmTree.Tools.collectPanelAtts=function(containerId){
	var atts={};
	atts.filePath=$("#"+containerId).find("input[name='filePath']").val();
	atts.lon=parseFloat($("#"+containerId).find("input[name='lon']").val());
	atts.lat=parseFloat($("#"+containerId).find("input[name='lat']").val());
	atts.height=parseFloat($("#"+containerId).find("input[name='height']").val());
	atts.course=parseFloat($("#"+containerId).find("input[name='course']").val());
	atts.alpha=parseFloat($("#"+containerId).find("input[name='alpha']").val());
	atts.roll=parseFloat($("#"+containerId).find("input[name='roll']").val());
	atts.scaleX=parseFloat($("#"+containerId).find("input[name='scaleX']").val());
	atts.scaleY=parseFloat($("#"+containerId).find("input[name='scaleY']").val());
	atts.scaleZ=parseFloat($("#"+containerId).find("input[name='scaleZ']").val());
	
	return atts;
}
PmTree.select = function(){
	let selStr = "";
	for(let i = 0; i < data.length; i++){
		selStr += `<option>${data[i].name}</option>`;
	}
	
	$("#header .select").append(selStr);
	
}


//将Tree节点中的attributes.parameter 属性填充到面板中
PmTree.Tools.fillModelAttsToPanel=function(containerId,parameters){
	
	$("#"+containerId).find("input[name='filePath']").val(parameters.filePath);
	$("#"+containerId).find("input[name='lon']").val(parameters.lon);
	$("#"+containerId).find("input[name='lat']").val(parameters.lat);
	$("#"+containerId).find("input[name='height']").val(parameters.height);
	$("#"+containerId).find("input[name='course']").val(parameters.course);
	$("#"+containerId).find("input[name='alpha']").val(parameters.alpha);
	$("#"+containerId).find("input[name='roll']").val(parameters.roll);
	$("#"+containerId).find("input[name='scaleX']").val(parameters.scaleX);
	$("#"+containerId).find("input[name='scaleY']").val(parameters.scaleY);
	$("#"+containerId).find("input[name='scaleZ']").val(parameters.scaleZ);
}

//数据校正
PmTree.Tools.ajust=function(value,attr){
	if(attr=="lon"){
		value=value>180? -180:(value<-180?180:value);
	}else if(attr=="lat"){
		value=value>90? -90:(value<-90?90:value);
	}else if(attr=="height"){
		value=value<0? 0:value;
	}else if(attr=="course"){
		value=value>360?0:(value<0?360:value);
	}else if(attr=="alpha"){
		value=value>90? -90:(value<-90?90:value);
	}else if(attr=="roll"){
		value=value>360?0:(value<0?360:value);
	}else{
		value=value<0?0:value;
	}
	return value;
}

//初始化复制粘贴功能
PmTree.initCopyPast=function(){
	$("#copyCurrentPm").click(function(){
		PmTree.copyNodes=[];
		
		PmTree.copyNodes.push(PmTree.selectedNode);
		var subNodes=$("#pmTree").tree("getChildren",PmTree.selectedNode.target);

		for(var i=0;i<subNodes.length;i++)
			PmTree.copyNodes.push(subNodes[i]);
	});
	
	$("#pastCurrentPm").click(function(){
		var targetId=PmTree.selectedNode.id;
		
		var nodes={};
		for(var i=0;i<PmTree.copyNodes.length;i++){
			var node=PmTree.copyNodes[i];
			nodes[node.id]={fatherNodeId:node.parentId,name:node.text,type:node.type,parameter:node.attributes.parameter,leaf:node.leaf}
		}
		
		FreeDoEarth.pastPmsToDB(targetId,nodes,function(data){
			$("#pmTree").tree("append",{
				parent:PmTree.selectedNode.target,
				data:data
			});
			PmTree.copyNodes=[];
		});
	})
}

PmTree.InitTree=function(treeData){
	//初始化树
	$("#pmTree").tree({
		data:treeData,
		checkbox:true,
		onContextMenu:function(e,node){
			e.preventDefault();//取消默认右键事件
			$("#pmTree").tree("select",node.target);
			
			
			PmTree.checkedNodes=$("#pmTree").tree("getChecked");
			
			if(PmTree.checkedNodes.length==0){
				$("#pmTreeContextMenu .nodeChecked").hide();
			}else{
				$("#pmTreeContextMenu .nodeChecked").show();
			}
			
			if(node.type==2)
				$("#addPm").hide();
			else
				$("#addPm").show();
				
			
			$("#pmTreeContextMenu").menu("show",{left:e.pageX,top:e.pageY})
		},
		onSelect:function(node){
			PmTree.selectedNode=node;

			if(node.type==2)
				FreeDoEarth.flyToModel(node.id);
			else{
				var subNodes=$("#pmTree").tree("getChildren",node.target);
				var nodeIds=[];
				for(var i=0;i<subNodes.length;i++){
					if(subNodes[i].type==2)
						nodeIds.push(subNodes[i].id);
				}
				FreeDoEarth.flyToModels(nodeIds);
			}
		}
	});
}

//双击场景中的模型，定位树对应的节点
PmTree.initModelLeftDoubleClick=function(nodeId){
	if(nodeId==undefined)
		return ;

	var node=$("#pmTree").tree("find",nodeId);
	$("#pmTree").tree("collapseAll");
	$("#pmTree").tree("expandTo",node.target);
	$("#pmTree").tree("scrollTo",node.target);
	$("#pmTree").tree("select",node.target);
}


//单模型修改点击加号减号的处理函数
PmTree.modelContinuePress=function($input,delat){
	
	var oldValue=parseFloat($input.val());
	
	var newValue=oldValue+delat;
	
	$input.val(newValue);
	
	PmTree.editModelInputChange($input);
	
	if(PmTree.mouseup)
		return ;
	
	PmTree.timer=setTimeout(PmTree.modelContinuePress,200,$input,delat);
}

//多模型修改中点击加减号的处理函数
PmTree.modelsContinuePress=function(nodes,attr,delat){
	
	var nodeIds=[];
	for(var i=0;i<nodes.length;i++){
		if(nodes[i].attributes[attr]==undefined)
			nodes[i].attributes[attr]=0;
		
		nodes[i].attributes[attr]+=delat;//将改变的值保存起来供同步数据库使用
		
		nodeIds.push(nodes[i].id)
	}
	
	FreeDoEarth.updatePmModelsAttrByDelat(nodeIds,attr,delat);
	
	if(PmTree.mouseup)
		return ;
	
	PmTree.timer=setTimeout(PmTree.modelsContinuePress,200,nodes,attr,delat);
}

//修改模型面板中输入框的change处理函数
PmTree.editModelInputChange=function($me){

	var selectNode=PmTree.selectedNode;
	
	var newValue=parseFloat($me.val());
	
	var attr=$me.attr("name");
	
	newValue=PmTree.Tools.ajust(newValue,attr);
	
	$me.val(newValue);
	
	FreeDoEarth.updatePmModelAttr(selectNode.id,attr,newValue);
}


//树新增节点
PmTree.InitAddPm=function(){
	
	$("#addPmBranchDialog").dialog({
		title:"新增分支节点",
		width:400,
		height:230,
		modal:true,
		closed:true,
		closable:false,
		border:false,
		headerCls:"dialog-header",
		buttons:[{
			text:"确定",
			handler:function(){
				var $input=$("#pmBranchName");
				var pmName=$input.val();
				
				if(pmName==""){
					$input.focus();
					$input.attr("placeholder","节点名称不可为空!")
					return ;
				}
				
				var node={'name':pmName,'type':1,'leaf':0};
				var parentNode=null;
				
				if($("#pmBranchPosition").val()==1){
					node.parentId=PmTree.selectedNode.parentId;
					parentNode=$("#pmTree").tree("getParent",PmTree.selectedNode.target);
				}
				else{
					node.parentId=PmTree.selectedNode.id;
					parentNode=PmTree.selectedNode;
				}
				
				
				FreeDoEarth.addPm(node,function(nodeId){
					//当给最上级根节点添加平级节点时无法获得其父节点
						$("#pmTree").tree("append",{
							parent:parentNode==null?parentNode:parentNode.target,
							data:[{
								id:nodeId,
								text:pmName,
								type:1,
								leaf:0,
								children:[],
								state:"closed",
								attributes:{parameter:""}
							}]
						});
				});
				
				$("#addPmBranchDialog").dialog("close");
			}
		},{
			text:"取消",
			handler:function(){
				$("#pmBranchName").val("");
				$("#pmBranchName").removeAttr("placeholder");
				$("#addPmBranchDialog").dialog("close");
			}
		}]
		
	});
	
	/*新增模型节点中输入框纠错*/
	$("#addPmModelTable input").change(function(){
		
		var newValue=$(this).val();
		var attr=$(this).attr("name");
		
		newValue=PmTree.Tools.ajust(newValue,attr);
		
		$(this).val(newValue);
	});
	
	/*新增模型节点Dialog初始化*/
	$("#addPmModelDialog").dialog({
		title:"新增模型节点",
		width:600,
		height:540,
		modal:true,
		closed:true,
		closable:false,
		border:false,
		headerCls:"dialog-header",
		buttons:[{
			text:"确定",
			handler:function(){
				
				var okFlag=true;
				
				$("#addPmModelDialog table input").each(function(){
					if($(this).val()==""){
						$(this).attr("placeholder","内容不可为空").focus();
						okFlag=false;
						return false;
					}
				});
				
				if(!okFlag)
					return ;
				
			    var parameter=PmTree.Tools.collectPanelAtts("addPmModelTable");
			    parameter.filePath=$("#addPmModelDialog table select[name='filePath']").val();
			    var node={};
			    var parentNode=null;
			    node.name=$("#addPmModelDialog table input[name='name']").val();
			    node.type=2;
			    node.leaf=1;
			    node.parameter=JSON.stringify(parameter);

			    if($("#addPmModelDialog table select[name='pmModelPosition']").val()==1){
			    	node.parentId=PmTree.selectedNode.parentId;
			    	parentNode=$("#pmTree").tree("getParent",PmTree.selectedNode.target);
				}
				else{
					node.parentId=PmTree.selectedNode.id;
					parentNode=PmTree.selectedNode;
				}
			    
			    FreeDoEarth.addPm(node,function(nodeId){
						$("#pmTree").tree("append",{
							parent:parentNode==null?parentNode:parentNode.target,
							data:[{
								id:nodeId,
								text:node.name,
								type:2,
								leaf:1,
								state:"open",
								attributes:{parameter:node.parameter}
							}]
						});
				});
			    
			    
			    $("#addPmModelDialog table input").val("");
				$("#addPmModelDialog").dialog("close");
			}
		},{
			text:"取消",
			handler:function(){
				$("#addPmModelDialog table input").val("");
				$("#addPmModelDialog").dialog("close");
			}
		}]
	});
	
	$("#addPmBranch").click(function(){
		$("#addPmBranchDialog").dialog("open");
	});
	
	$("#addPmModel").click(function(){
		$("#addPmModelDialog").dialog("open");
	});
}


//删除当前节点
PmTree.InitDeleteCurrentPm=function(){
	$("#deleteCurrentPmDialog").dialog({
		title:"删除当前节点",
		width:400,
		height:160,
		modal:true,
		closed:true,
		closable:false,
		border:false,
		headerCls:"dialog-header",
		buttons:[{
			text:'确定',
			handler:function(){
				var nodeIds=[PmTree.selectedNode.id];

				var subNodes=$("#pmTree").tree("getChildren",PmTree.selectedNode.target);
				
				for(var i=0;i<subNodes.length;i++)
					nodeIds.push(subNodes[i].id);
				
				FreeDoEarth.deleteNodesFromDB(nodeIds);//从数据库和容器内删除
				$("#pmTree").tree("remove",PmTree.selectedNode.target);
				
				$("#deleteCurrentPmDialog").dialog("close");
			}
		},{
			text:'取消',
			handler:function(){
				$("#deleteCurrentPmDialog").dialog("close");
			}
		}]
	});
	
	$("#deleteCurrentPM").click(function(){
		$("#deleteCurrentPmDialog").dialog("open");
	});
	
}

//树编辑当前节点
PmTree.InitEditCurrentPm=function(){
	
	//////////////当前模型节点相关事件初始化 ////////////////////
	
	//初始化编辑当前模型节点的Dialog
	$("#editCurrentPmModelDialog").dialog({
		title:"编辑当前模型节点",
		width:600,
		height:530,
		closed:true,
		closable:false,
		border:false,
		headerCls:"dialog-header",
		onBeforeOpen:function(){
			$("#treeModal").show();
			
			var parameter=JSON.parse(PmTree.selectedNode.attributes.parameter);
			
			$("#editCurrentPmModelDialog input[name='name']").val(PmTree.selectedNode.text);
			
			PmTree.Tools.fillModelAttsToPanel("editCurrentPmModelDialog",parameter);//填充模型位置姿态属性
		},
		onBeforeClose:function(){
			$("#treeModal").hide();
		},
		buttons:[{
			text:'确 定',//点击确定按钮时要用面板值修改树中节点值和数据库
			handler:function(){
				var atts=PmTree.Tools.collectPanelAtts("editCurrentPmModelDialog");
				var name=$("#editCurrentPmModelDialog input[name='name']").val();
				//同步树形结构和数据库
				$("#pmTree").tree("update",{
					target:PmTree.selectedNode.target,
					text:name,
					attributes:{parameter:JSON.stringify(atts)}
				});
				
				FreeDoEarth.updatePmModelToDB(PmTree.selectedNode.id,name,JSON.stringify(atts));
				
				$("#editCurrentPmModelDialog").dialog("close");
			}
		},{
			text:'取 消',
			handler:function(){
				
				var parameter=JSON.parse(PmTree.selectedNode.attributes.parameter);
				
				FreeDoEarth.updatePmModel(PmTree.selectedNode.id,PmTree.selectedNode.text,parameter);
				
				$("#editCurrentPmModelDialog").dialog("close");
			}
		}]
	});
	
	//编辑当前模型节点面板中的输入框change事件初始化
	$("#editCurrentPmModelDialog .model-att").change(function(){
		var $me=$(this);
		PmTree.editModelInputChange($me);
	});
	
	
	$("#editCurrentPmModelDialog .add,#editCurrentPmModelDialog .minus").mousedown(function(){
			
			var $me=$(this);
			var delatStr=$me.parent().parent().find(".delat").val();
			var delat= isNaN(parseFloat(delatStr))? 1 : parseFloat(delatStr);
			
			if($me.hasClass("minus"))
				delat=-delat;
			
			var $target=$me.parent().parent().find(".model-att");
			
			PmTree.mouseup=false;
			
			PmTree.timer=setTimeout(PmTree.modelContinuePress,200,$target,delat);
	});
	
	$("#editCurrentPmModelDialog .add,#editCurrentPmModelDialog .minus").mouseup(function(){
			PmTree.mouseup=true;
	});
	//////////////当前模型节点相关事件初始化  结束 ////////////////////
	
	
    //////////////当前分支节点相关事件初始化 ////////////////////
	$("#editCurrentPmBranchDialog").dialog({
		title:"编辑当前节点",
		width:550,
		height:350,
		closed:true,
		closable:false,
		border:false,
		headerCls:"dialog-header",
		onBeforeOpen:function(){
			$("#treeModal").show();
			/*搜集所选节点中包含的所有模型节点*/
			PmTree.Nodes=[];

			var nodes=$("#pmTree").tree("getChildren",PmTree.selectedNode.target);
			$("#editCurrentPmBranchTable input[name='name']").val(PmTree.selectedNode.text);
			
			for(var i=0;i<nodes.length;i++){
				if(nodes[i].type==2)
					PmTree.Nodes.push(nodes[i]);
			}
			
		},
		onBeforeClose:function(){
			$("#treeModal").hide();
		},
		buttons:[{
			text:"确定",
			handler:function(){
				var nodes=[];
				for(var i=0;i<PmTree.Nodes.length;i++){
					var node=PmTree.Nodes[i];
					var parameter=JSON.parse(node.attributes.parameter);
					if(node.attributes.lon !=undefined){
						parameter.lon+=node.attributes.lon;
						parameter.lon=PmTree.Tools.ajust(parameter.lon,"lon");
						delete node.attributes.lon
					}
					
					if(node.attributes.lat !=undefined){
						parameter.lat+=node.attributes.lat;
						parameter.lat=PmTree.Tools.ajust(parameter.lat,"lat");
						delete node.attributes.lat;
					}
					
					if(node.attributes.height !=undefined){
						parameter.height+=node.attributes.height;
						parameter.height=PmTree.Tools.ajust(parameter.height,"height");
						delete node.attributes.height;
					}
					
					if(node.attributes.heading!=undefined){
						parameter.heading+=node.attributes.heading;
						parameter.heading=PmTree.Tools.ajust(parameter.heading,"heading");
						delete node.attributes.height;
					}
					node.attributes.parameter=JSON.stringify(parameter);
					
					nodes.push({'nodeId':node.id,'parameter':JSON.stringify(parameter)});
				}
				
				FreeDoEarth.updatePmModelsToDB(nodes);
				var name=$("#editCurrentPmBranchTable input[name='name']").val();
				FreeDoEarth.updatePmModelToDB(PmTree.selectedNode.id,name,null);//名字更新数据库
				
				$("#pmTree").tree('update',{//名字更新树
					target:PmTree.selectedNode.target,
					text:name
				})
				$("#editCurrentPmBranchDialog").dialog("close");
			}
		},{
			text:"取消",
			handler:function(){
				
				for(var i=0;i<PmTree.Nodes.length;i++){
					var node=PmTree.Nodes[i];
					var parameter=JSON.parse(node.attributes.parameter);
					FreeDoEarth.updatePmModel(node.id,node.text,parameter);
					
					delete node.attributes.lon;
					delete node.attributes.lat;
					delete node.attributes.height;
					delete node.attributes.heading;
				}
				
				$("#editCurrentPmBranchDialog").dialog("close");
			}
		}]
	});
	
	

	$("#editCurrentPmBranchDialog .add,#editCurrentPmBranchDialog .minus").mousedown(function() {

			var $me = $(this);
			var delatStr = $me.parent().parent().find(".delat").val();
			var delat = isNaN(parseFloat(delatStr)) ? 1: parseFloat(delatStr);

			if ($me.hasClass("minus"))
				delat = -delat;

			var attr = $me.parent().parent().find(".delat").attr("name");

			PmTree.mouseup = false;

			PmTree.timer=setTimeout(PmTree.modelsContinuePress,200,PmTree.Nodes,attr,delat);
	});

	$("#editCurrentPmBranchDialog .add,#editCurrentPmBranchDialog .minus").mouseup(function() {
			PmTree.mouseup = true;
	});
	
	//////////////当前分支节点相关事件初始化  结束////////////////
	
	//右键树面板编辑当前节点
	$("#editCurrentPm").click(function(){
		if(PmTree.selectedNode.leaf==1)
			$("#editCurrentPmModelDialog").dialog("open");
		else
			$("#editCurrentPmBranchDialog").dialog("open");
	});
}

PmTree.InitDeleteCheckPms=function(){
	$("#deleteCheckedPmsDialog").dialog({
		title:"删除当前勾选节点",
		width:400,
		height:160,
		modal:true,
		closed:true,
		closable:false,
		border:false,
		headerCls:"dialog-header",
		buttons:[{
			text:'确定',
			handler:function(){
				var checkedNodes=PmTree.checkedNodes;
				var nodeIds=[];
				
				for(var i=0;i<checkedNodes.length;i++){
					$("#pmTree").tree("remove",checkedNodes[i].target);
					nodeIds.push(checkedNodes[i].id);
				}
				
				FreeDoEarth.deleteNodesFromDB(nodeIds);
				
				$("#deleteCheckedPmsDialog").dialog("close");
			}
		},{
			text:'取消',
			handler:function(){
				$("#deleteCheckedPmsDialog").dialog("close");
			}
		}]
	});
	
	$("#deleteCheckedPm").click(function(){
		$("#deleteCheckedPmsDialog").dialog("open");
	});
	
}

//编辑当前勾选节点
PmTree.InitEditCheckedPms=function(){
	
//////////////当前勾选节点相关事件初始化 ////////////////////
	$("#editCheckedPmDialog").dialog({
		title:"编辑已勾选节点",
		width:550,
		height:350,
		closed:true,
		closable:false,
		border:false,
		headerCls:"dialog-header",
		onBeforeOpen:function(){
			$("#treeModal").show();
			
			/*搜集所选节点中包含的所有模型节点*/
			PmTree.Nodes=[];
			var node=null;

			var nodes=PmTree.checkedNodes;
			
			var subNodes=[]; 
			
			for(var i=0;i<nodes.length;i++){
				if(nodes[i].type==2)
					PmTree.Nodes.push(nodes[i]);
			}
			
			
		},
		onBeforeClose:function(){
			$("#treeModal").hide();
		},
		buttons:[{
			text:"确定",
			handler:function(){
				var nodes=[];
				for(var i=0;i<PmTree.Nodes.length;i++){
					var node=PmTree.Nodes[i];
					var parameter=JSON.parse(node.attributes.parameter);
					if(node.attributes.lon !=undefined){
						parameter.lon+=node.attributes.lon;
						parameter.lon=PmTree.Tools.ajust(parameter.lon,"lon");
						delete node.attributes.lon
					}
					
					if(node.attributes.lat !=undefined){
						parameter.lat+=node.attributes.lat;
						parameter.lat=PmTree.Tools.ajust(parameter.lat,"lat");
						delete node.attributes.lat;
					}
					
					if(node.attributes.height !=undefined){
						parameter.height+=node.attributes.height;
						parameter.height=PmTree.Tools.ajust(parameter.height,"height");
						delete node.attributes.height;
					}
					
					if(node.attributes.heading!=undefined){
						parameter.heading+=node.attributes.heading;
						parameter.heading=PmTree.Tools.ajust(parameter.heading,"heading");
						delete node.attributes.height;
					}
					node.attributes.parameter=JSON.stringify(parameter);
					
					nodes.push({'nodeId':node.id,'parameter':JSON.stringify(parameter)});
				}
				
				FreeDoEarth.updatePmModelsToDB(nodes);
				
				$("#editCheckedPmDialog").dialog("close");
			}
		},{
			text:"取消",
			handler:function(){
				
				for(var i=0;i<PmTree.Nodes.length;i++){
					var node=PmTree.Nodes[i];
					var parameter=JSON.parse(node.attributes.parameter);
					FreeDoEarth.updatePmModel(node.id,node.text,parameter);
					
					delete node.attributes.lon;
					delete node.attributes.lat;
					delete node.attributes.height;
					delete node.attributes.heading;
				}
				
				$("#editCheckedPmDialog").dialog("close");
			}
		}]
	});
	
	

	$("#editCheckedPmDialog .add,#editCheckedPmDialog .minus").mousedown(function() {

			var $me = $(this);
			var delatStr = $me.parent().parent().find(".delat").val();
			var delat = isNaN(parseFloat(delatStr)) ? 1: parseFloat(delatStr);

			if ($me.hasClass("minus"))
				delat = -delat;

			var attr = $me.parent().parent().find(".delat").attr("name");

			PmTree.mouseup = false;

			PmTree.timer=setTimeout(PmTree.modelsContinuePress,200,PmTree.Nodes,attr,delat);
	});

	$("#editCheckedPmDialog .add,#editCheckedPmDialog .minus").mouseup(function() {
			PmTree.mouseup = true;
	});
	
	$("#editCheckedPm").click(function(){
		$("#editCheckedPmDialog").dialog("open");
	})
	
	
}




//页面功能初始化
$(function(){

	//取消页面鼠标右键
	$("body").bind("contextmenu",function(event){
		event.preventDefault();
	});
	PmTree.select();
	
	FreeDoEarth.init("earth");
	
	var treeData=null;
	
	//传入回调函数获得树的初始化数据
	FreeDoEarth.initModels(PmTree.InitTree);
	
	FreeDoEarth.initLeftDoubleClick(PmTree.initModelLeftDoubleClick);
	
	
	//初始化复制粘贴
	PmTree.initCopyPast();
	
	//添加节点功能初始化
	PmTree.InitAddPm();
	
	//初始化右键删除当前节点
	PmTree.InitDeleteCurrentPm();
	
	//初始化右键菜单编辑当前节点
	PmTree.InitEditCurrentPm();
	
	//初始化右键删除勾选节点
	PmTree.InitDeleteCheckPms();
	
	//初始化右键编辑勾选节点
	PmTree.InitEditCheckedPms();
	
});