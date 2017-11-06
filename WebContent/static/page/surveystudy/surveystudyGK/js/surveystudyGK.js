$(function () {
    var myChart1 = echarts.init(document.getElementById('chartOne'));
    var myChart2 = echarts.init(document.getElementById('chartTwo'));
    var option1 = {
        title: {
            text: '水文数据', // 标题的文字
            link: "./water.html", // 标题的链接
            left: 'center', // 标题居中
            padding: 10,
            borderRadius: 10,
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {
                    readOnly: true
                },
                magicType: {
                    type: ['line', 'bar']
                },
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            formatter: function (params) {
                return params.name + ":" + params.value + "万吨";
            },
        },
        legend: {
            data: ["供水量"],
            orient: "vertical", // 类目竖直排序
            align: "left", // 文字和图形左右互换
            left: "left" // 文字居左
        },
        grid: {
            show: true,
            trigger: "axis"
        },
        xAxis: [{
            name: "月份",
            type: "category",
            data: ["1月", "2月", "3月", "4月", "5月", "6月","7月","8月","9月","10月","11月","12月"]
        }
        ],

        yAxis: [{
            name: "万吨",
            type: "value",
        },

        ],
        series: [{
            name: '供水量',
            type: 'line',
            data: [105, 102, 114, 98, 96, 103,120,136,140,115,95,96],
            markPoint: {
                data: [
                    {
                        type: 'max',
                        name:"最大值"
                    },
                    {
                        type: 'min',
                        name:"最小值"
                    }
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }
        ]

    };
   /*  var option2 = {
        title: {
            text: '环境数据', // 标题的文字
            link: "./env.html", // 标题的链接
            left: 'center', // 标题居中
            padding: 10,
            borderRadius: 10,
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {
                    readOnly: true
                },
                magicType: {
                    type: ['line', 'bar']
                },
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            formatter: function (params) {
                return params.name + ":" + params.value + "ppm";
            },
        },
        legend: {
            data: ["二氧化碳含量"],
            orient: "vertical", // 类目竖直排序
            align: "left", // 文字和图形左右互换
            left: "left" // 文字居左
        },
        grid: {
            show: true,
            trigger: "axis"
        },
        xAxis: [{
            name: "月份",
            type: "category",
            data: ["1月", "2月", "3月", "4月", "5月", "6月","7月","8月","9月","10月","11月","12月"]
        }
        ],

        yAxis: [{
            name: "ppm",
            type: "value",
        },

        ],
        series: [{
            name: '二氧化碳含量',
            type: 'line',
            data: [330, 350, 312, 345, 366, 388,375,356,368,353,382,374],
            itemStyle:{
                normal:{
                    lineStyle:{
                        color:"blue"
                    }
                }
            },
            markPoint: {
                data: [
                    {
                        type: 'max',
                        name:"最大值"
                    },
                    {
                        type: 'min',
                        name:"最小值"
                    }
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }
        ]
    }; */
    var option2 = {
        title: {
            text: '地质数据', // 标题的文字
            link: "./glo.html", // 标题的链接
            left: 'center', // 标题居中
            padding: 10,
            borderRadius: 10,
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {
                    readOnly: true
                },
                magicType: {
                    type: ['line', 'bar']
                },
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            formatter: function (params) {
                return params.name + ":" + params.value + "ppm";
            },
        },
        legend: {
            data: ["深度"],
            orient: "vertical", // 类目竖直排序
            align: "left", // 文字和图形左右互换
            left: "left" // 文字居左
        },
        grid: {
            show: true,
            trigger: "axis"
        },
        xAxis: [{
            name: "分类",
            type: "category",
            data: ["粉质黏土", "泥岩", "砂岩", "素填土", "强风化带"]
        }
        ],

        yAxis: [{
            name: "深度(m)",
            type: "value",
        },

        ],
        series: [{
            name: '深度',
            type: 'bar',
            data: [2.25,3.06,10.4,2.01,1.60],
            itemStyle:{
                normal:{
                    lineStyle:{
                        color:"orange"
                    }
                }
            },
            markPoint: {
                data: [
                    {
                        type: 'max',
                        name:"最大值"
                    },
                    {
                        type: 'min',
                        name:"最小值"
                    }
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }
        ]

    };
    myChart1.setOption(option1);
    myChart2.setOption(option2);
   
});