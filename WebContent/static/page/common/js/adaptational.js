
// window.addEventListener("DOMContentLoaded",autorun,false);
autorun();

//通过手机屏幕dpr和手机宽度来确定font-size的值
function autorun() {
    //初始值
    var default_font_size = 20;//默认字号
    var default_wh_4v3 = 1.33;//默认屏宽高比Number((4/3).toFixed(2))
    var default_wh_16v9 = 1.78;//默认屏宽高比16/9
    var default_wh_21v9 = 2.33;//默认屏宽高比21/9
    var default_font_Hscale = 0.0417;//默认缩放比iphone4横
    var default_font_Pscale = 0.0625;//默认缩放比iphone4竖

   
    var dpr = window.devicePixelRatio; //dpr倍数
    var win_width = parseInt(window.innerWidth);    //浏览器宽
    var win_height = parseInt(window.innerHeight);  //浏览器高 
    var win_wh = Number((win_width/win_height).toFixed(2)); //实际屏宽高比
    var isH = win_wh>1?true:false;  //是否横屏
    var fontSize = '';  //Html字体大小

    //计算
    if (isH) {//手机或PC横屏
        if (win_wh>=default_wh_4v3) {
            var f = win_height*1.33*default_font_Hscale;
            fontSize = f + 'px';
        } else {
            var f = win_width*default_font_Hscale;
            fontSize = f + 'px';
        }
    } else {//手机或PC竖屏
        var f = win_width*default_font_Pscale;
        fontSize = f + 'px';
    }

    //进行dom操作
    document.querySelector("html").style.fontSize=fontSize;
}


/*腾讯移动分析大数据插码*/
/*
var _mtac = {"senseHash":0,"autoReport":0,"performanceMonitor":1};
(function() {
  var mta = document.createElement("script");
  mta.src = "http://pingjs.qq.com/h5/stats.js?v2.0.2";
  mta.setAttribute("name", "MTAH5");
  mta.setAttribute("sid", "500409113");
  mta.setAttribute("cid", "500409117");
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(mta, s);
})();
*/