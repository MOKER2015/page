//���涩��
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
			alert("����ʧ��");
		},
		success : function(res, textStatus){
			alert("����ɹ�");
		}
	});
}

function checkSubscribe(){
		//��֤�Ƿ�����ְλ����
	if($("#keyWord").val().length<=0){
		alert("������Ҫѡ���ְλ���ƣ�");
		return false;
	}
	$("#expWorkplace").attr("value",$("#expWorkplaceBut").val());
	//��֤�Ƿ�ѡ�����
	if($("#workPlaceId").val().length<=0){
		alert("��ѡ�����");
		$("#expSalary").focus();
		return false;
	}
	//��֤�Ƿ�ѡ��ְ�����
	if($("#expWorkId").val().length<=0){
		alert("��ѡ�������Ĺ������");
		return false;
	}
    //��֤�Ƿ�ѡ����ҵ���

    //��֤�Ƿ�ѡ��ˢ�·�Χ

	//��֤�Ƿ�ѡ��������

	//��֤�Ƿ�ѡ����н��Χ

	//��֤�Ƿ�ѡ��˾����

	//��֤�Ƿ�ѡ������ְλ����

    //��֤�Ƿ�ѡ��������

	//��֤�Ƿ�ѡ��������

	//��֤�Ƿ�ѡ��������


	$("#expWork").attr("value",$("#expWorkBut").val());
	$("#expIndustry").attr("value",$("#expIndustryBut").val()!=$("#expIndustryBut").attr("data-default")?$("#expIndustryBut").val():"");
	return true;
}