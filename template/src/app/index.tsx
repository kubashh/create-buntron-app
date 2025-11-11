/// <reference path="../../node_modules/wdwh/index.d.ts" />

import App from "./App"

export const config: Config = {
  outdir: `./dist`,
  bundleCss: true,
}

export const metadata: Metadata = {
  iconPath: `./react.svg`,
  title: `Electron test`,
}

export default function Page() {
  return (
    <html>
      <head></head>
      <body className="bg-black text-white">
        <App />
      </body>
    </html>
  )
}
