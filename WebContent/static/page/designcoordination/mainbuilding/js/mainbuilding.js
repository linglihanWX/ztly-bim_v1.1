$(function () {
	var h = $(".container-fluid-full").height();
	var h1 = $("#content .breadcrumb").height();
	$("#tree").height(h - h1 - 24);
    var h2 = $("#content").height();
    var h3 = $(".breadcrumb").height();
    $("#content .row-fluid").height(h2 - h3);
    $(".dialogContent").height(h2-250);
	MainBuildingViewer.init("earth");
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
                	onCheck:function(){
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
            myviewer.camera.flyTo({
    			destination : FreeDo.Cartesian3.fromDegrees(116.61560999999998,39.94417000000001,850),
    			orientation: {
    				heading : 3.151511565477606,
    				pitch : FreeDo.Math.toRadians(-90),
    				roll : 6.283142068984704
    			}
    		});
            myviewer.entities.show = true;
            
        } else {
            $("#div1").removeClass("close1").addClass("open1");
            $(".twoThree").html("3D");
            $(".row-fluid .span12").width(13 + "%");
            myviewer.camera.flyTo({
    			destination : new FreeDo.Cartesian3(-2193765.8412362905, 4377825.066559737, 4073529.786256399),
    			orientation: {
    				heading : 3.151511565477606,
    				pitch : -0.7010380643181917,
    				roll : 6.283142068984704
    			}
    		});
            myviewer.entities.show = false;
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


    $("#drawing").click(function () {
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
    $("#beizhu1").click(function() {
    	myviewer.camera.setView({
    	    destination : new FreeDo.Cartesian3(-2193839.740510777,4377741.797144751,4073240.4175661653),
    	    orientation: {
    	        heading : 3.59017715623866, // east, default value is 0.0 (north)
    	        pitch : 0.3065491220824681,    // default value (looking down)
    	        roll : 6.281680763878374                             // default value
    	    }
    	});
	});
    $("#beizhu2,#zhongdiangc4,#zhongdiangc1").click(function() {
    	myviewer.camera.setView({
    	    destination : new FreeDo.Cartesian3(-2193740.224183728,4377947.211256893,4073125.4370609527),
    	    orientation: {
    	        heading : 0.037330708480451946, // east, default value is 0.0 (north)
    	        pitch : -0.41495893261159056,    // default value (looking down)
    	        roll : 0.0001349555797887092                            // default value
    	    }
    	});
	});
	 $("#beizhu3,#zhongdiangc3").click(function() {
		 myviewer.camera.setView({
	    	    destination : new FreeDo.Cartesian3(-2193723.810108507,4377892.310680099,4073196.4243841753),
	    	    orientation: {
	    	        heading : 1.7579696132457583, // east, default value is 0.0 (north)
	    	        pitch : -0.19079301569977014,    // default value (looking down)
	    	        roll : 0.003306186475537487                             // default value
	    	    }
	    	});
	});
	 $("#zhongdiangc2").click(function() {
		 myviewer.camera.setView({
			 	destination : new FreeDo.Cartesian3(-2193765.8412362905, 4377825.066559737, 4073529.786256399),
				orientation: {
					heading : 3.151511565477606,
					pitch : -0.7010380643181917,
					roll : 6.283142068984704
				}
	    	});
	});
});