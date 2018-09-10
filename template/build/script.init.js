require('colors')
var
  shell = require('shelljs'),
  path = require('path'),
  fse = require('fs-extra'),
  spawn = require('./spawn'),
  platform = process.argv[2] || (process.platform === 'win32' ? 'andorid' : 'ios')

var platformPath = path.resolve(__dirname, '../cordova/platforms/' + platform)
if (shell.test('-d',platformPath)) {
  console.log(' Found platform dir, project already prepared.\n')
}
else {  
  shell.mkdir('-p', path.resolve(__dirname, '../cordova/www'))
  //cordova命令永远不会返回非0，所以下面的命令不会出错退出
  spawn.sync('cordova',['platform','add', platform], path.resolve(__dirname, '../cordova'))

  if (shell.test('-d',platformPath)) {
    spawn.sync('npm',['install'], path.resolve(__dirname, '../cordova'))
  }
  else {
    console.log('Cordova platform install error.\n')
  }
}
