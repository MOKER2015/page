package cn.rcw.test.comm;

import com.alibaba.fastjson.JSONObject;

/**
 * @author zhuyg
 * @date 2015-8-17
 * @version 1.0
 */
public class CallBack {

	private String status;
	private String message;
	
	public CallBack(){}
	
	public CallBack(Integer result){
		setStatus(result);
	}
	
	public CallBack(boolean status){
		setStatus(status);
	}
	
    public CallBack(String status, String message){
		this.status = status;
		this.message = message;
	}
    
    public String toString(){
    	return JSONObject.toJSONString(this);
    }

	public String getStatus() {
		return status;
	}
	public void setStatus(Integer result) {
		setStatus(result > 0 ? true : false);
	}	
	public void setStatus(boolean status) {
		this.status = status ? "succ" : "fault";
		this.message = status ? "操作成功!" : "操作失败!";
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
}
