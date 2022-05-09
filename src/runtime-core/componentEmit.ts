import { addEventPrefix } from '../shared';

export function emit(instance, event, ...args) {
	const { props } = instance;
	let handler = props[addEventPrefix(event)];
	handler && handler(...args);
}
