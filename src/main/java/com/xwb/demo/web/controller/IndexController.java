package com.xwb.demo.web.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xwb.demo.meta.People;
import com.xwb.demo.service.PeopleService;
import com.xwb.demo.view.User;

@Controller
@RequestMapping("/index")
public class IndexController {
	
	@Autowired
	private PeopleService peopleService;
	
	@RequestMapping("")
	public String index(Model  model){
		return "index";
	}
	
	@RequestMapping("/user")
	@ResponseBody
	public User user(Model  model){
		User user=new User();
		user.setAge("100");
		user.setName("xwb");
		return user;
	}
	 
	/**
	 * 数据库操作添加一条记录
	 * @param model
	 * @return
	 */
	@RequestMapping("/ajax/addPeople")
	@ResponseBody
	public People ajaxIndex(Model  model){
		People people=new People();
		people.setName("xwb");
		people.setAge(10);
		people.setPhone("13588888888");
		people.setAddress("寰宇天下");
		people=peopleService.save(people);
		return people;
	}

}
