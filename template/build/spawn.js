const
  spawn = require('cross-spawn')

/*
 Returns pid, takes onClose
 */
module.exports = function (cmd, params, cwd, onClose) {
  console.log(`Running "${cmd} ${params.join(' ')}"`)
  console.log()

  const runner = spawn(
    cmd,
    params,
    { stdio: 'inherit', stdout: 'inherit', stderr: 'inherit', cwd }
  )

  runner.on('close', code => {
    console.log()
    if (code) {
      console.log(`Command "${cmd}" failed with exit code: ${code}`)
    }

    onClose && onClose(code)
  })

  return runner
}

module.exports.sync = function (cmd, params, cwd, onFail) {
  console.log(`[sync] Running "${cmd} ${params.join(' ')}"`)
  console.log()

  const runner = spawn.sync(
    cmd,
    params,
    { stdio: 'inherit', stdout: 'inherit', stderr: 'inherit', cwd }
  )
  
  if (runner.status || runner.error) {
    console.log()
    console.log(`⚠️  Command "${cmd}" failed with exit code: ${runner.status}`)
    if (runner.status === null) {
      console.log(`⚠️  Please globally install "${cmd}"`)
    }
    if (onFail) {
      onFail(runner)
    }
    else{ 
      process.exit(1)
    }
  }
  return runner
}


module.exports.getOutput = function (cmd, params, cwd) {  
  console.log(`[sync] Running "${cmd} ${params.join(' ')}"`)
  console.log()

  //node暂未支持gbk，所以windows的中文输出没法设置encoding: 'gbk'
  const child = spawn.sync(cmd, params, {cwd})
  var stdout = String(child.output[1]).trim(),
      stderr = String(child.output[2]).trim()
    
  return { status: child.status, stdout, stderr }
  
}