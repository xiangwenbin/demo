# demo工程
## 简介
* 后端框架:springboot
* 前端语言:typescript+angular2 or typescrpit +regular
* 前端打包工具:gulp(仅用来做angular组件资源的拷贝)+webpack 

## 项目导入
* 通过eclipse 以maven的形式导入

## 工程启动方式
 1. 工程启动配置路径src/mian/resources/config/application.properties,若无持久层需求 可注释掉配置文件里的mysql及 redis配置项
 2. src/main/resources/public 为webapp目录
 3. 找到 com.xwb.demo目录下的App.java，直接 右键run as java Application 默认端口是8030