package com.gascitech.smartagri.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class History {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
private long id;
private String type;
private String action;
private String description;
public long getId() {
	return id;
}
public void setId(long id) {
	this.id = id;
}
public String getType() {
	return type;
}
public void setType(String type) {
	this.type = type;
}
public String getAction() {
	return action;
}
public void setAction(String action) {
	this.action = action;
}
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}
@Override
public String toString() {
	return "History [id=" + id + ", type=" + type + ", action=" + action + ", description=" + description + "]";
}



}
