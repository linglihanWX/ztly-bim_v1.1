package com.myapp.WegGl.dto;

public class DrillingInfo {
	private Integer name;
	private String filePath;
	private Double height;
	public Integer getName() {
		return name;
	}
	public void setName(Integer name) {
		this.name = name;
	}
	public Double getHeight() {
		return height;
	}
	public void setHeight(Double height) {
		this.height = height;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	@Override
	public String toString() {
		return "DrillingInfo [name=" + name + ", filePath=" + filePath + ", height=" + height + "]";
	}

	
}
