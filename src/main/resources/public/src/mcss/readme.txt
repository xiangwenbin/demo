1.统一采用MCSS

2.config.mcss中配置了颜色、字体、背景等，以及各种方法，比如keyframes、inline-block等等

3.命名遵循NEC规范 ：http://nec.netease.com/standard/css-name.html

4.
base.mcss： 
	放页面重置，功能以及皮肤类样式
公用元件放在unit.mcss，公用模块放在module.mcss, 公用页面基础结构放在grid.mcss：  
	清除浮动，调用背景图，页面布局，以及相似性比较大、页面通用的元件和模块
currentPage.mcss:  
	当前页面特定的样式

5.图标采用图标字体/图片形式
images文件夹：存放css用到各类图片
	icon*.png  存放页面图标
	btn*.png   存放页面按钮
psd文件夹：        存放各类图片源文件（psd/png）

6. widget.html
存放页面通用的元件和模块，比如按钮，图标，标题，模块等
请每位开发在每次修改页面元件和模块的同时更新此文件中对应内容，使之保持最新；此页面能帮助我们更好更快的修改以及添加类似的样式；