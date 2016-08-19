


$(document).ready(function(){
	var ser = $("#prop").attr("ser");
	var cp = $("#prop").attr("cp");
	$("#file_uploads").upload({
		'buttonText'		: '[ 上传 ]',
		'uploader'			: ser + '/file/upload',
		'auto'				: true,
		'formData'			:{filePath:'/ads/photo/logo/',fileType:0,fileSize:512000},
		'width'				: 50,
		'height'			: 18,
		'progressBar'		: false,
		'onUploadSuccess'	: baseInfoUploadSucces,
		'pluginPath'		: cp + '/resources/js/uploadify_3.2',
	});
});

//上传成功后执行的方法
var baseInfoUploadSucces = function(file, data, response) {
	var fl = $("#prop").attr("fl");
	data = jQuery.parseJSON(data);
	//alert("filePath = "+ data[0].filePath +"****** saveName = "+ data[0].saveName);
   // document.getElementById("hidde_img").style.display = ""; 
	$("#hidde_img").show();
    $("#hidde_img #photos").attr("src",fl + data[0].filePath + "/" + data[0].saveName);
	$("#logo").attr("value",data[0].filePath + "/" + data[0].saveName);
};

//后台友情链接上传
$(document).ready(function(){
	var ser = $("#prop").attr("ser");
	var cp = $("#prop").attr("cp");
	$("#file_upload_sysLink").upload({
		'buttonText'		: '[ 上传 ]',
		'uploader'			: ser + '/file/upload',
		'auto'				: true,
		'formData'			:{filePath:'/link/photo/logo/',fileType:0,fileSize:512000},
		'width'				: 50,
		'height'			: 18,
		'progressBar'		: false,
		'onUploadSuccess'	: baseInfoUploadSucceLink,
		'pluginPath'		: cp + '/resources/js/uploadify_3.2',
	});
});

//上传成功后执行的方法
var baseInfoUploadSucceLink = function(file, data, response) {
	var fl = $("#prop").attr("fl");
	data = jQuery.parseJSON(data);
	//alert("filePath = "+ data[0].filePath +"****** saveName = "+ data[0].saveName);
   // document.getElementById("hidde_img").style.display = ""; 
	$("#photo").attr("src",fl + data[0].filePath + "/" + data[0].saveName);
	$("#urlLogo").attr("value",data[0].filePath + data[0].saveName);
};

//后台  添加分站上传
$(document).ready(function(){
	var ser = $("#prop").attr("ser");
	var cp = $("#prop").attr("cp");
	$("#file_upload_substation").upload({
		'buttonText'		: '[ 上传 ]',
		'uploader'			: ser + '/file/upload',
		'auto'				: true,
		'formData'			:{filePath:'/subatation/photo/logo/',fileType:0,fileSize:512000},
		'width'				: 50,
		'height'			: 18,
		'progressBar'		: false,
		'onUploadSuccess'	: siteCallback,
		'pluginPath'		: cp + '/resources/js/uploadify_3.2',
	});
});

//上传成功后执行的方法
var siteCallback = function(file, data, response) {
	data = jQuery.parseJSON(data);
	alert("上传成功");
	//alert("filePath = "+ data[0].filePath +"****** saveName = "+ data[0].saveName);
   // document.getElementById("hidde_img").style.display = ""; 
	$("#logopath").attr("value",data[0].filePath + data[0].saveName);
};