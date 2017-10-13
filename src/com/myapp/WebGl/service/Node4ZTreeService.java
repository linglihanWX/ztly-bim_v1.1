package com.myapp.WebGl.service;

import java.util.List;

import com.myapp.WegGl.dto.Node4ZTree;

public interface Node4ZTreeService {
	public List<Node4ZTree> selectTangguData();
	public List<Node4ZTree> selectDianchangData();
	public void insertTangguData(Node4ZTree node4zTree);
}
