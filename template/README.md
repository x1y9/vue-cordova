## 安卓版本

安卓版本可以在Windows或OSx下构建：

``` bash
# 构建准备（只需要在新项目或者build clean all后执行一次），需要全局安装好yarn
build prepare

# 编译一个支持热部署的android版本并下载到手机，在运行后会连接dev服务器并支持hot reload
build debug

# 编译一个android release版本，如果usb连接手机，会自动安装
# 在编译release之前，先修改cordova/platform/android下release-signing.properties，配置release版本签名文件
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

