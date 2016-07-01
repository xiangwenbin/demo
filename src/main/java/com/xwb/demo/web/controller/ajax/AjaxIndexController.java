package com.xwb.demo.web.controller.ajax;

import java.util.HashMap;
import java.util.Map;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ajax/index")
public class AjaxIndexController {
	
	//返回浏览器可以解析的json字符串
	@RequestMapping(value="/json",produces={"application/json;charset=UTF-8"})
	public Map<String,String> indexJson(Model  model){
		HashMap<String,String> map=new HashMap<String,String>();
		map.put("a", "b");
		return map;
	}
	//返回浏览器不能解析的json字符串
	@RequestMapping(value="")
	public Map<String,String> index(Model  model){
		HashMap<String,String> map=new HashMap<String,String>();
		map.put("a", "b");
		return map;
	}

}
