package com.gascitech.smartagri.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class UserEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userid;
	private String email;
	private String password;
	private String phone;
//	@OneToMany
//	private List<DeviceDetails> dd;
	private String name;
	private String location;
	private String roles;

	public Long getUserid() {
		return userid;
	}

	public void setUserid(Long userid) {
		this.userid = userid;
	}

	

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

//	public List<DeviceDetails> getDd() {
//		return dd;
//	}
//
//	public void setDd(List<DeviceDetails> dd) {
//		this.dd = dd;
//	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

	@Override
	public String toString() {
		return "UserEntity [userid=" + userid + ", email=" + email + ", password=" + password + ", phone=" + phone
				+ ", name=" + name + ", location=" + location + ", roles=" + roles + "]";
	}
	

}
