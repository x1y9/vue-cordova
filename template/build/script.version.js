var
  fs = require('fs'),
  path = require('path'),
  et = require('elementtree'),
  semver = require('semver'),
  target = process.argv[2]
 
let configFile = path.resolve(__dirname, '../cordova/config.xml')
let doc = et.parse(fs.readFileSync(configFile, 'utf-8'))
let packageId = doc.getroot().get('id')
let packageVer = doc.getroot().get('version')
if (target) {
  let newVer = semver.inc(packageVer, target)
  if (semver.valid(newVer)) {
    console.log(`Bump version ${packageVer} => ${newVer}`)
    doc.getroot().set('version', newVer)
    fs.writeFileSync(configFile, doc.write({ indent: 2 }), 'utf8')
  }
  else {
    console.log(`Invalid bumped version ${newVer}`)
  }
}
else {
  console.log(`current version ${packageVer}, add major,minor,patch to modify`)
}
