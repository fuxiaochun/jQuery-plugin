/**
 * jQuery插件 v2
 * textarea 高度自适应，控制最大高度
 * @author Xiaochun
 */
(function($) {
	$.fn.tah = function(maxHeight){
		var maxH = typeof maxHeight === 'undefined' ? 200 : maxHeight;
		this.each(function(k,t){
			var $t = $(t);
			var pt = parseInt($t.css('paddingTop'));
			var pb = parseInt($t.css('paddingBottom'));

			$t.on('focus blur input propertychange',function(){
				$t.height('auto');
				var sh = $t[0].scrollHeight;
				var inH = sh - pt - pb;
				if (inH >= maxH) {
					$t.height(maxH);
				}else{
					$t.height(inH);
				}
			});
		});
	}
})(jQuery);