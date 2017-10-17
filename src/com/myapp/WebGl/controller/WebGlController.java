package com.myapp.WebGl.controller;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.dom4j.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.freedo.WebGl.util.FreedoUtils;
import com.google.gson.Gson;
import com.myapp.WebGl.service.Node4ZTreeService;
import com.myapp.WebGl.service.WebGlDataServer;
import com.myapp.WegGl.dto.ModelInfoData;
import com.myapp.WegGl.dto.Node4ZTree;
import com.myapp.WegGl.dto.ShuiDianZhanTreeDataBean;
import com.myapp.WegGl.dto.UserBean;

@Controller
public class WebGlController {
	@Autowired
	private WebGlDataServer wgds;
	@Autowired
	private Node4ZTreeService ztreeservice;

	@RequestMapping(value = "login")
	public String login(HttpSession session,Model model,HttpServletRequest req) {
		String userName = (String) req.getParameter("userName");
		String userPwd =(String) req.getParameter("userPwd");
		if(userName==null||userPwd==null){
			return "login";
		};
		UserBean user = wgds.login(userName, userPwd);
		if (user == null) {
			model.addAttribute("message", "error");
			return "login";
		}
		session.setAttribute("user", user);
		return "index";
	}
	//跳转到登录页面
	@RequestMapping("loginPage")
	public String toLoginPage(HttpServletRequest req) {
		return "login";
	}
	//跳转到主页面
	@RequestMapping("toIndex")
	public String toIndexPage(HttpServletRequest req) {

		return "index";
	}
	//跳转到设置页面
	@RequestMapping("toSet")
	public String toSetPage(HttpServletRequest req) {
		
		return "set";
	}
	//跳转到编码库页面
	@RequestMapping("toCodeLibrary")
	public String toCodeLibraryPage(HttpServletRequest req) {
		
		return "codelibrary";
	}
	
