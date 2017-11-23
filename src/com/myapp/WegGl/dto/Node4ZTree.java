package com.myapp.WegGl.dto;

public class Node4ZTree {
	
	private String uId;
	
	private String pId;
	
	private String name;
	
	/*private String BoundsMin;
	
	private String BoundsMax;*/

	public String getuId() {
		return uId;
	}

	public void setuId(String uId) {
		this.uId = uId;
	}

	public String getpId() {
		return pId;
	}

	public void setpId(String pId) {
		this.pId = pId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	/*public String getBoundsMin() {
		return BoundsMin;
	}

	public void setBoundsMin(String boundsMin) {
		BoundsMin = boundsMin;
	}

	public String getBoundsMax() {
		return BoundsMax;
	}

	public void setBoundsMax(String boundsMax) {
		BoundsMax = boundsMax;
	}*/

	public Node4ZTree() {
		super();
	}

	public Node4ZTree(String uId, String pId, String name/*, String boundsMin, String boundsMax*/) {
		super();
		this.uId = uId;
		this.pId = pId;
		this.name = name;
		/*BoundsMin = boundsMin;
		BoundsMax = boundsMax;*/
	}


}