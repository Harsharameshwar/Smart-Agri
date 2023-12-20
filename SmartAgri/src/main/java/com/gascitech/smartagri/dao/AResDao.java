package com.gascitech.smartagri.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gascitech.smartagri.entity.StrJwt;

public interface AResDao extends JpaRepository<StrJwt, Integer> {
StrJwt findByJwt(String token);
}
