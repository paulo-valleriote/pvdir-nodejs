import { transformIntoCamelCase } from "src/utils/transform-into-camel-case"
import { transformIntoKebabCase } from "src/utils/transform-into-kebab-case"
import { transformIntoPascalCase } from "src/utils/transform-into-pascal-case"


/**
 * Generate a factory template
*/
export class GenerateFactoryTemplateUseCase {
  /**
   * Generate a factory template
   * @param dependencies - The dependencies to import and instantiate
   * @param classToInstantiate - The class to instantiate
   * @returns The file template and filename
   */
  async execute(dependencies: string, classToInstantiate: string) { 
    const dependenciesArray = []

    if (dependencies) {
      dependenciesArray.push(...dependencies.split(","))
    }

    const fileTemplate = `
      ${
        dependenciesArray.map((dependency) => 
          `import { ${transformIntoPascalCase(dependency)} } from "./${transformIntoKebabCase(dependency)}"`
        ).join("\n")
      }
      import { ${transformIntoPascalCase(classToInstantiate)} } from "./${transformIntoKebabCase(classToInstantiate)}"

      export const make${classToInstantiate} = () => {
        ${
          dependenciesArray.map((dependency) => 
            `const ${transformIntoCamelCase(dependency)} = new ${transformIntoPascalCase(dependency)}()`
          ).join("\n")
        }

        return new ${transformIntoPascalCase(classToInstantiate)}(${dependenciesArray.map((dependency) => transformIntoCamelCase(dependency)).join(", ")  })
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
}

