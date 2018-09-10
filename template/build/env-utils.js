var
  config = require('../config'),
  spawn = require('./spawn')

module.exports = {
  dev: process.env.NODE_ENV === 'development',
  prod: process.env.NODE_ENV === 'production',  
  cordova: process.env.CORDOVA_TARGET === 'android' || process.env.CORDOVA_TARGET === 'ios',
  android: process.env.CORDOVA_TARGET === 'android',
  ios: process.env.CORDOVA_TARGET === 'ios',
  theme: process.env.THEME || config.defaultTheme,
  
  platform: {
    cordovaAssets: './cordova/platforms/' + (process.platform === 'win32' ? 'android' : 'ios') + '/platform_www'
  }
}
