package com.gascitech.smartagri.entity;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class MyUserEntity implements UserDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	private String email;
	private String password;
	private  List<GrantedAuthority> roles;

	
public MyUserEntity() {
	
}
public MyUserEntity(UserEntity user) {
	this.email=user.getEmail();
	this.password=user.getPassword();
	this.roles=Arrays.stream(user.getRoles().split(",")).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
	
}

@Override
public Collection<? extends GrantedAuthority> getAuthorities() {
	// TODO Auto-generated method stub
	return roles;
	
	
}
@Override
public String getPassword() {
	// TODO Auto-generated method stub
	return password;
}
@Override
public String getUsername() {
	// TODO Auto-generated method stub
	return email;
}
@Override
public boolean isAccountNonExpired() {
	// TODO Auto-generated method stub
	return true;
}
@Override
public boolean isAccountNonLocked() {
	// TODO Auto-generated method stub
	return true;
}
@Override
public boolean isCredentialsNonExpired() {
	// TODO Auto-generated method stub
	return true;
}
@Override
public boolean isEnabled() {
	// TODO Auto-generated method stub
	return true;
}





	
}
