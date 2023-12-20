package com.gascitech.smartagri.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gascitech.smartagri.dao.UserDao;
import com.gascitech.smartagri.entity.MyUserEntity;
import com.gascitech.smartagri.entity.UserEntity;

@Service
public class MyUserDetailsService implements UserDetailsService {
	@Autowired
	UserDao ud;
	@Override
	public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
		System.out.println(s);
		UserEntity user=ud.findByEmail(s);
		System.out.println(user);
	return	new MyUserEntity(user);
	}
	
}
