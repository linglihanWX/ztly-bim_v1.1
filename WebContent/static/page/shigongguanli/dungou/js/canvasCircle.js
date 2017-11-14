function TbmDeviation(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.length = this.width < this.height ? this.width / 2 - 10 : this.height / 2 - 10; //代表正方形边的一半长度
    this.context = canvas.getContext('2d');
    this.tagNum = 10; //代表正方形边上的标签的个数（左一半）
    canvas.width = this.width;
    canvas.height = this.height;
    this.context.translate(this.width / 2, this.height / 2);
    this.deviationX=0;
    this.deviationY=0;

    this.fHorizontalDev=0;
    this.fVerticalDev=0;
    this.mHorizontalDev=0;
    this.mVerticalDev=0;

    this.initPanel();
}

TbmDeviation.prototype.initPanel = function() {
    this.drawLine();
    this.drawCircle();
    this.drawTag();
};
TbmDeviation.prototype.drawLine = function() {
    var context = this.context;

    var tagLength = this.length / this.tagNum;
    context.save();
    context.beginPath();

    for (var i = 1; i <= this.tagNum; i++) { //画竖线
        context.moveTo(i * tagLength, 0 - this.length);
        context.lineTo(i * tagLength, 0 - this.length);
        context.lineTo(i * tagLength, this.length);

        context.moveTo(-(i * tagLength), 0 - this.length);
        context.lineTo(-(i * tagLength), 0 - this.length);
        context.lineTo(-(i * tagLength), this.length);
    }

    for (var i = 1; i <= this.tagNum; i++) { //画横线
        context.moveTo(0 - this.length, i * tagLength);
        context.lineTo(0 - this.length, i * tagLength);
        context.lineTo(this.length, i * tagLength);

        context.moveTo(0 - this.length, -i * tagLength);
        context.lineTo(0 - this.length, -i * tagLength);
        context.lineTo(this.length, -i * tagLength);

    }

    context.strokeStyle = 'blue';
    context.stroke();
    context.restore();

    //画中线
    context.save();
    context.beginPath();
    context.moveTo(0, -this.length);
    context.lineTo(0, -this.length);
    context.lineTo(0, this.length);

    context.moveTo(-this.length, 0);
    context.lineTo(-this.length, 0);
    context.lineTo(this.length, 0);
    context.strokeStyle = 'blue';
    context.lineWidth=2;
    context.stroke();
    context.restore();
};

TbmDeviation.prototype.drawCircle = function() {
    var context = this.context;

    var tagLength = this.length / this.tagNum;
    context.save();
    context.strokeStyle = 'blue';
    for (var i = 1; i <= this.tagNum; i++) {
        context.beginPath();
        context.arc(0, 0, i * tagLength, 0, 2 * Math.PI);
        context.stroke();
    }
    context.restore();
};

TbmDeviation.prototype.drawTag = function() {
    var context = this.context;
    var tagLength = this.length / this.tagNum;
    context.save();
    context.beginPath();
    context.font = '10px sans-serif';
    context.textBaseline = "top";
    context.strokeStyle = "green";

    context.strokeText(0, 0, 0);

    for (var i = 1; i < 10; i++) {
        var text = i * 10;
        context.strokeText(text, i * tagLength, 0); //右侧数字

        context.save();
        context.textAlign = 'right'; //左侧数字
        context.strokeText(-text, -i * tagLength, 0);
        context.restore();

        context.strokeText(-text, 0, i * tagLength); //下部

        context.save() //上部
        context.textBaseline = "bottom";
        context.strokeText(text, 0, -i * tagLength);
        context.restore();
    }
    context.restore();
};

TbmDeviation.prototype.prepareData = function(attr) {
    if (attr.comment == "盾构水平倾度")
        this.deviationX = attr.value;

    if (attr.comment == "盾构竖直倾度")
        this.deviationY = attr.value;

    if(attr.comment=="前部水平位移")
        this.fHorizontalDev=attr.value;

    if(attr.comment.trim()=="前部竖直位移")
        this.fVerticalDev=attr.value;

    if(attr.comment.trim()=="中部水平位移")
        this.mHorizontalDev=attr.value;

    if(attr.comment.trim()=="中部竖直位移")
        this.mVerticalDev=attr.value;
};
TbmDeviation.prototype.drawDeviationPoint = function(x, y) {
    var context = this.context;
    var tagLength = this.length / this.tagNum;
    var rate = tagLength / 10;

    var x = this.deviationX * rate;
    var y = -this.deviationY * rate;

    context.save();
    context.clearRect(-this.length, -this.length, 2 * this.length, 2 * this.length);
    this.initPanel();

    context.beginPath();
    context.arc(x, y, tagLength / 3, 0, 2 * Math.PI);
    context.clip();
    context.fillStyle = "red";
    context.fill();
    context.restore();


    $("#tbmDeviationX").html(this.deviationX.toFixed(1));
    $("#tbmDeviationY").html(this.deviationY.toFixed(1));
    $("#fHorizontalDev").html(this.fHorizontalDev.toFixed(1));
    $("#fVerticalDev").html(this.fVerticalDev.toFixed(1));
    $("#mHorizontalDev").html(this.mHorizontalDev.toFixed(1));
    $("#mVerticalDev").html(this.mVerticalDev.toFixed(1));

};