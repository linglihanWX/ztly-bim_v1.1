$(function () {
    var h = $("body").height();
    var h1 = $(".navbar").height();
    $(".container-fluid-full").height(h - h1);
    
    $.ajax({
        url: "static/page/designcoordination/designplan/designplan.json",
        type: "get",
        dataType:"json",
        success: function (data) {
            var zTreeObj;
			function treeNodeClick(event, treeId, treeNode) {
				$(".box-content tbody").html(treeNode.doc);
			};
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
					onClick:treeNodeClick
				}
            };
            zTreeObj = $.fn.zTree.init($("#tree"), setting, data);
        }
    })
});