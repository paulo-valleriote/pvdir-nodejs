import { transformIntoCamelCase } from "./transform-into-camel-case"

describe("transformIntoCamelCase", () => {
  it("should transform snake case into camel case", () => {
    expect(transformIntoCamelCase("hello_world")).toBe("helloWorld")
  })

  it("should transform pascal case into camel case", () => {
    expect(transformIntoCamelCase("HelloWorld")).toBe("helloWorld")
  })
})
