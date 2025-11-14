import { useState } from "react"
import { fs } from "../lib/require"

export default function App() {
  const [user, setUser] = useState<string | null>(null)

  console.log(process)
  try {
    const packageJsonTest = String(fs.readFileSync(`./package.json`))
    if (!user) setUser(packageJsonTest)
    // fs.writeFileSync(`test.txt`, `testfile\n`)
  } catch (e) {
    console.error(e)
  }

  return (
    <>
      <main>
        <h1>Hello</h1>
        <h2>package.json</h2>
        <div className="mb-4">{user}</div>
        <button onClick={() => console.log(`Hello!`)}>Click me!</button>
      </main>
    </>
  )
}
