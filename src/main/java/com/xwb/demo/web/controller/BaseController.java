package com.xwb.demo.web.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

@Controller
public class BaseController {

	@Autowired
	private Environment env;

	protected Model setModelandView(Model model) {
		model.addAttribute("envProfile", env.getActiveProfiles()[0]);
		return model;
	}
}
