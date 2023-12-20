package com.gascitech.smartagri.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gascitech.smartagri.entity.EquipmentStatusEntity;
import com.gascitech.smartagri.entity.ValveEntity;
import com.gascitech.smartagri.service.ValveService;

@RestController
public class ValveController {
	@Autowired
	ValveService vs;

	@PostMapping("addvalve/{did}")
	public EquipmentStatusEntity addvalve(@PathVariable("did") long deviceid, @RequestBody ValveEntity ve) {
		return vs.addvalve(deviceid, ve);

	}
	@GetMapping("/getvalves/{did}")
	public List<ValveEntity> getvavles(@PathVariable("did") Long deviceid) {
		return vs.getvalves(deviceid);
	}
	@GetMapping("/onoffvalve/{did}/{vid}")
	public EquipmentStatusEntity onoffvalve(@PathVariable("did") Long deviceid,@PathVariable("vid") Long vid) {
		return vs.onoffvalve(deviceid,vid);
		
	}
}
