package com.myapp.WebGl.service;

import java.util.List;

import com.myapp.WegGl.dto.ModelInfoData;
import com.myapp.WegGl.dto.ShuiDianZhanTreeDataBean;
import com.myapp.WegGl.dto.UserBean;


public interface WebGlDataServer {
	List<ShuiDianZhanTreeDataBean> getShuiDianZhanTreeData();
	ModelInfoData getShuiDianZhanByUid(String uid);
	UserBean login(String userName, String userPwd);

}
