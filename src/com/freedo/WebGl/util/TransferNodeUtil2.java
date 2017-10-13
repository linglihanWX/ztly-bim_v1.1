package com.freedo.WebGl.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import com.myapp.WegGl.dto.Ebs;
import com.myapp.WegGl.dto.TransferNode2;


public class TransferNodeUtil2 {
	public static TransferNode2 transferEbs(Ebs ebs){
		TransferNode2 tfn=new TransferNode2();
		DateFormat format=new SimpleDateFormat("yyyy-MM-dd");
		tfn.setId(ebs.getNodeId());
		tfn.setParentId(ebs.getFatherNodeId());
		tfn.setText(ebs.getName());
		
		if(ebs.getLeaf()==0){//是否叶子节点设置
			tfn.setState("closed");
			tfn.setLeaf(false);
		}else{
			tfn.setLeaf(true);
		}
		tfn.setType(ebs.getType());
		tfn.setStartDatePlan(ebs.getStartDatePlan());
		tfn.setEndDatePlan(ebs.getEndDatePlan());
		tfn.setStartDate(ebs.getStartDate());
		tfn.setEndDate(ebs.getEndDate());
		tfn.setModelId(ebs.getModelId());
		tfn.setProjectId(ebs.getProjectId());
		//tfn.setAttributes("parameter",ebs.getParameter());
		tfn.setAttributes(ebs.getPm());
		return tfn;
	}
	
	
	public static List<TransferNode2> transferEbsList(List<Ebs> ebss){
		List<TransferNode2> nodes=new ArrayList<>();
		for(Ebs ebs : ebss){
			nodes.add(transferEbs(ebs));
		}

		return nodes;
	}
}
