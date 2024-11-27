import { TextColorHandler } from './text-color-handler'
import chalk from 'chalk'

describe('TextColorHandler', () => {
  let handler: TextColorHandler

  beforeEach(() => {
    handler = new TextColorHandler()
  })

  test('warn should return yellow text', () => {
    const text = 'warning message'

    const result = handler.warn(text)
    expect(result).toBe(chalk.yellow(text))
  })

  test('error should return red text', () => {
    const text = 'error message'

    const result = handler.error(text)
    expect(result).toBe(chalk.red(text))
  })

  test('success should return green text', () => {
    const text = 'success message'

    const result = handler.success(text)
    expect(result).toBe(chalk.green(text))
  })

  test('info should return blue text', () => {
    const text = 'info message'

    const result = handler.info(text)
    expect(result).toBe(chalk.blue(text))
  })
})