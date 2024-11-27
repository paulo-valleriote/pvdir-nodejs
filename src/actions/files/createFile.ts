import fs from "fs/promises"

async function createFile(filepath: string) {
  await fs.open(filepath, "w")
  console.log('Empty file has been created')
}

export { createFile }
