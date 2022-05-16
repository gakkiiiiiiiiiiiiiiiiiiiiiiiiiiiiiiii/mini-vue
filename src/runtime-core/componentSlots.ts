import { ShapeFlags } from '../shared/shapeFlags';

export function initSlots(instance, children) {
	const { vnode } = instance;
	if (vnode.shapeFlag & ShapeFlags.SLOT_CHILDREN) {
		normalizeObjectSlots(children, instance.slots);
	}
}

function normalizeObjectSlots(children, slots) {
	for (const key in children) {
		let value = children[key];
		slots[key] = (props) => normalizeSlotsValue(value(props));
	}
}

function normalizeSlotsValue(value) {
	return Array.isArray(value) ? value : [value];
}
