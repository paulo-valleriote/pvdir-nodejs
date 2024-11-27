import fs from "fs/promises";

export class FileHandler {
  async readFile(path: string): Promise<string> {
    return fs.readFile(path, "utf-8");
  }

  async writeFile(path: string, content: string): Promise<void> {
    return fs.writeFile(path, content);
  }
}
