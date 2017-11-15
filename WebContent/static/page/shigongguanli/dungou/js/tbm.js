$(function() {
	// canvas 画图
	var i = 0;
	setInterval(function() {
		i++;
		var options = {
			id : 1,
			width : 500,
			sumGrouting : '数量100',
			pushSpeed : 100,
			knifeDishSpeed : 10,
			penetration : 10,
			knifeDishTorque : 10,
			sumPush : 1000000,
			thrustHydraulic : 10,
			KN : [ i, i, i, i ], //参数每秒更新
			mm : [ 3, 4, 5, 6 ],
			barRed : [ 0, 1, 2, 3, 4, 5, 6, 7 ],
			barBlue : [ 0, 1, 2, 3, 4, 5, 6, 7 ],
			m3 : [ 0, 1, 2, 3, 4, 5, 6, 7 ],
			knifeDirection : '顺时针',
			knifeRotateTime : 0,
			cvs : document.getElementById('cvs'),
			ctx : document.getElementById('cvs').getContext('2d'),
		};
		canvas.drilling.clear(options);
		canvas.drilling.init(options);
	}, 1000);

	var a = document.getElementById("circleCanvas");
	new TbmDeviation(a);

	// 加载树

	var zTreeObj;
	var setting = {
		data : {
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "pId",
				rootPId : "0"
			}
		},
		callback : {
			onClick : function(event, treeId, treeNode) {
				var id = treeNode.id;
				if (id > 0) {
					$(".detailInfo ul")
							.html(
									"<li><span>名称</span><input type='text' value='"
											+ treeNode.name
											+ "'/></li><li><span>推力（N）</span><input type='text' value='"
											+ (treeNode.id + 5)
											* 3
											+ "'/></li> <li><span>刀盘转速（rpm）</span><input type='text' value='"
											+ parseInt((treeNode.id + 3.7) * 100)
											+ "'/></li><li><span>旋转方向</span><input type='text'value='顺时针'/></li>");
					DungouViewer.changeColor(treeNode.name);
					$(".detailInfo").show();

				}
			}
		}
	};
	var data = [ {
		"id" : 0,
		"pId" : -1,
		"name" : "管道"
	} ]
	var node = {};
	for (var i = 1; i < 345; i++) {
		node = {
			"id" : i,
			"pId" : 0,
			"name" : "第" + i + "环"
		};
		data.push(node);
	}
	zTreeObj = $.fn.zTree.init($("#tree"), setting, data);
	zTreeObj.expandAll(true);

	// 二三维切换
	$("#div1").click(function() {
		if ($("#div1").hasClass("open1")) {
			$("#div1").removeClass("open1").addClass("close1");
			$(".twoThree").html("2D");
			$(".row-fluid .span12").width(100 + "%");
			$("#contentBox").css({
				"overflow" : "auto"
			});
			$(".changeToThree").hide().siblings().show();
		} else {
			$("#div1").removeClass("close1").addClass("open1");
			$(".twoThree").html("3D");
			$(".row-fluid .span12").width(15 + "%");
			$("#contentBox").css({
				"overflow" : "hidden"
			});
			$(".changeToThree").show().siblings().hide();
		}
		if ($("#div2").hasClass("open2")) {
			$("#div2").removeClass("open2").addClass("close2");
		} else {
			$("#div2").removeClass("close2").addClass("open2");
		}
	});

	// 拖动
	drag("#chart");
	function drag(el) {
		var clientH = $(document.body).height();
		var clientW = $(document.body).width();
		$(el).mousedown(function(e) {
			var e = e || window.event;
			var disX = $(el).offset().left;
			var disY = $(el).offset().top;
			var x = e.pageX - disX;
			var y = e.pageY - disY;
			var width = $(el).width();
			var height = $(el).height();
			$(document).mousemove(function(e) {
				var e = e || window.event;
				var left = e.pageX - x;
				var top = e.pageY - y;
				if (left < 0) {
					left = 0;
				}
				if (top < 0) {
					top = 0;
				}
				if (left >= clientW - width) {
					left = clientW - width;
				}
				if (top >= clientH - height) {
					top = clientH - height;
				}
				$("#chart").css({
					"left" : left,
					"top" : top
				})
			});

		});
		$(document).mouseup(function() {
			$(document).off("mousedown");
			$(document).off("mousemove");
		});
	}

	// 图表的数据
	var myChart = echarts.init(document.getElementById('picChart'));
	var option = {
		title : {
			text : "", // 标题的文字
			left : 'center', // 标题居中
			padding : 10,
			borderRadius : 10,
		},
		tooltip : {
			formatter : function(params) {
				return params.name + ":" + params.value;
			},
		},
		legend : {
			data : "",
			orient : "horizontal", // 类目竖直排序
			align : "left", // 文字和图形左右互换
			left : "center", // 文字居左
			bottom : "0"
		},
		grid : {
			show : true,
			trigger : "axis"
		},
		xAxis : [ {
			type : "category",
			data : (function() {
				var now = new Date();
				var res = [];
				var len = 7;
				while (len--) {
					res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
					now = new Date(now - 2000);
				}
				return res;
			})()
		} ],
		yAxis : [ {
			name : "",
			type : "value",
		}, ],
		series : []
	};

	//1.土压(0-1)
	var soilTimer = null;
	var soil = {
		text : "土压数据",
		legend : [ "土压1", "土压2", "土压3", "土压4", "土压5" ],
		unit : "bar",
		series : [ {
			name : '土压1',
			type : 'line',
			smooth : true,
			data : changeSoil(),
			itemStyle : {
				normal : {
					color : "blue"
				}
			}
		}, {
			name : '土压2',
			type : 'line',
			smooth : true,
			data : changeSoil(),
			itemStyle : {
				normal : {
					color : "red"
				}
			}
		}, {
			name : '土压3',
			type : 'line',
			smooth : true,
			data : changeSoil(),
			itemStyle : {
				normal : {
					color : "orange"
				}
			}
		}, {
			name : '土压4',
			type : 'line',
			smooth : true,
			data : changeSoil(),
			itemStyle : {
				normal : {
					color : "green"
				}
			}
		}, {
			name : '土压5',
			type : 'line',
			smooth : true,
			data : changeSoil(),
			itemStyle : {
				normal : {
					color : "#EE4000"
				}
			}
		} ]
	};
	function changeSoil() {
		var res = [];
		var len = 0;
		while (len < 7) {
			res.push(Math.random());
			len++;
		}
		return res;
	}
	function soilChange() {
		clearTime();
		myChart.clear();
		option.title.text = soil.text;
		option.legend.data = soil.legend;
		option.series = soil.series;
		option.yAxis[0].name = soil.unit;
		soilTimer = setInterval(function() {
			var axisData = (new Date()).toLocaleTimeString()
					.replace(/^\D*/, '');
			var data0 = option.series[0].data;
			var data1 = option.series[1].data;
			var data2 = option.series[2].data;
			var data3 = option.series[3].data;
			var data4 = option.series[4].data;
			data0.shift();
			data0.push(Math.random());
			data1.shift();
			data1.push(Math.random());
			data2.shift();
			data2.push(Math.random());
			data3.shift();
			data3.push(Math.random());
			data4.shift();
			data4.push(Math.random());
			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);
			myChart.setOption(option);
		}, 2100);

	}

	// 2.油缸行程(500-700)
	var oilRouteTimer = null;
	var oilRoute = {
		text : "油缸行程数据",
		legend : [ "油缸A行程", "油缸B行程", "油缸C行程", "油缸D行程" ],
		unit : "mm",
		series : [ {
			name : '油缸A行程',
			type : 'line',
			smooth : true,
			data : changeOilRoute(),
			itemStyle : {
				normal : {
					color : "blue"
				}
			}
		}, {
			name : '油缸B行程',
			type : 'line',
			smooth : true,
			data : changeOilRoute(),
			itemStyle : {
				normal : {
					color : "red"
				}
			}
		}, {
			name : '油缸C行程',
			type : 'line',
			smooth : true,
			data : changeOilRoute(),
			itemStyle : {
				normal : {
					color : "orange"
				}
			}
		}, {
			name : '油缸D行程',
			type : 'line',
			smooth : true,
			data : changeOilRoute(),
			itemStyle : {
				normal : {
					color : "green"
				}
			}
		} ]
	};
	function changeOilRoute() {
		var res = [];
		var len = 0;
		while (len < 7) {
			res.push(Math.random() * 200 + 500);
			len++;
		}
		return res;
	}
	function oilRouteChange() {
		clearTime();
		myChart.clear();
		option.title.text = oilRoute.text;
		option.legend.data = oilRoute.legend;
		option.series = oilRoute.series;
		option.yAxis[0].name = oilRoute.unit;
		oilRouteTimer = setInterval(function() {
			var axisData = (new Date()).toLocaleTimeString()
					.replace(/^\D*/, '');
			var data0 = option.series[0].data;
			var data1 = option.series[1].data;
			var data2 = option.series[2].data;
			var data3 = option.series[3].data;

			data0.shift();
			data0.push(Math.random() * 200 + 500);
			data1.shift();
			data1.push(Math.random() * 200 + 500);
			data2.shift();
			data2.push(Math.random() * 200 + 500);
			data3.shift();
			data3.push(Math.random() * 200 + 500);

			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);
			myChart.setOption(option);
		}, 2100);
	}

	// 3.油缸压力
	var oilBarTimer = null;
	var oilBar = {
		text : "油缸压力数据",
		legend : [ "油缸A压力", "油缸B压力", "油缸C压力", "油缸D压力" ],
		unit : "bar",
		series : [ {
			name : '油缸A压力',
			type : 'line',
			smooth : true,
			data : changeOilBar(),
			itemStyle : {
				normal : {
					color : "blue"
				}
			}
		}, {
			name : '油缸B压力',
			type : 'line',
			smooth : true,
			data : changeOilBar(),
			itemStyle : {
				normal : {
					color : "red"
				}
			}
		}, {
			name : '油缸C压力',
			type : 'line',
			smooth : true,
			data : changeOilBar(),
			itemStyle : {
				normal : {
					color : "orange"
				}
			}
		}, {
			name : '油缸D压力',
			type : 'line',
			smooth : true,
			data : changeOilBar(),
			itemStyle : {
				normal : {
					color : "green"
				}
			}
		} ]
	};
	function changeOilBar() {
		var res = [];
		var len = 0;
		while (len < 7) {
			res.push(Math.random() * 10 + 20);
			len++;
		}
		return res;
	}
	function oilBarChange() {
		clearTime();
		myChart.clear();
		option.title.text = oilBar.text;
		option.legend.data = oilBar.legend;
		option.yAxis[0].name = oilBar.unit;
		option.series = oilBar.series;
		oilBarTimer = setInterval(function() {
			var axisData = (new Date()).toLocaleTimeString()
					.replace(/^\D*/, '');
			var data0 = option.series[0].data;
			var data1 = option.series[1].data;
			var data2 = option.series[2].data;
			var data3 = option.series[3].data;
			data0.shift();
			data0.push(Math.random() * 10 + 20);
			data1.shift();
			data1.push(Math.random() * 10 + 20);
			data2.shift();
			data2.push(Math.random() * 10 + 20);
			data3.shift();
			data3.push(Math.random() * 10 + 20);
			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);
			myChart.setOption(option);
		}, 2100);
	}

	// 4.注浆压力
	var mudTimer = null;
	var mud = {
		text : "注浆压力数据",
		legend : [ "1注浆压力", "2注浆压力", "3注浆压力", "4注浆压力" ],
		unit : "bar",
		series : [ {
			name : '1注浆压力',
			type : 'line',
			smooth : true,
			data : changeMud(),
			itemStyle : {
				normal : {
					color : "blue"
				}
			}
		}, {
			name : '2注浆压力',
			type : 'line',
			smooth : true,
			data : changeMud(),
			itemStyle : {
				normal : {
					color : "red"
				}
			}
		}, {
			name : '3注浆压力',
			type : 'line',
			smooth : true,
			data : changeMud(),
			itemStyle : {
				normal : {
					color : "orange"
				}
			}
		}, {
			name : '4注浆压力',
			type : 'line',
			smooth : true,
			data : changeMud(),
			itemStyle : {
				normal : {
					color : "green"
				}
			}
		} ]
	};
	function changeMud() {
		var res = [];
		var len = 0;
		while (len < 7) {
			res.push(Math.random());
			len++;
		}
		return res;
	}
	function mudChange() {
		clearTime();
		myChart.clear();
		option.title.text = mud.text;
		option.legend.data = mud.legend;
		option.yAxis[0].name = mud.unit;
		option.series = mud.series;
		mudTimer = setInterval(function() {
			var axisData = (new Date()).toLocaleTimeString()
					.replace(/^\D*/, '');
			var data0 = option.series[0].data;
			var data1 = option.series[1].data;
			var data2 = option.series[2].data;
			var data3 = option.series[3].data;
			data0.shift();
			data0.push(Math.random());
			data1.shift();
			data1.push(Math.random());
			data2.shift();
			data2.push(Math.random());
			data3.shift();
			data3.push(Math.random());
			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);
			myChart.setOption(option);
		}, 2100);
	}

	// 5.注浆量
	var mudCountTimer = null;
	var mudCount = {
		text : "注浆量数据",
		legend : [ "1注浆量", "2注浆量", "3注浆量", "4注浆量" ],
		unit : "stroke",
		series : [ {
			name : '1注浆量',
			type : 'line',
			smooth : true,
			data : changeMudCount(),
			itemStyle : {
				normal : {
					color : "blue"
				}
			}
		}, {
			name : '2注浆量',
			type : 'line',
			smooth : true,
			data : changeMudCount(),
			itemStyle : {
				normal : {
					color : "red"
				}
			}
		}, {
			name : '3注浆量',
			type : 'line',
			smooth : true,
			data : changeMudCount(),
			itemStyle : {
				normal : {
					color : "orange"
				}
			}
		}, {
			name : '4注浆量',
			type : 'line',
			smooth : true,
			data : changeMudCount(),
			itemStyle : {
				normal : {
					color : "green"
				}
			}
		} ]
	};
	function changeMudCount() {
		var res = [];
		var len = 0;
		while (len < 7) {
			res.push(Math.random() * 2000 + 1000);
			len++;
		}
		return res;
	}
	function mudCountChange() {
		clearTime();
		myChart.clear();
		option.title.text = mudCount.text;
		option.legend.data = mudCount.legend;
		option.yAxis[0].name = mudCount.unit;
		option.series = mudCount.series;
		mudCountTimer = setInterval(function() {
			var axisData = (new Date()).toLocaleTimeString()
					.replace(/^\D*/, '');
			var data0 = option.series[0].data;
			var data1 = option.series[1].data;
			var data2 = option.series[2].data;
			var data3 = option.series[3].data;
			data0.shift();
			data0.push(Math.random() * 2000 + 1000);
			data1.shift();
			data1.push(Math.random() * 2000 + 1000);
			data2.shift();
			data2.push(Math.random() * 2000 + 1000);
			data3.shift();
			data3.push(Math.random() * 2000 + 1000);
			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);
			myChart.setOption(option);
		}, 2100);
	}

	// 6.螺旋机压力
	var spiralTimer = null;
	var spiral = {
		text : "螺旋机压力",
		legend : [ "螺旋机压力" ],
		unit : "bar",
		series : [ {
			name : '螺旋机压力',
			type : 'line',
			smooth : true,
			data : changeSpiral(),
			itemStyle : {
				normal : {
					color : "blue"
				}
			}
		} ]
	};
	function changeSpiral() {
		var res = [];
		var len = 0;
		while (len < 7) {
			res.push(Math.random());
			len++;
		}
		return res;
	}
	function spiralChange() {
		clearTime();
		myChart.clear();
		option.title.text = spiral.text;
		option.legend.data = spiral.legend;
		option.yAxis[0].name = spiral.unit;
		option.series = spiral.series;
		spiralTimer = setInterval(function() {
			var axisData = (new Date()).toLocaleTimeString()
					.replace(/^\D*/, '');
			var data0 = option.series[0].data;
			data0.shift();
			data0.push(Math.random());
			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);
			myChart.setOption(option);
		}, 2100);
	}

	// 7.螺旋机油温
	var degTimer = null;
	var deg = {
		text : "螺旋机油温",
		legend : [ "螺旋机油温" ],
		unit : "Deg·C",
		series : [ {
			name : '螺旋机油温',
			type : 'line',
			smooth : true,
			data : changeDeg(),
			itemStyle : {
				normal : {
					color : "blue"
				}
			}
		} ]
	};
	function changeDeg() {
		var res = [];
		var len = 0;
		while (len < 7) {
			res.push(Math.random() * 10 + 20);
			len++;
		}
		return res;
	}
	function degChange() {
		clearTime();
		myChart.clear();
		option.title.text = deg.text;
		option.legend.data = deg.legend;
		option.yAxis[0].name = deg.unit;
		option.series = deg.series;
		degTimer = setInterval(function() {
			var axisData = (new Date()).toLocaleTimeString()
					.replace(/^\D*/, '');
			var data0 = option.series[0].data;
			data0.shift();
			data0.push(Math.random() * 10 + 20);
			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);
			myChart.setOption(option);
		}, 2100);
	}

	// 8.螺旋机扭矩
	var torqueTimer = null;
	var torque = {
		text : "螺旋机扭矩",
		legend : [ "螺旋机扭矩" ],
		unit : "KN·M",
		series : [ {
			name : '螺旋机扭矩',
			type : 'line',
			smooth : true,
			data : changeTorque(),
			itemStyle : {
				normal : {
					color : "blue"
				}
			}
		} ]
	};
	function changeTorque() {
		var res = [];
		var len = 0;
		while (len < 7) {
			res.push(Math.random());
			len++;
		}
		return res;
	}
	function torqueChange() {
		clearTime();
		myChart.clear();
		option.title.text = torque.text;
		option.legend.data = torque.legend;
		option.yAxis[0].name = torque.unit;
		option.series = torque.series;
		torqueTimer = setInterval(function() {
			var axisData = (new Date()).toLocaleTimeString()
					.replace(/^\D*/, '');
			var data0 = option.series[0].data;
			data0.shift();
			data0.push(Math.random());
			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);
			myChart.setOption(option);
		}, 2100);
	}

	// 9.螺旋机转速
	var speedTimer = null;
	var speed = {
		text : "螺旋机转速",
		legend : [ "螺旋机转速" ],
		unit : "r·min",
		series : [ {
			name : '螺旋机转速',
			type : 'line',
			smooth : true,
			data : changeSpeed(),
			itemStyle : {
				normal : {
					color : "blue"
				}
			}
		} ]
	};
	function changeSpeed() {
		var res = [];
		var len = 0;
		while (len < 7) {
			res.push(Math.ceil(Math.random() * 10 + 20));
			len++;
		}
		return res;
	}
	function speedChange() {
		clearTime();
		myChart.clear();
		option.title.text = speed.text;
		option.legend.data = speed.legend;
		option.yAxis[0].name = speed.unit;
		option.series = speed.series;
		speedTimer = setInterval(function() {
			var axisData = (new Date()).toLocaleTimeString()
					.replace(/^\D*/, '');
			var data0 = option.series[0].data;
			data0.shift();
			data0.push(Math.ceil(Math.random() * 10 + 20));
			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);
			myChart.setOption(option);
		}, 2100);
	}

	// 10.螺旋机开度
	var apertureTimer = null;
	var aperture = {
		text : "螺旋机开度",
		legend : [ "螺旋机开度" ],
		unit : "mm",
		series : [ {
			name : '螺旋机开度',
			type : 'line',
			smooth : true,
			data : changeAperture(),
			itemStyle : {
				normal : {
					color : "blue"
				}
			}
		} ]
	};
	function changeAperture() {
		var res = [];
		var len = 0;
		while (len < 7) {
			res.push(Math.ceil(Math.random() * 10 + 100));
			len++;
		}
		return res;
	}
	function apertureChange() {
		clearTime();
		myChart.clear();
		option.title.text = aperture.text;
		option.legend.data = aperture.legend;
		option.yAxis[0].name = aperture.unit;
		option.series = aperture.series;
		apertureTimer = setInterval(function() {
			var axisData = (new Date()).toLocaleTimeString()
					.replace(/^\D*/, '');
			var data0 = option.series[0].data;
			data0.shift();
			data0.push(Math.ceil(Math.random() * 10 + 100));
			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);
			myChart.setOption(option);
		}, 2100);
	}

	// 11.铰接油缸行程
	var hingeTimer = null;
	var hinge = {
		text : "铰接油缸行程",
		legend : [ "铰接油缸A行程", "铰接油缸B行程", "铰接油缸C行程", "铰接油缸D行程" ],
		unit : "mm",
		series : [ {
			name : '铰接油缸A行程',
			type : 'line',
			smooth : true,
			data : changeHinge(),
			itemStyle : {
				normal : {
					color : "blue"
				}
			}
		}, {
			name : '铰接油缸B行程',
			type : 'line',
			smooth : true,
			data : changeHinge(),
			itemStyle : {
				normal : {
					color : "red"
				}
			}
		}, {
			name : '铰接油缸C行程',
			type : 'line',
			smooth : true,
			data : changeHinge(),
			itemStyle : {
				normal : {
					color : "orange"
				}
			}
		}, {
			name : '铰接油缸D行程',
			type : 'line',
			smooth : true,
			data : changeHinge(),
			itemStyle : {
				normal : {
					color : "green"
				}
			}
		} ]
	};
	function changeHinge() {
		var res = [];
		var len = 0;
		while (len < 7) {
			res.push(Math.random() * 40 + 20);
			len++;
		}
		return res;
	}
	function hingeChange() {
		clearTime();
		myChart.clear();
		option.title.text = hinge.text;
		option.legend.data = hinge.legend;
		option.yAxis[0].name = hinge.unit;
		option.series = hinge.series;
		hingeTimer = setInterval(function() {
			var axisData = (new Date()).toLocaleTimeString()
					.replace(/^\D*/, '');
			var data0 = option.series[0].data;
			var data1 = option.series[1].data;
			var data2 = option.series[2].data;
			var data3 = option.series[3].data;
			data0.shift();
			data0.push(Math.random() * 40 + 20);
			data1.shift();
			data1.push(Math.random() * 40 + 20);
			data2.shift();
			data2.push(Math.random() * 40 + 20);
			data3.shift();
			data3.push(Math.random() * 40 + 20);
			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);
			myChart.setOption(option);
		}, 2100);
	}

	// 12.铰接油罐压力
	var hingeBarTimer = null;
	var hingeBar = {
		text : "铰接油罐压力",
		legend : [ "铰接油罐压力" ],
		unit : "bar",
		series : [ {
			name : '铰接油罐压力',
			type : 'line',
			smooth : true,
			data : changeHingeBar(),
			itemStyle : {
				normal : {
					color : "blue"
				}
			}
		} ]
	};
	function changeHingeBar() {
		var res = [];
		var len = 0;
		while (len < 7) {
			res.push(Math.random());
			len++;
		}
		return res;
	}
	function hingeBarChange() {
		clearTime();
		myChart.clear();
		option.title.text = hingeBar.text;
		option.legend.data = hingeBar.legend;
		option.yAxis[0].name = hingeBar.unit;
		option.series = hingeBar.series;
		hingeBarTimer = setInterval(function() {
			var axisData = (new Date()).toLocaleTimeString()
					.replace(/^\D*/, '');
			var data0 = option.series[0].data;
			data0.shift();
			data0.push(Math.random());
			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);
			myChart.setOption(option);
		}, 2100);
	}

	// 13.泡沫系统压力
	var frothBarTimer = null;
	var frothBar = {
		text : "泡沫系统压力",
		legend : [ "泡沫系统1压力", "泡沫系统2压力", "泡沫系统3压力", "泡沫系统4压力" ],
		unit : "bar",
		series : [ {
			name : '泡沫系统1压力',
			type : 'line',
			smooth : true,
			data : changeFrothBar(),
			itemStyle : {
				normal : {
					color : "blue"
				}
			}
		}, {
			name : '泡沫系统2压力',
			type : 'line',
			smooth : true,
			data : changeFrothBar(),
			itemStyle : {
				normal : {
					color : "green"
				}
			}
		}, {
			name : '泡沫系统3压力',
			type : 'line',
			smooth : true,
			data : changeFrothBar(),
			itemStyle : {
				normal : {
					color : "red"
				}
			}
		}, {
			name : '泡沫系统4压力',
			type : 'line',
			smooth : true,
			data : changeFrothBar(),
			itemStyle : {
				normal : {
					color : "orange"
				}
			}
		},

		]
	};
	function changeFrothBar() {
		var res = [];
		var len = 0;
		while (len < 7) {
			res.push(Math.random());
			len++;
		}
		return res;
	}
	function frothBarChange() {
		clearTime();
		myChart.clear();
		option.title.text = frothBar.text;
		option.legend.data = frothBar.legend;
		option.yAxis[0].name = frothBar.unit;
		option.series = frothBar.series;
		frothBarTimer = setInterval(function() {
			var axisData = (new Date()).toLocaleTimeString()
					.replace(/^\D*/, '');
			var data0 = option.series[0].data;
			var data1 = option.series[1].data;
			var data2 = option.series[2].data;
			var data3 = option.series[3].data;
			data0.shift();
			data0.push(Math.random());
			data1.shift();
			data1.push(Math.random());
			data2.shift();
			data2.push(Math.random());
			data3.shift();
			data3.push(Math.random());
			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);
			myChart.setOption(option);
		}, 2100);
	}

	// 14.泡沫系统空气流量
	var airTimer = null;
	var air = {
		text : "泡沫系统空气流量",
		legend : [ "泡沫系统1空气流量", "泡沫系统2空气流量", "泡沫系统3空气流量", "泡沫系统4空气流量" ],
		unit : "L/min",
		series : [ {
			name : '泡沫系统1空气流量',
			type : 'line',
			smooth : true,
			data : changeAirBar(),
			itemStyle : {
				normal : {
					color : "blue"
				}
			}
		}, {
			name : '泡沫系统2空气流量',
			type : 'line',
			smooth : true,
			data : changeAirBar(),
			itemStyle : {
				normal : {
					color : "green"
				}
			}
		}, {
			name : '泡沫系统3空气流量',
			type : 'line',
			smooth : true,
			data : changeAirBar(),
			itemStyle : {
				normal : {
					color : "red"
				}
			}
		}, {
			name : '泡沫系统4空气流量',
			type : 'line',
			smooth : true,
			data : changeAirBar(),
			itemStyle : {
				normal : {
					color : "orange"
				}
			}
		},

		]
	};
	function changeAirBar() {
		var res = [];
		var len = 0;
		while (len < 7) {
			res.push(Math.random() * 10);
			len++;
		}
		return res;
	}
	function airChange() {
		clearTime();
		myChart.clear();
		option.title.text = air.text;
		option.legend.data = air.legend;
		option.yAxis[0].name = air.unit;
		option.series = air.series;
		airTimer = setInterval(function() {
			var axisData = (new Date()).toLocaleTimeString()
					.replace(/^\D*/, '');
			var data0 = option.series[0].data;
			var data1 = option.series[1].data;
			var data2 = option.series[2].data;
			var data3 = option.series[3].data;
			data0.shift();
			data0.push(Math.random() * 10);
			data1.shift();
			data1.push(Math.random() * 10);
			data2.shift();
			data2.push(Math.random() * 10);
			data3.shift();
			data3.push(Math.random() * 10);
			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);
			myChart.setOption(option);
		}, 2100);
	}

	// 15.泡沫系统添加剂流量
	var additiveTimer = null;
	var additive = {
		text : "泡沫系统添加剂流量",
		legend : [ "泡沫系统1添加剂流量", "泡沫系统2添加剂流量", "泡沫系统3添加剂流量", "泡沫系统4添加剂流量" ],
		unit : "L/min",
		series : [ {
			name : '泡沫系统1添加剂流量',
			type : 'line',
			smooth : true,
			data : changeAdditive(),
			itemStyle : {
				normal : {
					color : "blue"
				}
			}
		}, {
			name : '泡沫系统2添加剂流量',
			type : 'line',
			smooth : true,
			data : changeAdditive(),
			itemStyle : {
				normal : {
					color : "green"
				}
			}
		}, {
			name : '泡沫系统3添加剂流量',
			type : 'line',
			smooth : true,
			data : changeAdditive(),
			itemStyle : {
				normal : {
					color : "red"
				}
			}
		}, {
			name : '泡沫系统4添加剂流量',
			type : 'line',
			smooth : true,
			data : changeAdditive(),
			itemStyle : {
				normal : {
					color : "orange"
				}
			}
		},

		]
	};
	function changeAdditive() {
		var res = [];
		var len = 0;
		while (len < 7) {
			res.push(Math.random() * 10);
			len++;
		}
		return res;
	}
	function additiveChange() {
		clearTime();
		myChart.clear();
		option.title.text = additive.text;
		option.legend.data = additive.legend;
		option.yAxis[0].name = additive.unit;
		option.series = additive.series;
		additiveTimer = setInterval(function() {
			var axisData = (new Date()).toLocaleTimeString()
					.replace(/^\D*/, '');
			var data0 = option.series[0].data;
			var data1 = option.series[1].data;
			var data2 = option.series[2].data;
			var data3 = option.series[3].data;
			data0.shift();
			data0.push(Math.random() * 10);
			data1.shift();
			data1.push(Math.random() * 10);
			data2.shift();
			data2.push(Math.random() * 10);
			data3.shift();
			data3.push(Math.random() * 10);
			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);
			myChart.setOption(option);
		}, 2100);
	}

	// 清空定时器
	function clearTime() {
		clearInterval(soilTimer);
		clearInterval(oilRouteTimer);
		clearInterval(oilBarTimer);
		clearInterval(mudCountTimer);
		clearInterval(mudTimer);
		clearInterval(spiralTimer);
		clearInterval(degTimer);
		clearInterval(torqueTimer);
		clearInterval(speedTimer);
		clearInterval(apertureTimer);
		clearInterval(hingeTimer);
		clearInterval(hingeBarTimer);
		clearInterval(frothBarTimer);
		clearInterval(airTimer);
		clearInterval(additiveTimer);
	}

	$(".soil").click(function() {
		$("#chart").show();
		soilChange();
	});
	$(".oil-route").click(function() {
		$("#chart").show();
		oilRouteChange();
	});
	$(".oil-bar").click(function() {
		$("#chart").show();
		oilBarChange();
	});
	$(".mud").click(function() {
		$("#chart").show();
		mudChange();
	});
	$(".mud-count").click(function() {
		$("#chart").show();
		mudCountChange();
	});
	$(".spiral").click(function() {
		$("#chart").show();
		spiralChange();
	});
	$(".deg").click(function() {
		$("#chart").show();
		degChange();
	});
	$(".torque").click(function() {
		$("#chart").show();
		torqueChange();
	});
	$(".speed").click(function() {
		$("#chart").show();
		speedChange();
	});
	$(".aperture").click(function() {
		$("#chart").show();
		apertureChange();
	});
	$(".hinge").click(function() {
		$("#chart").show();
		hingeChange();
	});
	$(".hinge-bar").click(function() {
		$("#chart").show();
		hingeBarChange();
	});
	$(".froth-bar").click(function() {
		$("#chart").show();
		frothBarChange();
	});
	$(".air").click(function() {
		$("#chart").show();
		airChange();
	});
	$(".additive").click(function() {
		$("#chart").show();
		additiveChange();
	});
	$(".closeChart").click(function() {
		clearTime();
		$("#chart").hide();
	});
});