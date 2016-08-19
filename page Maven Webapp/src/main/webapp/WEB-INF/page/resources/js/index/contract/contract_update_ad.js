$(function(){ 
 
    
    
		$("#table_ad").datagrid({ 
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
		{field:'times',title:'点数',width:60},  
		{field:'usetimes',title:'已使用',width:60},  
		{field:'validtimes',title:'剩余有效次数/点数',width:60,editor:'numberbox'},  
		{field:'validate',title:'有效期至',width:80,editor:'datebox'}, 
		{field:'comment',title:'备注',width:100,editor:'text'}, 
		{field:'action',title:'操作',width:70,align:'center', 
		formatter:function(value,row,index){ 
		if (row.editing){ 
		var s = '<a href="#" onclick="saverow('+index+')">保存</a> '; 
		var c = '<a href="#" onclick="cancelrow('+index+')">取消</a>'; 
		return s+c; 
		} else { 
		var e = '<a href="#" onclick="editrow('+index+')">编辑</a> '; 
		var d = '<a href="#" onclick="deleterow('+index+')">删除</a>'; 
		return e+d; 
		} 
		} 
		} 
		]], 
		/*toolbar:"#tbar1"[{
	    id:'ad_add',
		text:'增加', 
		iconCls:'icon-add', 
		handler:addrow 
		} ,{ 
		text:'保存', 
		iconCls:'icon-save', 
		handler:saveall 
		} ,{ 
		text:'全部清空', 
		iconCls:'icon-cancel', 
		handler:cancelall 
		}], */
		onBeforeEdit:function(index,row){ 
		row.editing = true; 
		$('#table_ad').datagrid('refreshRow', index); 
		editcount++; 
		}, 
		onAfterEdit:function(index,row){ 
		row.editing = false; 
		$('#table_ad').datagrid('refreshRow', index); 
		editcount--; 
		}, 
		onCancelEdit:function(index,row){ 
		row.editing = false; 
		$('#table_ad').datagrid('refreshRow', index); 
		editcount--; 
		} 
		}).datagrid('acceptChanges'); 
		//}).datagrid('loadData',users).datagrid('acceptChanges'); 
		
		
		 
   }); 


   var editcount = 0; 
	function editrow(index){ 
		$('#table_ad').datagrid('beginEdit', index); 
	} 
	function deleterow(index){ 
		/* $.messager.confirm('确认','是否删除当前行?',function(r){ 
			if (r){  */
				$('#table_ad').datagrid('deleteRow', index); 
				var rows= $("#table_ad").datagrid("getRows");
				$("#table_ad").datagrid("loadData", rows);
 		/* 	} 
		});  */
		
	} 
	function saverow(index){ 
		$('#table_ad').datagrid('endEdit', index); 
	} 
	function cancelrow(index){ 
		$('#table_ad').datagrid('cancelEdit', index); 
		
	} 

	 
	function cancelall(){ 
		$('#table_ad').datagrid('rejectChanges'); 
		 
	} 
	
  	//添加行
	function addrow(){ 
 	  if (!$("#conAddvert").form('validate')){
		 alert("请输入必填项！");
		 return false;
	  }
		if (editcount > 0){ 
		$.messager.alert('警告','当前还有'+editcount+'记录正在编辑，不能增加记录。'); 
		return; 
	} 
	$("#table_ad").datagrid('appendRow',{ 
		adId:$("#TypeAdvert").val(), 
		adName:$("#TypeAdvert").find("option:selected").text(), 
		times:$("#times").val(), 
		validate:$("#validate").datebox("getValue"), 
		comment:$("#comment").val()
		}); 
		
      $("#conAddvert").form("clear");	
      //已经添加的记录
     
 	} 
  
  
  