process.env.NODE_ENV = 'production'
process.env.CORDOVA_OUTPUT = 'publish'

var spawn = require('./spawn')
let commitInfo = spawn.getOutput('git',['status'])
if (commitInfo.stdout.indexOf('nothing to commit, working directory clean') === -1) {
  console.log('you must commit all file before publish')
  process.exit(0)
}

require('./script.build.js')