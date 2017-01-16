/**
 * [图片放大镜]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
function ImgZoom(options) {
    this.opts = options;
    this.$el = options.$el;
    this.$sImg = options.$el.find('img');
    this.$zoomDiv = null;
    this.$bigImg = null;
    this.imgWidth = 0;
    this.imgHeight = 0;
    this.$mask = null;
    this.maskWidth = 0;
    this.maskHeight = 0;
    this.elWidth = 0;
    this.elHeight = 0;
    this.flag = true;
    this._init();
}
ImgZoom.prototype = {
    constructor: ImgZoom,
    _init: function() {
        this.$el.css('position', 'relative');
        this.bindEvent();
    },
    createHTML: function() {
        var _this = this;
        var boxWidth = this.opts.boxWidth;
        var boxHeight = this.opts.boxHeight;
        this.elWidth = this.$el.outerWidth(true);
        this.elHeight = this.$el.outerHeight(true);

        createZoomDiv();
        createMask();

        function createZoomDiv() {
            _this.$zoomDiv || (_this.$zoomDiv = $('<div/>'));
            var offset = _this.$el.offset();
            var zoomDivLeft = offset.left / 1 + _this.$el.outerWidth(true) / 1 + _this.opts.marginLeft / 1;
            var zoomDivTop = offset.top / 1;
            _this.$bigImg.css('position', 'absolute');
            _this.$zoomDiv.append(_this.$bigImg);
            _this.$zoomDiv.css({
                position: 'absolute',
                left: zoomDivLeft,
                top: zoomDivTop,
                zIndex: 999,
                width: boxWidth,
                height: boxHeight,
                overflow: 'hidden',
                border: '1px solid #eee',
                background: '#FFF'
            });
            $('body').append(_this.$zoomDiv);
        }

        function createMask() {
            _this.maskWidth = Math.ceil(boxWidth / _this.imgWidth * _this.elWidth);
            _this.maskHeight = Math.ceil(boxHeight / _this.imgHeight * _this.elHeight);
            _this.maskWidth > _this.elWidth && (_this.maskWidth = _this.elWidth);
            _this.maskHeight > _this.elHeight && (_this.maskHeight = _this.elHeight);
            _this.$mask || (_this.$mask = $('<div/>'));
            _this.$mask.css({
                position: 'absolute',
                background: 'rgba(238,130,34,.4) url("' + $_CONFIG.imgpath + '/images/shop/move.png") no-repeat center',
                width: _this.maskWidth,
                height: _this.maskHeight,
                cursor: 'none'
            });
            _this.$el.append(_this.$mask);
        }

    },
    bindEvent: function() {
        var _this = this;
        this.$el.on({
            'mouseenter': function() {
                _this.flag = true;
                var imgOrigin = _this.$sImg.attr(_this.opts.origin);
                var img = new Image();
                img.onload = function() {
                    if (_this.flag) {
                        _this.imgWidth = img.width;
                        _this.imgHeight = img.height;
                        _this.$bigImg = $(img);
                        _this.createHTML();
                        _this.flag = false;
                    }
                }
                img.src = imgOrigin;
            },
            'mouseleave': function() {
                if (_this.flag) {
                    _this.flag = false;
                } else {
                    _this.$zoomDiv && _this.$zoomDiv.remove();
                    _this.$mask && _this.$mask.remove();
                }

            },
            'mousemove': function(e) {
                if (!_this.$bigImg) {
                    return false;
                }
                var offset = _this.$el.offset();
                var maskW = _this.maskWidth;
                var maskH = _this.maskHeight;
                var left = e.pageX - offset.left - Math.ceil(maskW / 2);
                var top = e.pageY - offset.top - Math.ceil(maskH / 2);
                var maxX = _this.elWidth - maskW;
                var maxY = _this.elHeight - maskH;

                left = left < 0 ? 0 : left;
                top = top < 0 ? 0 : top;
                left = left > maxX ? maxX : left;
                top = top > maxY ? maxY : top;

                var bigLeft = -left * _this.imgWidth / _this.elWidth;
                var bigTop = -top * _this.imgHeight / _this.elHeight;

                _this.$mask.css({
                    left: left,
                    top: top
                });
                _this.$bigImg.css({
                    left: bigLeft,
                    top: bigTop
                });
            }
        });
    }
};

$.fn.imgZoom = function(options) {
    var defaults = {
        boxWidth: 360,
        boxHeight: 360,
        marginLeft: 5,
        origin: 'data-origin'
    };
    $.each(this, function(i, t) {
        var config = $.extend(defaults, options);
        config.$el = $(t);
        new ImgZoom(config);
    });
};