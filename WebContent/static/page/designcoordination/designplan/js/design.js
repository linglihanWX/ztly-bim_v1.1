$(function () {
    var h = $(".container-fluid-full").height();
    var h1 = $("#content .breadcrumb").height();
    $("#tree").height(h - h1 - 27);
    $.ajax({
        url: "static/page/designcoordination/designplan/designplan.json",
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
                
                }
            };
            zTreeObj = $.fn.zTree.init( $("#tree"), setting, data);
            zTreeObj.expandAll(true);
            var node = zTreeObj.getNodeByParam("id", 1, null);
            zTreeObj.selectNode(node);
            
        }
	    
    });
    $("tbody tr td:last-of-type button").each(function () {
        $(this).click(function () {
            console.log($(this).index());
        })
    });
    $(".check").click(function () {
        $(".different").show();
      
        return false;
    });
    $(".gb").click(function () {
        $(".different").hide();
    });
});