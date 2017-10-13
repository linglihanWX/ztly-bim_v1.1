package com.freedo.WebGl.util;

import static org.hamcrest.CoreMatchers.nullValue;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import com.myapp.WegGl.dto.DrillingColumnCha;
import com.myapp.WegGl.dto.DrillingColumnCha2;
import com.myapp.WegGl.dto.DrillingInfo;
import com.myapp.WegGl.dto.DrillingPosition;

public class TransferDrillingUtil {
	public static DrillingColumnCha2 transferDrilling(DrillingColumnCha dCha){
		DrillingColumnCha2 dCha2 = new DrillingColumnCha2();
		dCha2.setId(dCha.getText());
		
		DrillingPosition position = new DrillingPosition();
		position.setLon(dCha.getLon());
		position.setLat(dCha.getLat());
		position.setHeight(dCha.getHeight());
		position.setHeading((double) 0);
		position.setPitch((double) 0);
		position.setRoll((double) 0);
		position.setScaleR((double) 1);
		dCha2.setPosition(position);
		

		Class DrillingColumnChaCla = dCha.getClass();
		List<DrillingInfo> list = new ArrayList<DrillingInfo>();
		try {
			for(int i = 1;i<21;i++){
				Field field = DrillingColumnChaCla.getDeclaredField("layerh"+i);
				field.setAccessible(true);
				Field field1 = DrillingColumnChaCla.getDeclaredField("layerq"+i);
				field1.setAccessible(true);
				if(field.get(dCha) != null){
					DrillingInfo info = new DrillingInfo();
					info.setName(i);
					info.setHeight((Double) field.get(dCha));
					info.setFilePath((String) field1.get(dCha));
					list.add(info);
				}else{
					break;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		dCha2.setDrilling(list);
		return dCha2;
	}
	public static List<DrillingColumnCha2> transferDrillingList(List<DrillingColumnCha> list){
		List<DrillingColumnCha2> list2 = new ArrayList<>();
		DrillingColumnCha2 dCha2 = new DrillingColumnCha2();
		for (DrillingColumnCha drillingColumnCha : list) {
			if(drillingColumnCha.getLeaf()==1){
			dCha2 = transferDrilling(drillingColumnCha);
			list2.add(dCha2);
			}
		}
		return list2;
	}
}
