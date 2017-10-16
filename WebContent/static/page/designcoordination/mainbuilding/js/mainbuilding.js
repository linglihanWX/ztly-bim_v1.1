$(function () {
	var h = $(".container-fluid-full").height();
	var h1 = $("#content .breadcrumb").height();
	$("#tree").height(h - h1 - 24);
    var h2 = $("#content").height();
    var h3 = $(".breadcrumb").height();
    $("#content .row-fluid").height(h2 - h3);
    $(".dialogContent").height(h2-250);
	MainBuildingViewer.init("earth");
	MainBuildingViewer.initLeftClick(myviewer);
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
                	}
                }
            };
            zTreeObj = $.fn.zTree.init( $("#tree"), setting, data);
            treeObj = $.fn.zTree.getZTreeObj("tree");
            treeObj.checkAllNodes(true);
        }
    })
 

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
 // 右击菜单
    var menu = document.getElementById("menu");
    var rMenu = document.getElementById("rMenu");
    document.getElementById("earth").oncontextmenu = function(event){
        var event = event || window.event;
        event.preventDefault();
        window.event.returnValue = false;
        rMenu.style.display = "none";
        menu.style.display = "block";
        menu.style.left = event.pageX+"px";
        menu.style.top = event.pageY+"px";

        return false;
    };

    document.getElementById("tree").oncontextmenu = function(event){
        var event = event || window.event;
        event.preventDefault();
        window.event.returnValue = false;
        menu.style.display = "none";
         rMenu.style.display = "block";
         rMenu.style.position = "absolute";
        rMenu.style.left = event.pageX+"px";
        rMenu.style.top = event.pageY+"px";
        return false;
    };
    document.onclick=function() {
        menu.style.display = "none";
        rMenu.style.display = "none";
    };
    $(".hideModel").click(function () {
    	var treeObj = $.fn.zTree.getZTreeObj("tree");
    	var nodes = treeObj.getNodesByParam("uId", catchModelTile, null);
    	treeObj.checkNode(nodes[0], false, true,true);
    	treeObj.expandNode(nodes[nodes.lenght-1]);
    	treeObj.updateNode(nodes[0]);
    	/*if(catchModelTile){
    		catchModelTile[catchModelTile.length-1].show= false;
    	}*/
        $("#menu").hide();
    });
    $(".showModel").click(function () {
    	var treeObj = $.fn.zTree.getZTreeObj("tree");
    	treeObj.checkAllNodes(true);
    	var models =[];
		/*for(i in nodes){
			var uid = ["${component} === \'" + nodes[i].uId + "\'", 'false'];
			models.push(uid);
		}*/
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
        /* else{
             $("#attrInfo").hide();
         }*/
         var treeObj = $.fn.zTree.getZTreeObj("tree");
     	var nodes = treeObj.getNodesByParam("uId", catchModelTile, null);
     	$("#shuxingmingcheng").text(nodes[0].name);
        $("#menu").hide();
    });
    $("#beizhu2,#zhongdiangc1").click(function() {
    	myviewer.camera.setView({
    	    destination : new FreeDo.Cartesian3(-2302807.2510784627,4394523.4082239475,3994793.8235483123),
    	    orientation: {
    	        heading : 5.044992016222395, // east, default value is 0.0 (north)
    	        pitch : 0.3215754362635588,    // default value (looking down)
    	        roll : 6.27991529153284                           // default value
    	    }
    	});
	});
    $("#zhongdiangc4").click(function() {
    	myviewer.camera.setView({
    	    destination : new FreeDo.Cartesian3(-2302753.6374329086,4394540.72511198,3994807.819974779),
    	    orientation: {
    	        heading : 1.8806118873166024, // east, default value is 0.0 (north)
    	        pitch : -0.0003627369162537697,    // default value (looking down)
    	        roll : 0.0031271705413082884                          // default value
    	    }
    	});
	});
	 $("#beizhu3,#zhongdiangc3").click(function() {
		 myviewer.camera.setView({
	    	    destination : new FreeDo.Cartesian3(-2302763.1005514893,4394545.018772202,3994823.558034995),
	    	    orientation: {
	    	        heading : 2.335654016192078, // east, default value is 0.0 (north)
	    	        pitch : -0.49131390869990543,    // default value (looking down)
	    	        roll : 0.002683491504127389                             // default value
	    	    }
	    	});
	});
	 $("#zhongdiangc2,#beizhu1").click(function() {
		 myviewer.camera.setView({
			 	destination : new FreeDo.Cartesian3(-2302778.173648511, 4394538.465561863, 3994819.182138035),
				orientation: {
					heading : 2.24259938397626,
					pitch : -0.4041352216647416,
					roll : 0.002792796281812393
				}
	    	});
	});
