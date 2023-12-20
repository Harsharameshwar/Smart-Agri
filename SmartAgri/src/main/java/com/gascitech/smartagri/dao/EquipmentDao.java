package com.gascitech.smartagri.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gascitech.smartagri.entity.DeviceDetails;
import com.gascitech.smartagri.entity.EquipmentStatusEntity;

public interface EquipmentDao extends JpaRepository<EquipmentStatusEntity, Long> {
public Optional<EquipmentStatusEntity> findBydd(DeviceDetails dd);
}
