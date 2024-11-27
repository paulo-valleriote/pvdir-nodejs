/**
 * Transform a string into camel case
 * @param text - The text to be transformed
 * @returns The transformed text
 * @example
 * transformIntoCamelCase("camel_case_text") // returns "camelCaseText"
 */
export function transformIntoCamelCase(text: string): string {
  const cleanText = text.replace(/[_\s]+/g, '_');
  
  return cleanText
    .replace(/_([a-zA-Z])/g, (_, char) => char.toUpperCase())
    .replace(/_/g, '')
    .replace(/^[A-Z]/, char => char.toLowerCase());
}
