await Bun.build({
  entrypoints: [`main.ts`],
  outdir: `.`,
  target: `bun`,
  minify: true,
})

await Bun.$`bun publish`

// Cleaning
await Bun.file(`./main.js`).delete()

export {}