/*//   出图点击后出现的对话框关闭
	 $(".hClose").click(function () {
	     $("#showDraw").hide();
	 });

	 $("#showDraw img").click(function () {
	     $(".bgImg").show();
	     $("#showDraw").hide();
	 });

	 $(".bgImg span").click(function () {
	     $(".bgImg").hide();
	     $("#showDraw").show();
	 });*/
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
	   //图层的显隐
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
			
	    	imageEntity1.show =false;
	    	imageEntity2.show =false;
	    	imageEntity3.show =false;
	    	
	    	var camera = myviewer.scene.camera;
	    	    camera.flyTo({
	    	        destination : FreeDo.Cartesian3.fromDegrees(117.65405942250071,39.029023270356156,20.494140101978815),
	    	        orientation : {
                        heading : 1.8185673070150337,
                        pitch : 0.053943264486221665
                    },
	    	        complete : function() {
	    	            setTimeout(function() {
	    	                camera.flyTo({
	    	                    destination : FreeDo.Cartesian3.fromDegrees(117.65509880838155,39.028810674298704,19.434674298037013),
	    	                    orientation : {
	    	                        heading : 1.818577100826488,
	    	                        pitch : 0.053955749331485725
	    	                    },
	    	                    duration:10,
	    	                    easingFunction : FreeDo.EasingFunction.LINEAR_NONE,
	    	                    complete:function(){
	    	                    	setTimeout(function() {
	    		    	                camera.flyTo({
	    		    	                    destination : FreeDo.Cartesian3.fromDegrees(117.65526169720657,39.028633748813,19.331618208693417),
	    		    	                    orientation : {
	    		    	                        heading : 4.7923476950288935,
	    		    	                        pitch : -0.14869812836828622
	    		    	                    },
	    		    	                    easingFunction : FreeDo.EasingFunction.LINEAR_NONE,
	    		    	                    complete:function(){
	    		    	                    
	    		    		    	                    	setTimeout(function() {
	    		    		    		    	                camera.flyTo({
	    		    		    		    	                    destination : FreeDo.Cartesian3.fromDegrees(117.65421983509961,39.02882783018097,20.968283549670737),
	    		    		    		    	                    orientation : {
	    		    		    		    	                        heading : 4.915122487467713,
	    		    		    		    	                        pitch : -0.07063326983480422
	    		    		    		    	                    },
	    		    		    		    	                    duration:10,
	    		    		    		    	                    easingFunction : FreeDo.EasingFunction.LINEAR_NONE,
	    		    		    		    	                    complete:function(){
	    		    		    		    	                    	setTimeout(function() {
	    		    		    		    		    	                camera.flyTo({
	    		    		    		    		    	                    destination : FreeDo.Cartesian3.fromDegrees(117.6540893864963,39.028947377694394,19.76988295801556),
	    		    		    		    		    	                    orientation : {
	    		    		    		    		    	                        heading : 1.7697966659565516,
	    		    		    		    		    	                        pitch : -0.32763506713608836
	    		    		    		    		    	                    },
	    		    		    		    		    	                    easingFunction : FreeDo.EasingFunction.LINEAR_NONE,
	    		    		    		    		    	                    complete:function(){
	    		    		    		    		    	                    	setTimeout(function() {
	    		    		    		    		    		    	                camera.flyTo({
	    		    		    		    		    		    	                    destination : FreeDo.Cartesian3.fromDegrees(117.65453537103939,39.028846327093355,5.292897784570426),
	    		    		    		    		    		    	                    orientation : {
	    		    		    		    		    		    	                        heading : 1.576492909140983,
	    		    		    		    		    		    	                        pitch : 0.038401067615655426
	    		    		    		    		    		    	                    },
	    		    		    		    		    		    	                    duration:10,
	    		    		    		    		    		    	                    easingFunction : FreeDo.EasingFunction.LINEAR_NONE,
	    		    		    		    		    		    	                    complete:function(){
	    		    		    		    		    		    	                    	
	    		    		    		    		    		    	                    }
	    		    		    		    		    		    	                });
	    		    		    		    		    		    	            }, 200);
	    		    		    		    		    	                    }
	    		    		    		    		    	                });
	    		    		    		    		    	            }, 200);
	    		    		    		    	                    }
	    		    		    		    	                });
	    		    		    		    	            }, 200);
	    		    		    	                    }
	    		    		    	                });
	    		    	            }, 200);
	    	                    }
	    	                });
	    	            }, 1000);
	    	        }
	    	    });

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
	    })
});