	/*------------------------规划可研模块页面跳转-----------------------*/
	//跳转到水文数据页面
	@RequestMapping("toWater")
	public String toWaterPage(HttpServletRequest req) {
		
		return "water";
	}
	//跳转到环境数据页面
	@RequestMapping("toEnvironment")
	public String toEnvironmentPage(HttpServletRequest req) {
		
		return "environment";
	}
	//跳转到地质数据页面
	@RequestMapping("toGeology")
	public String toGeologyPage(HttpServletRequest req) {
		
		return "geology";
	}
	//跳转到综合展示页面
	@RequestMapping("toShow")
	public String toShowPage(HttpServletRequest req) {
		
		return "show";
	}
	//跳转到综合展示页面
	@RequestMapping("toPlanRoute")
	public String toPlanRoutePage(HttpServletRequest req) {
		
		return "planRoute";
	}
	/*------------------------设计协同模块页面跳转-----------------------*/
	//跳转到任务界面
	@RequestMapping("toTask")
	public String toTaskPage(HttpServletRequest req) {
		
		return "task";
	}
	//跳转到BIM方案设计页面
	@RequestMapping("toDesign")
	public String toDesignPage(HttpServletRequest req) {
		
		return "designplan";
	}
	@RequestMapping("toHistoryCompare")
	public String toHistoryComparePage(HttpServletRequest req) {
		
		return "historycompare";
	}
	//跳转到文档管理页面
	@RequestMapping("toDocument")
	public String toDocumentPage(HttpServletRequest req) {
		
		return "documentmgmt";
	}
	//跳转到主体建筑页面
	@RequestMapping("toMainbuilding")
	public String toMainbuildingPage(HttpServletRequest req) {
		
		return "mainbuilding";
	}
	//跳转到综合展示页面
	@RequestMapping("toDesignShow")
	public String toDesignShowPage(HttpServletRequest req) {
		
		return "designshow";
	}
	//跳转到数字移交页面
	@RequestMapping("toShuziyijiao")
	public String toShuziyijiaoPage(HttpServletRequest req) {
		
		return "shuziyijiao";
	}
	/*------------------------施工阶段模块页面跳转-----------------------*/
	//跳转到进度管理页面
	@RequestMapping("toEbs")
	public String toEbsPage(HttpServletRequest req) {
		
		return "ebs";
	}
	//跳转到场景页面
	@RequestMapping("toPm")
	public String toPmPage(HttpServletRequest req) {
		
		return "pm";
	}
	//跳转到安全管理页面
	@RequestMapping("toSafe")
	public String toSafePage(HttpServletRequest req) {
		
		return "safe";
	}
	//跳转到安全管理3D页面
	@RequestMapping("toSafeThree")
	public String toSafeThreePage(HttpServletRequest req) {
		
		return "safethree";
	}
	//跳转到风险管理页面
	@RequestMapping("toRiskmgmt")
	public String toRiskmgmtPage(HttpServletRequest req) {
		
		return "riskmgmt";
	}
	//跳转到监控管理页面
	@RequestMapping("toCamera")
	public String toCameraPage(HttpServletRequest req) {
		
		return "camera";
	}
	//跳转到沉降检测页面
	@RequestMapping("toDownup")
	public String toDownupPage(HttpServletRequest req) {
		
		return "downup";
	}
	//跳转到综合展示页面
	@RequestMapping("toWorkShow")
	public String toWorkShowPage(HttpServletRequest req) {
		return "workshow";
	}
	/*-----------------------运维管理模块页面跳转-------------------------*/
	//跳转到空间管理页面
	@RequestMapping("toSpacemgmt")
	public String toSpacemgmtPage(HttpServletRequest req) {
		return "spacemgmt";
	}
	//跳转到资产管理页面
	@RequestMapping("toAssetmgmt")
	public String toAssetmgmtPage(HttpServletRequest req) {
		return "assetmgmt";
	}
	//跳转到其它系统页面
	@RequestMapping("toJicheng")
	public String toJichengPage(HttpServletRequest req) {
		return "jicheng";
	}
	/*----------------------------文件下载----------------------------*/
	@RequestMapping("download")
	public ResponseEntity<byte[]> downloadFile(HttpServletRequest request,@RequestParam("filename") String filename,Model model){
		ResponseEntity<byte[]> entity = null;
		try {
			String path = request.getServletContext().getRealPath("/static/page/designcoordination/documentmgmt/wendang/");
			File file =new File(path+File.separator+filename);
			HttpHeaders headers = new HttpHeaders();
			String downloadfilename = new String(filename.getBytes("UTF-8"), "iso-8859-1");
			headers.setContentDispositionFormData("attachment", downloadfilename);
			headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
			entity = new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file),headers,HttpStatus.CREATED);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			return entity;
		}
	}
	@RequestMapping("getTangguData")
	@ResponseBody
	public List<Node4ZTree> getTangguData(HttpServletResponse response){
		List<Node4ZTree> list = new ArrayList<>();
		list=ztreeservice.selectTangguData();
		return list;
		
	}
	@RequestMapping("getDianchangData")
	@ResponseBody
	public List<Node4ZTree> getDianchangData(HttpServletResponse response){
		List<Node4ZTree> list = new ArrayList<>();
		list=ztreeservice.selectDianchangData();
		return list;
		
	}
	@RequestMapping("treeData")
	@ResponseBody
	public void getTreeData(HttpServletResponse response) {
		response.setContentType("application/json;charset=utf-8");
		// @SuppressWarnings("unused")
		List<ShuiDianZhanTreeDataBean> data = wgds.getShuiDianZhanTreeData();
		try {
			response.getWriter().print(new Gson().toJson(data));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping("ModelInfo")
	private void getModelInfo(String uid, HttpServletResponse response) {
		response.setContentType("application/json;charset=utf-8");
		ModelInfoData data = wgds.getShuiDianZhanByUid(uid);
		try {
			response.getWriter().print(new Gson().toJson(data));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
/*	@RequestMapping(value="getTangguData",produces="application/json;charset=utf-8")
	@ResponseBody
	public List<Node4ZTree> getTangguData(HttpServletRequest request) {
		List<Node4ZTree> list = null;
		try {
			list = FreedoUtils.getDatadFromModelPropertyXml();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		}finally {
			
			return list;
		}
		
	}*/
	@RequestMapping(value="insertTangguData",produces="application/json;charset=utf-8")
	@ResponseBody
	public void insertTangguData(HttpServletRequest request) {
		List<Node4ZTree> list = null;
		try {
			list = FreedoUtils.getDatadFromModelPropertyXml();
			for (Node4ZTree node4zTree : list) {
				ztreeservice.insertTangguData(node4zTree);
			}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		
	}
}
