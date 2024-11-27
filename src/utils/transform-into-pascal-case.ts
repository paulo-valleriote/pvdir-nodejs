/**
 * Transform a string into pascal case
 * @param text - The text to be transformed
 * @returns The transformed text
 * @example
 * transformIntoPascalCase("hello_world") // returns "HelloWorld"
 * transformIntoPascalCase("hello-world") // returns "HelloWorld"
 * transformIntoPascalCase("helloWorld") // returns "HelloWorld"
 */
export function transformIntoPascalCase(text: string): string {
  const words = text
    .replace(/([A-Z])/g, ' $1')
    .split(/[-_\s]/)
  
  return words
    .map(word => {
      if (word.length === 0) return ''
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join('')
}
