var myChart = echarts.init(document.getElementById('main'));
option = {   
	     tooltip : {
	      trigger: 'item',
	      formatter: "{a} <br/>{b} : {c} ({d}%)"
	     },
	     legend: {
	      orient : 'vertical',
	      x : 'left',
	      data:['一级','二级','三级']
	     },
	     toolbox: {
	      show : true
	     },
	     calculable : false,   //拖拽
	     series : [
	      {
	       name:'隐患等级',
	       type:'pie',     //这里指定类型
	       radius : '55%',
	       center: ['50%', '60%'],
	       color:['rgb(255,0,0)','rgb(255,193,37)','rgb(255,255,0)'],
	       data:[
	        {value:3, name:'一级'},
	        {value:1, name:'二级'},
	        {value:1, name:'三级'}
	       ]
	      }
	     ]
	    };

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
myChart.on('click', function (param) {
	console.log(param.data.name) 
});