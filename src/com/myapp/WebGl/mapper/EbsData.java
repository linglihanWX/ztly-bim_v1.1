package com.myapp.WebGl.mapper;

import java.util.List;

import com.myapp.WegGl.dto.Ebs;


public interface EbsData {
		//添加Ebs
		int insertEbs(Ebs ebs);
		//通过id删除
		int deleteByPrimaryId(Integer id);
		//修改Ebs
		int updateEbs(Ebs ebs);
		
		Ebs selectByPrimaryId(Integer id);
		
		Ebs selectByModelId(Integer modelId);
		//显示ebs树
		List<Ebs> selectByFatherNodeId(Integer fatherNodeId);
		//显示所有
		List<Ebs> selectAll();
		
		List<Ebs> selectByProjectId(Integer projectId);

}
