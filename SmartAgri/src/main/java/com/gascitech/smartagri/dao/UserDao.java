package com.gascitech.smartagri.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gascitech.smartagri.entity.UserEntity;

public interface UserDao extends JpaRepository<UserEntity, Long> {
	
	public UserEntity findByEmail(String email);

}
