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
                	}
                }
            };
            zTreeObj = $.fn.zTree.init( $("#tree"), setting, data);
            zTreeObj.expandAll(true);
            var node = zTreeObj.getNodeByParam("id", 1, null);
            zTreeObj.selectNode(node);
            
        }
	    
    });


});