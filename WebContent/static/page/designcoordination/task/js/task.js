$(function () {
    var h = $(".container-fluid-full").height();
    var h1 = $("#content .breadcrumb").height();
    $("#tree").height(h - h1 - 27);
    $(".btnStandard input").each(function () {
        $(this).click(function () {
            $(this).addClass("btnActive").siblings().removeClass("btnActive");
            
            $("#newTask").hide();
            $("#importFiles").hide();
            $("#submitTask").hide();
            if($(this).attr("id") == "newFile"){
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
                $("#workFlow").hide();

            }
            if($(this).attr("id") == "importFile"){
                $("#importFiles").show();

            }
        })
    });

    $(".sure").click(function(){
        var $list = $("#taskList tbody tr");
        var $text = $("#newTask textarea").val();
        var num = $list.length + 1;
        if(num < 10){
            $("#taskList tbody").append("<tr><td>0"+ num+"</td> <td>"+$text+"</td><td>未开始</td><td><img src='static/page/designcoordination/task/img/rightHand.svg'>指派 <img src='static/page/designcoordination/task/img/right.svg'>提交任务</td></tr>");
        }else{
            $("#taskList tbody").append("<tr> <td>"+num+"</td> <td>"+$text+"</td><td>未开始</td><td><img src='static/page/designcoordination/task/img/rightHand.svg'>指派 <img src='static/page/designcoordination/task/img/right.svg'>提交任务</td></tr>");
        }
        $("#newTask").hide();
        //$("#gbk").addClass("btnActive").siblings().removeClass("btnActive");
    });
    $(".closed").click(function(){
        $("#newTask").hide();
        //$("#gbk").addClass("btnActive").siblings().removeClass("btnActive");
    });

    $(".action").text("选择文件");
    $(".filename").text("未选中文件");
    $("#file").change(function () {
        $("#submitTask .filename").text($("#file").val());
    });
    $("#files").change(function () {
        $("#importFiles .filename").text($("#files").val());
    });
    $("tbody tr span:nth-of-type(2)").click(function () {
        $("#submitTask").show();
    });

    $("#submitTask .st,#submitTask .cancel").click(function () {
        $("#submitTask").hide();
    });
    $("#importFiles .st").click(function () {
        if($("#files").val() != ""){
            $(".data1").text("1");
            $(".data2").text("1");
            $(".data3").text("1");
            $(".data4").text("1");
            $(".data5").text("2");
            $(".data6").text("1");
            $(".data7").text("1");
            $(".data8").text("1");
        }
    });
    $("#importFiles .cancel").click(function () {
        if($("#files").val() != "") {
            var $list = $("#taskList tbody tr");
            var num = $list.length + 1;
            var text =  $(".data1").text();
            if (num < 10) {
                $("#taskList tbody").append("<tr><td>0" + num + "</td><td>" + text + "</td><td>未开始</td><td><img src='static/page/designcoordination/task/img/rightHand.svg'>指派 <img src='static/page/designcoordination/task/img/right.svg'>提交任务</td></tr><tr><td>0" + num + "</td><td>" + text + "</td><td>未开始</td><td><img src='static/page/designcoordination/task/img/rightHand.svg'>指派 <img src='static/page/designcoordination/task/img/right.svg'>提交任务</td></tr>");
            } else {
                $("#taskList tbody").append("<tr> <td>" + num + "</td> <td>" + text + "</td><td>未开始</td><td><img src='static/page/designcoordination/task/img/rightHand.svg'>指派 <img src='static/page/designcoordination/task/img/right.svg'>提交任务</td></tr><tr> <td>" + num + "</td> <td>" + text + "</td><td>未开始</td><td><img src='static/page/designcoordination/task/img/rightHand.svg'>指派 <img src='static/page/designcoordination/task/img/right.svg'>提交任务</td></tr>");
            }
            $("#importFiles").hide();
        }
    });
$(".closeDialog").click(function () {
    $("#importFiles").hide();
})

});