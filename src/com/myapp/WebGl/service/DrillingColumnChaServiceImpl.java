package com.myapp.WebGl.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myapp.WebGl.mapper.DrillingColumnChaData;
import com.myapp.WegGl.dto.DrillingColumnCha;
@Service
public class DrillingColumnChaServiceImpl implements DrillingColumnChaService {
	@Autowired
	private DrillingColumnChaData drillingColumnChaData;
	@Override
	public int insert(DrillingColumnCha drillingColumnCha) {
		
		return drillingColumnChaData.insertDrillingColumnCha(drillingColumnCha);
	}

	@Override
	public int deleteByID(Integer id) {
		
		return drillingColumnChaData.deleteByPrimaryId(id);
	}

	@Override
	public int update(DrillingColumnCha drillingColumnCha) {
		
		return drillingColumnChaData.updateDrillingColumnCha(drillingColumnCha);
	}

	@Override
	public DrillingColumnCha selectOne(Integer id) {
		
		return drillingColumnChaData.selectByPrimaryId(id);
	}

	@Override
	public List<DrillingColumnCha> selectAll() {
		
		return drillingColumnChaData.selsectAll();
	}

}
