import chalk from "chalk";

export class TextColorHandler {
  warn(text: string): string {
    return chalk.yellow(text);
  }

  error(text: string): string {
    return chalk.red(text);
  }

  success(text: string): string {
    return chalk.green(text);
  }

  info(text: string): string {
    return chalk.blue(text);
  }
}
