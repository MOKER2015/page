(function($) {
	if (!String.prototype.trim) {
		String.prototype.trim = function() {
			return this.replace(TRIM_REG, '');
		};
		$.extend(String.prototype, {
			trim : function() {
				return this.replace(/(^\s*)|(\s*$)/g, "");
			}
		});
	}

	/**
	 * 
	 * 使用例子：
	 * var time = new Date();
	 * dt = time.format("yyyy-MM-dd HH:mm:ss"); 或
	 * dt = time.format("yyyy-MM-dd hh:mm:ss");
	 * 
	 */
	Date.prototype.format = function(format)
	{
		/*
		 * 
		 * format="yyyy-MM-dd hh:mm:ss";
		 * 
		 */
		var o = {
			"M+" : this.getMonth() + 1,
			"d+" : this.getDate(),
			"h+" : this.getHours(),
			"H+" : this.getHours(),
			"m+" : this.getMinutes(),
			"s+" : this.getSeconds(),
			"q+" : Math.floor((this.getMonth() + 3) / 3),
			"S" : this.getMilliseconds()
		};

		if (/(y+)/.test(format)){
			format = format.replace(RegExp.$1, (this.getFullYear() + "")
					.substr(4 - RegExp.$1.length));
		}

		for ( var k in o){
			if (new RegExp("(" + k + ")").test(format)){
				format = format.replace(RegExp.$1, RegExp.$1.length == 1
				? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}

		return format;
	};

	$.extend(Array.prototype, {
		contains : function(element) {
			for ( var i = 0; i < this.length; i++) {
				if (this[i] == element) {
					return true;
				}
			}
			return false;
		},
		indexOf : function(o) {
			for ( var i = 0, len = this.length; i < len; i++) {
				if (this[i] == o)
					return i;
			}
			return -1;
		},
		remove : function(o) {
			var index = this.indexOf(o);
			if (index != -1) {
				this.splice(index, 1);
			}
			return this;
		}
	});
	
	
	//全局ajax处理
    $.ajaxSetup({
        complete: function (jqXHR,type) {
        	if(type=='parsererror'){
        		getJavaScript(jqXHR.responseText);
        	}
        },
        data: {
            __isajax__: true
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //请求失败处理
            //alert(errorThrown ? errorThrown : '操作失败');
            $.showMessager.progress('close');
        },
        beforeSend: function (xhr) {
        　　　　//可以设置自定义标头
        　　　　xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        　　  },
    });
    
    (function() {
        Math.uuid = function (len, radix) {
        };

        Math.uuidFast = function() {
          var chars = CHARS, uuid = new Array(36), rnd=0, r;
          for (var i = 0; i < 36; i++) {
            if (i==8 || i==13 ||  i==18 || i==23) {
               uuid[i] = '-';
            } else if (i==14) {
               uuid[i] = '4';
            } else {
               if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
               r = rnd & 0xf;
               rnd = rnd >> 4;
               uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
           }
         }
         return uuid.join('');
       };

       // A more compact, but less performant, RFC4122v4 solution:
       Math.uuidCompact = function() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
             var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
             return v.toString(16);
          });
       };
    })();
    
    $.extend({
    	getUUID:function (len) {  
			 len = len || 32;  
			 var $chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; 
			 var maxPos = $chars.length;  
			 var pwd = '';  
			 for (var i = 0; i < len; i++) {  
				 pwd += $chars.charAt(Math.floor(Math.random() * maxPos));  
			 }  
			 return pwd.toLowerCase();  
		  },  
		  showMessager : {
				show : function(option) {
					var defaultOptions = {
						title : '提示信息',
						msg : '',
						timeout : 2000,
						showType : 'slide',
						style : {
							right : '',
							top : document.body.scrollTop + document.documentElement.scrollTop,
							bottom : ''
						}
					};
					$.extend(defaultOptions, option);
					top.$.messager.show(defaultOptions);
				},
				progress : function(msg) {
					top.$.messager.progress(msg);
				},
				confirm : function(title, msg, callback) {
					top.$.messager.confirm(title, msg, callback);
				}
		},
		getCallbackData : function(key, value) {
				if (value === undefined) {
					return top.$("body").data(key);
				}
				return top.$("body").data(key, value);
		},
		removeCallbackData : function(key, value) {
				return top.$("body").removeData(key, value);
		}
    });
})(jQuery);
