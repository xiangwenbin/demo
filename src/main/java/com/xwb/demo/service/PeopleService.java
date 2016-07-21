package com.xwb.demo.service;

import com.xwb.demo.meta.People;
import com.xwb.demo.view.PeopleView;

public interface PeopleService {
	public PeopleView save(PeopleView people);
	public boolean deleteById(Long id);
	public PeopleView findOne(Long id);
}
