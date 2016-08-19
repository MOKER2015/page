(function($) {
	$.fn.extend({
		upload:function(options) {
			 
			var defaults = {
            'buttonText'		: "选择文件",
			'auto'				: false,
			'formData'			: '',
			'progressBar'		: true,
			'onSelect'			: uploadify_onSelect,
			'onSelectError'		: uploadify_onSelectError,
			'onUploadError'		: uploadify_onUploadError,
			'onUploadSuccess'	: uploadify_onUploadSuccess,
			'pluginPath'		: '',
			'multi'				: false,
			'fileSizeLimit'		: '500KB',
			'fileTypeExts'		: '*.jpg;*.jpge;*.gif;*.png',
			
        };
        var options = $.extend(defaults, options);
       
			var selector = this.selector;
			$(selector).uploadify({
				'swf'				: options.pluginPath +'/uploadify.swf',	//控件flash文件位置
				'uploader'			: options.uploader,						//处理请求的地址
				'formData'			: options.formData,						//提交的数据
				'width'				: options.width,						//按钮宽度
				'height'			: options.height,						//按钮高度
				'itemTemplate'		: options.itemTemplate,					//使用的模版
				'progressBar'		: options.progressBar,					//是否显示进度条
				'fileTypeDesc'		: '指定类型文件',						//限制上传文件类型说明
				'fileTypeExts'		: options.fileTypeExts,					//控制可上传文件的扩展名，启用本项时需同时声明fileDesc 
				'fileObjName'		: 'myFile',								//文件对象名称,用于后台获取文件对象时使用
				'buttonText'		: options.buttonText,					//上传按钮显示内容，还有个属性可以设置按钮的背景图片
				'fileSizeLimit'		: options.fileSizeLimit,				//文件大小
				'multi'				: options.multi,						//是否允许多个文件
				'buttonClass'		: options.buttonClass,					//按钮样式
				'auto'				: options.auto,							//选择文件后是否自动上传
				'overrideEvents'	: [ 'onDialogClose', 'onUploadSuccess', 'onUploadError', 'onSelectError' ],//重写默认方法
				'onFallback'		: function() {			//检测FLASH失败调用
					alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");
				},
				//以下方法是对应overrideEvents的重载方法
				'onSelect'			: options.onSelect,
				'onSelectError'		: options.onSelectError,
				'onUploadError'		: options.onUploadError,
				'onUploadSuccess'	: options.onUploadSuccess,
			});
		}   
	});
})(jQuery);

