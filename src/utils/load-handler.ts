import ora, { Ora } from "ora"

export class LoadingHandler {
  spinner: Ora | null = null

  startLoading(text: string): void {
    this.spinner = ora(text).start()
  }

  finishLoading(text: string): void {
    if (this.spinner === null) {
      throw new Error("Spinner not started")
    }

    this.spinner.succeed(text)
    this.spinner = null
  }
}
