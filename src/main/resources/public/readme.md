# 执行顺序
## 全局安装 typescript
* npm install typescript -g

## 全局安装typescript的库管理 typings
* npm install typings -g

## 全局安装 gulp
* npm install gulp-cli -g

## 全局安装 jspm (该包主要为了安装plugin-css插件 若.ts里不需要通过import 方式引入css可以不需要安装)
* npm install jspm -g


## 安装package.json下的包
* npm install

## 安装本工程typescript依赖裤 对应的配置文件typings.json
* typings

## 安装 plugin-css (systemjs 加载css 需要)
* jspm install css

# 开发环境
## typescript执行脚本,默认会去读取tsconfig.json配置文件
* tscx.bat

## 执行gulp 脚本，将typescript目录下的组件css,html拷贝到 ts编译目录 javascript
* gulpx.bat

# 打包 
* 执行webpack脚本 默认读取webpack.config.js配置文件
* dist 为anglar的默认打包输出目录 js为 常规打包输出目录
* webpackx.bat


