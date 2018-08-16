process.env.NODE_ENV = 'production'
process.env.CORDOVA_TARGET = 'ios'
process.env.THEME = process.argv[2] || ''

require('./script.build.js')