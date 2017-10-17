$(function () {
    var h = $("#content").height();
    var h2 = $(".breadcrumb").height();
    $("#content .row-fluid").height(h - h2);

    var h1 = $("#dailog").height();
    $(".dialogContent").height(h1-284);

    $.ajax({
        url: "static/page/shigongguanli/downup/downup.json",
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
                		
                		if(treeNode.id>0&&treeNode.id<=10)
							globalviewer.zoomTo(downuppoints[treeNode.id]);

						
                	}
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

    DownupViewer.init("init"); // 加载球模型
    //初始化
    var myChart = echarts.init(document.getElementById('chart'));
    option = {
        title: {
            text: '沉降监测数据'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: [10.01,10.02,10.03,10.04,10.05,10.06,10.07]
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: '沉降量',
                max: 0,
                min: -15,
                boundaryGap: [0.2, 0.2]
            },
        ],
        series: [
            {
                name:'沉降量',
                type:'line',
                data:[-1,-2,-4,-9,-10,-11,-10]
            }
        ]
    };
    myChart.setOption(option);
    DownupViewer.initLeftClick(globalviewer);
    //DownupViewer.initDbLeftClick(globalviewer);
    
    
});