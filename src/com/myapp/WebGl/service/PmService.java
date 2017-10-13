package com.myapp.WebGl.service;

import java.util.List;

import com.myapp.WegGl.dto.Pm;


public interface PmService {
	public List<Pm> selectBytype(Integer type);
	public List<Pm> selectByFatherNodeId(Integer fatherNodeId);
	public List<Pm> selectAll();
	public int insertPm(Pm pm);
	public void deletebyid(int id);
	public void deleteByPrimaryId(int id);
	public void updateModel(Pm pm);
}
