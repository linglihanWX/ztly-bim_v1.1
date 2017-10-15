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
   
    
$(".check").eq(0).click(function () {
        $(".different").eq(2).show();
        return false;
});
$(".check").eq(1).click(function () {
    $(".different").eq(1).show();
    return false;
});
$(".check").eq(2).click(function () {
    $(".different").eq(0).show();
    return false;
});
$(".check").eq(3).click(function () {
	$(".different").eq(2).show();
	return false;
});

$(".gb").eq(0).click(function () {
        $(".different").eq(0).hide();
    });
$(".gb").eq(1).click(function () {
    $(".different").eq(1).hide();
});
$(".gb").eq(2).click(function () {
    $(".different").eq(2).hide();
});
$(".gb").eq(3).click(function () {
	$(".different").eq(2).hide();
});

});