package com.xwb.demo.service.imp;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.xwb.demo.meta.People;
import com.xwb.demo.repository.PeopleRepository;
import com.xwb.demo.service.PeopleService;
import com.xwb.demo.utils.DozerMapperUtils;
import com.xwb.demo.utils.LoggerUtils;
import com.xwb.demo.view.PeopleView;

@Service
public class PeopleServiceImp implements PeopleService{
	@Autowired
	private PeopleRepository peopleRepository;
	
	@CachePut(value="people",key="#people.id")
	@Override
	public PeopleView save(PeopleView peopleView) {
		// TODO Auto-generated method stub
		LoggerUtils.ERROR_LOG.error("save...");
		People people =peopleRepository.save(DozerMapperUtils.map(peopleView, People.class));
		return DozerMapperUtils.map(people, PeopleView.class);
	}

	@Override
	@CacheEvict(value="people")
	public boolean deleteById(Long id) {
		// TODO Auto-generated method stub
		try{
			LoggerUtils.ERROR_LOG.error("deleteById..."+id);
			peopleRepository.delete(id);
			return true;
		}catch(Exception e){
			return false;
		}
	}
	
//	@Cacheable(value="people")
	@Override
	public PeopleView findOne(Long id) {
		// TODO Auto-generated method stub
		LoggerUtils.ERROR_LOG.error("findOne..."+id);
		People people=peopleRepository.findOne(id);
		
		return DozerMapperUtils.map(people, PeopleView.class);
	}

}
