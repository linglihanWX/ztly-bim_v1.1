package com.myapp.WebGl.service;

import java.util.List;

import com.myapp.WegGl.dto.DrillingColumnCha;


public interface DrillingColumnChaService {
	public int insert(DrillingColumnCha drillingColumnCha);
	
	public int deleteByID(Integer id);
	
	public int update(DrillingColumnCha drillingColumnCha);
	
	public  DrillingColumnCha selectOne(Integer id);
	
	public List<DrillingColumnCha> selectAll();
}
