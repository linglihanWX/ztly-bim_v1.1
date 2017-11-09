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
		SafeThreeViewer.fly(-2302804.086141132,4394525.4574262,3994795.189148911,5.06194799048651,-0.3134454479385591,6.279941084189261);
		jianpiaokou1.show = true;
		jianpiaokou2.show = true;
		jianpiaokou3.show = true;
		SafeThreeViewer.changeColorById([["${component} === \'" + "e1d4b546-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('red')"],["${component} === \'" + "e1cff9f0-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('red')"],["${component} === \'" + "e153ec20-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('red')"],["true","color('white')"]]);
		break;
	case "二级":
		SafeThreeViewer.hideAll();
		SafeThreeViewer.fly(-2302756.238966272,4394531.052734027,3994796.8074401384,4.62538120112283,-0.2915086482950606,6.279770932829521);
		zhizhu.show=true;
		//e1de51d2-afe3-11e7-46c2-5ebc1b3c3ce2
		SafeThreeViewer.changeColorById([["${component} === \'" + "e1de51d2-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('orange')"],["true","color('white')"]]);
		break;
	case "三级":
		SafeThreeViewer.hideAll();
		SafeThreeViewer.fly(-2302785.7098154062,4394528.789272977,3994796.8350769104,5.411260326139786,-0.5810681311405919,6.28017386155722);
		dianti.show=true;
		//e1990b72-afe3-11e7-46c2-5ebc1b3c3ce2
		SafeThreeViewer.changeColorById([["${component} === \'" + "e1990b72-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('yellow')"],["true","color('white')"]]);
		break;

	default:
		break;
	}
});