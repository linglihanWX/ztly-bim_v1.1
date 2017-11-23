package com.myapp.WegGl.dto;

public class ModelInfoData {
	public String ID;
	public String Name;
	public String position;
	public String station;
	public String material;
	public String volumn;
	public String Quantity;
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public String getStation() {
		return station;
	}
	public void setStation(String station) {
		this.station = station;
	}
	public String getMaterial() {
		return material;
	}
	public void setMaterial(String material) {
		this.material = material;
	}
	public String getVolumn() {
		return volumn;
	}
	public void setVolumn(String volumn) {
		this.volumn = volumn;
	}
	public String getQuantity() {
		return Quantity;
	}
	public void setQuantity(String quantity) {
		Quantity = quantity;
	}
	@Override
	public String toString() {
		return "ModelInfo [ID=" + ID + ", Name=" + Name + ", position=" + position + ", station=" + station
				+ ", material=" + material + ", volumn=" + volumn + ", Quantity=" + Quantity + "]";
	}
}
