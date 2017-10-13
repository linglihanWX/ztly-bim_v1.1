package com.myapp.WebGl.mapper;

import java.util.List;

import com.myapp.WegGl.dto.Node4ZTree;

public interface Node4ZTreeData {
	List<Node4ZTree> selectTangguData();
	List<Node4ZTree> selectDianchangData();
	void insertTangguData(Node4ZTree node4zTree);
}
