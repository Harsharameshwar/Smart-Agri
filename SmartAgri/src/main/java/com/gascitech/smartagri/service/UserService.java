package com.gascitech.smartagri.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gascitech.smartagri.dao.DeviceDetailsDao;
import com.gascitech.smartagri.dao.UserDao;
import com.gascitech.smartagri.entity.DeviceDetails;
import com.gascitech.smartagri.entity.History;
import com.gascitech.smartagri.entity.UserEntity;

@Service
public class UserService {
	
	@Autowired
	UserDao ud;
	@Autowired
	DeviceDetailsDao ddd;
	@Autowired
	private PasswordEncoder bcencoder;
	
	public DeviceDetails regUser(DeviceDetails dd) {
		//DeviceDetails dd=new DeviceDetails();
		String p=dd.getUe().getPassword();
		dd.getUe().setPassword(bcencoder.encode(p));
		
		return ddd.save(dd);
		
	}
	public List<DeviceDetails> getAllUserwithdevice() {
		return ddd.findAll();
		
	}
	public List <UserEntity> getAllUsers(){
		return ud.findAll();
	}
	public List<DeviceDetails> getuserdata(String email) {
		// TODO Auto-generated method stub
		UserEntity ue=ud.findByEmail(email);
		ue.setPassword("");
		List<DeviceDetails> dd= ddd.findAllByUe(ue);
		return dd ;
	}
	public List<History> gethistory(long id) {
		Optional<DeviceDetails> odd= ddd.findById(id);
		return  odd.get().getH();
		
	}
	public List<History> gethistorybtype(long id, String type) {
		Optional<DeviceDetails> odd= ddd.findById(id);
		List<History> mlh= new ArrayList<History>();
		for(int i=0;i<odd.get().getH().size();i++) {
			if(odd.get().getH().get(i).getType().equals(type)) {
				mlh.add(odd.get().getH().get(i));
			}
				
		}
		return  mlh;
		
	}
	

}
