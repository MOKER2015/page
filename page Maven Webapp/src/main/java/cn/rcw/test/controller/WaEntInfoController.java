package cn.rcw.test.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;




import cn.rcw.test.comm.CallBack;
import cn.rcw.test.comm.CommUtil;
import cn.rcw.test.entity.WaEntInfo;
import cn.rcw.test.entity.WaEntInfoVo;
import cn.rcw.test.page.Page;
import cn.rcw.test.page.PageHelper;
import cn.rcw.test.service.WaEntInfoService;


@Controller
@RequestMapping("/company")
public class WaEntInfoController {
	@Autowired
    private WaEntInfoService waEntInfoService;
	
	@RequestMapping("index")
	public String index(){
		return "company/index";
	}
	
	//显示企业信息
	@ResponseBody
	@RequestMapping("/show")
	public String show(Model model,WaEntInfoVo vo){
		Integer page=vo.getPage();
		Integer rows=vo.getRows();
		PageHelper.startPage(page,rows);
		waEntInfoService.selectAll(vo);			
		return PageHelper.endPage().toString();
	}
	
	//增加企业信息
	@ResponseBody
	@RequestMapping("/addEnt")
	public String add(WaEntInfo record){
		int result=waEntInfoService.insert(record);
		return new CallBack(result).toString();
	}
	
	//删除企业信息
	@ResponseBody
	@RequestMapping("/deleteEnt")
	public String delete(String ids){
		int result=waEntInfoService.deleteByIds(CommUtil.asList(ids));
		return new CallBack(result).toString();
	}
	
	//修改企业信息
	@ResponseBody
	@RequestMapping("/updateEnt")
	public String update(WaEntInfo record){
		int result=waEntInfoService.updateByPrimaryKey(record);
		return new CallBack(result).toString();
	}
	
	
	//查找企业信息
	@ResponseBody
	@RequestMapping("/searchEnt")
	public String search(WaEntInfo record,Model model){
		List<WaEntInfo> list=waEntInfoService.selectByRecord(record);
		model.addAttribute("waEntInfo", list);
		return "company/index";
	}
	
	
	//导出excel
	@ResponseBody
	@RequestMapping("/downExcel")
	public void downExcel(HttpServletRequest request,HttpServletResponse response,String ids){
		int size = CommUtil.asList(ids).size();
		StringBuilder sb = null;
		sb = new StringBuilder("用户信息").append("共").append(size).append("条.xls");
		List<WaEntInfo> list=waEntInfoService.getWaEntInfoByIds(CommUtil.asList(ids));
		waEntInfoService.exportExcel(request,response,"userExcel.ftl",list,sb.toString());
	}
	
}
