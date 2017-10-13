$(function () {
    var h = $(".container-fluid-full").height();
    var h1 = $("#content .breadcrumb").height();
    $("#tree").height(h - h1 - 27);
    $("tbody tr td:last-of-type button").each(function () {
        $(this).click(function () {
            console.log($(this).index());
        })
    });
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
    });
});