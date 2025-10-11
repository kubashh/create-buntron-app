#!/usr/bin/env bun

import { cpSync, existsSync } from "fs"
import path from "path"

if (process.argv.length < 2 || process.argv.includes(`-h`)) {
  console.log(`
create-buntron-app

USAGE:

  create-buntron-app my-app [template]   # create app in 'my-app' directory
  create-buntron-app -h                  # print help and exit
`)
  process.exit(0)
}

const config = {
  template: process.argv[3] || `ts`,
}

createBuntronApp()

function createBuntronApp() {
  const examplePath = `${__dirname}/templates/${config.template}`
  const outPath = path.join(process.cwd(), process.argv[2])

  if (!existsSync(examplePath)) {
    console.log(`Template "${config.template}" doesn't exits`)
    return
  }

  console.log(`Copying files...`)

  cpSync(`${__dirname}/templates/gitignore.txt`, path.join(process.cwd(), `.gitignore`))
  cpSync(examplePath, outPath, { recursive: true, force: true })

  console.log(`Done.`)
}
