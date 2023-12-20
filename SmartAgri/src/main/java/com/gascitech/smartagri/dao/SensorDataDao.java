package com.gascitech.smartagri.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gascitech.smartagri.entity.DeviceDetails;
import com.gascitech.smartagri.entity.SensorDataEntity;

public interface SensorDataDao extends JpaRepository<SensorDataEntity, Long> {
	public List<Optional<SensorDataEntity>> findAllBydd(DeviceDetails dd);
}
