const distFile = Bun.file(`dist.ts`)

const text = (await Bun.file(`main.ts`).text())
  .split(`\n`)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith(`//`))
  .join(`\n`)

await distFile.write(text)

await Bun.$`bun publish`

// Cleaning
await distFile.delete()

export {}
