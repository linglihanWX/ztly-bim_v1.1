$(function () {
    var h = $(".container-fluid-full").height();
    var h1 = $("#content .breadcrumb").height();
    $("#tree").height(h - h1 - 27);
	$.ajax({
		url: "static/page/designcoordination/task/task.json",
		type: "get",
		dataType: "json",
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
				callback: {
					onClick: treeNodeClick
				}
			};
			zTreeObj = $.fn.zTree.init($("#tree"), setting, data);

		}
	})
    $(".btnStandard input").each(function () {
        $(this).click(function () {
            $(this).addClass("btnActive").siblings().removeClass("btnActive");
            if($(this).attr("id") == "waterOrEle"){
                $("#newTask").show();

                var day = new Date();
                var time = formatDate(day);
                $("#newTime").text("创建时间 : "+time);

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
            }
        })
    });

    $(".sure").click(function(){
        var $list = $(".table tbody tr");
        var $text = $("#newTask textarea").val();
        console.log($text);
        var num = $list.length + 1;
        if(num < 10){
            $(".table tbody").append("<tr><td>0"+ num+"</td> <td>"+$text+"</td><td>开始/完成</td></tr>");
        }else{
            $(".table tbody").append("<tr> <td>"+num+"</td> <td>"+$text+"</td><td>开始/完成</td></tr>");
        }
        $("#newTask").hide();
    });
    $(".closed").click(function(){
        $("#newTask").hide();
    });


});