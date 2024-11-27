import { transformIntoPascalCase } from "./transform-into-pascal-case"

describe("transformIntoPascalCase", () => {
  it("should transform snake case into pascal case", () => {
    expect(transformIntoPascalCase("hello_world")).toBe("HelloWorld")
  })

  it("should transform camel case into pascal case", () => {
    expect(transformIntoPascalCase("helloWorld")).toBe("HelloWorld")
  })
})
