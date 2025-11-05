#!/usr/bin/env bun

import { cpSync, renameSync } from "fs"
import path from "path"

if (process.argv.length < 2 || process.argv.includes(`-h`)) {
  console.log(`
create-buntron-app

USAGE:

  create-buntron-app my-app           # create app in 'my-app' directory
  create-buntron-app -h               # print help and exit
`)
  process.exit(0)
}

createBuntronApp()

function createBuntronApp() {
  const examplePath = `${import.meta.dirname}/template`
  const outPath = path.join(process.cwd(), process.argv[2])

  console.log(`Copying files...`)

  cpSync(examplePath, outPath, { recursive: true, force: true })
  renameSync(`${outPath}/gitignore.txt`, `${outPath}/.gitignore`)

  console.log(`Done.`)
  console.log(`To start run :bun i && bun dev"`)
}
