import fs from "fs/promises"

export class CreateFileUseCase {
  static async execute(filepath: string) {
    await fs.open(filepath, "w")
    console.log('Empty file has been created')
  }
}

