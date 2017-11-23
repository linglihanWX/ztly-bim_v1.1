package com.freedo.WebGl.util;

import java.util.ArrayList;
import java.util.List;

import com.myapp.WegGl.dto.Pm;
import com.myapp.WegGl.dto.TransferNode;


public class TransferNodeUtil {
	public static TransferNode transferPm(Pm pm){
		TransferNode tfn=new TransferNode();
		
		tfn.setId(pm.getNodeId());
		
		tfn.setText(pm.getName());
		
		if(pm.getLeaf()==0){//是否叶子节点设置
			tfn.setState("closed");
			tfn.setLeaf(false);
		}else{
			tfn.setLeaf(true);
		}
		tfn.setType(pm.getType());
		
		tfn.setParentId(pm.getFatherNodeId());
		
		tfn.setAttributes("parameter",pm.getParameter());
		return tfn;
	}
	
	
	public static List<TransferNode> transferPmList(List<Pm> pms){
		List<TransferNode> nodes=new ArrayList<>();
		for(Pm pm : pms){
			nodes.add(transferPm(pm));
		}
		return nodes;
	}
}
