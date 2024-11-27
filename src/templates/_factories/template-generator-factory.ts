import { GenerateCustomTemplateUseCase } from "../generate-custom-template";
import { GenerateFactoryTemplateUseCase } from "../generate-factory";
import { GenerateUseCaseTemplateUseCase } from "../generate-use-case-template";
import { templateManager } from "./template-factory";

const generateCustomTemplate = new GenerateCustomTemplateUseCase(templateManager)
const generateFactory = new GenerateFactoryTemplateUseCase()
const generateUseCase = new GenerateUseCaseTemplateUseCase()

export const generate = {
  custom: generateCustomTemplate,
  factory: generateFactory,
  useCase: generateUseCase
}