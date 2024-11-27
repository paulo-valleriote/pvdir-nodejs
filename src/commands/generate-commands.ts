import { Command } from "commander";
import path from "path";
import { CreateFileUseCase, WriteFileUseCase } from "src/actions";
import { generate } from "src/templates/_factories/template-generator-factory";
import { TextColorHandler } from "src/utils/text-color-handler";

export class GenerateCommands { 
  constructor(private colorHandler: TextColorHandler) {}

  build() {
    return new Command("generate")
      .description("Generate code from templates")
      .option("-f, --factory <className>", "Generate a factory")
      .option("-u, --usecase <className>", "Generate a use case")
      .option("--deps <dependencies...>", "Dependencies for factory generation")
      .action(async (options) => {
        try {
          if (options.factory) {
            const result = await generate.factory.execute(options.deps, options.factory);
            this.createFile(result.filename, result.template)

            console.log(this.colorHandler.success(`Factory generated: ${result.filename}`));
            console.log(result.template);
          }

          if (options.usecase) {
            const result = await generate.useCase.execute(options.usecase);
            this.createFile(result.filename, result.template)
            console.log(this.colorHandler.success(`Use case generated: ${result.filename}`));
            console.log(result.template);
          }

          if (options.custom) {
            if (!options.deps) throw new Error("Dependencies are required for custom template generation")

            const result = await generate.custom.execute(options.custom, options.deps);
            this.createFile(options.custom, result)

            console.log(this.colorHandler.success(`Custom template generated`));
            console.log(result);
          } 
        } catch (error) {
          console.error(error);
        }
      })
  }

  private createFile(filepath: string, content: string) {
    WriteFileUseCase.execute(path.resolve(process.cwd(), filepath), content)
  }
}