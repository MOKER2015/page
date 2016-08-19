/*
* file everywhere - 浏览器通用文件上传
* copyright->flowerszhong
* flowerszhong@gmail.com
* http://www.cnblogs.com/flowerszhong/
*/
(function($) {
    $.fn.fileSelect = function(options) {
        var defaults = {
            WrapWidth: 300,
            WrapHeight: 30,
            ButtonWidth: 70,
            ButtonHeight: 28,
            ButtonText: "浏览555",
            TextHeight: 28,
            TextWidth: 200
        };
        var options = $.extend(defaults, options);
        var browser_ver = $.browser.version.substr(0, 1);
        var displayMode = ($.browser.msie && browser_ver <= "7") ? "inline" : "inline-block";
        return this.each(function() {
            //创建包含，设置为相对定位
            var wrapper = $("<div class='fileWraper'>")
                            .css({
                                "width": options.WrapWidth + "px",
                                "height": options.WrapHeight + "px",
                                "display": displayMode,
                                "zoom": "1",
                                "position": "relative",
                                "overflow": "hidden",
                                "z-index":"1"
                            });
            //创建文本输入框，用于存放上传文件名称
			  var text = $('<span class='+options.InputCss+' type="text" />')
                             .css({
                                 "width": options.TextWidth + "px",
                                 "heigth": options.TextHeight + "px"
                             });
            //创建浏览按钮
            var button = $('<input class='+options.InputCss+' type="button" value="'+options.ButtonText+'"/>')
							.css({
                                 "width": options.ButtonWidth + "px",
                                 "heigth": options.ButtonHeight + "px"
                             });
                       //     .val(options.ButtonText);
            $(this).wrap(wrapper).parent().append(text, button);
            $(this).css({
                "position": "absolute",
                "top": "0",
                "left": "0",
                "z-index": "2",
                "height": options.WrapHeight + "px",
                "width": options.WrapWidth + "px",
                "cursor": "pointer",
                "opacity": "0.0",
                "outline":"0",
                "filter": "alpha(opacity:0)"
            });
            if ($.browser.mozilla) { $(this).attr("size", 1 + (options.WrapWidth - 85) / 6.5) }
				
			/*有问题，提交后，再选择文件，文件名不显示
			$(this).bind("change", function() {
                text.val($(this).val());
            });
			*/

			//修改以上问题
            $(document).ready(function(){
				$("#"+options.InputFileId).live("change",function(){
					//text.val($(this).val());
					text.html($(this).val().substring($(this).val().lastIndexOf("\\")+1));
				});
			});
        });
    };
})(jQuery);