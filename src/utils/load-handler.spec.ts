import { LoadingHandler } from "./load-handler"

describe('LoadingHandler', () => {
  let handler: LoadingHandler

  beforeEach(() => {
    handler = new LoadingHandler()
  })

  it('should start loading', () => {
    expect(handler.startLoading('loading')).toBe(undefined)
  })

  it('should finish loading', () => {
    handler.startLoading('loading')
    
    expect(handler.finishLoading('finished')).toBe(undefined)
  })

  it('should throw an error if the spinner is not started', () => {
    expect(() => handler.finishLoading('finished')).toThrow('Spinner not started')
  })

  it('should instantiate spinner when start and turn null when finish', () => {
    handler.startLoading('loading')
    expect(handler.spinner).not.toBeNull()

    handler.finishLoading('finished')
    expect(handler.spinner).toBeNull()
  })
})
