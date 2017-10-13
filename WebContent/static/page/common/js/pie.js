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
	      show : true,
	      feature : {
	       saveAsImage : {show: true}
	      }
	     },
	     calculable : false,   //拖拽
	     series : [
	      {
	       name:'隐患等级',
	       type:'pie',     //这里指定类型
	       radius : '55%',
	       center: ['50%', '60%'],
	       data:[
	        {value:335, name:'一级'},
	        {value:310, name:'二级'},
	        {value:234, name:'三级'}
	       ]
	      }
	     ]
	    };

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
myChart.on('click', function (param) {
	console.log(param.data.name) 
});