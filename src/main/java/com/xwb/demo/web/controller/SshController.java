package com.xwb.demo.web.controller;

import java.util.Random;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/ssh")
public class SshController {
	
	@RequestMapping(value="/push")
	public @ResponseBody String push(HttpServletResponse response){
		response.setContentType("text/event-stream");
		Random r=new Random();
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "data:"+r.nextInt()+"\n\n";
	}

}
