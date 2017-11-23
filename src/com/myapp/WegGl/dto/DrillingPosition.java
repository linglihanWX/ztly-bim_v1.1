package com.myapp.WegGl.dto;

public class DrillingPosition {
	
	private Double lon;
	private Double lat;
	private Double height;
	private Double heading;
	private Double pitch;
	private Double roll;
	private Double scaleR;
	public Double getLon() {
		return lon;
	}
	public void setLon(Double lon) {
		this.lon = lon;
	}
	public Double getLat() {
		return lat;
	}
	public void setLat(Double lat) {
		this.lat = lat;
	}
	public Double getHeight() {
		return height;
	}
	public void setHeight(Double height) {
		this.height = height;
	}
	public Double getHeading() {
		return heading;
	}
	public void setHeading(Double heading) {
		this.heading = heading;
	}
	public Double getPitch() {
		return pitch;
	}
	public void setPitch(Double pitch) {
		this.pitch = pitch;
	}
	public Double getRoll() {
		return roll;
	}
	public void setRoll(Double roll) {
		this.roll = roll;
	}
	public Double getScaleR() {
		return scaleR;
	}
	public void setScaleR(Double scaleR) {
		this.scaleR = scaleR;
	}
	@Override
	public String toString() {
		return "DrillingPosition [lon=" + lon + ", lat=" + lat + ", height=" + height + ", heading=" + heading
				+ ", pitch=" + pitch + ", roll=" + roll + ", scaleR=" + scaleR + "]";
	}
	

	
}
