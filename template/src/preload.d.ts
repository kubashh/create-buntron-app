declare global {
  interface Window {
    require: (arg: string) => any
  }
}

export {}
