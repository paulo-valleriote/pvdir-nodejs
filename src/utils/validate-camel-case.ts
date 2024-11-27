/**
 * Validate if a text is in camel case
 * @param text - The text to be validated
 * @throws An error if the text is not in camel case
 */
export function validateCamelCase(text: string): void {
  if (!text) {
    throw new Error("Text is required")
  }

  if (text[0] !== text[0].toLowerCase()) {
    throw new Error("Text must start with a lowercase letter")
  }

  const camelCaseRegex = /^[a-z][a-zA-Z0-9]*$/;
  const isCamelCase = camelCaseRegex.test(text);

  if (!isCamelCase) {
    throw new Error("Text must be in camel case")
  }

  return
}
