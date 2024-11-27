import { GenerateCustomTemplate } from "./generate-custom-template"
import { TemplateManager } from "./template-manager"

describe("GenerateCustomTemplate", () => {
  let templateManager: TemplateManager

  beforeEach(() => {
    templateManager = new TemplateManager()
    vitest.spyOn(templateManager, "findSavedTemplate").mockImplementation(async () => `
      Hello World! This is {variable} of {variable}

      Finally, {variable}
    `)
  })

  it("should generate a custom template", async () => {
    const generateCustomTemplate = new GenerateCustomTemplate(templateManager)

    const result = await generateCustomTemplate.generateCustomTemplate("123", ["test", "generate custom template", "test"])
    expect(result).toBe(`
      Hello World! This is test of generate custom template

      Finally, test
    `)
  })

  it("should throw an error if the template is malformed", async () => {
    const generateCustomTemplate = new GenerateCustomTemplate(templateManager)
    await expect(generateCustomTemplate.generateCustomTemplate("123", ["test"])).rejects.toThrow()
  })
})
