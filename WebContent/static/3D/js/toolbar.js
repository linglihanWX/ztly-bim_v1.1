
function ToolBar(container, toolButtonMetadatas, options) {

    var self = this;

    options = options || {};
    var _globalClearFunc = options.globalClearFunc;

    container = FreeDo.getElement(container);

    var _toolbarElement = document.createElement('ul');
    _toolbarElement.className = 'nav';
    var _buttons = [];

    var btn, metadata, i;
    for (i = 0; i < toolButtonMetadatas.length; ++i) {
        metadata = toolButtonMetadatas[i];

        btn = document.createElement('li');
        btn.className = 'nav-item nav-item-' + (i+1);
        btn.metadata = metadata;
        btn.title = metadata.tooltip;
        btn.addEventListener('click', onClick);

        _buttons.push(btn);
        _toolbarElement.appendChild(btn);
    }

    container.appendChild(_toolbarElement);

    function onClick() {

        if (_globalClearFunc)
            _globalClearFunc();

        if (this.metadata.toggleActive) {

            if (this.classList.contains('active')) {

                this.classList.remove('active');
                this.title = this.metadata.tooltip;
                if (this.metadata.onInactive)
                    this.metadata.onInactive();

            } else {

                if (this.metadata.exclusiveActive)
                    self.clearActives();

                this.title = this.metadata.activeTooltip;
                this.classList.add('active');
                if (this.metadata.onActive)
                    this.metadata.onActive();
            }

        } else {

            if (this.metadata.exclusiveActive)
                self.clearActives();

            this.metadata.onAction();
        }
    }

    this.clearActiveState = function(index) {
        if (_buttons[index].classList.contains('active')) {
            _buttons[index].title = _buttons[index].metadata.tooltip;
            _buttons[index].classList.remove('active');
            if (_buttons[index].metadata.onInactive)
                _buttons[index].metadata.onInactive();
        }
    };

    this.clearActives = function() {

        for (var i = 0; i < _buttons.length; ++i) {

            if (_buttons[i].classList.contains('active')) {

                _buttons[i].title = _buttons[i].metadata.tooltip;
                _buttons[i].classList.remove('active');
                if (_buttons[i].metadata.onInactive)
                    _buttons[i].metadata.onInactive();
            }
        }
    };
}
