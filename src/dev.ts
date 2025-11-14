import { existsSync, rmSync } from "fs"

if (existsSync(`workspace`)) rmSync(`workspace`, { recursive: true })

await Bun.$`mkdir workspace`
Bun.spawnSync([`bun`, `main.ts`, `workspace`, `${process.argv[2] || ``}`], {
  stdout: `inherit`,
  stderr: `inherit`,
})
