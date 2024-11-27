import { generateUseCaseTemplate } from "./generate-factory"

describe('GenerateFactory', () => {
  it('should generate a factory', async () => {
    const result = await generateUseCaseTemplate(['TestRepository'], 'Test')

    expect(result.filename).toBe('make-test.ts')
    expect(result.template).toContain('import { TestRepository } from "./test-repository"')
    expect(result.template).toContain('import { Test } from "./test"')
    expect(result.template).toContain('const testRepository = new TestRepository()')
    expect(result.template).toContain('return new Test(testRepository)')
  })
})
