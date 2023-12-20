package com.gascitech.smartagri.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gascitech.smartagri.entity.DeviceDetails;
import com.gascitech.smartagri.entity.UserEntity;

public interface DeviceDetailsDao extends JpaRepository<DeviceDetails, Long> {
	public List<DeviceDetails> findAllByUe(UserEntity ue);

}
