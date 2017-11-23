package com.myapp.WebGl.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myapp.WebGl.mapper.EbsData;
import com.myapp.WegGl.dto.Ebs;

@Service
public class EbsServiceImpl implements EbsService{

	@Autowired
	private EbsData ebsDao;
	
	@Override
	public int insert(Ebs ebs) {
		return ebsDao.insertEbs(ebs);
	}

	@Override
	public int deleteByPrimaryId(Integer id) {
		return ebsDao.deleteByPrimaryId(id);
	}

	@Override
	public int updateEbs(Ebs ebs) {
		return ebsDao.updateEbs(ebs);
	}

	@Override
	public Ebs selectByPrimaryId(Integer id) {
		return ebsDao.selectByPrimaryId(id);
	}

	@Override
	public Ebs selectByModelId(Integer modelId) {
		return ebsDao.selectByModelId(modelId);
	}

	@Override
	public List<Ebs> selectByProjectId(Integer projectId) {
		return ebsDao.selectByProjectId(projectId);
	}

	@Override
	public List<Ebs> selectByFatherNodeId(Integer fatherNodeId) {
		System.out.println(fatherNodeId);
		if(fatherNodeId==null)
			fatherNodeId=-1;
		return ebsDao.selectByFatherNodeId(fatherNodeId);
	}

	@Override
	public List<Ebs> selectAll() {
		return ebsDao.selectAll();
	}

	@Override
	public int insertEbs(Ebs ebs) {
		return ebsDao.insertEbs(ebs);
	}



}
