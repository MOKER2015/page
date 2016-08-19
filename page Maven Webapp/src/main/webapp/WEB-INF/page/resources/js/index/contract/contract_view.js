$(function(){ 
 
    
	    //广告产品预览
		$("#table_ad").datagrid({ 
		title:'', 
		iconCls:'icon-edit',  
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
		{field:'comment',title:'备注',width:100,editor:'text'} 
		 
		]]   
		}).datagrid('acceptChanges'); 
		
		//增值线下预览
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
				{field:'times',title:'点数',width:60},  
				{field:'usetimes',title:'已使用',width:60},  
				{field:'validtimes',title:'剩余有效次数/点数',width:60,editor:'numberbox'},  
				{field:'validate',title:'有效期至',width:80,editor:'datebox'}, 
				{field:'comment',title:'备注',width:100,editor:'text'}
			]] 
			}).datagrid('acceptChanges'); 
		
		 //支付通月数查看
		$("#table_month").datagrid({ 
			title:"", 
			iconCls:"icon-edit",  
			singleSelect:true, 
			pagination:true,
			rownumbers:true,
			fit:true,
			columns:[[
			{field:"id",title:"id",width:50 ,hidden:true}, 
			{field:"monthsQty",title:"月数",width:20},  
			{field:"memo",title:"设置时间",width:80,align:"center" },
			{field:"times",title:"小服务期总点数",width:50,align:"center" },
			{field:"validTimes",title:"小服务期有效点数",width:50,align:"center" },
			{field:"monthStatus",title:"月数状态",width:20,align:"center"  ,
				formatter:function(value,row,index){ 
				   if(value=="3"){
				     return "已执行";
				   }else if(value=="2"){
				    return "正在执行";
				   }else{
				    return "待执行";
				   }
	 			
				}  
			},
			]]  
			}).datagrid("acceptChanges"); 
		
 		 
   }); 

  

   

   
  
  
  