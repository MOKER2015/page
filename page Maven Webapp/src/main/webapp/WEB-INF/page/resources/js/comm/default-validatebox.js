(function($) {
	$.extend(
		$.fn.validatebox.defaults.rules,{
				minLength : { // 判断最小长度
				    validator : function(value, param) {
				        return value.length >= param[0];
				    },
				    message : '最少输入 {0} 个字符。'
			    },
				selectTreeRequired : {
					validator : function(value, param) {
						return $(param[0]).siblings("span").find("input.textbox-value").val() != '';
					},
					message : '请选择'
				},
				selectRequired : {
					validator : function(value, param) {
						return $(param[0]).find("option:contains('" + value + "')").val() != '';
					},
					message : '请选择'
				},
				length : {
								validator : function(value, param) {
									var len = $.trim(value).length;
									return len >= param[0] && len <= param[1];
								},
								message : "输入内容长度必须介于{0}和{1}之间."
				},
				phone : {// 验证电话号码
								validator : function(value) {
									return /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}(13|15|18)\d{9}$)/
											.test(value);
								},
								message : '格式不正确,请使用下面格式:020-88888888'
				},
				mobile : {// 验证手机号码
								validator : function(value) {
									return /^(13|15|18|17)\d{9}$/i.test(value);
								},
								message : '手机号码格式不正确'
				},
				idcard : {// 验证身份证
								validator : function(value) {
									return /^\d{15}(\d{2}[A-Za-z0-9])?$/i
											.test(value);
								},
								message : '身份证号码格式不正确'
				},
				intOrFloat : {// 验证整数或小数
								validator : function(value) {
									return /^\d+(\.\d+)?$/i.test(value);
								},
								message : '请输入数字，并确保格式正确'
				},
				currency : {// 验证货币
								validator : function(value) {
									return /^\d+(\.\d+)?$/i.test(value);
								},
								message : '货币格式不正确'
				},
				currency_rule : { // 千分位货币格式
								validator : function(value, param) {

									value = value.replace(/,/g, "");
									return /^\d+(\.\d+)?$/i.test(value);
								},
								message : '货币格式不正确'
				},
				qq : {// 验证QQ,从10000开始
								validator : function(value) {
									return /^[1-9]\d{4,9}$/i.test(value);
								},
								message : 'QQ号码格式不正确'
				},
				integer : {// 验证整数
								validator : function(value) {
									return /^[+]?[1-9]+\d*$/i.test(value);
								},
								message : '请输入整数'
				},
				integer2 : {// 验证正整数
								validator : function(value) {
									return /^[+]?\d+$/i.test(value);
								},
								message : '请输入整数'
				},
				chinese : {// 验证中文
								validator : function(value) {
									return /^[\u0391-\uFFE5]+$/i.test(value);
								},
								message : '请输入中文'
				},
				english : {// 验证英语
								validator : function(value) {
									return /^[A-Za-z]+$/i.test(value);
								},
								message : '请输入英文'
				},
				unnormal : {// 验证是否包含空格和非法字符
								validator : function(value) {
									return /.+/i.test(value);
								},
								message : '输入值不能为空和包含其他非法字符'
				},
				username : {// 验证用户名
								validator : function(value) {
									return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i
											.test(value);
								},
								message : '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
				},
				faxno : {// 验证传真
								validator : function(value) {
									// return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[
									// ]){1,12})+$/i.test(value);
									return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i
											.test(value);
								},
								message : '传真号码不正确'
				},
				zip : {// 验证邮政编码
								validator : function(value) {
									return /^[1-9]\d{5}$/i.test(value);
								},
								message : '邮政编码格式不正确'
				},
				ip : {// 验证IP地址
								validator : function(value) {
									return /d+.d+.d+.d+/i.test(value);
								},
								message : 'IP地址格式不正确'
				},
				name : {// 验证姓名，可以是中文或英文
								validator : function(value) {
									return /^[\u0391-\uFFE5]+$/i.test(value)
											| /^\w+[\w\s]+\w+$/i.test(value);
								},
								message : '请输入姓名'
				},
				carNo : {
								validator : function(value) {
									return /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/
											.test(value);
								},
								message : '车牌号码无效（例：粤J12350）'
				},
				carenergin : {
								validator : function(value) {
									return /^[a-zA-Z0-9]{16}$/.test(value);
								},
								message : '发动机型号无效(例：FG6H012345654584)'
				},
				email : {
								validator : function(value) {
									return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
											.test(value);
								},
								message : '请输入有效的电子邮件账号'
				},
				msn : {
								validator : function(value) {
									return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
											.test(value);
								},
								message : '请输入有效的msn账号(例：abc@hotnail(msn/live).com)'
				},
				password : {
								validator : function(value, param) {
									var other = $(param[0]).val();
									return value == other;
								},
								message : "两次密码不一致"
				},
				password_rule : {
								validator : function(value, param) {
									return /^(?=.*\d.*)(?=.*[a-zA-Z].*).{6,50}$/
											.test(value);
								},
								message : "密码不合法（至少6位，必须有字母和数字）"
				},
				password_length : {
								validator : function(value, param) {
									var len = $.trim(value).length;
									return len >= param[0] && len <= param[0];
								},
								message : "密码必须为{0}位数"
				},
				upload_nonull : {
					            validator : function(value, param) {
						            return $(param[0]).val().length > 0;
					            },
					            message : "上传的内容不能为空!"
				},
				img_upload : {
								validator : function(value, param) {
									var ext = value.substring(value
											.lastIndexOf(".") + 1);
									return /(jpg|jpeg|gif|bmp|png)/i.test(ext);
								},
								message : "只允许上传jpg、gif、png、bmp格式的图片"
				},
				shortName : {// 产品简称
								validator : function(value) {
									return /^[a-zA-Z]{1,10}[0-9]{0,10}/i
											.test(value);
								},
								message : '产品简称不合法'
				},
				passport : {// 护照
								validator : function(value) {
									return /^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/
											.test(value);
								},
								message : '护照不合法'
				},
				range : {// 数值范围
								validator : function(value, param) {
									if (!/^[+]?[1-9]+\d*$/i.test(value))
										return false;

									var intVal = parseInt(value);
									var minVal = parseInt(param[0]);
									var maxVal = parseInt(param[1]);

									return intVal >= minVal && intVal <= maxVal;
								},
								message : "只能输入 {0} 和 {1} 之间的整数"
				},
				negativeIntOrFloat : {// 验证整数或小数,可为负数
								validator : function(value) {
									return /^(-)?\d+(\.\d+)?$/i.test(value);
								},
								message : '请输入数字，并确保格式正确'
				}
		});
})(jQuery);