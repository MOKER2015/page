
function LoadListBox(urlsel,urlL,urlR,urlsave,filterparm){
	//divWindow = new DivWindow();
	/*参数 urlsel：搜索参数url
	 * urlL:左边列表参数URL、
	 *urlR:右边列表参数url
	 * urlSave：保存参数url
	 * filterparm 列表初始化过滤字段
	 * */	
	
	
	//创建界面
	loadWin(urlsel,urlL,urlR,urlsave); 

	//加载数据
	 
	 
	//用户角色提交  带<option>标签获取
	$('.optsubmit').click(function() {
		var parms = {};
		if (typeof $(this).attr('mydata-options') != 'undefined') {
			var data =$(this).attr('mydata-options');
			parms = eval('({' + data + '})');
		}
		parms = $.extend({
			type : "POST",
			dataType : 'json',
			reload : true,
			success : function(json) {
				$.showMessager.progress('close');
				$.showMessager.show({
					msg : json.message
				});
				
			}
		}, parms);

		   var ids = [];
		 
			var nodes = document.getElementById("selectR").options;
			if (nodes.length > 0) {
				var ids = [];
				for ( var i = 0; i < nodes.length; i++) {
					ids.push($.trim(nodes[i].value));
 				}
				parms.data = {};
				parms.data['rigthids'] = ids;
				parms.data['filtername']=filterparm;
			} else {
				/*$.showMessager.show({
					msg : '请选择要保存的记录！'
				});
				return;*/
				parms.data = {};
				parms.data['rigthids'] = ['0'];
				parms.data['filtername']=filterparm;
			}
		   
			parms.success = function(rs) {
				if (rs.status == 'succ') {					
					closeDialog(dialogId);
				}
			};
	    $.ajax(parms);
			 
		 
	});
 
 
 
 
//加载左边列表 
  $("#selectL").ready(function(){ 
    $.ajax({
     type: "POST",
     dataType: "json", 
    // url:base+'/' +"sys/roles/getnotexistsRolesbyuser",
     url:urlL,
      data: {filparm:filterparm},
      success: function(data){
         // var jsonObj=eval("("+data+")"); 
         var jsonObj=data;
         $.each(jsonObj, function (i, item) { 
               jQuery("#selectL").append("<option value="+ item.key+">"+ item.value+"</option>");
               }); 
               }
          });                                     
     });
    
   //加载右边列表
  $("#selectR").ready(function(){ 
    $.ajax({
     type: "POST",
      dataType: "json", 
    // url: base+'/' +"sys/roles/getexistsRolesbyuser",
       url: urlR,
     data: {filparm:filterparm},
      success: function(data){
          //var jsonObj=eval("("+data+")"); 
          var jsonObj=data; 
         $.each(jsonObj, function (i, item) { 
               jQuery("#selectR").append("<option value="+ item.key+">"+ item.value+"</option>");
               }); 
               }
          }) ;                                    
     });
     
     //点击搜索查询
    $("#btn_sel").click(function(){ 
	    $.ajax({
	     type: "post",  
      //  url: base+'/' +"sys/roles/getnotexistsRolesbyuser",
	     url:urlsel,
	      data: {filparm:filterparm,selparm:$("#inputname").val()},
	      success: function(data){
	      //情况旧数据
	         var obj=document.getElementById("selectL"); 
                obj.options.length=0; 
	          //var jsonObj=eval("("+data+")"); 
	          var jsonObj=data; 
	               $.each(jsonObj, function (i, item) {
	               jQuery("#selectL").append("<option value="+ item.key+">"+ item.value+"</option>");
	               }); 
	               }
	          });                                     
	     });
    
    
  /*****************  列表点击移动事件  *******************/
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
	
	
};
/*); */


