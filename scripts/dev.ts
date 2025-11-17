import { existsSync, rmSync } from "fs"

if (existsSync(`workspace`)) rmSync(`workspace`, { recursive: true })

await Bun.$`mkdir workspace`
Bun.spawnSync({
  cmd: [`bun`, `main.ts`, `workspace`, `${process.argv[2] || ``}`],
  stdout: `inherit`,
  stderr: `inherit`,
})

await Bun.$`cd workspace && bun i && bun dev`
