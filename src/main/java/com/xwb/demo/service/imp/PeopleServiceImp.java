package com.xwb.demo.service.imp;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xwb.demo.meta.People;
import com.xwb.demo.repository.PeopleRepository;
import com.xwb.demo.service.PeopleService;

@Service
public class PeopleServiceImp implements PeopleService{
	@Autowired
	private PeopleRepository peopleRepository;
	
	@Transactional
	@Override
	public People save(People people) {
		// TODO Auto-generated method stub
		return peopleRepository.save(people);
	}

}
