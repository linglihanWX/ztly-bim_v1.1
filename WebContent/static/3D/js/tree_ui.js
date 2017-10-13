var renderList = []; //定义一个渲染列表
var checkComponent;
// 健壮性特别差的代码
function initialData(data) {

    if($(data).find('IfcProject').length) { //获取第一层 IfcProject
        var obj = {}; //当前模块的总节点   总节点就一个
        var id  = $(data).find('IfcProject').attr('id');
        var name = $(data).find('IfcProject').attr('Name');
        obj.id = id;
        if(name == ''){
            obj.name='IfcProject';
        }else{
            obj.name=name;
        }

        if($(data).find('IfcProject').find('IfcSite').length){ //获取第二层  IfcSite
            obj.children = [];
            $(data).find('IfcProject').find('IfcSite').each(function() {            
                var temp = {};
                var id   = $(this).attr('id');
                var name = $(this).attr('Name');
                temp.id = id;
                if(name == ''){
                    temp.name='IfcSite';
                }else{
                    temp.name=name;
                }

                if($(this).find('IfcBuilding').length){ //开始第三层  IfcBuilding
                    temp.children = [];
                    $(this).find('IfcBuilding').each(function() {
                        var temp_2 = {};
                        var id   = $(this).attr('id');
                        var name = $(this).attr('Name');
                        temp_2.id = id;
                        if(name == ''){
                            temp_2.name='IfcBuilding';
                        }else{
                            temp_2.name=name;
                        }

                        if($(this).find('IfcBuildingStorey').length){  //开始第四层  IfcBuildingStorey
                            temp_2.children = [];
                            $(this).find('IfcBuildingStorey').each(function() {                            
                                var temp_3 = {};
                                var id   = $(this).attr('id');
                                var name = $(this).attr('Name');
                                temp_3.id = id;
                                if(name == ''){
                                    temp_3.name='IfcBuildingStorey';
                                }else{
                                    temp_3.name=name;
                                }

                                temp_3.children = [];
                                if($(this).find('IfcBuildingElementProxy').length){  //开始第五层  IfcBuildingElementProxy
                                    $(this).find('IfcBuildingStorey').each(function() {  
                                        var temp_4 = {};
                                        var id   = $(this).attr('id');
                                        var name = $(this).attr('Name');
                                        temp_4.id = id;
                                        if(name == ''){
                                            temp_4.name='IfcBuildingStorey';
                                        }else{
                                            temp_4.name=name;
                                        }

                                        temp_3.children.push(temp_4);
                                    })

                                }

                                if($(this).find('IfcFlowSegment').length){  //开始第五层  IfcFlowSegment
                                    $(this).find('IfcFlowSegment').each(function() {  
                                        var temp_4 = {};
                                        var id   = $(this).attr('id');
                                        var name = $(this).attr('Name');
                                        temp_4.id = id;
                                        if(name == ''){
                                            temp_4.name='IfcFlowSegment';
                                        }else{
                                            temp_4.name=name;
                                        }
                                        
                                        temp_3.children.push(temp_4);
                                    })

                                }

                                if($(this).find('IfcFlowFitting').length){  //开始第五层   IfcFlowFitting
                                    $(this).find('IfcFlowFitting').each(function() {  
                                        var temp_4 = {};
                                        var id   = $(this).attr('id');
                                        var name = $(this).attr('Name');
                                        temp_4.id = id;
                                        if(name == ''){
                                            temp_4.name='IfcFlowFitting';
                                        }else{
                                            temp_4.name=name;
                                        }
                                        
                                        temp_3.children.push(temp_4);
                                    })
                                }

                                if($(this).find('IfcColumn').length){  //开始第五层   IfcColumn
                                    $(this).find('IfcColumn').each(function() {  
                                        var temp_4 = {};
                                        var id   = $(this).attr('id');
                                        var name = $(this).attr('Name');
                                        temp_4.id = id;
                                        if(name == ''){
                                            temp_4.name='IfcColumn';
                                        }else{
                                            temp_4.name=name;
                                        }
                                        
                                        temp_3.children.push(temp_4);
                                    })
                                }

                                if($(this).find('IfcWallStandardCase').length){  //开始第五层  IfcWallStandardCase
                                    $(this).find('IfcWallStandardCase').each(function() {  
                                        var temp_4 = {};
                                        var id   = $(this).attr('id');
                                        var name = $(this).attr('Name');
                                        temp_4.id = id;
                                        if(name == ''){
                                            temp_4.name='IfcWallStandardCase';
                                        }else{
                                            temp_4.name=name;
                                        }
                                        
                                        temp_3.children.push(temp_4);
                                    })
                                }

                                if($(this).find('IfcBeam').length){  //开始第五层  IfcBeam  IfcDoor
                                    $(this).find('IfcBeam').each(function() {
                                        var temp_4 = {};
                                        var id   = $(this).attr('id');
                                        var name = $(this).attr('Name');
                                        temp_4.id = id;
                                        if(name == ''){
                                            temp_4.name='IfcBeam';
                                        }else{
                                            temp_4.name=name;
                                        }
                                        
                                        temp_3.children.push(temp_4);
                                    })
                                }

                                if($(this).find('IfcDoor').length){  //开始第五层  IfcDoor
                                    $(this).find('IfcDoor').each(function() {
                                        var temp_4 = {};
                                        var id   = $(this).attr('id');
                                        var name = $(this).attr('Name');
                                        temp_4.id = id;
                                        if(name == ''){
                                            temp_4.name='IfcDoor';
                                        }else{
                                            temp_4.name=name;
                                        }
                                        
                                        temp_3.children.push(temp_4);
                                    })
                                }

                                temp_2.children.push(temp_3);
                            })

                        }

                        temp.children.push(temp_2);
                    })
                }

                obj.children.push(temp)
            })
        }
        renderList.push(obj);
    }
}

