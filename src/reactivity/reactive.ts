import { isObject } from '../shared';
import { createProxyHandlers } from './proxyHandlers';

const reactiveHandle = createProxyHandlers();
const readonlyHandle = createProxyHandlers({ isReadonly: true });
const shallowReadonlyHandle = createProxyHandlers({ shallowReadonly: true, isReadonly: true });

const enum ReactiveFlag {
	IS_REACTIVE = '__is_reactive__',
	IS_READONLY = '__is_readonly__',
}

function createReactiveObject(raw, handle) {
	return new Proxy(raw, handle);
}

export function reactive(raw) {
	return createReactiveObject(raw, reactiveHandle);
}

export function readonly(raw) {
	return createReactiveObject(raw, readonlyHandle);
}

export function shallowReadonly(raw) {
	if (isObject(raw)) {
		return createReactiveObject(raw, shallowReadonlyHandle);
	} else {
		console.warn(`target ${raw} must be a object`);
	}
}

export function isReadonly(raw) {
	return !!raw[ReactiveFlag.IS_READONLY];
}

export function isReactive(raw) {
	return !!raw[ReactiveFlag.IS_REACTIVE];
}

export function isProxy(raw) {
	return isReadonly(raw) || isReactive(raw);
}
