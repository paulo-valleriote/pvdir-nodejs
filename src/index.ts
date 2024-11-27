#! /usr/bin/env node

import { Command } from "commander";
import figlet from "figlet"
import { TemplateCommands } from "./commands/template-commands";
import { GenerateCommands } from "./commands/generate-commands";
import { TextColorHandler } from "./utils/text-color-handler";
import { DefaultCommands } from "./commands/default-commands";

export const program = new Command();

const colorHandler = new TextColorHandler()
const templateCommands = new TemplateCommands(colorHandler).build()
const generateCommands = new GenerateCommands(colorHandler).build()
const defaultCommands = new DefaultCommands(colorHandler).build()

console.log(
  colorHandler.info(figlet.textSync("PVDir"))
)

program
  .version("1.0.0")
  .description("Directory manager CLI.")
  .addCommand(defaultCommands)
  .addCommand(templateCommands)
  .addCommand(generateCommands)

program.parse(process.argv)
if (!process.argv.slice(2).length) {
  program.outputHelp()
}
