console.log(`Building...`)

const start = performance.now()

await Bun.$`wdwh build`

await Bun.$`electron-builder`

console.log(`Done in ${((performance.now() - start) / 1000).toFixed(2)}s.`)
