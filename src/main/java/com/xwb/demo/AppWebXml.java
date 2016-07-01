/**
 * Copyright 2014-2016, NetEase, Inc. All Rights Reserved.
 * 
 * Date: 2016年1月13日
 */
package com.xwb.demo;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;


/**
 * 供 tomcat等服务器部署的入口启动类
 * @author xwb<xiangwenbin@corp.netease.com>
 * @since 2016年1月13日
 */
public class AppWebXml extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(App.class);
    }
    
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        super.onStartup(servletContext);
    }
    
}
