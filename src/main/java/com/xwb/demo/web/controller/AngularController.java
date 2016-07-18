package com.xwb.demo.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/angular")
public class AngularController {
	
	@RequestMapping("/index")
	public String index(Model  model){
		return "angular/index";
	}
	
}
