import { isObject } from '../shared';
import { ShapeFlags } from '../shared/shapeFlags';
import { Text } from './renderer';
export function createVNode(type, props?, children?) {
	const vnode = {
		type,
		props,
		children,
		shapeFlag: getShapeFlag(type, children),
	};

	return vnode;
}

export function createTextVNode(text: string) {
	return createVNode(Text, {}, text);
}

function getShapeFlag(type, children) {
	let shapeFlag = typeof type === 'string' ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT;

	if (typeof children === 'string') {
		shapeFlag |= ShapeFlags.TEXT_CHILDREN;
	} else if (Array.isArray(children)) {
		shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
	}

	if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
		if (isObject(children)) {
			shapeFlag |= ShapeFlags.SLOT_CHILDREN;
		}
	}

	return shapeFlag;
}
