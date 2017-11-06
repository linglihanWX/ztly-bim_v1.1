$(function () {
    var myChart1 = echarts.init(document.getElementById('chartOne'));
    var myChart2 = echarts.init(document.getElementById('chartTwo'));
    var option1 = {
        title: {
            text: '安全天数',
            left: "center"
        },
        tooltip: {
            trigger: 'axis'
        },

        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {
                    readOnly: false
                },
                magicType: {
                    type: ['line', 'bar']
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            name: "月份"
        },
        yAxis: {
            type: 'value',
            name: "天"

        },
        series: [{
            name: '安全天数/月',
            type: 'line',
            data: [30, 28, 30, 30, 31, 30, 31, 30, 30, 31, 30, 31],
            markPoint: {
                data: [{
                        type: 'max',
                        name: '最大值'
                    },
                    {
                        type: 'min',
                        name: '最小值'
                    }
                ]
            },
            markLine: {
                data: [{
                    type: 'average',
                    name: '平均值'
                }]
            }
        }]
    };
    var option2 = {
        title: {
            text: '最近一周混凝土运输量',
            left: "centers"

        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisTick: {
                alignWithLabel: true
            }
        }],
        yAxis: [{
            name:"吨"
        }],
        series: [{
            name: '运输量/吨',
            type: 'bar',
            barWidth: '60%',
            data: [86, 75,94, 78, 82, 79, 92]
        }]

    };
    myChart1.setOption(option1);
    myChart2.setOption(option2);
});