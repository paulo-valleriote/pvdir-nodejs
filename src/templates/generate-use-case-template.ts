import { transformIntoKebabCase } from "src/utils/transform-into-kebab-case"
import { transformIntoPascalCase } from "src/utils/transform-into-pascal-case"

/**
 * Generate a use case template
 * @param className - The class name
 * @returns The file template and filename
 */
export async function generateUseCaseTemplate(className: string) {
  let classNameInPascalCase: string
  if (className.includes("UseCase")) {
    classNameInPascalCase = transformIntoPascalCase(className)
  } else {
    classNameInPascalCase = transformIntoPascalCase(`${className}UseCase`)
  }

  const fileTemplate = `
    export class ${classNameInPascalCase} {
      constructor() {}

      async execute() {
        throw new Error("Not implemented")
      }
    }
  `

  const filename = transformIntoKebabCase(className)

  let filenameWithExtension: string
  if (filename.includes("use-case")) {
    filenameWithExtension = `${filename}.ts`
  } else {
    filenameWithExtension = `${filename}-use-case.ts`
  }

  return {
    template: fileTemplate,
    filename: filenameWithExtension
  }
}
