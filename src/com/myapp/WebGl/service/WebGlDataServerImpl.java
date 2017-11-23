package com.myapp.WebGl.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.myapp.WebGl.mapper.DJTreeData;
import com.myapp.WebGl.mapper.UserMapper;
import com.myapp.WegGl.dto.ModelInfoData;
import com.myapp.WegGl.dto.ShuiDianZhanTreeDataBean;
import com.myapp.WegGl.dto.UserBean;
@Service
public class WebGlDataServerImpl implements WebGlDataServer{
	@Autowired
	private DJTreeData djtree;
	@Autowired
	private UserMapper mapper;

	
	@Override
	public List<ShuiDianZhanTreeDataBean> getShuiDianZhanTreeData() {
		//List<ShuiDianZhanTreeDataBean> data = djtree.getShuiDianZhanTreeData();
		return null;
	}

	@Override
	public ModelInfoData getShuiDianZhanByUid(String uid) {
		ModelInfoData data=null;
		String name1 = djtree.getShuiDianZhanByUid("测试");
		System.out.println(name1);
		try {
			if(uid.contains("-")){
				data = new ModelInfoData();
				data.ID = uid;
				String name = djtree.getShuiDianZhanByUid(uid);
				if (name==null){
					data.Name ="数据库没有该属性名";
				}
				else{
					data.Name = name;
				}
			}
			else{
				data = getDaQiaoModelInfoByUid(uid);
			}
			return data;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	private ModelInfoData getDaQiaoModelInfoByUid(String uid) throws IOException{
		File sceneFile = null;
		SAXReader reader = null;
		FileInputStream fis = null;
		ModelInfoData modelInfoData=null;
		try {
			sceneFile = new ClassPathResource("/webGl/attr.xml").getFile();
			fis= new FileInputStream(sceneFile);
			reader = new SAXReader();
			modelInfoData =new ModelInfoData();
			Document doc = reader.read(fis);
			Element data = (Element)doc.selectSingleNode("//EBSCode[text()='"+uid+"']");
			if(data!=null)
			{
				Element fData= data.getParent();
				modelInfoData.Name = fData.elementText("EBSName");
				modelInfoData.ID= fData.elementText("EBSCode");
				return modelInfoData;
			}
			else return null;
		} catch (DocumentException | IOException e) {
			e.printStackTrace();
			return null;
		}
		finally {
			fis.close();
			sceneFile = null;
			reader = null;
		}
	}

	@Override
	public UserBean login(String userName, String userPwd) {
		UserBean user = mapper.login(userName, userPwd);
		return user;
	}


}
