package com.gascitech.smartagri.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gascitech.smartagri.dao.DeviceDetailsDao;
import com.gascitech.smartagri.dao.SensorDataDao;
import com.gascitech.smartagri.entity.DeviceDetails;
import com.gascitech.smartagri.entity.SensorDataEntity;

@Service
public class SensorService {
	@Autowired
	SensorDataDao sdd;
	@Autowired
	DeviceDetailsDao ddd;

	public SensorDataEntity getData(String data,long did) {
		
		String[] temp,humi,soil,rain;
		// TODO Auto-generated method stub
		String volt="";
		temp=data.split("t");
		humi=temp[1].split("h");
		soil=humi[1].split("s");
		rain=soil[1].split("r");
		volt=rain[1];
		
		SensorDataEntity sde=new SensorDataEntity();
		LocalDate ld= LocalDate.now();
		LocalTime lt=LocalTime.now();
		sde.setTemp(temp[0]);
		sde.setHumi(humi[0]);
		sde.setSoilm(soil[0]);
		sde.setRaind(rain[0]);
		sde.setGrid(volt);
		Optional<DeviceDetails> dd= ddd.findById(did);
		if(dd.isPresent()) {
			sde.setDd(dd.get());
		}
		
		if(Double.parseDouble(volt)>200) {
			sde.setGridstatus("on");
		}
		else {
			sde.setGridstatus("off");
		}
	
		sde.setDate(ld.toString());
		sde.setTime(lt.toString());
		System.out.println(sde);
		return sdd.save(sde);
	}



}
