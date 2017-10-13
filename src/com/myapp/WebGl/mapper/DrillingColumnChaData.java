package com.myapp.WebGl.mapper;

import java.util.List;


import com.myapp.WegGl.dto.DrillingColumnCha;

public interface DrillingColumnChaData {
	//添加
	int insertDrillingColumnCha(DrillingColumnCha drillingColumnCha);
	//通过id删除
	int deleteByPrimaryId(Integer id);
	//修改
	int updateDrillingColumnCha(DrillingColumnCha drillingColumnCha);
					
	DrillingColumnCha selectByPrimaryId(Integer id);
				
	List<DrillingColumnCha> selsectAll();
}
