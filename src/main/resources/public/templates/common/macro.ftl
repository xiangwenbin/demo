<#include "./config.ftl">
<#macro css>
  <#--mcss处理的bootstrap.mcss 数值样式会精度丢失,暂时引用源css-->
  <link href="/src/lib/bootstrap/css/bootstrap.css"  rel="stylesheet" type="text/css">
  <link href="${csRoot}base.css" rel="stylesheet" type="text/css"/>
  <link href="${csRoot}module.css" rel="stylesheet" type="text/css"/>
  <#--组件样式-->
  <link href="${csRoot}components.css" rel="stylesheet" type="text/css"/>
  <link href="${csRoot}unit.css" rel="stylesheet" type="text/css"/>
</#macro>
<#macro topnav>
 <div class="g-hd">
 	<div class="head f-cb">
 		<div class="logo"></div>
 		<nav class="f-fl">
 			<#assign menus=
 				[
 					{
 						"url":"xxx","name":"一级菜单",
 						"childsList":[
 							{"url":"xxx","name":"二级菜单"}
 						]
 					},
 					{
 						"url":"xxx","name":"一级菜单",
 						"childsList":[
 							{"url":"xxx","name":"二级菜单"}
 						]
 					},
 					{
 						"url":"xxx","name":"一级菜单",
 						"childsList":[
 							{"url":"xxx","name":"二级菜单"}
 						]
 					}
 				
 				]
 			
 			
 			/>
 			<#if menus??>
			<ul class="m-menu f-cb">
		    <#list menus as menu>
		    	<#--通过currentMenu的url字段去判断选中菜单项-->
		    	<#assign active=""/>
		    	<#if currentMenu??>
		    		<#if currentMenu.url==menu.url>
		    		<#assign active="active"/>
		    		<#elseif currentMenu.url!=""&&menu.childsList??&&(menu.childsList?size>0)>
		    			<#list menu.childsList as item>
			            </#list>
		    		</#if>
		    	</#if>
		        <li class="menuitem <#if currentMenu??&&(((currentMenu.id!-1)==menu.id)||((currentMenu.parentId!-1)==menu.id))>active</#if> <#if !(menu.childsList??&&(menu.childsList?size>0))>active-nodrop</#if>">
		          <a href="<#if (menu.url!'')!=''>${menu.url}<#else>javascript:void(0);}</#if>">${menu.name}<#if (menu.childsList??&&(menu.childsList?size>0))><span class="caret"></span></#if></a>
		          <#if menu.childsList??&&(menu.childsList?size>0)>
		          <ul class="dropdown-menu">
		            <#list menu.childsList as item>
		              <li><a  href="<#if (item.url!'')!=''>${item.url}<#else>javascript:void(0);}</#if>">${item.name}</a></li>
		            </#list>
		          </ul>
		          </#if>
		        </li>
		    </#list>
		    </ul>
		    </#if>
		</nav>
		<div class="topbar"><#if user??>${user.name}</#if>&nbsp;你好！欢迎来到网易考拉海购活动促销系统&nbsp;<a href="/logout">退出</a></div>
 	</div>
 </div>
 <#nested>
</#macro>
<#macro breadcrumb>
	<#--该面包屑导航只适用 该页面权限存在与菜单配置栏里的，若是其他3级权限页面，请自行手动硬编码导航-->
	<ol class="breadcrumb">
		<#if parentMenu??>
		<li ><a href="${currentMenu.url!'javascript:void(0);'}">${parentMenu.name!""}</a></li>
		</#if>
	    <#if currentMenu??>
		<li ><a href="${currentMenu.url!'javascript:void(0);'}">${currentMenu.name!""}</a></li>
		</#if>
  		<#nested>
	</ol>
</#macro>
<#macro footer>
	<div class="g-ft f-fac">
		友情链接
		<p><a href="https://globalms.netease.com/" target="_blank">网易考拉海购运营后台（MS）</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="http://crm.kaola.com">用户关系管理系统（CRM）</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="http://ms.kaola.com/">网易考拉海购进销存后台</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="http://bss.kaola.com/">合作伙伴系统（POP运营后台）</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="http://cps.kaola.com/">网站联盟（CPS）</a></p>
	</div>
	<#nested>
</#macro>
<#macro content clazz="">
  <section class="g-bd ${clazz}">
    <#nested>
  </section>
</#macro>