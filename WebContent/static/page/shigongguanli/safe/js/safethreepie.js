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
	var name = param.data.name;
	switch (name) {
	case "一级":
		SafeThreeViewer.fly(-2303582.1501736064,4395212.488089469,3994904.9078458804,0.000015300268030316033,-1.1714332598210255,0.000647469364324138);
		break;
	case "二级":
		SafeThreeViewer.fly(-2302948.9132162365,4395283.653594713,3995191.6935669584,0.000015300265065576468,-1.1714331781457097,0.0006474693675393439);
		break;
	case "三级":
		SafeThreeViewer.fly(-2303355.424155074,4395038.979879779,3995226.5162490937,0.00001530026471119328,-1.1714331682311019,0.0006474693679248134);
		break;

	default:
		break;
	}
});