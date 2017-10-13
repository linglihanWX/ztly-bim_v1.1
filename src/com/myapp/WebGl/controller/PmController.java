package com.myapp.WebGl.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.freedo.WebGl.util.TransferNodeUtil;
import com.myapp.WebGl.service.PmService;
import com.myapp.WegGl.dto.Pm;
import com.myapp.WegGl.dto.TransferNode;

@Controller
@RequestMapping("/pm")
public class PmController {
	@Autowired
	private PmService pmService;
	
	 @RequestMapping(value="showurl",produces="application/json;charset=utf-8")
		@ResponseBody
		public List<Pm> showurl(Integer type){
		    	 List<Pm> list = pmService.selectBytype(type);
				 return list;
		     }
		
		@RequestMapping(value="/insertPm",method=RequestMethod.POST)
		@ResponseBody
		public String insertPm(Pm pm){
		   pmService.insertPm(pm);
		   
		   return "{\"nodeId\":"+pm.getNodeId()+"}";
		}
		
		@RequestMapping(value="/deletepm")
		@ResponseBody
		public void deletePmbyid(Integer id){
			pmService.deletebyid(id);
		}
		
		
		
		@RequestMapping(value="/deletePm")
		@ResponseBody
		public void deletePm(Integer id){
			pmService.deleteByPrimaryId(id);
		}
		
		@RequestMapping("/updateModel")
		@ResponseBody
		public void updateModel(Pm pm){
			System.out.println(pm.toString());
			pmService.updateModel(pm);
		}
		@RequestMapping("/updateAllModel")
		@ResponseBody
		public void updateAllModel(Pm[] pm){
			for (Pm pm2 : pm) {
				pmService.updateModel(pm2);
			}
		}

		
		@RequestMapping(value="/selectByFatherNodeId",produces="application/json;charset=utf-8")
		@ResponseBody
		public List<TransferNode> selectByFatherNodeId(@RequestParam(value="id",required=false) Integer fatherNodeId) throws JsonProcessingException{
			
			List<Pm> pms=pmService.selectByFatherNodeId(fatherNodeId);
			
			List<TransferNode> nodes=TransferNodeUtil.transferPmList(pms);
			
			return nodes;
		}
		
		@RequestMapping(value="/selectAll",produces="application/json;charset=utf-8")
		@ResponseBody
		public List<TransferNode> selectAll() throws JsonProcessingException{
			long startMili=System.currentTimeMillis();
			List<Pm> pms=pmService.selectAll();
			List<TransferNode> nodes=TransferNodeUtil.transferPmList(pms);
			long endMili=System.currentTimeMillis();
			System.out.println("PM_SelectAll 总耗时为："+(endMili-startMili)+"毫秒");
			
			return nodes;
		}
}
