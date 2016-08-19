package cn.rcw.test.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import cn.rcw.test.entity.WaEntInfo;
import cn.rcw.test.entity.WaEntInfoVo;


public interface WaEntInfoMapper {
	//显示
	List<WaEntInfo> selectAll(WaEntInfoVo vo);
	//增加
	int insert(WaEntInfo record);
	//删除
	int deleteByIds(List<String> ids);
	//修改
	int updateByPrimaryKey(WaEntInfo record);
	//查找
	List<WaEntInfo> selectByRecord(WaEntInfo record);
	//导出excel
	List<WaEntInfo>  getWaEntInfoByIds(List<String> ids);
}
