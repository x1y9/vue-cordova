var
  shell = require('shelljs'),
  fs = require('fs'),
  path = require('path'),
  ip = require('ip'),
  et = require('elementtree'),
  spawn = require('./spawn'),
  platform = process.argv[2] || 'android'
 
if (shell.test('-d', path.resolve(__dirname, `../cordova/platforms/${platform}`))) {
  var devices = spawn.getOutput('adb',['devices'])
  // console.log(devices)
  if (devices.stdout.match(/device$/)) {
    let configFile = path.resolve(__dirname, '../cordova/config.xml')
    let doc = et.parse(fs.readFileSync(configFile, 'utf-8'))
    let packageId = doc.getroot().get('id')
    spawn.sync('adb',['uninstall',packageId])
    // console.log("backup cordova config file")
    // fse.copySync(configFile, configFile + '.temp')
    console.log("set cordova config file remote ip:" + ip.address())
    doc.getroot().find('content').set('src', 'http://' + ip.address() + ':8080')
    fs.writeFileSync(configFile, doc.write({ indent: 4 }), 'utf8')

    spawn.sync('cordova',['run', platform], path.resolve(__dirname, '../cordova'))

    console.log("restore cordova config file")
    doc.getroot().find('content').set('src', 'index.html')
    fs.writeFileSync(configFile, doc.write({ indent: 4 }), 'utf8')
    // fse.copySync(path.resolve(__dirname,'../cordova/config.xml.temp'), path.resolve(__dirname,'../cordova/config.xml'));
  }
  else {
    console.log(`No mobile phone found, please connect your phone with usb\n`)  
  }  
}
else {  
  console.log(`Platfrom ${platform} not found, please do prepare firstly.\n`)
}
