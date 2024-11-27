import { transformIntoKebabCase } from "./transform-into-kebab-case"

describe('transformIntoKebabCase', () => {
  it('should transform a string into kebab case', () => {
    expect(transformIntoKebabCase('TestRepository')).toBe('test-repository')
    expect(transformIntoKebabCase('TestRepository123')).toBe('test-repository-123')
    expect(transformIntoKebabCase('Test Repository')).toBe('test-repository')
    expect(transformIntoKebabCase('Test-Repository')).toBe('test-repository')
  })
})
