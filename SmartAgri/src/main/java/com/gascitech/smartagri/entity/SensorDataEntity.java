package com.gascitech.smartagri.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class SensorDataEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String soilm;
	private String time;
	private String date;
	private String temp;
	private String humi;
	private String raind;
	private String gridstatus;
	private String motor_status;
	private String grid;
	@ManyToOne
	private UserEntity ue;
	@ManyToOne
	private DeviceDetails dd;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getSoilm() {
		return soilm;
	}

	public void setSoilm(String soilm) {
		this.soilm = soilm;
	}

	public String getTemp() {
		return temp;
	}

	public void setTemp(String temp) {
		this.temp = temp;
	}

	public String getHumi() {
		return humi;
	}

	public void setHumi(String humi) {
		this.humi = humi;
	}

	public String getRaind() {
		return raind;
	}

	public void setRaind(String raind) {
		this.raind = raind;
	}

	public String getGridstatus() {
		return gridstatus;
	}

	public void setGridstatus(String gridstatus) {
		this.gridstatus = gridstatus;
	}

	public UserEntity getUe() {
		return ue;
	}

	public void setUe(UserEntity ue) {
		this.ue = ue;
	}

	public String getMotor_status() {
		return motor_status;
	}

	public void setMotor_status(String motor_status) {
		this.motor_status = motor_status;
	}

	public DeviceDetails getDd() {
		return dd;
	}

	public void setDd(DeviceDetails dd) {
		this.dd = dd;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getGrid() {
		return grid;
	}

	public void setGrid(String grid) {
		this.grid = grid;
	}

	@Override
	public String toString() {
		return "SensorDataEntity [id=" + id + ", soilm=" + soilm + ", time=" + time + ", date=" + date + ", temp="
				+ temp + ", humi=" + humi + ", raind=" + raind + ", gridstatus=" + gridstatus + ", motor_status="
				+ motor_status + ", ue=" + ue + ", dd=" + dd + "]";
	}

}
