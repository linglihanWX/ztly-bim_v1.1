$(function () {
    var myChart1 = echarts.init(document.getElementById('chartOne'));
    var myChart2 = echarts.init(document.getElementById('chartTwo'));
    var option1 = {
        title:{
            text:"设计审核进度"
        },
        angleAxis: {
            type: 'category',
            data: ['土建专业', '机电专业', '给排水', '空调通风', '设备', '通信专业', '机电专业'],
            z: 10
        },
        radiusAxis: {
        },
        polar: {
        },
        series: [{
            type: 'bar',
            data: [1, 2, 3, 4, 3, 5, 1],
            coordinateSystem: 'polar',
            name: '待审核',
            stack: 'a'
        }, {
            type: 'bar',
            data: [2, 4, 6, 1, 3, 2, 1],
            coordinateSystem: 'polar',
            name: '审核中',
            stack: 'a'
        }, {
            type: 'bar',
            data: [1, 2, 3, 4, 1, 2, 5],
            coordinateSystem: 'polar',
            name: '审核通过',
            stack: 'a'
        }],
        legend: {
            show: true,
            data: ['待审核', '审核中', '审核通过']
        }
    };
    var option2 = {
        title: {
            text: '任务进度统计图',
            subtext: '数据根据公式进行比例计算'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['土建专业', '机电专业','给排水专业']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['一审中','二审中','专家评审','业主评审','已完毕']
        },
        series: [
            {
                name: '土建专业',
                type: 'bar',
                data: [18203,  29034, 104970, 131744, 630230]
            },
            {
                name: '机电专业',
                type: 'bar',
                data: [19325,  31000, 121594, 134141, 681807]
            },
            {
                name: '给排水专业',
                type: 'bar',
                data: [19025,  31500, 121994, 154141, 687807]
            }
        ]
    };
    myChart1.setOption(option1);
    myChart2.setOption(option2);
});