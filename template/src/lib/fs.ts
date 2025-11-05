import require from "./require"
const fs = require("fs")

export function readFileSync(path: string) {
  if (fs.existsSync(path)) return String(fs.readFileSync(path))
}

export function writeFileSync(path: string, text: string) {
  fs.writeFileSync(path, text)
}

export default { readFileSync, writeFileSync }
