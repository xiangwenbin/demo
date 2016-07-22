package com.xwb.demo.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/angular")
public class AngularController extends BaseController {

	@RequestMapping("/index")
	public String index(Model model) {
		this.setModelandView(model);
		return "angular/index";
	}

	@RequestMapping("/indexWebpack")
	public String indexWebpack(Model model) {
		this.setModelandView(model);
		return "angular/indexWebpack";
	}
}
