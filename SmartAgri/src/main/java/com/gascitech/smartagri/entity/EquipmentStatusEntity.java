package com.gascitech.smartagri.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class EquipmentStatusEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String devicemode;
	private String motorstatus;
	@OneToOne
	private DeviceDetails dd;
	@OneToMany(cascade = CascadeType.ALL)
	private List<ValveEntity> ve;

// add valve here 
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDevicemode() {
		return devicemode;
	}

	public void setDevicemode(String devicemode) {
		this.devicemode = devicemode;
	}

	public String getMotorstatus() {
		return motorstatus;
	}

	public void setMotorstatus(String motorstatus) {
		this.motorstatus = motorstatus;
	}

	public DeviceDetails getDd() {
		return dd;
	}

	public void setDd(DeviceDetails dd) {
		this.dd = dd;
	}

	public List<ValveEntity> getVe() {
		return ve;
	}

	public void setVe(List<ValveEntity> ve) {
		this.ve = ve;
	}

	
	
	
	

}
