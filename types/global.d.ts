declare global {
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      dependencies: Record<string, unknown>
      devDependencies: Record<string, unknown>
    }
    lastBuildTime: string
  }
  interface Window {
    mainApi: any
    $config: any
    $message: any
    $messageBox: any
  }
  let mainApi: any
  let $config: any
  let $message: any
  let $messageBox: any
}

export { }
