var script={};
$(function () {
	var h = $(".container-fluid-full").height();
	var h1 = $("#content .breadcrumb").height();
	$("#tree").height(h - h1 - 24);
    var h2 = $("#content").height();
    var h3 = $(".breadcrumb").height();
    $("#content .row-fluid").height(h2 - h3);
    $(".dialogContent").height(h2-250);

	var treeObj = {};
    $.ajax({
        url: "getTangguData",
        type: "get",
        dataType:"json",
        success: function (data) {
            var zTreeObj;
            var setting = {
            	check:{
            			enable:true,
            		},
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "uId",
                        pIdKey: "pId",
                        rootPId: "-1"
                    }
                },
                callback:{
                	onCheck:function(event, treeId, treeNode){
                		var uid = treeNode.uId;
                		switch (uid) {
						case "e0b429b2-afe3-11e7-46c2-5ebc1b3c3ce2":
							if(treeNode.checked){
								imageEntity1.show = true;
							}else{
								imageEntity1.show = false;
							}
							break;
						case "e13e8f61-afe3-11e7-46c2-5ebc1b3c3ce2":
							if(treeNode.checked){
								imageEntity2.show = true;
							}else{
								imageEntity2.show = false;
							}
							break;
						case "e13e8f64-afe3-11e7-46c2-5ebc1b3c3ce2":
							if(treeNode.checked){
								imageEntity3.show = true;
							}else{
								imageEntity3.show = false;
							}
							break;
						case "e0b429b1-afe3-11e7-46c2-5ebc1b3c3ce2":
							if(treeNode.checked){
								imageEntity1.show = true;
							}else{
								imageEntity1.show = false;
							}
							break;
						case "e13e8f60-afe3-11e7-46c2-5ebc1b3c3ce2":
							if(treeNode.checked){
								imageEntity2.show = true;
							}else{
								imageEntity2.show = false;
							}
							break;
						case "e13e8f63-afe3-11e7-46c2-5ebc1b3c3ce2":
							if(treeNode.checked){
								imageEntity3.show = true;
							}else{
								imageEntity3.show = false;
							}
							break;
						case "e0b429b0-afe3-11e7-46c2-5ebc1b3c3ce2":
							if(treeNode.checked){
								imageEntity1.show = true;
								imageEntity2.show = true;
								imageEntity3.show = true;
							}else{
								imageEntity1.show = false;
								imageEntity2.show = false;
								imageEntity3.show = false;
							}
							break;

						default:
							break;
						}
                		var nodes = treeObj.getCheckedNodes(false);
                		var models =[];
                		for(i in nodes){
                			var uid = ["${component} === \'" + nodes[i].uId + "\'", 'false'];
                			models.push(uid);
                		}
                		models.push(['true', 'true']);
                		MainBuildingViewer.showHideModelsById(models);
                	},
                onRightClick:function(event, treeId, treeNode){
                	console.log(treeNode);
                	if(treeNode!=null){
                	$("#rMenu").css({
                        "display":"block",
                        "position":"absolute",
                        "left":event.pageX+"px",
                        "top":event.pageY+"px"
                    });
                	}
                }
                }
            };
            zTreeObj = $.fn.zTree.init( $("#tree"), setting, data);
            treeObj = $.fn.zTree.getZTreeObj("tree");
            treeObj.checkAllNodes(true);
        }
    })
 
	MainBuildingViewer.init("earth");
	MainBuildingViewer.initLeftClick(myviewer);
	MainBuildingViewer.initRightClick(myviewer);
	//挖坑
	var userdata2 =[
		[				
			{lon:117.65370327140586,lat: 39.029343874668385,height:0},
			{lon:117.6566555867564,lat: 39.02867680988919,height:0},
			{lon:117.65629167680271,lat: 39.027734051441556,height:0},
			{lon:117.65337309822137,lat: 39.028390137191195,height:0}
		],

		[
			{lon:117.65370327140586,lat: 39.029343874668385,height:-15},
			{lon:117.6566555867564,lat: 39.02867680988919,height:-13},
			{lon:117.65629167680271,lat: 39.027734051441556,height:-20},
			{lon:117.65337309822137,lat: 39.028390137191195,height:-15}
		],

		[
			{lon:117.65370327140586,lat: 39.029343874668385,height:-27},
			{lon:117.6566555867564,lat: 39.02867680988919,height:-33},
			{lon:117.65629167680271,lat: 39.027734051441556,height:-26},
			{lon:117.65337309822137,lat: 39.028390137191195,height:-22}
		],
		[
			{lon:117.65370327140586,lat: 39.029343874668385,height:-50},
			{lon:117.6566555867564,lat: 39.02867680988919,height:-50},
			{lon:117.65629167680271,lat: 39.027734051441556,height:-50},
			{lon:117.65337309822137,lat: 39.028390137191195,height:-50}
		]
]
	var imgarray = [
		"static/page/shigongguanli/dungou/img/Land001.jpg",
		"static/page/shigongguanli/dungou/img/Land002.jpg",
		"static/page/shigongguanli/dungou/img/Land004.jpg"
	];
	FreeDoUtil.dig(myviewer,userdata2,imgarray);

    // 2D/3D切换
    $("#div1").click(function () {
        if ($("#div1").hasClass("open1")) {
            $("#div1").removeClass("open1").addClass("close1");
            $(".twoThree").html("2D");
            $(".row-fluid .span12").width(100 + "%");
            myviewer.camera.setView({
            	destination :new FreeDo.Cartesian3(-2302923.868697135,4394881.466502352,3995119.1300424132),
    			orientation: {
    				heading : 3.4103115877496184,
    				pitch : FreeDo.Math.toRadians(-90),
    				roll : 3.1249876427485663
    			}
    		});
            imageEntity1.show = true;
            imageEntity2.show = true;
            imageEntity3.show = true;
            
        } else {
            $("#div1").removeClass("close1").addClass("open1");
            $(".twoThree").html("3D");
            $(".row-fluid .span12").width(13 + "%");
            myviewer.camera.setView({
    			destination : new FreeDo.Cartesian3(-2302845.3100776505,4394938.847917727,3994690.0880676378),
    			orientation: {
    				heading : 0.2536280253880907,
    				pitch : -0.5766105792503788,
    				roll : 0.0009860831680850168
    			}
    		});
            imageEntity1.show = false;
            imageEntity2.show = false;
            imageEntity3.show = false;
        }

        if ($("#div2").hasClass("open2")) {
            $("#div2").removeClass("open2").addClass("close2");
        } else {
            $("#div2").removeClass("close2").addClass("open2");
        }
    });


 // 结构点击
    $("#structure").click(function () {
        $("#showDraw").hide();
        $("#drawing").show();
        $("#structure").addClass("active").siblings().removeClass("active");
        $("#tree").siblings().hide();
        $("#attrInfo,#dailog,#edit").hide();
        if($("#tree").css("display")=='none'){
            $("#tree").show().siblings().hide();
            $(".box").removeClass("minTree").addClass("changeWidth");
        }else{
            $("#tree").hide();
            $(".box").removeClass("changeWidth").addClass("minTree");
        }
    });

    // 场景点击
    $("#sence").click(function () {
    	imageEntity1.show = false;
        imageEntity2.show = false;
        imageEntity3.show = false;
        $("#showDraw,#drawing").hide();
        $("#sence").addClass("active").siblings().removeClass("active");
        $("#addSence").siblings().hide();
        $("#attrInfo,#dailog").hide();
        $("#edit").hide();
        if($("#addSence").css("display")=='none'){
            $("#addSence").show().siblings().hide();
            $(".box").removeClass("minTree").addClass("changeWidth");
        }else{
            $("#addSence").hide();
            $(".box").removeClass("changeWidth").addClass("minTree");
        }
    });

    // 备注点击
    $("#remark").click(function () {
        $("#showDraw,#drawing").hide();
        $("#remark").addClass("active").siblings().removeClass("active");
        $("#bInfo").siblings().hide();
        $("#attrInfo,#dailog,#edit").hide();
        if($("#bInfo").css("display")=='none'){
            $("#bInfo").show().siblings().hide();
            $(".box").removeClass("minTree").addClass("changeWidth");
        }else{
            $("#bInfo").hide();
            $(".box").removeClass("changeWidth").addClass("minTree");
        }
    });


    $("#drawing, .cad").click(function () {
       $("#showDraw").show();
    });
    $(".downLoad").click(function () {
        $("#showDraw").hide();
    });

    // 属性点击
    $("#attribute").click(function () {
        $("#showDraw,#drawing,#dailog,#edit#bInfo").hide();
        $(".box").removeClass("changeWidth").addClass("minTree");
        $("#attribute").addClass("active").siblings().removeClass("active");
        if($("#attrInfo").css("display")=='none'){
            $("#attrInfo").show();
        }else{
            $("#attrInfo").hide();
        }
    });

    // 属性里面的列表点击
    $(".attrList li").each(function () {
        $(this).click(function () {
            var index = $(this).index();
            $(this).addClass("selectList").siblings().removeClass("selectList");
            $(".attrText div").eq(index).show().siblings().hide();
        });
    })
    

    // 备注里面列表点击
    $("#bInfo ul li").each(function () {
        $(this).click(function () {
        	imageEntity1.show = false;
            imageEntity2.show = false;
            imageEntity3.show = false;
            $("#attrInfo").hide();
            if($("#dailog").css("display")!='none' || $("#edit").css("display")!='none'){
                $("#dailog").hide();
                $("#edit").hide();
            }else{
               
                $("#dailog").show();
                $("#edit").show();
            }
        });
    });

    // 发送点击
    $(".send").click(function () {
        var text = $("#textInfo").val().trim();
        var day = new Date();
        var time = formatDate(day)
        if(text){
            var str = "<li><p><span>张华</span> <span class='sendTime'>"+time+"</span></p><p>"+text+"</p></li>";
            $(".dialogContent ul").append(str);
            $("#textInfo").val("");
        }
        function formatDate(time){
            var year =time.getFullYear();
            var month =time.getMonth() + 1;
            var day =time.getDate();
            var hour =time.getHours();
            var min =time.getMinutes();
            var second =time.getSeconds();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (min < 10) {
                min = "0" + min;
            }
            if (second < 10) {
                second = "0" + second;
            }
            return time = year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + second ;
        }
    });


    // 备注里面的确定点击
    $(".sure").click(function(){
        $("#edit").hide();
    });

    $(".closed").click(function(){
        $("#edit").hide();
    });
 
    $(document).click(function() {
        $("#menu").hide();
        $("#rMenu").hide();
    });

    $(".hideModel").click(function () {
    	var treeObj = $.fn.zTree.getZTreeObj("tree");
    	var nodes = treeObj.getNodesByParam("uId", catchModelTile, null);
    	treeObj.checkNode(nodes[0], false, true,true);
    	treeObj.expandNode(nodes[nodes.lenght-1]);
    	treeObj.updateNode(nodes[0]);
    	/*
		 * if(catchModelTile){ catchModelTile[catchModelTile.length-1].show=
		 * false; }
		 */
        $("#menu").hide();
    });
    $(".showModel").click(function () {
    	var treeObj = $.fn.zTree.getZTreeObj("tree");
    	treeObj.checkAllNodes(true);
    	var models =[];
		/*
		 * for(i in nodes){ var uid = ["${component} === \'" + nodes[i].uId +
		 * "\'", 'false']; models.push(uid); }
		 */
		models.push(['true', 'true']);
		MainBuildingViewer.showHideModelsById(models);
        $("#menu").hide();
    });
    $(".menuPz").click(function () {
    	$("#remark").addClass("active").siblings().removeClass("active");
        $("#bInfo").siblings().hide();
        $("#attrInfo").hide();
        $("#dailog").hide();
        $("#edit").hide();
        if($("#bInfo").css("display")=='none'){
            $("#bInfo").show().siblings().hide();
            $(".box").removeClass("minTree").addClass("changeWidth");
        }else{
            $("#bInfo").hide();
            $(".box").removeClass("changeWidth").addClass("minTree");
        }
        $("#menu").hide();
    });
    $(".menuAttr").click(function () {
    	 $("#dailog").hide();
         $("#edit").hide();
         $("#bInfo").hide();
         $(".box").removeClass("changeWidth").addClass("minTree");
         $("#attribute").addClass("active").siblings().removeClass("active");
         if($("#attrInfo").css("display")=='none'){
             $("#attrInfo").show();
         }
        /*
		 * else{ $("#attrInfo").hide(); }
		 */
         var treeObj = $.fn.zTree.getZTreeObj("tree");
     	var nodes = treeObj.getNodesByParam("uId", catchModelTile, null);
     	$("#shuxingmingcheng").text(nodes[0].name);
        $("#menu").hide();
    });
    $("#beizhu2,#zhongdiangc1").click(function() {
    	myviewer.camera.setView({
    	    destination : new FreeDo.Cartesian3(-2302757.875052473,4394528.24041678,3994797.450159164),
    	    orientation: {
    	        heading : 2.007615961163631, // east, default value is 0.0
												// (north)
    	        pitch : -0.2183219047222542,    // default value (looking down)
    	        roll : 0.0030465411706463996                          // default
																	// value
    	    }
    	});
	});
    $("#zhongdiangc4").click(function() {
    	myviewer.camera.setView({
    	    destination : new FreeDo.Cartesian3(-2302741.565123864,4394523.662802505,3994790.3854395114),
    	    orientation: {
    	        heading :1.59903283527371, // east, default value is 0.0
												// (north)
    	        pitch : -0.15186334094008447,    // default value (looking
													// down)
    	        roll : 0.0033203069289129417                          // default
																		// value
    	    }
    	});
	});
	 $("#beizhu3,#zhongdiangc3").click(function() {
		 myviewer.camera.setView({
	    	    destination : new FreeDo.Cartesian3(-2302766.837099702,4394520.801222191,3994804.8045577058),
	    	    orientation: {
	    	        heading : 4.0280690296529995, // east, default value is
													// 0.0 (north)
	    	        pitch : -0.6310762705847752,    // default value
														// (looking down)
	    	        roll : 6.28003897153652                             // default
																			// value
	    	    }
	    	});
	});
	 $("#zhongdiangc2,#beizhu1").click(function() {
		 myviewer.camera.setView({
			 	destination : new FreeDo.Cartesian3(-2302764.939078407,4394521.6316561345,3994800.648216683),
				orientation: {
					heading : 2.0076159609805995,
					pitch : -0.21832190510744076,
					roll : 0.0030465420156966516
				}
	    	});
	});

	 $(".layer span:first-of-type").hover(function () {
	        $(".layer ul").stop().slideDown("fast")
	    },function () {
	        $(".layer ul").hover(function () {
	            $(this).stop().slideDown("fast");
	            return false;
	        },function () {
	            $(this).stop().slideUp("fast");
	        });
	        $(".layer ul").stop().slideUp("fast");
	    });
	  $(".btn-close").click(function() {
	        $("#sl").hide();
	    });
	    $(".slList").click(function() {
	        $("#sl").show();
	    });
	   // 图层的显隐
	    $("#hospital").change(function(){
	    	if($("#hospital").attr('checked')){
	    		tuceng[0].show = false;
	    		tuceng[1].show = false;
	    		$("#hospital").attr('checked',null);
	    	}else{
	    		tuceng[0].show = true;
	    		tuceng[1].show = true;
	    		$("#hospital").attr('checked','checked');
	    	}
	    	
	    });
	    $("#police").change(function(){
	    	if($("#police").attr('checked')){
	    		tuceng[2].show = false;
	    		tuceng[3].show = false;
	    		$("#police").attr('checked',null);
	    	}else{
	    		tuceng[2].show = true;
	    		tuceng[3].show = true;
	    		$("#police").attr('checked','checked');
	    	}
	    });
	    $("#firecontrol").change(function(){
	    	if($("#firecontrol").attr('checked')){
	    		tuceng[4].show = false;
	    		tuceng[5].show = false;
	    		$("#firecontrol").attr('checked',null);
	    	}else{
	    		tuceng[4].show = true;
	    		tuceng[5].show = true;
	    		$("#firecontrol").attr('checked','checked');
	    	}
	    });
	    $("#road").change(function(){
	    	if($("#road").attr('checked')){
	    		tuceng[6].show = false;
	    		tuceng[7].show = false;
	    		$("#road").attr('checked',null);
	    	}else{
	    		tuceng[6].show = true;
	    		tuceng[7].show = true;
	    		$("#road").attr('checked','checked');
	    	}
	    });
	    $("#river").change(function(){
	    	if($("#river").attr('checked')){
	    		tuceng[8].show = false;
	    		tuceng[9].show = false;
	    		$("#river").attr('checked',null);
	    	}else{
	    		tuceng[8].show = true;
	    		tuceng[9].show = true;
	    		$("#river").attr('checked','checked');
	    	}
	    });
	    $("#village").change(function(){
	    	if($("#village").attr('checked')){
	    		tuceng[10].show = false;
	    		tuceng[11].show = false;
	    		$("#village").attr('checked',null);
	    	}else{
	    		tuceng[10].show = true;
	    		tuceng[11].show = true;
	    		$("#village").attr('checked','checked');
	    	}
	    });

	    $("#zhongdiangc5").click(function(){
	    	$("#pause").addClass("icon-stop").removeClass("icon-start");
	    	$(".icon-stop").show();
			var arr = new Array();
			var route1 = new FDPCameraRoute();
			route1.m_Time = 500;
			route1.m_Lon = 117.65405942250071; // 轨迹点对应的经度 度。
			route1.m_Lat = 39.029023270356156; // 轨迹点对应的维度 度。
			route1.m_Heigt = -7.494140101978815; // 轨迹点对应的高度 米。
			route1.m_Course = 1.8185673070150337*180/Math.PI; // 轨迹点对应的相机方位角 度。
			route1.m_Alpha = 0.053943264486221665*180/Math.PI; // 轨迹点对应的相机俯仰角 度。
			route1.m_Roll = 0; // 轨迹点对应的相机滚转角 度。
			arr[0] = route1;
			//117.65509880838155,39.028810674298704,19.434674298037013
			var route2 = new FDPCameraRoute();
			route2.m_Time = 5500;
			route2.m_Lon = 117.65509880838155; // 轨迹点对应的经度 度。
			route2.m_Lat = 39.028810674298704; // 轨迹点对应的维度 度。
			route2.m_Heigt = -8.434674298037013; // 轨迹点对应的高度 米。
			route2.m_Course = 1.818577100826488*180/Math.PI; // 轨迹点对应的相机方位角 度。
			route2.m_Alpha = 0.053955749331485725*180/Math.PI; // 轨迹点对应的相机俯仰角 度。
			route2.m_Roll = 0; // 轨迹点对应的相机滚转角 度。
			arr[1] = route2;
			//117.65526169720657,39.028633748813,19.331618208693417
			var route3 = new FDPCameraRoute();
			route3.m_Time = 6500;
			route3.m_Lon = 117.65526169720657; // 轨迹点对应的经度 度。
			route3.m_Lat = 39.028633748813; // 轨迹点对应的维度 度。
			route3.m_Heigt = -8.331618208693417; // 轨迹点对应的高度 米。
			route3.m_Course = 4.7923476950288935*180/Math.PI; // 轨迹点对应的相机方位角 度。
			route3.m_Alpha = -0.14869812836828622*180/Math.PI; // 轨迹点对应的相机俯仰角 度。
			route3.m_Roll = 0; // 轨迹点对应的相机滚转角 度。
			arr[2] = route3;
			//117.65421983509961,39.02882783018097,20.968283549670737
			var route4 = new FDPCameraRoute();
			route4.m_Time = 11500;
			route4.m_Lon = 117.65421983509961; // 轨迹点对应的经度 度。
			route4.m_Lat = 39.02882783018097; // 轨迹点对应的维度 度。
			route4.m_Heigt = -7.968283549670737; // 轨迹点对应的高度 米。
			route4.m_Course = 4.915122487467713*180/Math.PI; // 轨迹点对应的相机方位角 度。
			route4.m_Alpha = -0.07063326983480422*180/Math.PI; // 轨迹点对应的相机俯仰角 度。
			route4.m_Roll = 0; // 轨迹点对应的相机滚转角 度。
			arr[3] = route4;
			var route5 = new FDPCameraRoute();
			route5.m_Time = 12500;
			route5.m_Lon = 117.65410894102295; // 轨迹点对应的经度 度。
			route5.m_Lat = 39.02894122922237; // 轨迹点对应的维度 度。
			route5.m_Heigt = -6.318711315603583; // 轨迹点对应的高度 米。
			route5.m_Course = 8.049202633909317*180/Math.PI; // 轨迹点对应的相机方位角 度。
			route5.m_Alpha = -0.5223165541779395*180/Math.PI; // 轨迹点对应的相机俯仰角 度。
			route5.m_Roll = 0; // 轨迹点对应的相机滚转角 度。
			arr[4] = route5;
			var route6 = new FDPCameraRoute();
			route6.m_Time = 17500;
			route6.m_Lon = 117.65455984662441; // 轨迹点对应的经度 度。
			route6.m_Lat = 39.0288487932963; // 轨迹点对应的维度 度。
			route6.m_Heigt = -21.565085029634779; // 轨迹点对应的高度 米。
			route6.m_Course = 7.949202633909317*180/Math.PI; // 轨迹点对应的相机方位角 度。
			route6.m_Alpha = -0.17534636908519796*180/Math.PI; // 轨迹点对应的相机俯仰角 度。
			route6.m_Roll = 0; // 轨迹点对应的相机滚转角 度。
			arr[5] = route6;
			
			script = MainBuildingViewer.manyou(arr);
	    }); 
	    
	    $("#jilu").click(function(){
	    	var x = myviewer.camera.position.x;
			var y = myviewer.camera.position.y;
			var z = myviewer.camera.position.z;
			var cartesian = new FreeDo.Cartesian3(x,y,z);
			var cartographic = myviewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
			var point=[cartographic.longitude/Math.PI*180,cartographic.latitude/Math.PI * 180,cartographic.height];
			var heading = myviewer.camera.heading;
			var pitch = myviewer.camera.pitch;
			var roll = myviewer.camera.roll;
			console.log("point: "+point);
			console.log("heading: "+heading);
			console.log("pitch: "+pitch);
			console.log("roll: "+roll);
	    });

	    $(".hClose").click(function () {
	        $("#showDraw").hide();
	        $("#drawing").removeClass("btnActive");
	    });
	    $("#video span").click(function () {
	        $("#video").hide();
	        $("#roam").removeClass("btnActive");
	    });


	    $("#showDraw img").click(function () {
	        $(".bgImg").show();
	        $("#showDraw").hide();
	    });

	    $(".bgImg span").click(function () {
	        $(".bgImg").hide();
	        $("#showDraw").show();
	    });

	    $("#drawing").click(function () {
	        $(this).addClass("btnActive").siblings().removeClass("btnActive");
	        $("#showDraw").show();
	        $("#video").hide();
	    });
	    $("#roam").click(function () {
	        $(this).addClass("btnActive").siblings().removeClass("btnActive");
	        $("#showDraw").hide();
	        $("#video").show();
	        $(".bgImg").hide();
	    });
	    $(".downLoad").click(function () {
	        $("#showDraw").hide();
	    });

	    $("#video .videoInfo li:not(:first-of-type)").each(function () {
	        $(this).click(function () {
	            $(this).addClass("vActive").siblings().removeClass("vActive");
	        })
	    });
	    //脚本的暂停与继续
	    $(".icon-stop").click(function(){
	    	if($(this).attr("class").indexOf("icon-stop") !=-1){
	    		$(".icon-stop").addClass("icon-start").removeClass("icon-stop");
		    	MainBuildingViewer.pause(script);
	    	}else{
	    		$(".icon-start").addClass("icon-stop").removeClass("icon-start");
		    	MainBuildingViewer.resume(script);
	    	}
	    	
	    });

});