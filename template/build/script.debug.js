process.env.CORDOVA_TARGET = process.argv[2] || (process.platform === 'win32' ? 'andorid' : 'ios')
process.env.THEME = process.argv[3] || ''

var
  shell = require('shelljs'),
  fs = require('fs'),
  fse = require('fs-extra'),
  path = require('path'),
  env = require('./env-utils'),
  ip = require('ip'),
  et = require('elementtree'),
  spawn = require('./spawn'),
  hasPhone = false
 
 
if (shell.test('-d', path.resolve(__dirname, `../cordova/platforms/${process.env.CORDOVA_TARGET}`))) {
  let configFile = path.resolve(__dirname, '../cordova/config.xml')
  let doc = et.parse(fs.readFileSync(configFile, 'utf-8'))
  let packageId = doc.getroot().get('id')
  let icon = doc.getroot().find('icon')

  if (env.android) {
    var devices = spawn.getOutput('adb',['devices'])
    hasPhone = devices.stdout.match(/device$/)
    spawn.sync('adb',['uninstall',packageId])
  }
  else {
    var devices = spawn.getOutput('ioreg',['-p', 'IOUSB'])
    hasPhone = devices.stdout.match(/iPhone@/)
  }
  
  if (hasPhone) {
    console.log("set cordova config file remote ip:" + ip.address())
    fse.copySync(configFile, configFile + '.temp')
    doc.getroot().find('content').set('src', 'http://' + ip.address() + ':8080?cordova')
    if (env.ios) {
      doc.getroot().remove(icon)
      spawn.sync('cordova-icon',['--icon=../src/assets/icon.png'], path.resolve(__dirname, '../cordova'))
    }
    fs.writeFileSync(configFile, doc.write({ indent: 4 }), 'utf8')

    try {
      spawn.sync('cordova',['run', process.env.CORDOVA_TARGET], path.resolve(__dirname, '../cordova'))
    } finally {
      console.log("restore cordova config file")
      fs.rename(configFile + '.temp',configFile)
    }
  }
  else {
    console.log(`No mobile phone found, please connect your phone with usb\n`)  
  }  
}
else {  
  console.log(`Platfrom ${process.env.CORDOVA_TARGET} not found, please do prepare firstly.\n`)
}
