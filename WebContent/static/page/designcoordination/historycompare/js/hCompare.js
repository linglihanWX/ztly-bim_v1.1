$(function () {
    var h = $(".container-fluid-full").height();
    var h1 = $("#content .breadcrumb").height();
    $("#tree").height(h - h1 - 27);
    $("#content .row-fluid").height(h - h1 - 20);
    $(".btnStandard input").each(function () {
        $(this).click(function () {
            $(this).addClass("btnActive").siblings().removeClass("btnActive");
        })
    });
    $.ajax({
        url: "static/page/designcoordination/historycompare/hdata.json",
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
    $("#shijiaotongbu").change(function() { 
    	var desmyviewer = $('#desiframe')[0].contentWindow.myviewer;
    	 if( $("#shijiaotongbu").attr('checked')){
    		 desmyviewer.camera.changed.addEventListener(cameraSynchronization);
    	 }else{
    		 desmyviewer.camera.changed.removeEventListener(cameraSynchronization);
    	 }
    });
    
});
cameraSynchronization = function() {
	var desmyviewer = $('#desiframe')[0].contentWindow.myviewer;
	var nowmyviewer = $('#nowiframe')[0].contentWindow.myviewer;
	var compremyviewer = $('#compreiframe')[0].contentWindow.myviewer;
	nowmyviewer.camera.setView({
		    destination : new FreeDo.Cartesian3(desmyviewer.camera.position.x,desmyviewer.camera.position.y,desmyviewer.camera.position.z),
		    orientation: {
		        heading : desmyviewer.camera.heading, // east, default value is 0.0 (north)
		        pitch : desmyviewer.camera.pitch,    // default value (looking down)
		        roll : desmyviewer.camera.roll                            // default value
		    }
		});
	compremyviewer.camera.setView({
	    destination : new FreeDo.Cartesian3(desmyviewer.camera.position.x,desmyviewer.camera.position.y,desmyviewer.camera.position.z),
	    orientation: {
	        heading : desmyviewer.camera.heading, // east, default value is 0.0 (north)
	        pitch : desmyviewer.camera.pitch,    // default value (looking down)
	        roll : desmyviewer.camera.roll                            // default value
	    }
	});
}