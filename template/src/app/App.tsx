import { useState } from "react"
// import fs from "../lib/fs"
// import require from "../lib/require"

export default function App() {
  const [user] = useState<null>(null)

  console.log(process)
  // console.log(fs.readFileSync(`./package.json`))
  // fs.writeFileSync(`test.txt`, `testfile\n`)

  return (
    <>
      <main>
        <h1>Hello</h1>
        {user}
        <button onClick={() => console.log(`Hello!`)}>Click me!</button>
      </main>
    </>
  )
}
