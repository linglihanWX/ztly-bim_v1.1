var canvas = {};

canvas.drilling = {}
canvas.drilling.init = function  (options) {
    //数据
    var id = options.id;
    //同步注浆总量
    var sumGrouting = options.sumGrouting || 0;
    //推进速度
    var pushSpeed = options.pushSpeed || 0;
    //刀盘转速
    var knifeDishSpeed = options.knifeDishSpeed || 0;
    //贯入度
    var penetration = options.penetration || 0;
    //刀盘扭矩
    var knifeDishTorque = options.knifeDishTorque || 0;
    //总推力
    var sumPush = options.sumPush || 0;
    //推力油压
    var thrustHydraulic = options.thrustHydraulic || 0;

    var knifeDirection = options.knifeDirection || 0;

    var knifeRotateTime = options.knifeRotateTime || 0;

    var KN = options.KN;
    var mm = options.mm;


    var barRed = options.barRed;
    var barBlue = options.barBlue;
    var m3 = options.m3;

    var cvs = options.cvs;
    var ctx = options.ctx;

    var R = 10;
    var r = 8;
    var a = 6;
    var color = 'blue';
    var red = [0,3,6,9];
    var width = options.width

    var cvsRate = width / 500


    reSize()
    init()

    function init(){

        // boxBlue()
        // boxRed()
        boxDB()
        knife(KN[1]+3)


    }
    function reSize() {
        // var cvsRate = 1.7 * 0.5
        // console.log(cvsRate)

        var cvsWidth = width;
        cvs.height = cvs.width = cvsWidth;


        ctx.translate(cvs.width/2*(1-cvsRate), cvs.height/2*(1-cvsRate));
        ctx.scale(cvsRate,cvsRate);

    }
    function boxBlue() {
        ctx.save()
        ctx.translate(560,280)
        circle(ctx,60,'black')
        ctx.restore()

        for ( var i = 0; i <6; i++){
            ctx.save()
            ctx.fillStyle = color
            ctx.translate(560,280)
            ctx.rotate(i*60*Math.PI/180+11)
            ctx.beginPath()
            ctx.arc(0,60,r-4,0,2*Math.PI);
            ctx.closePath()
            ctx.fill()
            ctx.restore()
        }
        for ( var i = 0; i <6; i++){
            ctx.save()
            ctx.translate(560,384)
            ctx.rotate(i*60*Math.PI/180+11)
            if (i == 0 || i == 3) {
                ctx.translate(0,-90)
            }else{
                ctx.translate(0,-81)
            }
            ctx.rotate(-(i*60*Math.PI/180+11))
            fillTxt(ctx,'_____bar','black',0,-100,'center')
            fillTxt(ctx,barBlue[i],'blue',-10,-100,'center')
            fillTxt(ctx,'_____m3','black',0,-112,'center')
            fillTxt(ctx,m3[i],'blue',-10,-112,'center')
            ctx.restore()
        }
        fillTxt(ctx,'同步注浆总量','black',560,270,'center')
        fillTxt(ctx,'________ m3','black',560,290,'center')
        fillTxt(ctx,sumGrouting,'blue',550,290,'center')
    }
    function boxRed() {
        ctx.save()
        ctx.translate(560,90)
        circle(ctx,30,'black')
        circle(ctx,70,'black')
        ctx.restore()
        fillTxt(ctx,'土压','#000',560,90,'center')

        for ( var i = 0; i <8; i++){
            ctx.save()
            ctx.strokeStyle = 'black'
            ctx.setLineDash([5,8]);
            ctx.translate(560,90)
            ctx.rotate(i*45*Math.PI/180)
            ctx.beginPath()
            ctx.moveTo(0,-70);
            ctx.lineTo(0,-30);
            ctx.closePath()
            ctx.stroke()
            ctx.restore()
        }
        for ( var i = 0; i <8; i++){
            ctx.save()
            ctx.fillStyle = 'red'

            ctx.translate(560,90)
            ctx.rotate(i*45*Math.PI/180)
            ctx.beginPath()
            ctx.arc(0,50,r-4,0,2*Math.PI);
            ctx.closePath()
            ctx.fill()
            ctx.restore()
        }

        for ( var i = 0; i <8; i++){
            ctx.save()

            ctx.translate(560,180)
            ctx.rotate(i*45*Math.PI/180)
            if (i == 0 || i == 4) {
                ctx.translate(0,-82)
            }else if (i == 2 || i == 6) {
                ctx.translate(0,-100)
            }else{
                ctx.translate(0,-90)
            }
            ctx.rotate(-(i*45*Math.PI/180))
            fillTxt(ctx,barRed[i],'blue',-10,-90,'center')
            fillTxt(ctx,'_____bar','black',0,-90,'center')
            ctx.restore()
        }
    }
    function boxDB(){
        //循环画12个两圆部件
        for (var i = 0; i < 12; i++){
            ctx.save()
            ctx.translate(cvs.width/2,cvs.height/2);
            ctx.rotate(i*30*Math.PI/180)
            //蓝色两圆部件
            ctx.drawImage(createBlock(),-25,-127);
            //红色两圆部件
            for( var j = 0; j<red.length; j++){
                if (i ==red[j]) {
                    ctx.drawImage(createBlockRight(),-25,-127);
                    // console.log(i)
                }
            }
            ctx.restore()
        }
        // //环绕四边文字信息
        for (var i = 0; i< 4; i++){
            // if (i%2 == 0) {
            // 	fillTxt(ctx,'行程'+'_______'+'mm','#000',i*180,90+80);
            // 	fillTxt(ctx,'推力'+'_______'+'KN','#000',i*180,114+80);
            // }else{
            // 	if (i==1) {
            // 		fillTxt(ctx,'行程'+'_______'+'mm','#000',180,i*20);
            // 		fillTxt(ctx,'推力'+'_______'+'KN','#000',180,(i*20)+24);
            // 	}else{
            // 		fillTxt(ctx,'行程'+'_______'+'mm','#000',180,i*106);
            // 		fillTxt(ctx,'推力'+'_______'+'KN','#000',180,(i*106)+24);
            // 	}
            // }
            ctx.save()
            ctx.translate(cvs.width/2,cvs.height/2);
            ctx.rotate(i*90*Math.PI/180)
            if (i == 0 || i == 2) {
                ctx.translate(0,-150);
            }else{
                ctx.translate(0,-180);
            }

            ctx.rotate(-(i*90*Math.PI/180))
            fillTxt(ctx,'行程'+'_______'+'mm','#000',0,10,'center');
            fillTxt(ctx,mm[i],'blue',0,10,'center');
            fillTxt(ctx,'推力'+'_______'+'KN','#000',0,-10,'center');
            fillTxt(ctx,KN[i],'blue',0,-10,'center');
            ctx.restore()

        }

        //包围部件的两个里外圆环
        circleBlock()
        //中间的文字信息
        centerText()
    }
    function knife(j) {
        // //环绕的刀片

        // setInterval(function(){
        for (var i = 0; i< 8; i++){
            ctx.save()
            ctx.translate(cvs.width/2,cvs.height/2);
            ctx.rotate(i*360/8*Math.PI/180-j);
            ctx.translate(-10,-104);
            ctx.fillStyle = 'rgba(205,205,180,.8)';
            ctx.fillRect(0,0,20,40);
            ctx.restore()
        }
        // },1000)

    }
    function centerText(){
        ctx.save()
        ctx.translate(cvs.width/2, cvs.height/2)
        fillTxt(ctx,'推进速度：'+'________ '+' mm/min','#000',0,-60,'center')
        fillTxt(ctx,pushSpeed,'blue',0,-60)
        fillTxt(ctx,'刀盘转速：'+'________ '+' rpm','#000',0,-40,'center')
        fillTxt(ctx,knifeDishSpeed,'blue',6,-40)
        fillTxt(ctx,'贯入度：'+'________ '+' mm/rpm','#000',0,-20,'center')
        fillTxt(ctx,penetration,'blue',-10,-20)
        fillTxt(ctx,'刀盘扭矩：'+'________ '+' KN·m','#000',0,0,'center')
        fillTxt(ctx,knifeDishTorque,'blue',0,0)
        fillTxt(ctx,'总推力：'+'________ '+' KN','#000',0,20,'center')
        fillTxt(ctx,sumPush,'blue',10,20,'center')
        fillTxt(ctx,'推力油压：'+'________ '+' bar','#000',0,40,'center')
        fillTxt(ctx,thrustHydraulic,'blue',16,40,'center')
        fillTxt(ctx,'旋转方向：'+'________ ','#000',0,60,'center')
        fillTxt(ctx,knifeDirection,'blue',30,60,'center')
        fillTxt(ctx,'旋转次数：'+'________ ','#000',0,80,'center')
        fillTxt(ctx,knifeRotateTime,'blue',30,80,'center')
        ctx.restore()
    }

    function circleBlock() {
        ctx.save()
        ctx.translate(cvs.width/2,cvs.height/2);
        //单个圆
        circle(ctx,130,'#000')
        circle(ctx,106,'#000')
        ctx.restore()
    }

    function circle(ctx,r,color) {
        ctx.save()
        ctx.beginPath()
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.arc(0,0,r,0,2*Math.PI);
        ctx.closePath()
        ctx.stroke()
        ctx.restore()
    }
    //文字书写
    function fillTxt(ctx,txt,color,x,y,aline){
        ctx.save();
        ctx.font ='12px Arial';
        ctx.textBaseline = 'middle';
        ctx.textAlign= aline||'left';
        ctx.fillStyle = color;
        ctx.fillText(txt,x,y);
        ctx.restore();

    }
    function curveDB(ctx,x1,y1,x2,y2) {
        curve(ctx,x1,y2-R,x2,y2-R,a,color)
        curve(ctx,x1,y2+R,x2,y2+R,-a,color)
    }
    function curve(ctx,x1,y1,x2,y2,a,line) {
        ctx.save()
        ctx.beginPath();
        ctx.strokeStyle = line;
        ctx.lineTo(x1,y1);
        ctx.quadraticCurveTo((x2-x1)/2+x1,a+y1,x2,y2);
        ctx.stroke();
        ctx.restore()
    }
    function drawBlockDBLeft(ctx,x1,x1,x2,y2,color) {
        ctx.save()
        ctx.translate(x1,x1);
        drawBlockStroke(ctx,R,color)
        drawBlockFill(ctx,r)
        ctx.restore()
        ctx.save()
        ctx.translate(x2,y2);
        drawBlockStroke(ctx,R,color)
        drawBlockFill(ctx,r,color)
        ctx.restore()
    }
    function drawBlockDBRight(ctx,x1,x1,x2,y2,color) {
        ctx.save()
        ctx.translate(x1,x1);
        drawBlockStroke(ctx,R,color)
        drawBlockFill(ctx,r,color)
        ctx.restore()
        ctx.save()
        ctx.translate(x2,y2);
        drawBlockStroke(ctx,R,color)
        drawBlockFill(ctx,r)
        ctx.restore()
    }
    function drawBlockDB(ctx,x1,x1,x2,y2,color) {
        ctx.save()
        ctx.translate(x1,x1);
        drawBlockStroke(ctx,R,color)
        drawBlockFill(ctx,r,color)
        ctx.restore()
        ctx.save()
        ctx.translate(x2,y2);
        drawBlockStroke(ctx,R,color)
        drawBlockFill(ctx,r,color)
        ctx.restore()
    }
    function drawBlockFill(ctx,r,bg){
        ctx.fillStyle = bg || 'red';
        ctx.beginPath()
        ctx.arc(0,0,r,0,2*Math.PI);
        ctx.closePath();
        ctx.fill();
    }
    function drawBlockStroke(ctx,r,line){
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = line;
        ctx.beginPath()
        ctx.arc(0,0,r,0,2*Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.stroke()
    }
    function createBlockRight(i){
        var canvasBackground = document.createElement('canvas');
        canvasBackground.width = 50;
        canvasBackground.height = 20;
        var cxtBackground = canvasBackground.getContext('2d');
        drawBlockDBRight(cxtBackground,10,10,40,10,color)
        curveDB(cxtBackground,10,10,40,10)
        return canvasBackground
    }
    function createBlockLeft(i){
        var canvasBackground = document.createElement('canvas');
        canvasBackground.width = 50;
        canvasBackground.height = 20;
        var cxtBackground = canvasBackground.getContext('2d');
        drawBlockDBLeft(cxtBackground,10,10,40,10,color)
        curveDB(cxtBackground,10,10,40,10)
        return canvasBackground
    }
    function createBlock(i){
        var canvasBackground = document.createElement('canvas');
        canvasBackground.width = 50;
        canvasBackground.height = 20;
        var cxtBackground = canvasBackground.getContext('2d');
        drawBlockDB(cxtBackground,10,10,40,10,color)
        curveDB(cxtBackground,10,10,40,10)
        return canvasBackground
    }

}
canvas.drilling.clear = function  (options) {
    var ctx = options.ctx;
    ctx.clearRect(0, 0, options.width, options.width*0.5)

}