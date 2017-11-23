package com.myapp.WebGl.mapper;

import java.util.List;

import com.myapp.WegGl.dto.Pm;


public interface PmData {
	//新增模型
		int insert(Pm pm);
		
		int deleteByPrimaryId(Integer id);
		//修改模型
		void updateModel(Pm pm);
		
		Pm selectByPrimaryId(Integer id);
		
		Pm selectByEbsId(Integer ebsId);
		//显示树
		List<Pm> selectByFatherNodeId(Integer fatherNodeId);
		List<Pm> selectAll();
		//根据类型加载模型
		List<Pm> selectBytype(Integer type);
		
		List<Pm> selectByProjectId(Integer projectId);
}
