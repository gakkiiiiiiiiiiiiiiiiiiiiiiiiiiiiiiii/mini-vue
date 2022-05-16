import { createVNode } from '../vnode';
import { Fragment } from '../renderer';
export function renderSlots(slots, name, props = {}) {
	let slot = slots[name];
	if (typeof slot === 'function') {
		return createVNode(Fragment, {}, slot(props));
	}
}
