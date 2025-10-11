import { existsSync, renameSync } from "fs"
import path from "path"
const got: any = await import("got")
import { t, x } from "tar"
import { Octokit } from "@octokit/rest"

const cwd = process.cwd()

if (process.argv.includes(`-h`)) {
  console.log(`
create-buntron-app

USAGE:

  create-buntron-app my-app [template]
  create-nextron-app -h   # print help and exit
`)
  process.exit(0)
}

await createNextronApp()

async function createNextronApp() {
  const example = process.argv[3] || `basic-lang-javascript`

  if (!(await repoExists(example))) {
    console.log(`Not found: ${example}`)
    process.exit(1)
  }

  try {
    console.log(`Downloading and extracting...`)
    const dirname = path.join(cwd, process.argv[2])
    if (!existsSync(dirname)) await Bun.$`mkdir ${dirname}`
    await downloadAndExtract(example, dirname)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

async function repoExists(example: string) {
  console.log(`Checking template exists...`)

  try {
    await new Octokit().repos.getContent({
      owner: `saltyshiomix`,
      repo: `nextron`,
      ref: `main`,
      path: `examples/${example}/package.json`,
    })
  } catch {
    return false
  }

  return true
}

async function downloadAndExtract(example: string, dirname: string) {
  const mainUrl = `https://codeload.github.com/saltyshiomix/nextron/tar.gz/main`

  await got
    .stream(mainUrl)
    .pipe(
      t({
        cwd: dirname,
        strip: 3,
      })
    )
    .on(`finish`, async () => {
      await Promise.all([
        new Promise<void>((resolve) => {
          got
            .stream(mainUrl)
            .pipe(
              x({ cwd: dirname, strip: 3 }, [
                `nextron-main/examples/_template/gitignore.txt`,
              ])
            )
            .on(`finish`, () => {
              renameSync(
                path.join(dirname, `gitignore.txt`),
                path.join(dirname, `.gitignore`)
              )
              resolve()
            })
        }),
        new Promise<void>((resolve) => {
          got
            .stream(mainUrl)
            .pipe(
              x({ cwd: dirname, strip: 4 }, [
                `nextron-main/examples/_template/ts`,
              ])
            )
            .on(`finish`, () => resolve())
        }),
      ])

      await new Promise<void>((resolve) => {
        got
          .stream(mainUrl)
          .pipe(
            x({ cwd: dirname, strip: 3 }, [`nextron-main/examples/${example}`])
          )
          .on(`finish`, () => resolve())
      })

      console.log(`Done!`)
      const cmd = `bun i && bun run dev`
      console.log(`Run \`${cmd}\` inside of "${dirname}" to start the app`)
      process.exit()
    })
}
