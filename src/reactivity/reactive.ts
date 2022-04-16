import { createProxyHandlers } from './proxyHandlers'

const reactiveHandle = createProxyHandlers()
const readonlyHandle = createProxyHandlers(true)

const enum ReactiveFlag { 
  IS_REACTIVE = '__is_reactive__',
  IS_READONLY = '__is_readonly__'
}

function createReactiveObject(raw,handle) {
  return new Proxy(raw, handle)
}

export function reactive(raw) {
  return createReactiveObject(raw, reactiveHandle)
}

export function readonly(raw) {
  return createReactiveObject(raw, readonlyHandle)
}

export function isReadonly(raw) {
  return !!raw[ReactiveFlag.IS_READONLY]
}

export function isReactive(raw) {
  return !!raw[ReactiveFlag.IS_REACTIVE]
}