/**
 * Transform a string into snake case
 * @param text - The text to be transformed
 * @returns The transformed text
 * @example
 * transformIntoSnakeCase("CamelCaseText") // returns "camel_case_text"
 */
export function transformIntoSnakeCase(text: string): string {
  return text
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '')
}
