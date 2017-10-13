$(function () {
    var h = $(".container-fluid-full").height();
    var h1 = $("#content .breadcrumb").height();
    $("#tree").height(h - h1 - 27);
    $(".btnStandard input").each(function () {
        $(this).click(function () {
            $(this).addClass("btnActive").siblings().removeClass("btnActive");
        })
    });
    $.ajax({
        url: "static/page/designcoordination/shuziyijiao/shuziyijiao.json",
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
            zTreeObj.expandAll(true);

        }
    })
});