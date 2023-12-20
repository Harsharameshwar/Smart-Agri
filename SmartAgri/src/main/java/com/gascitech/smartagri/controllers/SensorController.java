package com.gascitech.smartagri.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gascitech.smartagri.entity.SensorDataEntity;
import com.gascitech.smartagri.service.SensorService;

@RestController
public class SensorController {
	@Autowired
	SensorService ss;
	
	@PostMapping("/getsensordata/{did}/{data}/")
	public SensorDataEntity getdata(@PathVariable("data") String data,@PathVariable("did") long did) {
		//System.out.println(data);
		return ss.getData(data,did);
	}
//	@GetMapping("/sendtoreact/{did}")
//	public SensorDataEntity sendtoreact(@PathVariable("did") Long deviceid) {
//		return ss.sendtoreact(deviceid);
//		
//	}//
	
}
