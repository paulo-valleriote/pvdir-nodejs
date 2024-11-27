import { GenerateFactoryTemplateUseCase } from "./generate-factory"

describe('GenerateFactory', () => {
  let sut: GenerateFactoryTemplateUseCase

  beforeEach(() => {
    sut = new GenerateFactoryTemplateUseCase()
  })

  it('should generate a factory', async () => {
    const result = await sut.execute('TestRepository, Test2', 'Test')

    expect(result.filename).toBe('make-test.ts')
    expect(result.template).toContain('import { TestRepository } from "./test-repository"')
    expect(result.template).toContain('import { Test } from "./test"')
    expect(result.template).toContain('const testRepository = new TestRepository()')
    expect(result.template).toContain('const test2 = new Test2()')
    expect(result.template).toContain('return new Test(testRepository, test2)')
  })
})
