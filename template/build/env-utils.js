var
  config = require('../config'),
  spawn = require('./spawn')

module.exports = {
  dev: process.env.NODE_ENV === 'development',
  prod: process.env.NODE_ENV === 'production',  
  cordova: process.env.CORDOVA_TARGET === 'android' || process.env.CORDOVA_TARGET === 'ios',
  android: process.env.CORDOVA_TARGET === 'android',
  publish: process.env.CORDOVA_OUTPUT === 'publish',
  debug: process.env.CORDOVA_OUTPUT === 'debug',
  ios: process.env.CORDOVA_TARGET === 'ios',
  theme: process.env.THEME || config.defaultTheme,
  
  platform: {
    cordovaAssets: './cordova/platforms/' + (process.env.CORDOVA_TARGET === 'ios' ? 'ios' : 'android') + '/platform_www'
  }
}
