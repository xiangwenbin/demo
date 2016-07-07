package com.xwb.demo.service;

import com.xwb.demo.meta.People;

public interface PeopleService {
	public People save(People people);
	public boolean deleteById(Long id);
	public People findOne(Long id);
}
