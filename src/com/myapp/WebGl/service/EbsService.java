package com.myapp.WebGl.service;

import java.util.List;

import com.myapp.WegGl.dto.Ebs;

public interface EbsService {
	public int insert(Ebs ebs);
	public int deleteByPrimaryId(Integer id);
	public int updateEbs(Ebs ebs);
	public Ebs selectByPrimaryId(Integer id);
	public Ebs selectByModelId(Integer modelId);
	public List<Ebs> selectByProjectId(Integer projectId);
	public List<Ebs> selectByFatherNodeId(Integer fatherNodeId);
	public List<Ebs> selectAll();
	public int insertEbs(Ebs ebs);

}
