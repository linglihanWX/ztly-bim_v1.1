var modelTile1=null;
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
				var desmyviewer = $('#desiframe')[0].contentWindow.myviewer;
				console.log(desmyviewer.camera);
				switch (treeNode.id) {
				case 5:
					setAllCameraPosition(defData[0].pos);
					break;
				case 6:
					setAllCameraPosition(defData[1].pos);
					break;
				case 7:
					setAllCameraPosition(defData[2].pos);
					break;
				case 8:
					setAllCameraPosition(defData[3].pos);
					break;

				default:
					break;
				}
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
    		 desmyviewer.camera.percentageChanged = 0.1;
    		 desmyviewer.camera.changed.addEventListener(cameraSynchronization);
    	 }else{
    		 desmyviewer.camera.changed.removeEventListener(cameraSynchronization);
    	 }
    });
    $("#moreInfo").change(function() { 
    	if( $("#moreInfo").attr('checked')){
    		$("#moreInfoBox").show();
    	}else{
    		$("#moreInfoBox").hide();
    	}
    });
    //regright();
    
});
var defData=[
	{
		id:1,
		name:"楼梯处墙体过高，调整",
		pos:{
			x: -2302778.9697042024, y: 4394548.327739059, z: 3994813.6524498384, heading:1.6810480696177983,pitch:-0.9472141917329568,roll:0.0055858702809636895
		},
		component:"e24e51cc-afe3-11e7-46c2-5ebc1b3c3ce2"
	},
	{
		id:2,
		name:"水泥支撑住移除",
		pos:{
			x: -2302775.7721243445, y: 4394552.320333514, z: 3994820.0994958784, heading:4.64827081428643,pitch:-0.5514583211841315,roll:6.279339164038969
		},
		component:"e1de51d2-afe3-11e7-46c2-5ebc1b3c3ce2"
	},
	{
		id:3,
		name:"机电增加电梯",
		pos:{
			x: -2302765.22570091, y: 4394545.728320865, z: 3994808.845950465, heading:4.968589455048395,pitch:0.022413744738810415,roll:6.280008292302906
		},
		component:"e15d8922-afe3-11e7-46c2-5ebc1b3c3ce2"
	},
	{
		id:4,
		name:"增加安检设备",
		pos:{
			x: -2302793.6809900943, y: 4394534.520051501, z: 3994817.622096816, heading:4.379540790189353,pitch:-0.2809717851993965,roll:6.27995641217977
		},
		component:"e1d4b4e0-afe3-11e7-46c2-5ebc1b3c3ce2"
	}
];
regright = function (callback) {
	var desmyviewer = $('#desiframe')[0].contentWindow.myviewer;
	var selectComponentEventType = FreeDo.ScreenSpaceEventType.RIGHT_CLICK;
	//var selectComponentEventType = FreeDo.ScreenSpaceEventType.LEFT_DOUBLE_CLICK;
	var screenSpaceEventHandler = new FreeDo.ScreenSpaceEventHandler(desmyviewer.canvas);
	screenSpaceEventHandler.setInputAction(function (movement) {
		var picked = desmyviewer.scene.pick(movement.position);
		if (FreeDo.defined(picked) && picked instanceof FreeDo.FreeDoPModelFeature) {
			var id = picked.getProperty('component');
			var redStyle = new FreeDo.FreeDoPModelStyle({color: {conditions: [["${component} === \'" + id + "\'", "color('red')"],["true", "color('white')"]]}});
			modelTile1.style=redStyle;
		}
	}, selectComponentEventType);
}
setAllCameraPosition = function(pos) {
	var desmyviewer = $('#desiframe')[0].contentWindow.myviewer;
	var nowmyviewer = $('#nowiframe')[0].contentWindow.myviewer;
	var compremyviewer = $('#compreiframe')[0].contentWindow.myviewer;
	desmyviewer.camera.setView({
	    destination : new FreeDo.Cartesian3(pos.x,pos.y,pos.z),
	    orientation: {
	        heading : pos.heading, // east, default value is 0.0 (north)
	        pitch : pos.pitch,    // default value (looking down)
	        roll : pos.roll                            // default value
	    }
	});
	nowmyviewer.camera.setView({
	    destination : new FreeDo.Cartesian3(pos.x,pos.y,pos.z),
	    orientation: {
	    	 heading : pos.heading, // east, default value is 0.0 (north)
	    	 pitch : pos.pitch,    // default value (looking down)
	    	 roll : pos.roll                            // default value
	    }
	});
	compremyviewer.camera.setView({
		destination : new FreeDo.Cartesian3(pos.x,pos.y,pos.z),
	    orientation: {
	    	 heading : pos.heading, // east, default value is 0.0 (north)
	    	 pitch : pos.pitch,    // default value (looking down)
	    	 roll : pos.roll                            // default value
	    }
	});
}
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