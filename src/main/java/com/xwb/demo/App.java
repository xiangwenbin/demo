package com.xwb.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;


/**
 * 开发环境下的启动服务器类
 * @author xwb<xiangwenbin@corp.netease.com>
 * @since 2016年1月13日
 */
@EnableAutoConfiguration
@ComponentScan(basePackages={"com.xwb.demo"})
public class App {
    
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
