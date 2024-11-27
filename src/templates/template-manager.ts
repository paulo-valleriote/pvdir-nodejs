import { readFile, unlink, writeFile, mkdir } from "node:fs/promises"
import { savedCustomTemplatesMap } from "./saved-custom-templates"
import { randomUUID } from "node:crypto"
import path from "node:path"

export class TemplateManager {
  private readonly templatesPath = path.join(__dirname, "saved-custom-templates")

  async listSavedTemplates() {
    const list = Array.from(savedCustomTemplatesMap.entries())
      .map(([id, data]) => ({ id, ...data }))

    return list
  }

  async findSavedTemplate(templateId: string) {
    const templateFile = savedCustomTemplatesMap.get(templateId)

    if (!templateFile) {
      throw new Error("Template not found")
    }

    const template = await readFile(`${templateFile.path}/${templateFile.filename}`, "utf-8")
    return template
  }

  async saveCustomTemplate(templateId: string, template: string) {
    const filename = templateId.split('/').pop() || templateId
    const id = templateId ?? randomUUID()

    const fullPath = path.join(this.templatesPath, id + ".txt")
    const dirPath = path.dirname(fullPath)
    await mkdir(dirPath, { recursive: true })

    await writeFile(fullPath, template)
    savedCustomTemplatesMap.set(id, { filename: `${filename}.txt`, path: dirPath })
  }

  async deleteCustomTemplate(templateId: string) {
    const templateFile = savedCustomTemplatesMap.get(templateId)
    if (!templateFile) {
      throw new Error("Template not found")
    }

    savedCustomTemplatesMap.delete(templateId)
    await unlink(`${templateFile.path}/${templateFile.filename}`)
  }
}