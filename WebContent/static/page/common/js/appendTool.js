$(function () {
	$("#earth").css({
		"position":"relative"
	});
    var str = "<span class='pull-left'>&lt;</span><div id='appendTools'><i id='TJCX' class='iconfont icon-chaxuntongji tool' title='统计查询'></i><i id='JLCL' class='iconfont icon-celiang tool' title='距离测量'></i><i id='FWCL' class='iconfont icon-celiangfangweijiao tool' title='方位测量'></i><i id='MJCL' class='iconfont icon-tudimianji tool' title='面积测量'></i><i id='DMPQ' class='iconfont icon-pouqie tool' title='地面刨切'></i></div>";
    var echartstr ="<div id='echartarea'><div id='bararea'></div><div id='piearea'></div></div>";
    var imgstr ="<div id='img'><img id='geologyslicing' src='static/page/common/img/poumian/poummian.jpg'></div>";
   $("#earth").append(str);
   $("#earth").append(echartstr);
   $("#earth").append(imgstr);
   var mybar = echarts.init(document.getElementById('bararea'));
   var mypie = echarts.init(document.getElementById('piearea'));
   var baroption = {
       title:{
           text:"数量",
           left:"center",
           top:0
       },
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
		            data : ['社区', '学校', '医院', '商场', '公园'],
		            axisTick: {
		                alignWithLabel: true
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		        }
		    ],
		    series : [
		        {
		            name:'数量',
		            type:'bar',
		            barWidth: '40%',
		            data:[1,1,1,1,1],
                    center:["50%","45%"],
		        }
		    ]
		};
   	var pieoption = {
   		title:{
            text:"面积分布比例",
			left:"center",
			top:0
        },
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}:({d}%)"
		    },
		    legend: {
		        orient: 'horizontal',
		        bottom: 0,
				left:"center",
		        data:['道路','建筑','绿化','水文','山区']
		    },
		    series: [
		        {
		            name:'面积比例',
		            type:'pie',
		            radius: ['50%', '70%'],
		            avoidLabelOverlap: false,
					center:["50%","45%"],
		            label: {
		                normal: {
		                    show: false,
		                    position: 'center'
		                },
		                emphasis: {
		                    show: true,
		                    textStyle: {
		                        fontSize: '30',
		                        fontWeight: 'bold'
		                    }
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            data:[
		                {value:1, name:'道路'},
		                {value:1, name:'建筑'},
		                {value:1, name:'绿化'},
		                {value:1, name:'水文'},
		                {value:1, name:'山区'}
		            ]
		        }
		    ]
		};
   	mybar.setOption(baroption);
    mypie.setOption(pieoption);
   $(".pull-left").hover(function () {
       $(this).hide();
       $("#appendTools").stop().animate({"right":0},"fast");
   });
    $("#appendTools").hover(function () {

    },function () {
        $("#appendTools").stop().animate({"right":-40+"px"},"fast",function () {
            $(".pull-left").show();
        });
    });
    $(".tool").each(function () {
        $(this).click(function () {
            $(this).toggleClass("active");
            $(this).siblings(".tool").removeClass("active");
        });
    })
});
function reloadTableData(){
	 bar = []
     for (var index = 0; index < 5; index++) {
         bar.push(parseInt(Math.random() * 10));
     }
	 pie = [
		 {value:Math.random()*10, name:'道路'},
            {value:Math.random()*10, name:'建筑'},
            {value:Math.random()*10, name:'绿化'},
            {value:Math.random()*10, name:'水文'},
            {value:Math.random()*10, name:'山区'}
	 ]
	 
	var echartsbar = echarts.getInstanceByDom(document.getElementById("bararea"));
	var echartspie = echarts.getInstanceByDom(document.getElementById("piearea"));
	echartsbar.setOption({
		series : [
	        {
	            data:bar,
	        }
	    ]
	});
	echartspie.setOption({
		series : [
			{
				data:pie,
			}
			]
	});
	$("#echartarea").show();
}