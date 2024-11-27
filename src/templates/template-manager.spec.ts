import { TemplateManager } from "./template-manager"
import { readFile, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'

describe("TemplateManager", () => {
  const testDir = path.join(__dirname, 'saved-custom-templates/test')

  beforeEach(async () => {
    await mkdir(testDir, { recursive: true })
  })

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true })
  })

  it("should save a custom template", async () => {
    const templateManager = new TemplateManager()

    await templateManager.saveCustomTemplate("test/123", "Hello World! This is {variable} of {variable}")

    const template = await readFile(`${testDir}/123.txt`, "utf-8")
    expect(template).toBe("Hello World! This is {variable} of {variable}")
  })

  it("should list saved templates", async () => {
    const templateManager = new TemplateManager()

    await Promise.all([
      templateManager.saveCustomTemplate("test/123", "Hello World! This is {variable} of {variable}"),
      templateManager.saveCustomTemplate("test/456", "Hello World! This is {variable} of {variable}"),
    ])

    const templates = await templateManager.listSavedTemplates()
    console.log(templates)
    expect(templates).toEqual(expect.arrayContaining([
      expect.objectContaining({ filename: "123.txt", path: testDir }),
      expect.objectContaining({ filename: "456.txt", path: testDir }),
    ]))
  })

  it("should find a saved template", async () => {
    const templateManager = new TemplateManager()

    await templateManager.saveCustomTemplate("test/123", "Hello World! This is {variable} of {variable}")

    const template = await templateManager.findSavedTemplate("test/123")
    expect(template).toBe("Hello World! This is {variable} of {variable}")
  })

  it("should throw an error if the template is not found", async () => {
    const templateManager = new TemplateManager()

    await expect(templateManager.findSavedTemplate("test/123")).rejects.toThrow()
  })

  it("should delete a saved template", async () => {
    const templateManager = new TemplateManager()

    await templateManager.saveCustomTemplate("test/123", "Hello World! This is {variable} of {variable}")
    await templateManager.deleteCustomTemplate("test/123")

    await expect(readFile(`${testDir}/123.txt`, "utf-8")).rejects.toThrow()
  })
})
