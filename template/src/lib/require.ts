export default (window.require || {}) as (name: string) => any

// @ts-ignore
window.require = undefined
