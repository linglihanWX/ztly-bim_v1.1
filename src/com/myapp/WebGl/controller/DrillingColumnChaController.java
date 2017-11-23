package com.myapp.WebGl.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.freedo.WebGl.util.TransferDrillingUtil;
import com.myapp.WebGl.service.DrillingColumnChaService;
import com.myapp.WegGl.dto.DrillingColumnCha;
import com.myapp.WegGl.dto.DrillingColumnCha2;
import com.myapp.WegGl.dto.DrillingInfo;

@Controller
@RequestMapping("/drillingColumnCha")
public class DrillingColumnChaController {
	@Autowired
	private DrillingColumnChaService drillingColumnChaService;
	
	@RequestMapping(value = "/insertdrillingcolumncha",produces="application/json;charset=utf-8")
	@ResponseBody
	public int insert(DrillingColumnCha drillingColumnCha){
		return drillingColumnChaService.insert(drillingColumnCha);
	}
	
	@RequestMapping(value = "/deletedrillingcolumncha",produces="application/json;charset=utf-8")
	@ResponseBody
	public int delete(@RequestParam(value = "id")Integer id){
		return drillingColumnChaService.deleteByID(id);
	}
	
	@RequestMapping(value = "/updatedrillingcolumncha",produces="application/json;charset=utf-8")
	@ResponseBody
	public int update(DrillingColumnCha drillingColumnCha){
		return drillingColumnChaService.update(drillingColumnCha);
	}
	
	@RequestMapping(value = "/getOneDrillingColumnCha",produces="application/json;charset=utf-8")
	@ResponseBody
	public DrillingColumnCha selectOne(@RequestParam(value = "id")Integer id){
		return drillingColumnChaService.selectOne(id);
	}
	
	@RequestMapping(value = "/getAllDrillingColumnCha",produces="application/json;charset=utf-8")
	@ResponseBody
	public List<DrillingColumnCha> selectAll(){
		return drillingColumnChaService.selectAll();
	}
	
	@RequestMapping(value = "/getAllDrillingColumnCha2",produces="application/json;charset=utf-8")
	@ResponseBody
	public List<DrillingColumnCha2> selectAll2(){
		List<DrillingColumnCha> list= drillingColumnChaService.selectAll();
		List<DrillingColumnCha2> list2= TransferDrillingUtil.transferDrillingList(list);
/*		//遍历转换后的list
		for (DrillingColumnCha2 drillingColumnCha2 : list2) {
			System.out.println("id="+drillingColumnCha2.getId());
			System.out.println(drillingColumnCha2.getPosition().toString());
			for (DrillingInfo info : drillingColumnCha2.getDrilling()) {
				System.out.println(info.toString());
			}
		}*/
		return list2;
	}
	
	@RequestMapping(value = "/main",produces="application/json;charset=utf-8")
	public String toMain(){
		return "drillingColumn";
	}
	@RequestMapping("geology")
	public String geology(HttpServletRequest req) {
		
		return "geology";
	}
	@RequestMapping("show1")
	public String show1(HttpServletRequest req) {
		
		return "synthesize";
	}
}
