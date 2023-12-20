package com.gascitech.smartagri.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gascitech.smartagri.entity.History;

public interface HistoryDao extends JpaRepository<History, Long> {

}
