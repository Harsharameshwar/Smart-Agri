package com.gascitech.smartagri.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gascitech.smartagri.dao.DeviceDetailsDao;
import com.gascitech.smartagri.dao.EquipmentDao;
import com.gascitech.smartagri.dao.HistoryDao;
import com.gascitech.smartagri.entity.DeviceDetails;
import com.gascitech.smartagri.entity.EquipmentStatusEntity;
import com.gascitech.smartagri.entity.History;
import com.gascitech.smartagri.entity.RunnedEntity;
import com.gascitech.smartagri.entity.ValveEntity;

@Service
public class ValveService {
	@Autowired
	DeviceDetailsDao ddd;
	@Autowired
	EquipmentDao ed;
	@Autowired
	HistoryDao hd;

	public EquipmentStatusEntity addvalve(long deviceid, ValveEntity ve) {
		Optional<DeviceDetails> odd = ddd.findById(deviceid);
		EquipmentStatusEntity ese;
		if (odd.isPresent()) {
			Optional<EquipmentStatusEntity> oese = ed.findBydd(odd.get());

			if (oese.isPresent()) {
				ese = oese.get();
				ese.getVe().add(ve);
				return ed.save(ese);
			} else {
				// throw ese not found
			}
		} else {
			// throw exception not dd not found
		}
		return null;
	}

	public List<ValveEntity> getvalves(Long deviceid) {
		Optional<DeviceDetails> odd = ddd.findById(deviceid);
		EquipmentStatusEntity ese;
		if (odd.isPresent()) {
			Optional<EquipmentStatusEntity> oese = ed.findBydd(odd.get());

			if (oese.isPresent()) {
				ese = oese.get();
				return ese.getVe();
				
			} else {
				// throw ese not found
			}
		} else {
			// throw exception not dd not found
		}
		return null;
	}

	public EquipmentStatusEntity onoffvalve(Long deviceid, Long vid) {
		Optional<DeviceDetails> odd = ddd.findById(deviceid);
		EquipmentStatusEntity ese = null;
		if (odd.isPresent()) {
			Optional<EquipmentStatusEntity> oese = ed.findBydd(odd.get());

			if (oese.isPresent()) {
				ese = oese.get();
				 ese.getVe().forEach((item)->{
					 if(item.getId()==vid) {
						 if(item.getStatus().equals("off")) {
							 item.setStatus("on");
							 History h = new History();
								h.setType("valve");
								h.setAction("turned on");
								h.setDescription("usernameme turned on the Valve");
								odd.get().getH().add(h);
								
								hd.saveAll(odd.get().getH());
						 }
						 else {
							 item.setStatus("off");
							 History h = new History();
								h.setType("valve");
								h.setAction("turned off");
								h.setDescription("usernameme turned off the Valve");
								odd.get().getH().add(h);
								
								
								
								
								hd.saveAll(odd.get().getH());
						 }
					 }
				 });
				
			} else {
				// throw ese not found
			}
		} else {
			// throw exception not dd not found
		}
		return ed.save(ese);
	}

}