function loadWin(urlsel,urlL,urlR,urlSave){
	  /**************顶部搜索框div start************************/
	  var divtop = document.createElement("div");
	  document.getElementById("newdiv").appendChild(divtop); 
	  divtop.setAttribute('data-options',"region:'north',border:false"); 
	  var divtop1=document.createElement("div");
	  divtop.appendChild(divtop1);
	  divtop1.className='easyui-panel';
	  divtop1.style.background ='#e6efff'; 
	  divtop1.style.padding= '5px'; 
	  divtop1.style.height= '30px'; 
	  var topinput1=document.createElement("input"); 
	  var topinput2=document.createElement("input");
	  topinput1.id='inputname';
	  topinput1.name='selusername';
	  topinput1.className ='text_sr'; 
	  topinput2.id='btn_sel';
	  topinput2.className='btn_search';
	 // topinput2.setAttribute("onmousedown","selonclick()");//点击事件
	  topinput2.type='button';
	  divtop1.appendChild(topinput1);
	  divtop1.appendChild(topinput2);
	  /**************顶部搜索框div end************************/
	  
	  
	  /**************中间div start************************/
	  var divcenter=document.createElement("div");
	  document.getElementById("newdiv").appendChild(divcenter);
	  divcenter.setAttribute('data-options',"region:'center',border:false,height:140px"); 
	  divcenter.style.background='#e6efff';
	  divcenter.style.height='230px';
	  //左边框区域
	  var divcenter1=document.createElement("div");
	  divcenter.appendChild(divcenter1);
	  divcenter1.className='t_szFlo1F';
	  var p_center=document.createElement("p");
	  divcenter1.appendChild(p_center);
	  p_center.className='SelP';
	  p_center.innerHTML='<p class="SelP">未选中：</p>';
	  var seletionL=document.createElement("select");
	  divcenter1.appendChild(seletionL);
	  seletionL.id='selectL';
	  seletionL.name='selectL';
	  seletionL.setAttribute('multiple',"multiple"); 
	  
	  //中间按钮区域
	  var divcenter2=document.createElement("div");
	  divcenter.appendChild(divcenter2);
	  divcenter2.className='t_szChoBtn';
	  var centerbutton1=document.createElement("input"); 
	  var centerbutton2=document.createElement("input"); 
	  var centerbutton3=document.createElement("input");
	  var centerbutton4=document.createElement("input");
	  divcenter2.appendChild(centerbutton1);
	  divcenter2.appendChild(centerbutton2);
	  divcenter2.appendChild(centerbutton3);
	  divcenter2.appendChild(centerbutton4);
	  centerbutton1.id='addone';
	  centerbutton1.className='btn_AddOne';
	  centerbutton1.type='button';
      centerbutton2.id='addall';
	  centerbutton2.className='btn_AddAll';
	  centerbutton2.type='button';
	  centerbutton3.id='removeone';
	  centerbutton3.className='btn_RemoveOne';
	  centerbutton3.type='button';
	  centerbutton4.id='removeall';
	  centerbutton4.className='btn_RemoveAll';
	  centerbutton4.type='button';
	  
	  //右边框区域
	  var divcenter3=document.createElement("div");
	  divcenter.appendChild(divcenter3);
	  divcenter3.className='t_szFlo1F';
	  var p_center_R=document.createElement("p");
	  divcenter3.appendChild(p_center_R);
	  p_center_R.className='SelP';
	  p_center_R.innerHTML='<p class="SelP">已选中：</p>';
	  var seletionR=document.createElement("select");
	  divcenter3.appendChild(seletionR);
	  seletionR.id='selectR';
	  seletionR.name='selectR';
	  seletionR.setAttribute('multiple',"multiple"); 
	  
	 /**************中间div end************************/
	 /**************底层div 确定取消 start*****************/
	  var divbottom=document.createElement("div");
	  document.getElementById("newdiv").appendChild(divbottom);
	  divbottom.setAttribute('data-options',"region:'south',border:false"); 
	  divbottom.style.background='#e6efff';
	  divbottom.style.height='50px';
	  divbottom.style.textAlign='right';
	  divbottom.style.padding='5px 5px 5px 15px';
 
	  
	  var okbtn_ok=document.createElement("a"); 
	  var okbtn_cancel=document.createElement("a"); 
	     divbottom.appendChild(okbtn_ok);
	     divbottom.appendChild(okbtn_cancel);
         //确定按钮
		 okbtn_ok.setAttribute("mydata-options","url:'"+urlSave+"'"); 
		 okbtn_ok.setAttribute("data-options","iconCls:'icon-ok'");
	 	 okbtn_ok.style.width='80px';   
		 okbtn_ok.style.href='javascript:void(0)'; 
	 	 okbtn_ok.className='easyui-linkbutton optsubmit';
	 	 //取消按钮
 	     okbtn_cancel.setAttribute("data-options","iconCls:'icon-cancel'");
	     okbtn_cancel.style.width='80px';   
	     okbtn_cancel.href='javascript:closeDialog(dialogId);'; 
	     okbtn_cancel.className='easyui-linkbutton close';
	 
	 
	 

	 /**************底层div 确定取消 end*****************/
	};
