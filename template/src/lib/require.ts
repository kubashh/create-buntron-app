export default (window.require || {}) as (name: string) => any

import type fsType from "fs"
export const fs: typeof fsType = window.require("fs")

import type httpType from "http"
export const http: typeof httpType = window.require("fs")

// Implement node librarys you will use

// @ts-ignore
window.require = undefined
