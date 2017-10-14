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
                	}
                }
            };
            zTreeObj = $.fn.zTree.init( $("#tree"), setting, data);
            zTreeObj.expandAll(true);
            var node = zTreeObj.getNodeByParam("id", 1, null);
            zTreeObj.selectNode(node);
            todownload();
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