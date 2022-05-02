import { render } from './renderer';
import { createVNode } from './vnode';

export function createApp(rootComponent) {
	return {
		mount(rootContainer) {
			const vnode = createVNode(rootComponent);
			const element = createElement(rootContainer);
			render(vnode, element);
		},
	};
}

function createElement(rootContainer) {
	let element;

	if (typeof rootContainer === 'string') {
		element = document.querySelector(rootContainer);
	} else {
		element = rootContainer;
	}

	return element;
}
