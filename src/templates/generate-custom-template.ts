import { TemplateManager } from "./template-manager"

export class GenerateCustomTemplate {
  constructor(private readonly templateManager: TemplateManager) {}
  
  /**
   * Generates a custom template by replacing placeholders in a saved template with provided dependencies.
   * @param {string} templateId - The ID of the saved template to be customized.
   * @param {string[]} dependencies - An array of strings to replace placeholders in the template.
   * @returns {string} The generated custom template as a string.
   * @throws {Error} If the template is malformed (missing closing brace).
   * @throws {Error} If insufficient dependencies are provided.
   * @throws {Error} If more dependencies are provided than needed.
   * @throws {Error} If some dependencies are not used in the template.
   */
  async generateCustomTemplate(templateId: string, dependencies: string[]): Promise<string> {
    if (dependencies.length === 0) throw new Error("No dependencies provided")

    const template = await this.getSavedTemplate(templateId)

    return this.replacePlaceholders(template, dependencies)
  }

  private async getSavedTemplate(templateId: string) {
    const template = await this.templateManager.findSavedTemplate(templateId)
    if (!template) throw new Error(`Template with id ${templateId} not found`)

    return template
  }

  private replacePlaceholders(template: string, dependencies: string[] | undefined) {
    if (!dependencies || dependencies.length === 0) throw new Error("No dependencies provided")

    const result: string[] = []
    let startIndex = 0
    let endIndex = 0
    let dependencyIndex = 0

    while (endIndex < template.length) {
      if (template[endIndex] === "{") {
        result.push(template.slice(startIndex, endIndex))

        while (endIndex < template.length && template[endIndex] !== "}") {
          endIndex++
        }

        if (dependencyIndex < dependencies.length) {
          result.push(dependencies[dependencyIndex++])
        } else {
          throw new Error(`Lowered number of dependencies provided than placeholders`)
        }

        endIndex++
        startIndex = endIndex
      } else {
        endIndex++
      }
    }

    if (startIndex < template.length) {
      result.push(template.slice(startIndex))
    }

    return result.join("")
  }
}