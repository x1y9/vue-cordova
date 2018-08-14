var
  shell = require('shelljs'),
  path = require('path')

shell.rm('-rf', path.resolve(__dirname, '../dist'))
shell.rm('-rf', path.resolve(__dirname, '../cordova/www'))

if (process.argv[2] === 'all') {
  shell.rm('-rf', path.resolve(__dirname, '../node_modules'))
  shell.rm('-rf', path.resolve(__dirname, '../cordova/node_modules'))
  shell.rm('-rf', path.resolve(__dirname, '../cordova/platforms/android'))
  shell.rm('-rf', path.resolve(__dirname, '../cordova/platforms/ios'))
  // plugin如果不清除，可能prepare的时候某些依赖的npm包就不会装上
  shell.rm('-rf', path.resolve(__dirname, '../cordova/plugins'))
  console.log(' project output and dependency all cleaned.\n')
}
else {
  console.log(' project output cleaned.\n')
}

