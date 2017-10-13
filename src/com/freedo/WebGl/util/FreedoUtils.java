package com.freedo.WebGl.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.core.io.ClassPathResource;

import com.myapp.WegGl.dto.Node4ZTree;
import com.sun.org.apache.xerces.internal.dom.ChildNode;

public abstract class FreedoUtils {
	
	@SuppressWarnings("unchecked")
	public static List<Node4ZTree> getDatadFromModelPropertyXml() throws IOException, DocumentException {
		ClassPathResource xmlResource = new ClassPathResource("com/freedo/WebGl/util/tanggu_new.xml");
		Document doc = new SAXReader().read(xmlResource.getFile());
		Element pNode = (Element) doc.selectSingleNode("//*[@name='场景根']");
		
		List<Element> childrenNode = pNode.selectNodes(".//*");
		int nodeSize = childrenNode.size();
		ArrayList<Node4ZTree> nodes = new ArrayList<Node4ZTree>(nodeSize);
		String uId = pNode.attributeValue("uid");
		String pName = pNode.attributeValue("name");
		/*String BoundsMin = pNode.attributeValue("BoundsMin");
		String BoundsMax = pNode.attributeValue("BoundsMax");*/
		
		
		nodes.add(new Node4ZTree(uId,"-1", pName/*,BoundsMin,BoundsMax*/));
		if(nodeSize==0) {
			System.out.println("GHP.xml读取失败");
		}else {
			/*for (int i = 0; i < childrenNode.size(); i++){
				nodes.add(new Node4ZTree(String.valueOf(i+1),"",childrenNode.get(i).attributeValue("name"),childrenNode.get(i).attributeValue("BoundsMin"),childrenNode.get(i).attributeValue("BoundsMax")));
			}
			for(int i = 1 ;i<nodes.size();i++){
				Element parent = childrenNode.get(i-1).getParent();
				int index = childrenNode.indexOf(parent);
				String pId = String.valueOf(index+1);
				nodes.get(i).setpId(pId);
			}*/

			for (Element e : childrenNode) {
				String id = e.attributeValue("uid");
				String name = e.attributeValue("name").replaceFirst("/", "");
				String pid = e.getParent().attributeValue("uid");
				/*String boundsmin = e.attributeValue("BoundsMin");
				String boundsmax = e.attributeValue("BoundsMax");*/
				nodes.add(new Node4ZTree(id,pid,name/*,boundsmin,boundsmax*/));
			}
		}
		return nodes;
	}
}
