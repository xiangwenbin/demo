package com.xwb.demo.web.controller;

import java.util.ArrayList;
import java.util.List;

import org.jboss.logging.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xwb.demo.meta.People;
import com.xwb.demo.service.PeopleService;
import com.xwb.demo.view.PeopleView;
import com.xwb.demo.view.User;

@Controller
@RequestMapping("/people")
public class PeopleController {
	
	@Autowired
	private PeopleService peopleService;
	 
	/**
	 * 数据库操作添加一条记录
	 * @param model
	 * @return
	 */
	@RequestMapping("/addPeople")
	@ResponseBody
	public PeopleView addPeople(Model  model){
		PeopleView peopleView=new PeopleView();
		peopleView.setName("xwb");
		peopleView.setAge(10);
		peopleView.setPhone("13588888888");
		peopleView.setAddress("寰宇天下");
		peopleView=peopleService.save(peopleView);
		return peopleView;
	}
	
	/**
	 * 数据库操作添加一条记录
	 * @param model
	 * @return
	 */
	@RequestMapping("/findOne")
	@ResponseBody
	public PeopleView findOne(@RequestParam ("id") Long id){
		return peopleService.findOne(id);
	}
	
}