function init() {

    // 开始获取xml文件的集合
    // getXML.get_dianlanqiaojia();
    // getXML.get_jipaishui();
    // getXML.get_nuantong();
    // getXML.get_penlin();
    getXML.get_penlindixia();
    getXML.get_tujian();
    // getXML.get_zongcheng();

    // if(xmlInfo.dianlanqiaojia) {
    //     // initialData($(xmlInfo.dianlanqiaojia).find('decomposition'));
    //     initialData(xmlInfo.dianlanqiaojia);
    // }

    // if(xmlInfo.jipaishui) {
    //     // initialData($(xmlInfo.jipaishui).find('decomposition'));
    //     initialData(xmlInfo.jipaishui);
    // }

    // if(xmlInfo.nuantong) {
    //     // initialData($(xmlInfo.nuantong).find('decomposition'));
    //     initialData(xmlInfo.nuantong);
    // }

    // if(xmlInfo.penlin) {
    //     // initialData($(xmlInfo.penlin).find('decomposition'));
    //     initialData(xmlInfo.penlin);
    // }

    if(xmlInfo.penlindixia) {
        // initialData($(xmlInfo.penlindixia).find('decomposition'));
        initialData(xmlInfo.penlindixia);
    }

    if(xmlInfo.tujian) {
        // initialData($(xmlInfo.tujian).find('decomposition'));
        initialData(xmlInfo.tujian);
    }

    // if(xmlInfo.zongcheng) {
    //     // initialData($(xmlInfo.zongcheng).find('decomposition'));
    //     initialData(xmlInfo.zongcheng);
    // }

    //开始渲染数据
    var source = $('#nestable').html();
    var template = Handlebars.compile(source);
    var data = {};
    data.render = renderList;

    var html = template(data);

    $('#nestable').html(html);

	$('#nestable').nestable();  //关闭拖拽功能  

    $('#slideHideMenu').on("touchstart", function(e) {
        e.preventDefault();
        startX = e.originalEvent.changedTouches[0].pageX,
        startY = e.originalEvent.changedTouches[0].pageY;
　　});
　　$('#slideHideMenu').on("touchmove", function(e) {
        e.preventDefault();
        moveEndX = e.originalEvent.changedTouches[0].pageX,
        moveEndY = e.originalEvent.changedTouches[0].pageY,
        X = moveEndX - startX,
        Y = moveEndY - startY;
        if ( X > 0 ) {
            // 从左向右滑动
        }
        else if ( X < 0 ) {
            // 从右向左滑动
            $('#sliderMenu').removeClass('open');
            $('.nav-item-1').removeClass('active');
        }
        else if ( Y > 0) {
            // 从上到下

        }
        else if ( Y < 0 ) {
            // 从下到上
        }
        else{
            // 点击操作
        }
　　});
}

init();



