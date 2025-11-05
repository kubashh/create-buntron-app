import { existsSync, rmSync } from "fs"

if (existsSync(`workspace`)) rmSync(`workspace`, { recursive: true })

await Bun.$`mkdir workspace`
await Bun.$`bun main.ts workspace ${process.argv[2] || ``}`
