const savedCustomTemplatesMap: ISavedCustomTemplatesMap = new Map()

type ISavedCustomTemplatesMap = Map<string, CustomTemplateRecord>

interface CustomTemplateRecord {
  filename: string
  path: string
}

export { savedCustomTemplatesMap }