$(function () {
	var h = $(".container-fluid-full").height();
	var h1 = $("#content .breadcrumb").height();
	$("#tree").height(h - h1 - 24);

    $.ajax({
        url: "static/page/designcoordination/documentmgmt/doc.json",
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
                		if(treeNode.id==0){
                			return;
                		}
                		$("tbody tr").remove();
                		$("tbody").append(treeNode.doc);
                		todownload();
                		toyulan();
                	}
                }
            };
            zTreeObj = $.fn.zTree.init( $("#tree"), setting, data);
            zTreeObj.expandAll(true);
            var node = zTreeObj.getNodeByParam("id", 1, null);
            zTreeObj.selectNode(node);
            todownload();
            toyulan();
        }
	    
    });
    $(".btnStandard input").each(function () {
        $(this).click(function () {
            $(this).addClass("btnActive").siblings().removeClass("btnActive");
        })
    });
   

});
function todownload(){
	$(".xz").each(function(){
     	$(this).click(function(){
     		console.log(this);
     		var filename = $(this).parents("tr").children().eq(0).text();
     		window.location.href = "download?filename="+filename;
     	})
     });
}
function toyulan(){
	$(".yl").each(function(){
     	$(this).click(function(){
     		console.log(this);
     		var filename = $(this).parents("tr").children().eq(0).text();
     		var rootPath = getRootPath();
     		window.open(rootPath+"/static/page/designcoordination/documentmgmt/wendang/"+filename);
     	})
     });
}
/** 
 * //获取当前项目根路径 
 * @return {TypeName}  
 */  
function getRootPath(){      
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp      
    var curWwwPath=window.document.location.href;      
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp      
    var pathName=window.document.location.pathname;      
    var pos=curWwwPath.indexOf(pathName);      
    //获取主机地址，如： http://localhost:8083      
    var localhostPaht=curWwwPath.substring(0,pos);      
    //获取带"/"的项目名，如：/uimcardprj      
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);      
    return(localhostPaht+projectName);  
}  