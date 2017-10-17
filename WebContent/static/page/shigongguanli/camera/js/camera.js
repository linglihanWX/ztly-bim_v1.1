$(function () {
    var h = $("#content").height();
    var h2 = $(".breadcrumb").height();
    $("#content .row-fluid").height(h - h2);

    var h1 = $("#dailog").height();
    $(".dialogContent").height(h1-284);

    $.ajax({
        url: "static/page/shigongguanli/camera/camera.json",
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
                callback : {
                	onClick:function(event, treeId, treeNode){
                		var key =treeNode.id
                		switch (key) {
						case 1:
							globalviewer.zoomTo(camera[0]);
							break;
						case 2:
							globalviewer.zoomTo(camera[1]);
							break;
						case 3:
							globalviewer.zoomTo(camera[2]);
							break;
						case 5:
							globalviewer.zoomTo(camera[3]);
							break;
						case 6:
							globalviewer.zoomTo(camera[4]);
							break;

						default:
							break;
						}
							
                },
                
               OnRightClick:function OnRightClick(event, treeId, treeNode) {
                $("#rMenu").show().css({
                    "left" :event.pageX,
                    "top":event.pageY
                });
            }
            }
            }
            zTreeObj = $.fn.zTree.init( $("#tree"), setting, data);
        }
    });

    CameraViewer.init("init"); // 加载球模型
    CameraViewer.initLeftClick(globalviewer);
});