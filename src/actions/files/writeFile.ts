import { writeFile } from "fs/promises";

export class WriteFileUseCase {
  static async execute(filepath: string, content: string) {
    await writeFile(filepath, content)
  }
}