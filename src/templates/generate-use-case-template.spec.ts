import { GenerateUseCaseTemplateUseCase } from "./generate-use-case-template"

describe('GenerateUseCaseTemplate', () => {
  let sut: GenerateUseCaseTemplateUseCase

  beforeEach(() => {
    sut = new GenerateUseCaseTemplateUseCase()
  })

  it('should generate a use case template', async () => {
    const result = await sut.execute('Test')
    
    expect(result.filename).toBe('test-use-case.ts')
    expect(result.template).toContain('export class TestUseCase')
  })
})
