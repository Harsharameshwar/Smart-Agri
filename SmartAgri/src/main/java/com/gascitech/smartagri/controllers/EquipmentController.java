package com.gascitech.smartagri.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.gascitech.smartagri.entity.EquipmentStatusEntity;
import com.gascitech.smartagri.service.EquipmentService;

@RestController
public class EquipmentController {
	@Autowired
	EquipmentService es;

	@GetMapping("/senddata/{did}")
	public EquipmentStatusEntity senddata(@PathVariable("did") Long deviceid) {
     return es.senddata(deviceid);
	}
	
	@GetMapping("/switchmode/{did}")
	public EquipmentStatusEntity switchmodes(@PathVariable("did")Long deviceid) {
		return es.switchmode(deviceid);
		
		
	}
	@GetMapping("/motoronoff/{did}")
	public EquipmentStatusEntity motoronoff(@PathVariable("did")Long deviceid) {
		return es.motoronoff(deviceid);
		
		
	}
	@GetMapping("/senddata2/{did}")
	public String senddata2(@PathVariable("did") Long deviceid) {
     return es.senddata2(deviceid);
	}
}
