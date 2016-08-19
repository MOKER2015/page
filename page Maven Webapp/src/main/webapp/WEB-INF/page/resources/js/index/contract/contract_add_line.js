$(function(){  
		$("#table_line").datagrid({ 
		title:'', 
		iconCls:'icon-edit', 
	  	/* width:530, 
		height:50,    */
		singleSelect:true, 
		pagination:true,
		rownumbers:true,
		fit:true,
		columns:[[ 
		{field:'adId',title:'广告id',width:50  /* ,hidden:true  */}, 
		{field:'adName',title:'广告名称',width:60}, 
		{field:'times',title:'点数',width:60,editor:'numberbox'},  
		{field:'validate',title:'有效期至',width:80,editor:'datebox'}, 
		{field:'comment',title:'备注',width:100,editor:'text'}, 
		{field:'alinas',title:'调用名称',width:20 ,hidden:true  }, 
		{field:'action',title:'操作',width:70,align:'center', 
		formatter:function(value,row,index){ 
			if(value=="add"){
		    	if (row.editing){ 
		    		var s = '<a href="#" onclick="saverow_line('+index+')">保存</a> '; 
		    		var c = '<a href="#" onclick="cancelrow_line('+index+')">取消</a>'; 
		    		return s+c; 
		    		} else { 
		    		var e = '<a href="#" onclick="editrow_line('+index+')">编辑</a> '; 
		    		var d = '<a href="#" onclick="deleterow_line('+index+')">删除</a>'; 
		    		return e+d; 
		    		}  
		    }else{
		    	return "";
		    }	 
		} 
		} 
		]], 
		toolbar:[{ 
		text:'增加', 
		iconCls:'icon-add', 
		handler:addrow_line 
		}/* ,{ 
		text:'保存', 
		iconCls:'icon-save', 
		handler:saveall 
		} */ ], 
		onBeforeEdit:function(index,row){ 
		row.editing = true; 
		$('#table_line').datagrid('refreshRow', index); 
		editcount_line++; 
		}, 
		onAfterEdit:function(index,row){ 
		row.editing = false; 
		$('#table_line').datagrid('refreshRow', index); 
		editcount_line--; 
		}, 
		onCancelEdit:function(index,row){ 
		row.editing = false; 
		$('#table_line').datagrid('refreshRow', index); 
		editcount_line--; 
		} 
		}).datagrid('acceptChanges'); 
		//}).datagrid('loadData',users).datagrid('acceptChanges'); 
		
		
		
		initAddvertType_Line();
   }); 


   var editcount_line = 0; 
	function editrow_line(index){ 
		$('#table_line').datagrid('beginEdit', index); 
	} 
	function deleterow_line(index){ 
		/* $.messager.confirm('确认','是否删除当前行?',function(r){ 
			if (r){  */
				$('#table_line').datagrid('deleteRow', index); 
				var rows= $("#table_line").datagrid("getRows");
				$("#table_line").datagrid("loadData", rows);
				initAddvertType_Line();
		/* 	} 
		});  */
		
	} 
	function saverow_line(index){ 
		$('#table_line').datagrid('endEdit', index); 
	} 
	function cancelrow_line(index){ 
		$('#table_line').datagrid('cancelEdit', index); 
		
	} 

	 
	 
  	//添加行
	function addrow_line(){ 
      
	  if (!$("#conLine").form('validate')){
		 alert("请输入必填项！");
		 return false;
	  }
	  if (editcount_line > 0){ 
		$.messager.alert('警告','当前还有'+editcount_line+'记录正在编辑，不能增加记录。'); 
		return; 
	  } 
	  //防止添加重复的类型
	  var rows=$("#table_line").datagrid("getRows");
	  for(var i=0;i<rows.length;i++){ 
	         if($("#TypeLine").val()==rows[i].adId){
	           $.messager.alert('警告',rows[i].adName+'已经存在表格中，不能重复增加记录。'); 
	     		return;  
	         }
	   		
	   }	
		
	$("#table_line").datagrid('appendRow',{ 
		adId:$("#TypeLine").val(), 
		adName:$("#TypeLine").find("option:selected").text(), 
		times:$("#times_line").val(), 
		validate:$("#validate_line").datebox("getValue"), 
		comment:$("#comment_line").val(),
		alinas:$("#TypeLine").find("option:selected").attr("alinas"),
		action:"add"
		}); 
		
      $("#conLine").form("clear");	
      //已经添加的记录
     
       initAddvertType_Line();	
	} 
  
  
 //初始化广告名称下拉
 function initAddvertType_Line(){
 
    var rows = $("#table_line").datagrid("getRows");
     var adIds = "";
     for(var i=0;i<rows.length;i++){ 
         if(i==0){
          adIds =rows[i].adId;
         }else{
          adIds = adIds + "," + rows[i].adId;
         }
   		
	 }
 
 
   $("#TypeLine").empty();
    $.getJSON(contextpath+"/contract/getConTypeAdd?type=2&adIds=" + adIds,
			         function(data) {
							if (data.length == 0) {
								$.showMessager.show({
									msg : '没有新产品啦!'
								});
								return;
							}
 							$.each(data, function(i, item) {
							   if(i==0){
							      $("#TypeLine").append("<option value=''>请选择</option>");
							   }			
						        $("#TypeLine").append("<option value='"+item.id+"' alinas='"+item.alinas+"'>"
										+ item.name + "</option>");
						        				
							});
							$("#TypeLine").validatebox({
								required : true
							});
 
						});
 } 