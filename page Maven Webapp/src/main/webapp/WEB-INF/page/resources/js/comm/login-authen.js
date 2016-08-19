function authen(utype, uid, path){
	 var parms = {};
	 parms.utype = utype;
	 parms.uid = uid;
	 
	 var contextPath = typeof(path) == 'undefined' ? 'rcw' : path;
	 
	 $.getJSON(contextPath + '/thirdParty/authen?t=' + new Date(), parms, function(callback){	 
		 if(callback.result == 1){
			 top.window.open(callback.url + "/authen?code=" + callback.msg);
		 }else{
			 alert('登录失败!');
		 }		 	
	 });
}