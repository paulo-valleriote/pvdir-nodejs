import fs from "fs/promises"
import path from "path"

export class ListDirContentsUseCase {
  static async execute(filepath: string) {
    const files = await fs.readdir(filepath)

    const detailedFilePromises = files.map(async (file) => {
      const filePath = path.join(filepath, file)
      const stats = await fs.stat(filePath)

      return { 
        filename: file, 
        isDirectory: stats.isDirectory(),
        sizeInKB: stats.size,
        createdAt: stats.birthtime,
      }
    })

    const detailedFiles = await Promise.all(detailedFilePromises)
    console.table(detailedFiles)
  }
}
