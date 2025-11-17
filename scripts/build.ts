await Bun.build({
  entrypoints: [`main.ts`],
  outdir: `.`,
  target: `bun`,
  minify: true,
})

export {}
