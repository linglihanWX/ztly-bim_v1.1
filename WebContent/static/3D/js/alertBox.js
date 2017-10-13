var alertBox = function(opt){
	var ele = document.body;
	var opt = opt || {};
	var alertMain = ele.querySelector('.alert-bg');
	var _this = this;
	this._opt = {
		title: opt.title || '标题', //标题文案
		titleShow: opt.titleShow || false, //是否显示标题，默认否
		content: opt.content || '内容', //内容文案
		buttonShow: opt.buttonShow || false, //是否显示按钮，默认否
		buttonText: opt.buttonText || '确定', //按钮文案
		buttonCbk: opt.buttonCbk || this.cbk, //按钮事件
		spaceHide: opt.spaceHide || false //点击空白是否关闭弹框，默认否
	}
	this.init = function(){
		var _bg = document.createElement('div');
		var _body = document.createElement('div');
		var _content = document.createElement('p');
		_content.innerHTML = this._opt.content;
		_body.className = 'alert-body';
		_bg.className = 'alert-bg';
		_content.className = 'alert-content';
		if(this._opt.titleShow){
			var _title = document.createElement('h3');
			var _span = document.createElement('span');
			var _close = document.createElement('a');
			_span.innerHTML = this._opt.title;
			_close.className = 'alert-close';
			_close.setAttribute('href','javascript:;');
			_close.onclick = this.cbk;
			_title.className = 'alert-title';
			_title.appendChild(_span);
			_title.appendChild(_close);
			_body.appendChild(_title);
		}
		_body.appendChild(_content);
		if(this._opt.buttonShow){
			var _button = document.createElement('button');
			_button.className = 'alert-button';
			_button.innerHTML = this._opt.buttonText;
			_button.onclick = this._opt.buttonCbk;
			_body.appendChild(_button);
		}
		_bg.appendChild(_body);
		_bg.onclick = this.cbk;
		ele.appendChild(_bg);
	}
	this.cbk = function(e){
		if(_this._opt.spaceHide == false && e.target.className == 'alert-bg'){
			return ;
		}
		if(e.target.className == 'alert-bg' || e.target.className == 'alert-close' || e.target.className == 'alert-button'){
			ele.querySelector('.alert-bg').className += ' hide';
		}
		e.preventDefault();
		e.stopPropagation();
	}
	if(alertMain){
		alertMain.remove();
	}
	init();
}