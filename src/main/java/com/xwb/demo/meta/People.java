/**
 * Copyright 2014-2016, NetEase, Inc. All Rights Reserved.
 * 
 * Date: 2016年1月11日
 */
package com.xwb.demo.meta;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

/**
 *
 */
@Entity
@Table(name = "people")
@TableGenerator(name = "gen", table = "IDGenerator", pkColumnName = "gen_key", pkColumnValue = "generator1", valueColumnName = "gen_value", initialValue = 0, allocationSize = 50)
public class People implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "gen")
	private Long id;

	private int age;

	private String name;

	private String address;

	private String phone;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

}
