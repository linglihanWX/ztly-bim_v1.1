package com.myapp.WebGl.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.freedo.WebGl.util.TransferNodeUtil2;
import com.myapp.WebGl.service.EbsService;
import com.myapp.WegGl.dto.Ebs;
import com.myapp.WegGl.dto.TransferNode2;


@Controller
@RequestMapping("/ebs")
public class EbsController {

	@Autowired
	private EbsService ebsService;
	
	@RequestMapping(value="/selectByFatherNodeId",produces="application/json;charset=utf-8")
	@ResponseBody
	public List<TransferNode2> selectByFatherNodeId(@RequestParam(value="id",required=false) Integer fatherNodeId) throws JsonProcessingException{
		
		List<Ebs> ebs=ebsService.selectByFatherNodeId(fatherNodeId);
		
		List<TransferNode2> nodes=TransferNodeUtil2.transferEbsList(ebs);
		
		return nodes;
	}
	
	@RequestMapping(value="/selectAll",produces="application/json;charset=utf-8")
	@ResponseBody
	public List<TransferNode2> selectAll() throws JsonProcessingException{
		long startMili=System.currentTimeMillis();
		List<Ebs> ebs=ebsService.selectAll();

		//System.out.println(ebs);
		List<TransferNode2> nodes=TransferNodeUtil2.transferEbsList(ebs);
		long endMili=System.currentTimeMillis();
		System.out.println("Ebs_selectall总耗时为："+(endMili-startMili)+"毫秒");
		//System.out.println(nodes);
		return nodes;
	}
	
	
	@RequestMapping("/insertEbs")
	@ResponseBody
	public int insertEbs(Ebs ebs){
		return ebsService.insertEbs(ebs);
	}
	
	@RequestMapping("/updateEbs")
	@ResponseBody
	public int updateEbs(Ebs ebs){
		return ebsService.updateEbs(ebs);
	}
	@RequestMapping("/updateDatePlan")
	@ResponseBody
	public int updateDatePlan(Ebs ebs){
		return ebsService.updateEbs(ebs);
	}
	@RequestMapping("/updateDate")
	@ResponseBody
	public int updateDate(Ebs ebs){
		return ebsService.updateEbs(ebs);
	}
	
	@RequestMapping("/deleteEbs")
	@ResponseBody
	public int deleteEbsByid(Integer id){
		return ebsService.deleteByPrimaryId(id);
	}
}
