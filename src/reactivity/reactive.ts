import { createProxyHandlers } from './proxyHandlers'

const reactiveHandle = createProxyHandlers()
const readonlyHandle = createProxyHandlers(true)

function createReactiveObject(raw,handle) {
  return new Proxy(raw, handle)
}

export function reactive(raw) {
  return createReactiveObject(raw, reactiveHandle)
}

export function readonly(raw) {
  return createReactiveObject(raw, readonlyHandle)
}