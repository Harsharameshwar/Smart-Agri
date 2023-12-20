package com.gascitech.smartagri.entity;

import java.util.List;

public class AuthenticationResponse {
	// jwt was a final variable
	private final String jwt;
	
private List<DeviceDetails> dd;
	public AuthenticationResponse(String jwt) {
		this.jwt = jwt;
	}







	public AuthenticationResponse(String jwt, List<DeviceDetails> dd) {
		super();
		this.jwt = jwt;
		
		this.dd = dd;
	}







	public String getJwt() {
		return jwt;
	}







	public List<DeviceDetails> getDd() {
		return dd;
	}







	public void setDd(List<DeviceDetails> dd) {
		this.dd = dd;
	}
	

}
