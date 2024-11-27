import { validateCamelCase } from "./validate-camel-case"

describe("validateCamelCase", () => {
  it("should validate camel case", () => {
    expect(validateCamelCase("helloWorld")).toBe(undefined)
  })

  it("should throw an error if the text is empty", () => {
    expect(() => validateCamelCase("")).toThrow("Text is required")
  })

  it("should throw an error if the text does not start with a lowercase letter", () => {
    expect(() => validateCamelCase("HelloWorld")).toThrow("Text must start with a lowercase letter")
  })

  it("should throw an error if the text is not in camel case", () => {
    expect(() => validateCamelCase("hello-world")).toThrow("Text must be in camel case")
    expect(() => validateCamelCase("hello_World")).toThrow("Text must be in camel case")
  })
})
