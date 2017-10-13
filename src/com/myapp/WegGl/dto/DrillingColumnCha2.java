package com.myapp.WegGl.dto;

import java.util.List;

public class DrillingColumnCha2 {
	private String id;
	private DrillingPosition position;
	private List<DrillingInfo> drilling;

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public DrillingPosition getPosition() {
		return position;
	}
	public void setPosition(DrillingPosition position) {
		this.position = position;
	}
	public List<DrillingInfo> getDrilling() {
		return drilling;
	}
	public void setDrilling(List<DrillingInfo> drilling) {
		this.drilling = drilling;
	}
	
	
	
}
