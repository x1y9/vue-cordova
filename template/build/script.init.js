require('colors')
var
  shell = require('shelljs'),
  path = require('path'),
  fse = require('fs-extra'),
  spawn = require('./spawn'),
  platform = process.argv[2] || (process.platform === 'darwin' ? 'ios' : 'android')

var platformPath = path.resolve(__dirname, '../cordova/platforms/' + platform)
if (shell.test('-d',platformPath)) {
  console.log(' Found platform dir, project already prepared.\n')
}
else {  
  shell.mkdir('-p', path.resolve(__dirname, '../cordova/www'))
  //cordova prepare比add platform add要好很多，可以遵守package.json中的版本
  spawn.sync('cordova',['prepare', platform], path.resolve(__dirname, '../cordova'))

  if (shell.test('-d',platformPath)) {
    spawn.sync('npm',['install'], path.resolve(__dirname, '../cordova'))
  }
  else {
    console.log('Cordova platform install error.\n')
  }
}
