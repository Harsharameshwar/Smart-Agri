package com.gascitech.smartagri.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Period;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gascitech.smartagri.dao.DeviceDetailsDao;
import com.gascitech.smartagri.dao.EquipmentDao;
import com.gascitech.smartagri.dao.HistoryDao;
import com.gascitech.smartagri.dao.RunnedDao;
import com.gascitech.smartagri.entity.DeviceDetails;
import com.gascitech.smartagri.entity.EquipmentStatusEntity;
import com.gascitech.smartagri.entity.History;
import com.gascitech.smartagri.entity.RunnedEntity;

@Service
public class EquipmentService {
	@Autowired
	EquipmentDao ed;
	@Autowired
	DeviceDetailsDao ddd;
	@Autowired
	HistoryDao hd;
	@Autowired
	RunnedDao rd;

	public EquipmentStatusEntity senddata(Long deviceid) {
		Optional<DeviceDetails> odd = ddd.findById(deviceid);
		if (odd.isPresent()) {
			Optional<EquipmentStatusEntity> oes = ed.findBydd(odd.get());
			if (oes.isPresent()) {
				EquipmentStatusEntity ese = oes.get();
				ese.setDd(null);
				return ese;
			} else {
				return new EquipmentStatusEntity();
			}
		}
		return new EquipmentStatusEntity();

	}

	public EquipmentStatusEntity switchmode(Long deviceid) {
		Optional<DeviceDetails> odd = ddd.findById(deviceid);
		EquipmentStatusEntity ese = null;
		if (odd.isPresent()) {
			Optional<EquipmentStatusEntity> oese = ed.findBydd(odd.get());
			if (oese.isPresent()) {
				if (oese.get().getDevicemode().equals("auto")) {
					oese.get().setDevicemode("manual");
					ese = oese.get();
				} else {
					oese.get().setDevicemode("auto");
					ese = oese.get();
				}
			} else {
				// throw ese not found exception
			}
		} else {
			// throw exception dd not found error
		}
		return ed.save(ese);

	}

	public EquipmentStatusEntity motoronoff(Long deviceid) {
		Optional<DeviceDetails> odd = ddd.findById(deviceid);
		EquipmentStatusEntity ese = null;
		if (odd.isPresent()) {
			Optional<EquipmentStatusEntity> oese = ed.findBydd(odd.get());
			if (oese.isPresent()) {
				if (oese.get().getMotorstatus().equals("on")) {
					oese.get().setMotorstatus("off");
					ese = oese.get();
					History h = new History();
					h.setType("motor");
					h.setAction("turned off");
					h.setDescription("usernameme turned off the motor");
				    odd.get().getH().add(h);
					
					
					RunnedEntity re = new RunnedEntity();
					LocalDate ld = LocalDate.now();
					LocalTime lt = LocalTime.now();
					LocalDateTime ldt=LocalDateTime.now();
					re.setStartdate(ld.toString());
					re.setStarttime(lt.toString());
					int size=odd.get().getLre().size();
					
					
					odd.get().getLre().get(size-1).setEnddate(ld.toString());
					odd.get().getLre().get(size-1).setEndtime(lt.toString());
					odd.get().getLre().get(size-1).setEnddt(ldt.toString());
					LocalDateTime start =  LocalDateTime.parse(odd.get().getLre().get(size-1).getStartdt());
					//Period period = Period.between(start.toLocalDate(),ldt.toLocalDate());
					Duration duration = Duration.between(start.toLocalTime(), ldt.toLocalTime());
					//System.out.println(period +""+ duration);
					odd.get().getLre().get(size-1).setTottime(duration.abs().toString());

				} else {
					oese.get().setMotorstatus("on");
					ese = oese.get();
					History h = new History();
					h.setType("motor");
					h.setAction("turned on");
					h.setDescription("usernameme turned on the motor");
					odd.get().getH().add(h);
					
					RunnedEntity re = new RunnedEntity();
					LocalDate ld = LocalDate.now();
					LocalTime lt = LocalTime.now();
					LocalDateTime ldt=LocalDateTime.now();
					re.setStartdate(ld.toString());
					re.setStarttime(lt.toString());
					re.setStartdt(ldt.toString());
					re.setType("motor");
					odd.get().getLre().add(re);
					
				}
			} else {
				// throw ese not found exception
			}
		} else {
			// throw exception dd not found error
		}
		return ed.save(ese);

	}

	public String senddata2(Long deviceid) {
		Optional<DeviceDetails> odd = ddd.findById(deviceid);
		if (odd.isPresent()) {
			Optional<EquipmentStatusEntity> oes = ed.findBydd(odd.get());
			if (oes.isPresent()) {
				EquipmentStatusEntity ese = oes.get();
				ese.setDd(odd.get());
				String val = "";
				for (Integer i = 0; i < ese.getVe().size(); i++) {
//					Long id1=ese.getVe().get(i).getId();
					val += ese.getVe().get(i).getStatus() + "v" + i.toString();
				}
				String data = ese.getDevicemode() + "dm" + ese.getMotorstatus() + "ms" + val + "}";
				return data;
			} else {
				return new String();
			}
		}
		return new String();

	}
}
