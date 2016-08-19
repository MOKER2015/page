//保存订阅
$(document).ready(function(){
	$("#subscribe").click(function(){
		saveSubscribe($(this).attr("cp"));
	});
});
function saveSubscribe(contextPath){
	if(!checkSubscribe()) return;
	
	var data = $("#baseInfo").serializeArray();
/*	$.each(data, function(i, field){
      	alert(field.name+"="+field.value+"=");
    	});*/
	$.ajax({
		url : contextPath+"/resume/saveUserInfo",
		data : data,
		async : false,
		type : "post",
		dataType : "json",
		cache : false,
		error : function(XMLHttpRequest, textStatus, errorThrown){
			alert("保存失败");
		},
		success : function(res, textStatus){
			alert("保存成功");
		}
	});
}

function checkSubscribe(){
		//验证是否输入职位名称
	if($("#keyWord").val().length<=0){
		alert("请输入要选择的职位名称！");
		return false;
	}
	$("#expWorkplace").attr("value",$("#expWorkplaceBut").val());
	//验证是否选择地区
	if($("#workPlaceId").val().length<=0){
		alert("请选择地区");
		$("#expSalary").focus();
		return false;
	}
	//验证是否选择职能类别
	if($("#expWorkId").val().length<=0){
		alert("请选择期望的工作类别");
		return false;
	}
    //验证是否选择行业类别

    //验证是否选择刷新范围

	//验证是否选择工作年限

	//验证是否选择月薪范围

	//验证是否选择公司性质

	//验证是否选择邮箱职位订阅

    //验证是否选择发送邮箱

	//验证是否选择发送周期

	//验证是否选择发送数量


	$("#expWork").attr("value",$("#expWorkBut").val());
	$("#expIndustry").attr("value",$("#expIndustryBut").val()!=$("#expIndustryBut").attr("data-default")?$("#expIndustryBut").val():"");
	return true;
}