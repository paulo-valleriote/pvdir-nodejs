import fs from "fs/promises"

async function createDir(filepath: string) {
  const dirExists = await fs.access(filepath).then(() => true).catch(() => false)

  if (dirExists) {
    console.log(`Directory ${filepath} already exists`)
    return
  }

  await fs.mkdir(filepath)
}

export { createDir }
