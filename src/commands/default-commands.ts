import { Command } from "commander";
import { TextColorHandler } from "src/utils/text-color-handler";
import * as Actions from "src/actions";
import path from "path";

export class DefaultCommands { 
  constructor(private colorHandler: TextColorHandler) {}

  build() {
    return new Command("default")
      .description("Default commands")
      .option("-l, --ls [value]", "List all directories")
      .option("-m, --mkdir <value>", "Create a new directory")
      .option("-t, --touch <value>", "Create a new file")
      .action(async (options) => {
        try {
          if (options.ls) {
            const filepath = typeof options.ls === "string" ? options.ls : process.cwd()
            Actions.ListDirContentsUseCase.execute(filepath)
          }
          
          if (options.mkdir) {
            Actions.CreateDirUseCase.execute(path.resolve(process.cwd(), options.mkdir))
            console.log(this.colorHandler.success(`Directory created: ${options.mkdir}`))
          }
          
          if (options.touch) {
            Actions.CreateFileUseCase.execute(path.resolve(process.cwd(), options.touch))
            console.log(this.colorHandler.success(`File created: ${options.touch}`))
          }
        } catch (error) {
          console.log(this.colorHandler.error('Some error occurred'))
          console.error(error);
        }
      })
  }
}