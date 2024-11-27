import { TemplateManager } from "./template-manager"
import { readFile, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'

describe("TemplateManager", () => {
  const testDir = path.join(__dirname, 'saved-custom-templates/test')
  let templateManager: TemplateManager

  beforeEach(async () => {
    templateManager = new TemplateManager()
    await mkdir(testDir, { recursive: true })
  })

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true })
  })

  it("should save a custom template", async () => {
    await templateManager.save("test/123", "Hello World! This is {variable} of {variable}")

    const template = await readFile(`${testDir}/123.txt`, "utf-8")
    expect(template).toBe("Hello World! This is {variable} of {variable}")
  })

  it("should list saved templates", async () => {
    await Promise.all([
      templateManager.save("test/123", "Hello World! This is {variable} of {variable}"),
      templateManager.save("test/456", "Hello World! This is {variable} of {variable}"),
    ])

    const templates = await templateManager.list()
    console.log(templates)
    expect(templates).toEqual(expect.arrayContaining([
      expect.objectContaining({ filename: "123.txt", path: testDir }),
      expect.objectContaining({ filename: "456.txt", path: testDir }),
    ]))
  })

  it("should find a saved template", async () => {
    await templateManager.save("test/123", "Hello World! This is {variable} of {variable}")

    const template = await templateManager.find("test/123")
    expect(template).toBe("Hello World! This is {variable} of {variable}")
  })

  it("should throw an error if the template is not found", async () => {
    await expect(templateManager.find("test/123")).rejects.toThrow()
  })

  it("should delete a saved template", async () => {
    await templateManager.save("test/123", "Hello World! This is {variable} of {variable}")
    await templateManager.delete("test/123")

    await expect(readFile(`${testDir}/123.txt`, "utf-8")).rejects.toThrow()
  })
})
