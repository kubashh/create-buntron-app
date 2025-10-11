import { existsSync, rmSync } from "fs"

if (existsSync(`workspace`)) rmSync(`workspace`, { recursive: true })

await Bun.$`mkdir workspace`
await Bun.$`bun index.ts workspace ${
  process.argv[2] || `basic-lang-javascript`
}`
