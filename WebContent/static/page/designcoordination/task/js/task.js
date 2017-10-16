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
            if($(this).attr("id") == "myFlow"){
                $("#workData").hide();
                $("#workFlow").show();
            }
            if($(this).attr("id") == "gbk"){
                $("#workData").show();
                $("#workFlow").hide();
            }
        })
    });

    $(".sure").click(function(){
        var $list = $(".table tbody tr");
        var $text = $("#newTask textarea").val();
        console.log($text);
        var num = $list.length + 1;
        var rightHandPath = getRootPath()+"/static/page/designcoordination/task/img/rightHand.svg";
        var rightPath = getRootPath()+"/static/page/designcoordination/task/img/right.svg";
        if(num < 10){
            $("#workData .table tbody").append("<tr><td>0"+ num+"</td> <td>"+$text+"</td><td><img src="+rightHandPath+">指派 <img src="+rightPath+">完成</td></tr>");
        }else{
            $("#workData .table tbody").append("<tr> <td>"+num+"</td> <td>"+$text+"</td><td><img src="+rightHandPath+">指派 <img src="+rightPath+">完成</td></tr>");
        }
        $("#newTask").hide();
    });
    $(".closed").click(function(){
        $("#newTask").hide();
    });


});
/** 
 * //获取当前项目根路径 
 * @return {TypeName}  
 */  
function getRootPath(){      
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp      
    var curWwwPath=window.document.location.href;      
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp      
    var pathName=window.document.location.pathname;      
    var pos=curWwwPath.indexOf(pathName);      
    //获取主机地址，如： http://localhost:8083      
    var localhostPaht=curWwwPath.substring(0,pos);      
    //获取带"/"的项目名，如：/uimcardprj      
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);      
    return(localhostPaht+projectName);  
}  