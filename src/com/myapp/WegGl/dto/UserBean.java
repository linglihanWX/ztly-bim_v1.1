package com.myapp.WegGl.dto;

import java.util.List;

public class UserBean {
	private String userName;//用户名
	private String userPwd;	//密码
	//用户权限
	private int qxgl;		//权限管理
	private int gcgl;		//工程管理
	private int wdgl;		//文档管理
	private int bimsjcggl;	//BIM设计成果管理
	private int bimsjxtgl;	//BIM设计协同管理
	private int zhzs;		//设计阶段综合展示
	private int zlgl;		//质量管理
	private int	aqgl;		//安全管理
	private int jdgl;		//进度管理
	private int	cbgl;		//成本管理
	private int	zhzs2;		//施工阶段综合展示
	private int	fxgkztfw;	//风险管控专题服务
	private int kjgl;       //空间管理
	private int zcgl;		//资产管理
	private int whgl;		//维护管理
	private int xjgl;		//巡检管理
	private int zhzs3;		//运维阶段综合展示
	private int fxgl;		//风险管理
	private int yjgl;		//应急管理
	private int zskgl;		//知识库管理
	private int ddgl;		//调度管理
	private List<Project> projectList;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPwd() {
		return userPwd;
	}
	public void setUserPwd(String userPwd) {
		this.userPwd = userPwd;
	}
	public int getQxgl() {
		return qxgl;
	}
	public void setQxgl(int qxgl) {
		this.qxgl = qxgl;
	}
	public int getGcgl() {
		return gcgl;
	}
	public void setGcgl(int gcgl) {
		this.gcgl = gcgl;
	}
	public int getWdgl() {
		return wdgl;
	}
	public void setWdgl(int wdgl) {
		this.wdgl = wdgl;
	}
	public int getBimsjcggl() {
		return bimsjcggl;
	}
	public void setBimsjcggl(int bimsjcggl) {
		this.bimsjcggl = bimsjcggl;
	}
	public int getBimsjxtgl() {
		return bimsjxtgl;
	}
	public void setBimsjxtgl(int bimsjxtgl) {
		this.bimsjxtgl = bimsjxtgl;
	}
	public int getZhzs() {
		return zhzs;
	}
	public void setZhzs(int zhzs) {
		this.zhzs = zhzs;
	}
	public int getZlgl() {
		return zlgl;
	}
	public void setZlgl(int zlgl) {
		this.zlgl = zlgl;
	}
	public int getAqgl() {
		return aqgl;
	}
	public void setAqgl(int aqgl) {
		this.aqgl = aqgl;
	}
	public int getJdgl() {
		return jdgl;
	}
	public void setJdgl(int jdgl) {
		this.jdgl = jdgl;
	}
	public int getCbgl() {
		return cbgl;
	}
	public void setCbgl(int cbgl) {
		this.cbgl = cbgl;
	}
	public int getZhzs2() {
		return zhzs2;
	}
	public void setZhzs2(int zhzs2) {
		this.zhzs2 = zhzs2;
	}
	public int getFxgkztfw() {
		return fxgkztfw;
	}
	public void setFxgkztfw(int fxgkztfw) {
		this.fxgkztfw = fxgkztfw;
	}
	public int getKjgl() {
		return kjgl;
	}
	public void setKjgl(int kjgl) {
		this.kjgl = kjgl;
	}
	public int getZcgl() {
		return zcgl;
	}
	public void setZcgl(int zcgl) {
		this.zcgl = zcgl;
	}
	public int getWhgl() {
		return whgl;
	}
	public void setWhgl(int whgl) {
		this.whgl = whgl;
	}
	public int getXjgl() {
		return xjgl;
	}
	public void setXjgl(int xjgl) {
		this.xjgl = xjgl;
	}
	public int getZhzs3() {
		return zhzs3;
	}
	public void setZhzs3(int zhzs3) {
		this.zhzs3 = zhzs3;
	}
	public int getFxgl() {
		return fxgl;
	}
	public void setFxgl(int fxgl) {
		this.fxgl = fxgl;
	}
	public int getYjgl() {
		return yjgl;
	}
	public void setYjgl(int yjgl) {
		this.yjgl = yjgl;
	}
	public int getZskgl() {
		return zskgl;
	}
	public void setZskgl(int zskgl) {
		this.zskgl = zskgl;
	}
	public int getDdgl() {
		return ddgl;
	}
	public void setDdgl(int ddgl) {
		this.ddgl = ddgl;
	}
	public List<Project> getProjectList() {
		return projectList;
	}
	public void setProjectList(List<Project> projectList) {
		this.projectList = projectList;
	}
	
}
