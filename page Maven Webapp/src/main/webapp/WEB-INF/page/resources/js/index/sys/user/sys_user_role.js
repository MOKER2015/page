$(function(){
var leftSel = $("#selectL");
	var rightSel = $("#selectR");
	 
	$("#toright").bind("click",function(){		
		leftSel.find("option:selected").each(function(){
			$(this).remove().appendTo(rightSel);
		});
	});
	$("#toleft").bind("click",function(){		
		rightSel.find("option:selected").each(function(){	
			$(this).remove().appendTo(leftSel);
		});
	});
	leftSel.dblclick(function(){
		$(this).find("option:selected").each(function(){	    
			
			$(this).remove().appendTo(rightSel);
			 
		});
	});
	rightSel.dblclick(function(){
		$(this).find("option:selected").each(function(){
			$(this).remove().appendTo(leftSel);
		});
	});
		
   $("#addone").click(function(){
	leftSel.find("option:selected").each(function(){
			$(this).remove().appendTo(rightSel);
		});
	});
	
   $("#addall").click(function(){
		$("#selectL option").each(function () {
	    var $option = $(this);
	     $option.remove().appendTo(rightSel);
   		});
	});	
  
  $("#removeone").click(function(){
	rightSel.find("option:selected").each(function(){	
			$(this).remove().appendTo(leftSel);
		});
	});

   $("#removeall").click(function(){
		$("#selectR option").each(function () {
	    var $option = $(this);
	     $option.remove().appendTo(leftSel);
   		});
	});	
	
	$("#sub").click(function(){
		var selVal = [];
		rightSel.find("option").each(function(){
			selVal.push(this.value);
		});
		selVals = selVal.join(",");
		//selVals = rightSel.val();
		if(selVals==""){
			alert("没有选择任何项！");
		}else{
			alert(selVals);
		}
	});
});


$(function(){ 
  
 var base = document.getElementById("base").href;
//加载左边列表 
  $("#selectL").ready(function(){
    $.ajax({
     type: "POST",
     dataType: "json", 
     url:base+'/' +"sys/roles/getnotexistsRolesbyuser",
      data: {username:$("#username").val()},
      success: function(data){
         // var jsonObj=eval("("+data+")"); 
         var jsonObj=data;
         $.each(jsonObj, function (i, item) { 
               jQuery("#selectL").append("<option value="+ item.id+">"+ item.role+"</option>");
               }); 
               }
          });                                     
     });
    
   //加载右边列表
  $("#selectR").ready(function(){ 
    $.ajax({
     type: "POST",
      dataType: "json", 
     url: base+'/' +"sys/roles/getexistsRolesbyuser",
     data: {username:$("#username").val()},
      success: function(data){
          //var jsonObj=eval("("+data+")"); 
          var jsonObj=data; 
         $.each(jsonObj, function (i, item) { 
               jQuery("#selectR").append("<option value="+ item.id+">"+ item.role+"</option>");
               }); 
               }
          }) ;                                    
     });
     
     //点击搜索查询
    $("#btn_sel").click(function(){ 
    
    	var  value=$('#selflag option:selected') .val();//选中的值
    	//value=0 未选中  value=1 选中
    	if (value=='0'){ 
    		   $.ajax({
    			     type: "post",  
    			     url: base+'/' +"sys/roles/getnotexistsRolesbyuser",
    			      data: {username:$("#username").val(),role:$("#inputrole").val()},
    			      success: function(data){
    			      //情况旧数据
    			         var obj=document.getElementById("selectL"); 
    		                obj.options.length=0;
    		              
    			          var jsonObj=eval("("+data+")"); 
    			               $.each(jsonObj, function (i, item) {
    			               jQuery("#selectL").append("<option value="+ item.id+">"+ item.role+"</option>");
    			               }); 
    			               }
    			          });  
    		
    	}else if(value=='1'){
    		$.ajax({
			     type: "post",  
			     url: base+'/' +"sys/roles/getexistsRolesbyuser",
			      data: {username:$("#username").val(),role:$("#inputrole").val()},
			      success: function(data){
			      //情况旧数据
			         var obj=document.getElementById("selectR"); 
		                obj.options.length=0;
		              
			          var jsonObj=eval("("+data+")"); 
			               $.each(jsonObj, function (i, item) {
			               jQuery("#selectR").append("<option value="+ item.id+">"+ item.role+"</option>");
			               }); 
			               }
			          }); 
    	}
    
    	
	                                    
	     });

       } 
     );