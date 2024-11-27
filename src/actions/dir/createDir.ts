import fs from "fs/promises"

export class CreateDirUseCase {
  static async execute(filepath: string) {
    const dirExists = await fs.access(filepath).then(() => true).catch(() => false)

    if (dirExists) {
      console.log(`Directory ${filepath} already exists`)
      return
    }

    await fs.mkdir(filepath)
  }
}
