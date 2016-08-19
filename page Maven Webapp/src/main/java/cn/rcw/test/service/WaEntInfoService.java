package cn.rcw.test.service;

import java.io.Writer;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.CharEncoding;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import cn.rcw.test.dao.WaEntInfoMapper;
import cn.rcw.test.entity.WaEntInfo;
import cn.rcw.test.entity.WaEntInfoVo;
import freemarker.template.Configuration;
import freemarker.template.Template;


@Component 
public class WaEntInfoService {
	@Autowired
	private WaEntInfoMapper waEntInfoDao;
	
	public List<WaEntInfo> selectAll(WaEntInfoVo vo){
		return waEntInfoDao.selectAll(vo);
	}

	public int insert(WaEntInfo record) {
		return waEntInfoDao.insert(record);
	}

	public int deleteByIds(List<String> ids) {
		return waEntInfoDao.deleteByIds(ids);
	}

	public int updateByPrimaryKey(WaEntInfo record) {
		return waEntInfoDao.updateByPrimaryKey(record);
	}

	public List<WaEntInfo> selectByRecord(WaEntInfo record) {
		return waEntInfoDao.selectByRecord(record);
	}

	public List<WaEntInfo> getWaEntInfoByIds(List<String> ids) {
		return waEntInfoDao.getWaEntInfoByIds(ids);
	}
	
	public void exportExcel(HttpServletRequest request,HttpServletResponse response,String tmplName,Object obj,String fileName){
		try{
			//创建配置实例
			Configuration cfg = new Configuration(Configuration.VERSION_2_3_0); 
			cfg.setDefaultEncoding(CharEncoding.UTF_8);
			//String ftlPath = PropertiesUtil.getStringProperties("ftl.path");
			String ftlPath="WEB-INF/ftl";
			cfg.setServletContextForTemplateLoading(request.getSession().getServletContext(),ftlPath);
			//获取模板
			Template temp = cfg.getTemplate(tmplName); 
			//为了解决中文名称乱码问题 	
			String userAgent = request.getHeader("USER-AGENT");
			if (userAgent.toLowerCase().indexOf("firefox") >= 0 || userAgent.toLowerCase().indexOf("chrome") >= 0) {// google,火狐浏览器
				fileName = new String(fileName.getBytes(), "ISO8859-1");
			}else {
				fileName = URLEncoder.encode(fileName, "UTF8");// 其他浏览器
			}
			//将模板和数据模型合并生成文件
			response.setContentType("application/vnd.ms-excel");
			response.addHeader("Content-Disposition", "attachment;filename="+fileName);
			response.setCharacterEncoding(CharEncoding.UTF_8);
			Writer out = response.getWriter();
			//创建数据模型
			Map<String, Object> root = new HashMap<String, Object>();
			root.put("list", obj);
			temp.process(root, out);
		}catch (Throwable e) { 
			e.printStackTrace();
		}
	}
	
	
}
