<@compress>
<#escape x as x?html>
<#include "/common/macro.ftl">
<!DOCTYPE html>
<html>
  <head>
    <title>首页</title>
    <meta charset="utf-8"/>
    <meta name="description" content="页面描述"/>
    <meta name="keywords" content="页面描述"/>
    <@css/>
    <style>
    </style>
  </head>
  <body>
    <@topnav/>
    <@breadcrumb/>
    <@content clazz="f-cb">
    	<div id="module-cnt"></div>
    </@content>
    <!-- Page Content Here -->
    <@footer/>
      <#noescape>
        <script>
        </script>
      </#noescape>
	<script  type="text/javascript">
		/**
		var source=new EventSource('/ssh/push');
	 	(function(){
	 		
	 		source.onmessage=function(e){
	 			console.log(e.data);
	 		};
	 		source.addEventListener('open',function(e){
	 			console.log(e);
	 		});
	 		source.onerror=function(e){
	 			source.close();
	 		};
	 	})();**/
	</script>
	<script src="/js/bundle.js"></script>
  </body>
</html>
</#escape>
</@compress>