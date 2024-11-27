import { transformIntoSnakeCase } from "./transform-into-snake-case"

describe("transformIntoSnakeCase", () => {
  it("should transform camel case into snake case", () => {
    expect(transformIntoSnakeCase("helloWorld")).toBe("hello_world")
  })

  it("should transform pascal case into snake case", () => {
    expect(transformIntoSnakeCase("HelloWorld")).toBe("hello_world")
  })
})
