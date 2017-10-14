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
	     calculable : false,   //拖拽
	     color:['rgb(255,0,0)','rgb(255,193,37)','rgb(255,255,0)'],
	     series : [
	      {
	       name:'隐患等级',
	       type:'pie',     //这里指定类型
	       radius : '55%',
	       center: ['50%', '60%'],
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
	var name = param.data.name;
	switch (name) {
	case "一级":
		SafeThreeViewer.hideAll();
		SafeThreeViewer.fly(-2302805.7179202065,4394550.636266597,3994807.1100653852,5.1722860874155225,-0.41903254632706655,6.279962258671201);
		jianpiaokou1.show = true;
		jianpiaokou2.show = true;
		jianpiaokou3.show = true;
		SafeThreeViewer.changeColorById([["${component} === \'" + "e1d4b546-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('red')"],["${component} === \'" + "e1cff9f0-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('red')"],["${component} === \'" + "e153ec20-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('red')"],["true","color('white')"]]);
		break;
	case "二级":
		SafeThreeViewer.hideAll();
		SafeThreeViewer.fly(-2302751.488420187,4394561.224820432,3994810.7027898175,1.5061458879606562,-0.08043731837410029,0.003287499144919437);
		zhizhu.show=true;
		//e1de51d2-afe3-11e7-46c2-5ebc1b3c3ce2
		SafeThreeViewer.changeColorById([["${component} === \'" + "e1de51d2-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('orange')"],["true","color('white')"]]);
		break;
	case "三级":
		SafeThreeViewer.hideAll();
		SafeThreeViewer.fly(-2302771.988696689,4394547.20615652,3994814.236560558,1.8033561138995244,-0.5027766982710213,0.0036447729001718443);
		dianti.show=true;
		//e1990b72-afe3-11e7-46c2-5ebc1b3c3ce2
		SafeThreeViewer.changeColorById([["${component} === \'" + "e1990b72-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('yellow')"],["true","color('white')"]]);
		break;

	default:
		break;
	}
});