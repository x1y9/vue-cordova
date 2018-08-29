require('colors')
var
  shell = require('shelljs'),
  path = require('path'),
  fse = require('fs-extra'),
  spawn = require('./spawn')

var androidPath = path.resolve(__dirname, '../cordova/platforms/android')
if (shell.test('-d',androidPath)) {
  console.log(' Found android dir, project already prepared.\n')
}
else {  
  shell.mkdir('-p', path.resolve(__dirname, '../cordova/www'))
  //cordova命令永远不会返回非0，所以下面的命令不会出错退出
  spawn.sync('cordova',['platform','add','android@{{ cordovaAndroidVer }}'], path.resolve(__dirname, '../cordova'))

  if (shell.test('-d',androidPath)) {
    spawn.sync('npm',['install'], path.resolve(__dirname, '../cordova'))
  }
  else {
    console.log(' Android platform install error.\n')
  }
}
