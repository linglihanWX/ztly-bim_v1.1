package com.myapp.WebGl.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myapp.WebGl.mapper.PmData;
import com.myapp.WegGl.dto.ModelType;
import com.myapp.WegGl.dto.Pm;

@Service
public class PmServerImpl implements PmService{

	@Autowired
	private PmData pmDao;
	
	@Override
	public List<Pm> selectBytype(Integer type) {
		List<Pm> list = pmDao.selectBytype(type);
		return list;
	}

	@Override
	public List<Pm> selectByFatherNodeId(Integer fatherNodeId) {
		if(fatherNodeId==null)
			fatherNodeId=-1;
		return pmDao.selectByFatherNodeId(fatherNodeId);
	}

	@Override
	public List<Pm> selectAll() {
		return pmDao.selectAll();
	}

	@Override
	public int insertPm(Pm pm) {
		return pmDao.insert(pm);
	}

	@Override
	public void deletebyid(int id) {
		pmDao.deleteByPrimaryId(id);
	}

	@Override
	public void deleteByPrimaryId(int id) {
		List<Pm> list=pmDao.selectByFatherNodeId(id);
		pmDao.deleteByPrimaryId(id);
		while(list.size()!=0){
			Pm pm=list.remove(0);
			
			if(pm.getType()==ModelType.BridgeGroup){
				List<Pm> subPms=pmDao.selectByFatherNodeId(pm.getNodeId());
				list.addAll(subPms);
			}
			
			pmDao.deleteByPrimaryId(pm.getNodeId());
		}
		
	}

	@Override
	public void updateModel(Pm pm) {
		pmDao.updateModel(pm);
	}

}
