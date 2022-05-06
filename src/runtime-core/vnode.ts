import { ShapeFlags } from '../shared/shapeFlags';
export function createVNode(type, props?, children?) {
	const vnode = {
		type,
		props,
		children,
		shapeFlag: getShapeFlag(type, children),
	};

	return vnode;
}
function getShapeFlag(type, children) {
	let shapeFlag = typeof type === 'string' ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT;

	if (typeof children === 'string') {
		shapeFlag |= ShapeFlags.TEXT_CHILDREN;
	} else if (Array.isArray(children)) {
		shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
	}

	return shapeFlag;
}
