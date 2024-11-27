import { GenerateCustomTemplate } from "./generate-custom-template"
import { TemplateManager } from "./template-manager"

describe("GenerateCustomTemplate", () => {
  let templateManager: TemplateManager
  let sut: GenerateCustomTemplate

  beforeEach(() => {
    templateManager = new TemplateManager()
    vitest.spyOn(templateManager, "findSavedTemplate").mockImplementation(async () => `
      Hello World! This is {variable} of {variable}

      Finally, {variable}
    `)

    sut = new GenerateCustomTemplate(templateManager)
  })

  it("should generate a custom template", async () => {
    const result = await sut.execute("123", ["test", "generate custom template", "test"])
    expect(result).toBe(`
      Hello World! This is test of generate custom template

      Finally, test
    `)
  })

  it("should throw an error if the template is malformed", async () => {
    await expect(sut.execute("123", ["test"])).rejects.toThrow()
  })
})
