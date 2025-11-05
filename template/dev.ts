import * as execa from "execa"
import type { ChildProcess } from "child_process"

const execaOptions: execa.Options = {
  cwd: process.cwd(),
  stdout: `pipe`,
}

let mainProcess: ChildProcess
const rendererProcess = startRendererProcess()
const rendererPort = `8888`

process.on(`SIGINT`, killWholeProcess)
process.on(`SIGTERM`, killWholeProcess)
process.on(`exit`, killWholeProcess)

startMainProcess()

function startMainProcess() {
  console.log(`Run main process: electron . ${rendererPort}`)
  mainProcess = execa
    .execa(`electron`, [`.`, `${rendererPort}`], execaOptions)
    .on(`close`, killWholeProcess)
    .on(`error`, console.error)
}

function startRendererProcess() {
  console.log(`Run renderer process: wdwh dev`)
  return execa
    .execa(`wdwh`, [`dev`], execaOptions)
    .on(`close`, () => {
      console.log(`EXITT`)
      process.exit(0)
    })
    .on(`error`, console.error)
}

function killWholeProcess() {
  if (mainProcess) mainProcess.kill()
  if (rendererProcess) rendererProcess.kill()
  process.exit(0)
}
