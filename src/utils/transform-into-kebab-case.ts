/**
 * Transform a string into kebab case
 * @param str - The string to transform
 * @returns The kebab case string
 * @example
 * transformIntoKebabCase('TestRepository') // test-repository
 */
export function transformIntoKebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '-$1')
    .replace(/(\d+)/g, '-$1')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/^-+/, '')
    .replace(/-+/g, '-')
    .toLowerCase()
    .trim();
}
