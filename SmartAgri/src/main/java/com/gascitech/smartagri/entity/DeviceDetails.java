package com.gascitech.smartagri.entity;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class DeviceDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String deviceUsed;
	private String SensorsUsed;
	private String devicetype; // costumized //pre designed
	@ManyToOne(targetEntity = UserEntity.class,cascade = CascadeType.ALL)
	private UserEntity ue;
	@OneToMany(cascade = CascadeType.ALL)
	private List<History> h;
	@OneToMany(cascade = CascadeType.ALL)
	private List<RunnedEntity> lre;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDeviceUsed() {
		return deviceUsed;
	}

	public void setDeviceUsed(String deviceUsed) {
		this.deviceUsed = deviceUsed;
	}

	public String getSensorsUsed() {
		return SensorsUsed;
	}

	public void setSensorsUsed(String sensorsUsed) {
		SensorsUsed = sensorsUsed;
	}

	public String getDevicetype() {
		return devicetype;
	}

	public void setDevicetype(String devicetype) {
		this.devicetype = devicetype;
	}

	public UserEntity getUe() {
		return ue;
	}

	public void setUe(UserEntity ue) {
		this.ue = ue;
	}

	public List<History> getH() {
		return h;
	}

	public void setH(List<History> h) {
		this.h = h;
	}
	
	

	public List<RunnedEntity> getLre() {
		return lre;
	}

	public void setLre(List<RunnedEntity> lre) {
		this.lre = lre;
	}

	@Override
	public String toString() {
		return "DeviceDetails [id=" + id + ", deviceUsed=" + deviceUsed + ", SensorsUsed=" + SensorsUsed
				+ ", devicetype=" + devicetype + ", ue=" + ue + ", h=" + h + "]";
	}
	
	
	

}
