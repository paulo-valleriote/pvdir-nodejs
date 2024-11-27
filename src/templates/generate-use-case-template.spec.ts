import { generateUseCaseTemplate } from "./generate-use-case-template"

describe('GenerateUseCaseTemplate', () => {
  it('should generate a use case template', async () => {
    const result = await generateUseCaseTemplate('Test')
    
    expect(result.filename).toBe('test-use-case.ts')
    expect(result.template).toContain('export class TestUseCase')
  })
})
