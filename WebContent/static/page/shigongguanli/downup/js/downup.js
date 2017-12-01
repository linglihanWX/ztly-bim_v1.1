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

    DownupViewer.init("earth"); // 加载球模型
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
	FreeDoUtil.dig(globalviewer,userdata2,imgarray);

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
    DownupViewer.initLeftClick(globalviewer,showDiv);
    DownupViewer.initLeftDown(globalviewer,hideDiv);
    //DownupViewer.initDbLeftClick(globalviewer);
    var surveymanager = new SurveyManager(globalviewer,function(){});
    /**
	 *工具栏按钮点击 
	 */
	$("#appendTools i").each(function(){
		$(this).click(function(){
			if($(this).hasClass("active")){
			//设置方法为none
			surveymanager.setSurveyType(SurveyType.NONE);
			//移除原有的监听事件
			DownupViewer.removeListener();
			//初始化相应的监听事件
			switch ($(this).attr("id")) {
			//统计查询
			case "TJCX":
				$("#img").hide();
				surveymanager.setSurveyType(SurveyType.QUERY)
				break;
			//距离测量
			case "JLCL":
				$("#echartarea").hide();
				$("#img").hide();
				surveymanager.setSurveyType(SurveyType.LINE_DISTANCE);
				break;
			//方位测量
			case "FWCL":
				$("#echartarea").hide();
				$("#img").hide();						
				surveymanager.setSurveyType(SurveyType.Azimuth_DISTANCE);
				break;
			//面积测量
			case "MJCL":
				$("#echartarea").hide();
				$("#img").hide();					
				break;
			//地面刨切
			case "DMPQ":
				$("#echartarea").hide();					
				surveymanager.setSurveyType(SurveyType.Geology_SLICING);
				break;
			//其他
			default:
				break;
			}
		}else{
			//隐藏echarts和img窗口
			$("#echartarea").hide();
			$("#img").hide();
			//删除三维页面所有的线、标签
			
			//设置方法为none
			surveymanager.setSurveyType(SurveyType.NONE);
			//初始化原有的监听事件
		    DownupViewer.initLeftClick(globalviewer);
		    DownupViewer.initLeftDown(globalviewer,hideDiv);
		}
		});
		
	});
    function hideDiv(){
    	$("#chart").hide();
    }
    function showDiv(picked,position){
    	if(picked){
			if(picked instanceof FreeDo.FreedoPModelFeature){
				$("#chart").hide();
			}else{
				
				if(picked.id!=undefined&&picked.id.name.indexOf("沉降点")>-1){
					$("#chart").css({
						"display":"block",
						"left":position.x - 300,
						"top":position.y - 300,
					});	
				}else{
					$("#chart").hide();
				}
			}
			
		}else{
			$("#chart").hide();
		}
    }
});