$(function () {
    var h = $("#content").height();
    var h2 = $(".breadcrumb").height();
    $("#content .row-fluid").height(h - h2);

    $.ajax({
        url: "static/page/yunweimgmt/assetmgmt/assetmgmt.json",
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
                    onRightClick : OnRightClick
                }
            };
            function OnRightClick(event, treeId, treeNode) {
                $("#rMenu").show().css({
                    "left" :event.pageX,
                    "top":event.pageY
                });
            }
            zTreeObj = $.fn.zTree.init( $("#tree"), setting, data);
        }
    });

    //chart1
    var myChart = echarts.init(document.getElementById('chartAttr'));
    var option = {
        title: {
            text: '电梯运行时长图'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '运行时长(小时)',
            type: 'bar',
            data: [150, 176, 143, 158, 163, 149]
        }]
    };
    myChart.setOption(option);


    var total = 0;
    //chart2
    var currChart = echarts.init(document.getElementById('currData'));
    var option1 = {
        title:{text: '实时数据'},
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : (function (){
                    var now = new Date();
                    var res = [];
                    var len = 7;
                    while (len--) {
                        res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                        now = new Date(now - 2000);
                    }
                    return res;
                })(),
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'闸机次数',
                type:'bar',
                barWidth: '60%',
                data:(function (){
                    var res = [];
                    var len = 0;
                    while (len < 7) {
                        res.push((Math.random()*10 + 5).toFixed(1) - 0);
                        len++;
                    }
                    return res;
                })()
            }
        ]
    };
    setInterval(function (){
        var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
        var data0 = option1.series[0].data;
        if(total == 0){
            for (let i = 0; i < data0.length; i++) {
                     total+=data0[i];
            }
        }else{
            total+=data0[6];
        }
        data0.shift();
        data0.push(Math.round(Math.random() * 20));
        option1.xAxis[0].data.shift();
        option1.xAxis[0].data.push(axisData);
        $("#timeNum").val(option1.series[0].data[6]+"次");
        $("#timeTotal").val(parseInt(total)+"次");
        currChart.setOption(option1);
    }, 2100);


    // 右击菜单
    $("#init").contextmenu(function(event){
        var event = event || window.event;
        event.preventDefault();
        window.event.returnValue = false;
        $("#menu").css({
            "display":"block",
            "left":event.pageX+"px",
            "top":event.pageY+"px"
        });
        return false;
    });
    $(document).click(function() {
        $("#menu").hide();
    });

    // 关键信息
    $(".r1").click(function () {
        $(".keyDetailInfo").stop().fadeOut("fast");
        $(".keyInfo").stop().slideDown("fast");
        $(".currData").stop().fadeOut("fast");
        $("#menu").hide();
    });
    $(".keyInfo .keyClose").click(function () {
        $(".keyInfo").stop().slideUp("fast");
    });

    // 详细信息
    $(".r2").click(function () {
        $(".keyInfo").stop().slideUp("fast");
        $(".keyDetailInfo").stop().fadeIn("fast");
        $(".currData").stop().slideUp("fast");
        $("#menu").hide();
    });
    $(".keyDetailInfo .keyClose").click(function () {
        $(".keyDetailInfo").stop().fadeOut("fast");
    });
    $(".keyDetailInfo button").each(function () {
        $(this).click(function () {
            $(this).addClass("ac").siblings().removeClass("ac");
            if($(this).index() == 0){
                $(".attrKey").show();
                $(".dKey").hide();
                $(".pic").hide();
                $("#chartAttr").hide();
            }
            if($(this).index() == 1){
                $(".attrKey").hide();
                $(".dKey").hide();
                $(".pic").hide();
                $("#chartAttr").show();
            }
            if($(this).index() == 2){
                $(".attrKey").hide();
                $(".pic").hide();
                $(".dKey").show();
                $("#chartAttr").hide();
            }
            if($(this).index() == 3){
                $(".attrKey").hide();
                $(".dKey").hide();
                $(".pic").show();
                $("#chartAttr").hide();
            }
        })
    });
    $(".pic input").click(function () {
        $(".keyDetailInfo").stop().fadeOut("fast");
    });

    $(".r3").click(function () {
        $(".keyDetailInfo").stop().fadeOut("fast");
        $(".keyInfo").stop().slideUp("fast");
        $(".currData").stop().slideDown("fast");
        $("#menu").hide();
    });
    $(".currData .keyClose").click(function () {
        $(".currData").stop().fadeOut("fast");
    });



    $(".r4").click(function () {
        console.log(4);
        $("#menu").hide();
    });
    $(".r5").click(function () {
        console.log(4);
        $("#menu").hide();
    });
    $(".r6").click(function () {
        console.log(4);
        $("#menu").hide();
    });
    $(".r7").click(function () {
        console.log(4);
        $("#menu").hide();
    });
    AssetmgmtViewer.init("init"); // 加载球模型
});