var tool = {};
tool.drag = function (el) {
    var clientH = $(document.body).height();
    var clientW = $(document.body).width();
    $(el).mousedown(function (e) {
        var e = e || window.event;
        var disX = $(el).offset().left;
        var disY = $(el).offset().top;
        var x = e.pageX - disX;
        var y = e.pageY - disY;
        var width = $(el).width();
        var height = $(el).height();
        $(document).mousemove(function (e) {
            var e = e || window.event;
            var left = e.pageX - x;
            var top = e.pageY - y;
            if(left < 0){
                left = 0;
            }
            if(top < 0){
                top = 0;
            }
            if(left >= clientW - width){
                left = clientW - width;
            }
            if(top >= clientH - height){
                top = clientH - height;
            }
            $(el).css({
                "left":left,
                "top":top
            })
        });

    });
    $(document).mouseup(function () {
        $(document).off("mousedown");
        $(document).off("mousemove");
    });
};