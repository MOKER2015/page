function DefaultWinForm(){
};

DefaultWinForm.prototype = {
    submit : function(parms){
    	parms = $.extend({
    		formId : 'form',
    		type : "post",
    		dataType : 'json',
    		callBack : true,
    		close : true,
    		msg : '正在提交数据,请等待...',
    		onBeforeSubmit : function(){
    			return true;
    		}
		}, parms);
    	
    	$("#"+parms.formId).ajaxSubmit({
			type:parms.type,
			dataType:parms.dataType,
			beforeSend:function(){
				if(!parms.onBeforeSubmit()){
					return false;
				}
				if (!$(parms.formId).form('validate')){
					alert('请完善输入项!');return false;
				}
				
				$.showMessager.progress({
				    msg : parms.msg
				}); 
			},
			success: function(rs) {
				if(rs.status=="fault"){
					$.showMessager.progress('close');
					$.showMessager.show({
					    msg : rs.message
					}); 
				}else{
					$.showMessager.progress('close');
					if(parms.callBack) { callBack(rs); }
					if(parms.close) { closeDialog(); }
				}
			}
		});
    }
};

var defaultWinForm = null;
$(function(){
	defaultWinForm = new DefaultWinForm();
    
    $('.submit').click(function(){
    	var parms = {};
    	if(typeof $(this).attr('mydata-options') != 'undefined'){
    		var data = $(this).attr('mydata-options');
    		parms=eval('({' + data + '})');
    	}
    	defaultWinForm.submit(parms);
	});
    
    $('.close').click(function(){
    	closeDialog(dialogId);
	}); 
});