var uploadify_onSelectError = function(file, errorCode, errorMsg) {
	var msgText = "上传失败\n";
	switch (errorCode) {
	case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
		// this.queueData.errorMsg = "每次最多上传 " +
		// this.settings.queueSizeLimit + "个文件";
		msgText += "上传的文件数量已经超出系统限制的" + $('#file_upload').uploadify('settings', 'queueSizeLimit') + "个文件！";
		break;
	case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
		msgText += "文件 [" + file.name + "] 大小超出系统限制的" + $('#file_upload').uploadify('settings', 'fileSizeLimit') + "大小！";
		break;
	case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
		msgText += "文件大小为0";
		break;
	case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
		msgText += "文件格式不正确，仅限 " + this.settings.fileTypeExts;
		break;
	default:
		msgText += "错误代码：" + errorCode + "\n" + errorMsg;
	}
	alert(msgText);
};

var uploadify_onUploadError = function(file, errorCode, errorMsg, errorString) {
	// 手工取消不弹出提示
	if (errorCode == SWFUpload.UPLOAD_ERROR.FILE_CANCELLED || errorCode == SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED) {
		return;
	}
	var msgText = "上传失败\n";
	switch (errorCode) {
	case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
		msgText += "HTTP 错误\n" + errorMsg;
		break;
	case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
		msgText += "上传文件丢失，请重新上传";
		break;
	case SWFUpload.UPLOAD_ERROR.IO_ERROR:
		msgText += "IO错误";
		break;
	case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
		msgText += "安全性错误\n" + errorMsg;
		break;
	case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
		msgText += "每次最多上传 " + this.settings.uploadLimit + "个";
		break;
	case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
		msgText += errorMsg;
		break;
	case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
		msgText += "找不到指定文件，请重新操作";
		break;
	case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
		msgText += "参数错误";
		break;
	default:
		msgText += "文件:" + file.name + "\n错误码:" + errorCode + "\n" + errorMsg + "\n" + errorString;
	}
	alert(msgText);
}

var uploadify_onSelect = function(file) {
	//alert('The file ' + file.name + ' was added to the queue.');
};

var uploadify_onUploadSuccess = function(file, data, response) {
	//alert("保存每个文件上传后台返回的相关信息,在onQueueComplete方法中展示");
	alert("file="+file+",data="+jQuery.parseJSON(data)[0].saveName);
	//$('#' + file.id).find('.data').html(' 上传完毕');
	//$("#dis").html("file="+file+",data="+jQuery.parseJSON(data)[0].saveName);
};

var uploadify_onQueueComplete = function(){
	alert("全部完成-->并展示提示信息");
}