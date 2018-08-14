基于Vue/Cordova的全平台(android,iOS,web)开发模板，大幅简化cordova下的移动App开发：

* 提供cordova的debug模式编译，支持代码热部署
* 快速构建android release版本，生成签名apk
* 无论debug或release模式，均可直接安装到手机，如果版本不兼容，自动卸载
* 单命令修改版本号，可升级大小版本号
* 基于最佳实践，集成vue-router, vuex, vue-i18n
* 方便集成各种基于vue的ui库
* 生成的apk支持多语言，应用名称也可以配置为多语言
* 优化android版本apk大小，release版本仅200k

前提/要求：
* 开发机可以是Windows或Mac OSX
* 安装好安卓开发环境和nodejs

## 安卓版本

安卓版本可以在Windows或OSx下构建：

``` bash
# 构建准备（只需要在新项目或者build clean all后执行一次），需要全局安装好yarn
build prepare

# 编译一个支持热部署的android版本并下载到手机，在运行后会连接dev服务器并支持hot reload
# 在编译之前，先修改cordova/platform/android下release-signing.properties，配置release版本签名文件
build debug

# 编译一个android release版本，如果usb连接手机，会自动安装
build release

# 发布正式版本前，修改小版本号，可加major,minor参数修改大版本号
build version
```
## iOS版本

需要在OSX下构建，文档待补充

## web版本

web版本先需要看下config/index.html中的outputPath和publicPath，如果发布到其他目录，需要修改outputPath，如果发布的目录不是web server的root，需要修改publicPath，修改好后，然后：

``` bash
# 运行web版本的dev模式，支持hot reload
build dev

# 编译一个发布版本, 缺省生成在./dist下
build build
```

## 其他

* 图标文件在src/assets/icon.png

