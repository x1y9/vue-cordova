基于Vue/Cordova的全平台(android,iOS,web)开发模板，大幅简化cordova下的移动App开发：

* 提供cordova的debug模式编译，支持代码热部署
* 快速构建android release版本，生成签名apk
* 无论debug或release模式，均可直接安装到手机，如果版本不兼容，自动卸载
* 单命令修改版本号，可升级大小版本号
* 基于最佳实践，集成vue-router, vuex, vue-i18n
* 集成lodash的部分js增加功能
* 方便集成各种基于vue的ui库
* 生成的apk支持多语言，应用名称也可以配置为多语言
* 优化android版本apk大小，release版本仅200k

前提/要求：
* 开发机可以是Windows或Mac OSX
* 安装好安卓开发环境和nodejs

## 使用

安装vue-cli的2.x版本，然后基于本模板初始化项目

```
npm install -g vue-cli@2.9.6
vue init i38/vue-cordova prjname
```

更多使用帮助，参考创建好的项目下的README

