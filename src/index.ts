#! /usr/bin/env node

import { Command } from "commander";
import figlet from "figlet"
import { listDirContents } from "./actions/dir/listDirContents";
import { createDir } from "./actions/dir/createDir";
import { createFile } from "./actions/files/createFile";
import path from "path";
import { validateCamelCase } from "./utils/validate-camel-case";

const program = new Command();

console.log(
  figlet.textSync("PVDir")
)

program
  .version("1.0.0")
  .description("Directory manager CLI.")
  .option("-l, --ls [value]", "List all directories")
  .option("-m, --mkdir <value>", "Create a new directory")
  .option("-t, --touch <value>", "Create a new file")
  .parse(process.argv)

const options = program.opts()

if (options.ls) {
  try {
    const filepath = typeof options.ls === "string" ? options.ls : __dirname
    listDirContents(filepath)
  } catch (error) {
    console.error(error)
  }
}

if (options.mkdir) {
  validateCamelCase(options.mkdir)
  createDir(path.resolve(process.cwd(), options.mkdir))
}

if (options.touch) {
  validateCamelCase(options.touch)
  createFile(path.resolve(process.cwd(), options.touch))
}

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
