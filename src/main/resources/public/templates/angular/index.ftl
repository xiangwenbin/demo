<@compress>
<html>
<head>
	<title>Angular 2 QuickStart JS</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- 1. Load libraries --> 
	<!-- IE required polyfill -->
	<script src="/node_modules/core-js/client/shim.min.js"></script> 
	<script src="/node_modules/zone.js/dist/zone.js"></script> 
	<script src="/node_modules/reflect-metadata/Reflect.js"></script> 
	<!--异步数据流解决方案，同Promise-->
	<#--
	<script src="/node_modules/rxjs/bundles/Rx.umd.js"></script> 
	<script src="/node_modules/@angular/core/bundles/core.umd.js"></script> 
	<script src="/node_modules/@angular/common/bundles/common.umd.js"></script> 
	<script src="/node_modules/@angular/compiler/bundles/compiler.umd.js"></script> 
	<script src="/node_modules/@angular/platform-browser/bundles/platform-browser.umd.js"></script> 
	<script src="/node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js"></script> 
	-->
	<!-- 2. Load our 'modules' --> 
	<script src="/node_modules/systemjs/dist/system.src.js"></script>
    <script src="/config/system.js"></script>
    <script>
      System.import('src/javascript/angular/pages/main.js').catch(function(err){ console.error(err); });
    </script>
</head>
	<!-- 3. Display the application --> 
<body>
	${envProfile!'null'}
	<my-app>Loading...</my-app> 
</body>
</html>
</@compress>