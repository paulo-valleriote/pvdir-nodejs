import { transformIntoCamelCase } from "src/utils/transform-into-camel-case"
import { transformIntoKebabCase } from "src/utils/transform-into-kebab-case"
import { transformIntoPascalCase } from "src/utils/transform-into-pascal-case"

/**
 * Generate a use case template
 * @param className - The class name
 * @returns The file template and filename
 */
export async function generateUseCaseTemplate(dependencies: string[], classToInstantiate: string) {
  const fileTemplate = `
    ${
      dependencies.map((dependency) => 
        `import { ${transformIntoPascalCase(dependency)} } from "./${transformIntoKebabCase(dependency)}"`
      ).join("\n")
    }
    import { ${transformIntoPascalCase(classToInstantiate)} } from "./${transformIntoKebabCase(classToInstantiate)}"

    export const make${classToInstantiate} = () => {
      ${
        dependencies.map((dependency) => 
          `const ${transformIntoCamelCase(dependency)} = new ${transformIntoPascalCase(dependency)}()`
        ).join("\n")
      }

      return new ${transformIntoPascalCase(classToInstantiate)}(${dependencies.map((dependency) => transformIntoCamelCase(dependency)).join(", ")  })
    }
  `

  const filename = transformIntoKebabCase(classToInstantiate)

  let filenameWithExtension: string
  if (filename.includes("make")) {
    filenameWithExtension = `${filename}.ts`
  } else {
    filenameWithExtension = `make-${filename}.ts`
  }

  return {
    template: fileTemplate,
    filename: filenameWithExtension
  }
}

