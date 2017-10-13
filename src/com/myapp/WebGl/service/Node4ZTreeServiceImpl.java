package com.myapp.WebGl.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myapp.WebGl.mapper.Node4ZTreeData;
import com.myapp.WebGl.mapper.PmData;
import com.myapp.WegGl.dto.Node4ZTree;

@Service
public class Node4ZTreeServiceImpl implements Node4ZTreeService {

	@Autowired
	private Node4ZTreeData Node4ZTreeDao;
	
	@Override
	public List<Node4ZTree> selectTangguData() {
		
		return Node4ZTreeDao.selectTangguData();
	}
	@Override
	public List<Node4ZTree> selectDianchangData() {
		
		return Node4ZTreeDao.selectDianchangData();
	}

	@Override
	public void insertTangguData(Node4ZTree node4zTree) {
		
		Node4ZTreeDao.insertTangguData(node4zTree);
	}


}
