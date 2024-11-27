import { Command } from "commander";
import { readFile } from "fs/promises";
import { templateManager } from "src/templates/_factories/template-factory";
import { TextColorHandler } from "src/utils/text-color-handler";

export class TemplateCommands {
  constructor(private colorHandler: TextColorHandler) {}

  build() {
    return new Command("template")
      .description("Template management commands")
      .option("-l, --list", "List all saved templates")
      .option("-s, --save <templateId> <templatePath>", "Save a new template")
      .option("-d, --delete <templateId>", "Delete a template")
      .option("--deps <dependencies...>", "Dependencies for template generation")
      .action(async (options) => {
        try {
          if (options.list) {
            const templates = await templateManager.list();
            console.table(templates);
          }
          
          if (options.save) {
            const template = await readFile(options.save[1], "utf-8");
    
            await templateManager.save(options.save[0], template);
            console.log(this.colorHandler.success(`Template ${options.save} saved successfully`));
          }
    
          if (options.delete) {
            await templateManager.delete(options.delete);
            console.log(this.colorHandler.success(`Template ${options.delete} deleted successfully`));
          }
        } catch (error) {
          console.error(error);
        }
      })
  }
}